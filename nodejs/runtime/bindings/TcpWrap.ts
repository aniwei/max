class TCP {
  connect () {}
}

class TCPConnectWrap {

}

export class TcpWrap {
  static id = `tcp_wrap`

  public constants = {
    0: 'SOCKET',
    1: 'UV_TCP_IPV6ONLY',
    SERVER: 1,
    SOCKET: 0,
    UV_TCP_IPV6ONLY: 1
  }

  public TCP = TCP
  public TCPConnectWrap = TCPConnectWrap
}
