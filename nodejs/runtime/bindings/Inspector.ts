export class Inspector {
  static id = `inspector`
  setConsoleExtensionInstaller () {}
  registerAsyncHook () {} 
  consoleCall (log, what, message) {
    return log(message)
  }
}
