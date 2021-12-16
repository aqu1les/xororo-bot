import { ProvidersManager } from './ProvidersManager';
import { DependencyType } from './Dependency.types';

export function registerDependency<
  U extends { new (): InstanceType<U> },
  T extends DependencyType<U>
>(dependency: T) {
  ProvidersManager.set(dependency.SERVICE_NAME, new dependency());
}
