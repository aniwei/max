export const constants = {
  0: 'SOCKET',
  1: 'UV_TCP_IPV6ONLY',
  SERVER: 1,
  SOCKET: 0,
  UV_TCP_IPV6ONLY: 1
}

export class TCP {
  connect () {}
}

export class TCPConnectWrap {

}

export default {
  constants,
  TCP,
  TCPConnectWrap
}