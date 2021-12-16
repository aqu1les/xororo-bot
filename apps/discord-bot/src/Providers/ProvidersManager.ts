class _ProvidersManager {
  private services = new Map<string, any>();

  static instance: _ProvidersManager;

  constructor() {
    if (_ProvidersManager.instance) {
      return _ProvidersManager.instance;
    }

    _ProvidersManager.instance = this;
  }

  get(key: string) {
    const matches = this.services.get(key);

    return matches;
  }

  set(key: string, dep: any) {
    this.services.set(key, dep);
  }
}

export const ProvidersManager = new _ProvidersManager();
