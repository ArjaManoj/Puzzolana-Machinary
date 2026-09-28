import mongoose from 'mongoose';
import { ENV } from '../config/env';
import { connectDatabase } from '../config/database';
import { ProductCategoryModel } from '../models/ProductCategory';
import { ProductModel } from '../models/Product';
import { StatisticModel } from '../models/Statistic';
import { LocationModel } from '../models/Location';
import { ApplicationDomainModel } from '../models/Application';
import { UserModel } from '../models/User';
import { COMPREHENSIVE_PUZZOLANA_CATALOG } from '../config/seedData';
import { VERIFIED_CATEGORIES } from '../services/categoryService';
import { VERIFIED_STATISTICS, VERIFIED_LOCATIONS, VERIFIED_APPLICATIONS } from '../services/contentService';
import { hashPassword } from '../utils/security';
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASS } from '../services/authService';

export const seedCompleteDatabase = async (): Promise<void> => {
  console.log('🌱 Starting Puzzolana Platform Database Seeding Process...');

  await connectDatabase();

  if (mongoose.connection.readyState !== 1) {
    console.log('⚠️ MongoDB is not connected. Skipping remote seeding; in-memory catalog is active.');
    return;
  }

  try {
    // 1. Seed Categories
    for (const cat of VERIFIED_CATEGORIES) {
      await ProductCategoryModel.findOneAndUpdate(
        { categoryId: cat.categoryId },
        { ...cat },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${VERIFIED_CATEGORIES.length} verified product categories.`);

    // 2. Seed Machinery Products
    for (const prod of COMPREHENSIVE_PUZZOLANA_CATALOG) {
      await ProductModel.findOneAndUpdate(
        { productId: prod.productId },
        { ...prod },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${COMPREHENSIVE_PUZZOLANA_CATALOG.length} verified machinery product models.`);

    // 3. Seed Verified Statistics
    for (const stat of VERIFIED_STATISTICS) {
      await StatisticModel.findOneAndUpdate(
        { key: stat.key },
        { ...stat },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${VERIFIED_STATISTICS.length} verified company statistics.`);

    // 4. Seed Corporate Locations
    for (const loc of VERIFIED_LOCATIONS) {
      await LocationModel.findOneAndUpdate(
        { locationId: loc.locationId },
        { ...loc },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${VERIFIED_LOCATIONS.length} official company locations.`);

    // 5. Seed Industrial Applications
    for (const app of VERIFIED_APPLICATIONS) {
      await ApplicationDomainModel.findOneAndUpdate(
        { applicationId: app.applicationId },
        { ...app },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${VERIFIED_APPLICATIONS.length} industrial application domains.`);

    // 6. Seed Admin & Editor Accounts
    const adminHash = await hashPassword(DEFAULT_ADMIN_PASS);
    await UserModel.findOneAndUpdate(
      { email: DEFAULT_ADMIN_EMAIL.toLowerCase() },
      {
        email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
        passwordHash: adminHash,
        name: 'Puzzolana Chief Administrator',
        role: 'admin',
        isActive: true,
      },
      { upsert: true, new: true }
    );

    const editorHash = await hashPassword('Editor@2026');
    await UserModel.findOneAndUpdate(
      { email: 'editor@puzzolana.com' },
      {
        email: 'editor@puzzolana.com',
        passwordHash: editorHash,
        name: 'Content Operations Editor',
        role: 'editor',
        isActive: true,
      },
      { upsert: true, new: true }
    );
    console.log('✅ Seeded Admin & Editor security credentials.');

    console.log('\n✨ Puzzolana Platform Database Seeding Completed Successfully!\n');
  } catch (error) {
    console.error('❌ Database Seeding Error:', error);
  }
};

// If executed directly from command line (e.g. via ts-node)
if (require.main === module) {
  seedCompleteDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
