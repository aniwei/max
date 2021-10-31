
export class NativeModule {
  static id = `native_module`

  public context
  public moduleIds
  public config = '{}'

  constructor (context) {
    this.context = context;
    this.moduleIds = Array.from(context.lib.keys());
  }

  compileFunction = (id) => {
    return this.context.lib.get(id)
  }
}
