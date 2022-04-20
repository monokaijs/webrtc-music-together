class App {
  peer;
  peerId = false;

  initialize() {
    return new Promise((resolve, reject) => {
      // create new peer instance
      try {
        this.peer = new Peer();
        this.peer.on('open', (id) => {
          this.peerId = id;
          resolve(this.peerId);
        });
      } catch (e) {
        console.error(e);
        reject("Failed to connect to Peer server.");
      }
    });
  }
}
