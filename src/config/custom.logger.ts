import { Logger as logger } from '@nestjs/common';
import { Logger, QueryRunner } from 'typeorm';

export class CustomLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (queryRunner) {
      logger.debug(`Executed on: ${queryRunner.getReplicationMode()}`);
    }
    logger.debug(`Query: ${query}, Parameters: ${parameters}`);
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    logger.error(
      `Query Error: ${error}, Query: ${query}, Parameters: ${parameters}`,
    );
    if (queryRunner) {
      logger.error(
        `Error occurred on: ${queryRunner.connection.options.driver}`,
      );
    }
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    console.warn(
      `Slow Query: ${query} (Execution Time: ${time} ms), Parameters: ${parameters}`,
    );
    if (queryRunner) {
      console.warn(
        `Slow query executed on: ${queryRunner.connection.options.driver}`,
      );
    }
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    logger.log(`Schema Build: ${message}`);
    if (queryRunner) {
      logger.log(
        `Schema build executed on: ${queryRunner.connection.options.driver}`,
      );
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    logger.log(`Migration: ${message}`);
    if (queryRunner) {
      logger.log(
        `Migration executed on: ${queryRunner.connection.options.driver}`,
      );
    }
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        logger.log(`Log: ${message}`);
        break;
      case 'info':
        logger.debug(`Info: ${message}`);
        break;
      case 'warn':
        logger.warn(`Warn: ${message}`);
        break;
    }
    if (queryRunner) {
      logger.log(
        `Log level ${level} executed on: ${queryRunner.connection.options.driver}`,
      );
    }
  }
}
