import Peer from "peerjs";
import {List} from "postcss/lib/list";

enum ConnectionStatus {
  "WAITING" = 0,
  "CONNECTED" = 1,
  "DISCONNECTED"= 2,
  "ERROR"= 3
}

type ListenerNames = "connection-status-change" | "error" | "peer-connected";

type ListenersType = {
  [key in ListenerNames]: ((data: any) => void)[]; // array of function
};

export class RTC {
  static peer: Peer;
  static peerId: string;
  static connection: RTCPeerConnection;
  static connectionStatus: ConnectionStatus = 0;

  static listeners: ListenersType = {
    "connection-status-change": [],
    "error": [],
    "peer-connected": []
  };

  static connect() {
    this.peer = new Peer();
    this.peer.on('open', (id) => {
      this.peerId = id;
      this.callListener("connection-status-change", 1);
    });
  }

  static callListener(eventName: ListenerNames, data: any) {
    this.listeners[eventName].forEach(fn => {
      fn(data);
    });
  }
  static addListener(eventName: ListenerNames, fn: (data: any) => void) {
    this.listeners[eventName].push(fn);
  }
}
