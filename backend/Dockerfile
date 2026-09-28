# ==============================================================================
# PUZZOLANA MACHINERY - BACKEND DOCKERFILE (MULTI-STAGE PRODUCTION BUILD)
# ==============================================================================

# Stage 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy source code
COPY src/ ./src/

# Compile TypeScript to dist/
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled JavaScript from builder stage
COPY --from=builder /app/dist ./dist

# Create uploads and logs directories
RUN mkdir -p uploads logs && chown -R node:node /app

# Run as non-root user
USER node

# Expose API Port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start Production Server
CMD ["node", "dist/server.js"]
