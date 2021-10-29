

export const global = globalThis as any;
const TextEncoder = global.TextEncoder;

function evalute (code, context, importCallback) {
  return context ? (function () {
    return eval(`with (context)\x20{\x0a${code}\x0a}`);
  }).call(context) : eval(code)
}

Object.defineProperty(global, 'TextEncoder', {
  get () {
    return TextEncoder
  }
});

Object.defineProperty(global, 'global', {
  get () {
    return global;
  }
});

Object.defineProperty(global, 'evalute', {
  get () {
    return evalute
  }
})


Object.defineProperty(global, 'globalThis', {
  get () {
    return global
  }
})
