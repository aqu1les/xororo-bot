/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeDecorator } from './Dependency.types';
import { resolve } from './Resolve';

export const Injectable = (() => {
  return (InjectableClass: any) => {
    (InjectableClass as any).SERVICE_NAME = InjectableClass.name;

    resolve(InjectableClass as any);
    return InjectableClass as unknown as InjectableDecorator;
  };
}) as unknown as InjectableDecorator;

export interface InjectableDecorator {
  (): TypeDecorator;
  new (): typeof Injectable;
  readonly SERVICE_NAME: string;
}
