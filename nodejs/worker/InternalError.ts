import { global } from './global';

function parseErrorStack (error) {}

export class InternalError extends global.Error {
  static [Symbol.hasInstance](instance) {
    return instance instanceof global.Error;
  }

  static stackTraceLimit = global.Error.stackTraceLimit;

  static captureStackTrace(targetObject, fn) {
    const stackTraceLimit = Error.stackTraceLimit;

    let cachedStack;

    Object.defineProperty(targetObject, 'stack', {
      get: () => {
        // once we computed the stack, we only return a cached version
        if (cachedStack) {
          return cachedStack;
        }

        const error: any = { 
          message: targetObject.message, 
          name: targetObject.name, 
          code: targetObject.code 
        };

        const { overrideStackTrace } = require('@node/internal/errors');

        const originalStackTraceLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = stackTraceLimit;

        const originalPrepareStackTrace = Error.prepareStackTrace;

        if (overrideStackTrace.has(targetObject)) {
          Error.prepareStackTrace = undefined;
        }

        Error.captureStackTrace(error, fn);

        // remember stack before resetting the original `prepareStackTrace`
        cachedStack = error.stack;

        Error.stackTraceLimit = originalStackTraceLimit;
        Error.prepareStackTrace = originalPrepareStackTrace;

        if (overrideStackTrace.has(targetObject)) {
          const callsites = parseErrorStack(cachedStack);

          const prepareStackTrace = overrideStackTrace.get(targetObject);

          cachedStack = prepareStackTrace(targetObject, callsites);

          overrideStackTrace.delete(targetObject);

          return cachedStack;
        }

        return cachedStack;
      },
    });
  }
}

Object.defineProperty(InternalError, 'name', {
  value: 'Error',
});