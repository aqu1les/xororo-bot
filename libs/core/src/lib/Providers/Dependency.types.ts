/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DependencyType<T extends { new (): InstanceType<T> }> {
  new (): InstanceType<T>;
  readonly SERVICE_NAME: string;
}

export interface TypeDecorator {
  /**
   * Invoke as decorator.
   */
  <T extends DependencyType<any>>(type: T): T;
  (target: any, propertyKey?: string | symbol, parameterIndex?: number): void;
}
