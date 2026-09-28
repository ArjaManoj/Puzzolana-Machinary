import mongoose from 'mongoose';
import { UserModel, IUser } from '../models/User';
import { hashPassword, comparePasswords, generateAuthToken, JwtUserPayload } from '../utils/security';
import { Logger } from '../utils/logger';

// Default corporate super-admin credentials
export const DEFAULT_ADMIN_EMAIL = 'admin@puzzolana.com';
export const DEFAULT_ADMIN_PASS = 'Puzzolana@2026';

// In-memory fallback accounts for offline / testing mode
const IN_MEMORY_USERS = new Map<string, { id: string; email: string; passwordHash: string; name: string; role: 'admin' | 'editor'; isActive: boolean }>();

export const AuthService = {
  // Seed root administrator if none exists
  seedInitialAdmin: async (): Promise<void> => {
    const rootAdminHash = await hashPassword(DEFAULT_ADMIN_PASS);

    // Populate fallback memory map
    IN_MEMORY_USERS.set(DEFAULT_ADMIN_EMAIL.toLowerCase(), {
      id: 'admin_root',
      email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
      passwordHash: rootAdminHash,
      name: 'Puzzolana Chief Administrator',
      role: 'admin',
      isActive: true,
    });

    // Also seed sample editor for RBAC testing
    const editorHash = await hashPassword('Editor@2026');
    IN_MEMORY_USERS.set('editor@puzzolana.com', {
      id: 'editor_sample',
      email: 'editor@puzzolana.com',
      passwordHash: editorHash,
      name: 'Content Operations Editor',
      role: 'editor',
      isActive: true,
    });

    if (mongoose.connection.readyState === 1) {
      try {
        const existingAdmin = await UserModel.findOne({ email: DEFAULT_ADMIN_EMAIL.toLowerCase() });
        if (!existingAdmin) {
          await UserModel.create({
            email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
            passwordHash: rootAdminHash,
            name: 'Puzzolana Chief Administrator',
            role: 'admin',
            isActive: true,
          });
          Logger.info('Initial Administrator account seeded successfully in MongoDB.');
        }
      } catch (err) {
        Logger.warn('Admin seed error, using fallback in-memory user', { error: (err as Error).message });
      }
    }
  },

  // Authenticate user with bcrypt verification and JWT generation
  login: async (email: string, plainPass: string): Promise<{ token: string; user: JwtUserPayload } | null> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try MongoDB lookup
    if (mongoose.connection.readyState === 1) {
      try {
        const user = await UserModel.findOne({ email: cleanEmail });
        if (user && user.isActive) {
          const isMatch = await comparePasswords(plainPass, user.passwordHash);
          if (isMatch) {
            // Update last login
            await UserModel.updateOne({ _id: user._id }, { lastLoginAt: new Date() });

            const payload: JwtUserPayload = {
              userId: user.id || user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role,
            };

            const token = generateAuthToken(payload);
            return { token, user: payload };
          }
        }
      } catch (err) {
        Logger.warn('MongoDB Login check error, attempting in-memory verification', { error: (err as Error).message });
      }
    }

    // 2. Fallback in-memory verification
    if (IN_MEMORY_USERS.has(cleanEmail)) {
      const memoryUser = IN_MEMORY_USERS.get(cleanEmail)!;
      if (memoryUser.isActive) {
        const isMatch = await comparePasswords(plainPass, memoryUser.passwordHash);
        if (isMatch) {
          const payload: JwtUserPayload = {
            userId: memoryUser.id,
            email: memoryUser.email,
            name: memoryUser.name,
            role: memoryUser.role,
          };

          const token = generateAuthToken(payload);
          return { token, user: payload };
        }
      }
    }

    return null;
  },

  // Retrieve current user profile
  getUserById: async (userId: string): Promise<JwtUserPayload | null> => {
    if (mongoose.connection.readyState === 1) {
      try {
        const user = await UserModel.findById(userId);
        if (user && user.isActive) {
          return {
            userId: user.id || user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }
      } catch {
        // Fallback
      }
    }

    for (const memUser of Array.from(IN_MEMORY_USERS.values())) {
      if (memUser.id === userId && memUser.isActive) {
        return {
          userId: memUser.id,
          email: memUser.email,
          name: memUser.name,
          role: memUser.role,
        };
      }
    }

    return null;
  },
};

// Auto-seed admin credentials in background
AuthService.seedInitialAdmin();
