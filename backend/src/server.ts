import { createApp } from './app';
import { ENV } from './config/env';
import { connectDatabase } from './config/database';

const startServer = async (): Promise<void> => {
  // Connect to MongoDB
  await connectDatabase();

  const app = createApp();

  const server = app.listen(ENV.PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🏭 PUZZOLANA MACHINERY — ENTERPRISE API ENGINE`);
    console.log(`==================================================`);
    console.log(`🚀 Server running in [${ENV.NODE_ENV}] mode on port : ${ENV.PORT}`);
    console.log(`🌐 Base API URL: http://localhost:${ENV.PORT}/api`);
    console.log(`🩺 Health check: http://localhost:${ENV.PORT}/api/health`);
    console.log(`==================================================\n`);
  });

  // Graceful shutdown handling
  const gracefulShutdown = (signal: string) => {
    console.log(`\nReceived ${signal}. Shutting down Puzzolana API server gracefully...`);
    server.close(() => {
      console.log('HTTP Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

startServer().catch((err) => {
  console.error('Fatal Server Startup Error:', err);
  process.exit(1);
});
