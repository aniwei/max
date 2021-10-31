

export class FS {
  static id = `fs`

  public context
  
  constructor (context) {
    this.context = context;
  }

  open (path, flag, mode) {
    return this.context.files.open(path, 'r+', mode)
  }


  internalModuleStat = (filename) => {
    return this.context.files.stat(filename)
  }
  
  internalModuleReadJSON () {
    return {}
  }
  
  close () {
    return 10
  }
  
  lstat (fd) {
    return this.context.files.lstat(fd)
  }

  read (fd, buffer, offset, length, position) {
    return this.context.files.read(fd, buffer, offset, length, position < 0 ? null : position)
  }
  
  
  fstat (fd) {
    return this.context.files.fstat(fd)
  }
  
  FSReqCallback () {}
}

