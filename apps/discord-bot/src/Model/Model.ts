/* eslint-disable @typescript-eslint/ban-types */
import { PrismaClient } from '@prisma/client';
import { resolve } from '@xororo/core/providers';
import { DatabaseConnection } from '../Database';

type NonMethodKeys<T> = {
  [P in keyof T]: T[P] extends Function ? never : P;
}[keyof T];

export class Model {
  id!: string;
  tableName!: string;
  originalRecord!: any;

  public static collectionType: any;
  protected static dbConnection: DatabaseConnection =
    resolve(DatabaseConnection);

  static factory<T extends typeof Model>(this: T): InstanceType<T> {
    return new this() as InstanceType<T>;
  }

  static getTableName<T extends typeof Model>(
    this: T
  ): NonMethodKeys<PrismaClient> {
    const instance = this.factory();
    return instance.tableName as NonMethodKeys<PrismaClient>;
  }

  getTableName(): NonMethodKeys<PrismaClient> {
    return this.tableName as NonMethodKeys<PrismaClient>;
  }

  static async findOne<T extends typeof Model>(
    this: T,
    clause: Partial<T['collectionType']>
  ): Promise<InstanceType<T> | null> {
    const result = await Model.dbConnection.client[
      this.getTableName()
    ].findFirst({
      where: clause as any
    });

    if (!result) {
      return null;
    }

    const instance = this.factory();
    instance.originalRecord = result;
    for (const column of Object.keys(result)) {
      (instance as any)[column] = (result as any)[column];
    }

    return instance as InstanceType<T>;
  }

  static async create<T extends typeof Model>(
    this: T,
    data: Partial<T['collectionType']>
  ) {
    const result = await Model.dbConnection.client[this.getTableName()].create({
      data: data as any
    });

    const instance = this.factory();
    instance.originalRecord = result;

    for (const column of Object.keys(result)) {
      (instance as any)[column] = (result as any)[column];
    }

    return instance as InstanceType<T>;
  }

  async save() {
    await Model.dbConnection.client[this.getTableName()].update({
      where: {
        id: this.id
      },
      data: {
        ...omit(this.toDatabase(), 'id')
      }
    });
  }

  toDatabase(): Record<string, unknown> {
    return {};
  }
}

function omit<T, U extends string>(ob: T, toOmit: U): Omit<T, U> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [toOmit]: _, ...rest } = ob;
  return rest;
}
