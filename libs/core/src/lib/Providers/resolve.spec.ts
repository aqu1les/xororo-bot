import { resolve } from './Resolve';

class FakeKlass {}

describe(resolve.name, () => {
  it('should return class instance', () => {
    const instance = resolve(FakeKlass);

    expect(instance).toBeInstanceOf(FakeKlass);
  });
});
