import { app } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { logger } from './middleware/request-logger.js';

let server: ReturnType<typeof app.listen>;

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    server = app.listen(env.PORT, () => {
      logger.info(
        `Server running in ${env.NODE_ENV} mode on http://localhost:${env.PORT}`
      );
    });

    server.on('error', async (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(
          `Port ${env.PORT} is already in use. Please stop the process running on port ${env.PORT} or use a different port.`
        );
      } else {
        logger.error({ error }, 'HTTP server encountered an error');
      }
      await disconnectDatabase();
      process.exit(1);
    });
  } catch (error) {
    logger.error({ error }, 'Fatal error during server startup');
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string): Promise<void> {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed');
      await disconnectDatabase();
      logger.info('Process termination complete');
      process.exit(0);
    });
  } else {
    await disconnectDatabase();
    process.exit(0);
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

