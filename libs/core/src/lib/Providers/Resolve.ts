import { DependencyType } from './Dependency.types';
import { ProvidersManager } from './ProvidersManager';
import { registerDependency } from './RegisterDependency';

export function resolve<T extends { new (): InstanceType<T> }>(
  dep: T
): InstanceType<T> {
  const dependency = dep as unknown as DependencyType<T>;
  let instance = ProvidersManager.get(dependency.SERVICE_NAME);

  if (!instance) {
    registerDependency(dependency);
    instance = ProvidersManager.get(dependency.SERVICE_NAME);
  }

  return instance;
}
