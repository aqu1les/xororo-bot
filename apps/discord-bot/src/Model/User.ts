import { users } from '@prisma/client';
import { Model } from './Model';

export type IUser = users;
export class User extends Model {
  public static collectionType: IUser;
  tableName = 'users';

  uid!: string;
  name!: string;
  cus_comidos: string[] = [];
  brabas = 0;
  xesques = 0;

  toDatabase(): Record<string, unknown> {
    return {
      ...super.toDatabase(),
      uid: this.uid,
      name: this.name,
      cus_comidos: this.cus_comidos,
      brabas: this.brabas,
      xesques: this.xesques
    };
  }
}
