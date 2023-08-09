import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from './config.module';
import { NestApplication } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import mongoose, { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('ConfigModule', () => {
  let app: NestApplication;
  let service: ConfigService;
  let moduleFixture: TestingModule;
  let connection: Connection;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ConfigService],
    }).compile();

    service = moduleFixture.get<ConfigService>(ConfigService);
    app = moduleFixture.createNestApplication();
    connection = await moduleFixture.get(getConnectionToken());
    await app.init();
  });

  describe('should compile the module', () => {
    it('should have node_env', () => {
      expect(service.get('node_env')).toBeDefined();
    });
    it('should have mongodb_uri', () => {
      expect(service.get('mongodb.uri')).toBeDefined();
    });
    it('should have port', () => {
      expect(service.get('port')).toBeDefined();
    });
  });
  afterEach(async () => {
    await connection.close(true);
  });
});
