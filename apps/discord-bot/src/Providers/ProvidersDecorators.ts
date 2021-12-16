import { resolve } from '../Helpers';

export function Injectable(): any {
  return function <T extends { new (): any }>(
    InjectableClass: T
  ): T & { SERVICE_NAME: string } {
    (InjectableClass as any).SERVICE_NAME = InjectableClass.name;
    resolve(InjectableClass);
    return InjectableClass as any;
  };
}
