class _ProvidersManager {
  private services = new Map<string, unknown>();

  static instance: _ProvidersManager;

  constructor() {
    if (_ProvidersManager.instance) {
      return _ProvidersManager.instance;
    }

    _ProvidersManager.instance = this;
  }

  get<T extends { new (): InstanceType<T> }>(key: string): InstanceType<T> {
    const matches = this.services.get(key);

    return matches as InstanceType<T>;
  }

  set(key: string, dep: unknown) {
    this.services.set(key, dep);
  }
}

export const ProvidersManager = new _ProvidersManager();
