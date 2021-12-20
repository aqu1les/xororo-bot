import { Injectable } from '@xororo/core/providers';
import { PrismaClient } from '@prisma/client';

// TODO: INVERTER DEPENDENCIA
@Injectable()
export class DatabaseConnection {
  public client: PrismaClient = new PrismaClient();

  async init() {
    return await this.client.$connect();
  }

  async close() {
    console.log('closing db connection');

    return await this.client.$disconnect();
  }
}
