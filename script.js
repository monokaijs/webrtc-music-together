let connectBtn = document.querySelector("#connect");
let addMusicBtn = document.querySelector("#add-music-btn");
let otherIdInput = document.querySelector('#other-id');
let inputYouTubeUrl = document.querySelector("#input-youtube-url");
let peerIdEl = document.querySelector("#peerID");
let errorEl = document.querySelector("#error-status");
let connectionStatusEl = document.querySelector("#connection-status");
let currentMusicList = [];
let currentPlayingId = '';
let peerReady = false, peer = new Peer, peerId, peerConnected = false, peerConnection;
let playerReady = false, player;

peer.on('open', (id) => {
  // peer is now connected
  peerId = id;
  peerReady = true;
  peerIdEl.innerHTML = id;
  connectionStatusEl.innerHTML = "Connected.";
  connectBtn.attributes.removeNamedItem("disabled");
  console.log(">> Peer connected with ID: " + peerId);
  document.querySelector("#copy-id").onclick = () => {
    navigator.clipboard.writeText(id).then(r => console.log("ID Copied."));
  }
  connectBtn.onclick = () => {
    const conn = peer.connect(otherIdInput.value);
    connectionHandler(conn);
  }
});

const onSongChange = (songId) => {
  // player.stopVideo();
  player.loadVideoById(songId, 0);
  player.playVideo();
}

const renderMusicList = (conn) => {
  const musicItem = document.querySelector("#list-music-item");
  const playlistEl = document.querySelector("#playlist");
  playlistEl.innerHTML = '';
  currentMusicList.forEach(song => {
    const item = musicItem.content.cloneNode(true);
    const songPlayBtn = item.querySelector('.song-play');
    item.querySelector('.song-name').innerHTML = song.url;
    if (currentPlayingId === song.songId) {
      songPlayBtn.disabled = true;
      songPlayBtn.innerText = "Playing...";
    } else {
      songPlayBtn.innerText = "Play";
      songPlayBtn.onclick = () => {
        if (!playerReady) {
          alert("Player is loading...");
          return;
        }
        onSongChange(song.songId);
        currentPlayingId = song.songId;
        conn.send({
          type: 'set-playing',
          data: song.songId
        })
        renderMusicList(conn);
      }
    }
    playlistEl.append(item);
  });
}

const connectionHandler = (conn) => {
  peerConnected = true;
  peerConnection = conn;

  peerConnection.on('open', () => {
    otherIdInput.value = conn.peer;
    otherIdInput.disabled = true;

    // only enable add music btn when connected
    addMusicBtn.disabled = false;
    conn.on('data', (packet) => {
      console.log(packet);
      // Data received over WebRTC
      switch (packet.type) {
        case 'sync-playlist':
          currentMusicList = packet.data;
          renderMusicList(conn);
          break;
        case 'set-playing':
          currentPlayingId = packet.data;
          onSongChange(currentPlayingId);
          renderMusicList(conn);
          break;
        case 'update-player-state':
          if (player.getPlayerState() !== packet.data.status) {
            switch (packet.data.status) {
              case 0:
                // ended
                break;
              case 1:
                // playing
                player.seekTo(packet.data.currentTime);
                player.playVideo();
                // player.playVideo();
                break;
              case 2:
                // paused
                player.pauseVideo();
                break;
            }
          }
          break;
      }
    });
    addMusicBtn.onclick = () => {
      if (inputYouTubeUrl.value && inputYouTubeUrl.value.trim() !== "" && parseYtbLink(inputYouTubeUrl.value)) {
        currentMusicList.push({
          songId: parseYtbLink(inputYouTubeUrl.value),
          url: inputYouTubeUrl.value
        });
        conn.send({
          type: 'sync-playlist',
          data: currentMusicList
        });
        renderMusicList(conn);
        inputYouTubeUrl.value = '';
      }
    }
  });
}

peer.on('connection', conn => {
  connectionHandler(conn);
});

peer.on('close', () => {
  connectionStatusEl.innerHTML = "Closed.";
});

peer.on('call', () => {
  connectionStatusEl.innerHTML = "Received a call.";
});

peer.on('disconnected', () => {
  connectionStatusEl.innerHTML = "Disconnected.";
});

peer.on('error', (err) => {
  errorEl.innerHTML = err.type;
});
