class ShutdownWrap {

}

class WriteWrap {

}

export class StreamWrap {
  static id = `stream_wrap`

  public ShutdownWrap = ShutdownWrap
  public WriteWrap= WriteWrap

  public kArrayBufferOffset = 1
  public kBytesWritten = 2
  public kLastWriteWasAsync = 3
  public kReadBytesOrError = 0
  public streamBaseState = [0, 0, 0, 0]
}

