import { ProvidersManager } from '../Providers/ProvidersManager';

export function resolve<T extends { new (): any }>(
  dependency: T
): InstanceType<T> {
  let instance = ProvidersManager.get((dependency as any).SERVICE_NAME);

  if (!instance) {
    registerDependency(dependency);
    instance = ProvidersManager.get((dependency as any).SERVICE_NAME);
  }

  return instance;
}

export function registerDependency<T extends { new (): any }>(dependency: T) {
  ProvidersManager.set((dependency as any).SERVICE_NAME, new dependency());
}
