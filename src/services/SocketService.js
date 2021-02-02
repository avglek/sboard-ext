import socketIOClient from "socket.io-client";

const applicationInitialState = window.__INITIAL_STATE__;
const wsocket = applicationInitialState.wsocket;

class SocketService {
  socket = socketIOClient(wsocket.endpoint);

  addListner(room, callBack) {
    this.socket.on(room, callBack);
  }
}

export default SocketService;
