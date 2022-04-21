import axios from "axios";
import YouTubePlayer from "youtube-player";

export class YouTubeHandler {
  static async loadVideoGetInfo(videoId: string) {
    const newDiv = document.createElement('div');
    newDiv.id = "some-player" + new Date().getTime();
    newDiv.style.display = "none";
    document.body.appendChild(newDiv);
    const player = YouTubePlayer(newDiv.id);
    player.loadVideoById("VmeDcSR6qwk").then(() => {
      console.log("video is load?");
    });
    player.on('stateChange', (event: any) => {
      console.log(event);
      if (event.data === 3) {
        // @ts-ignore
        console.log(player.getVideoData().then(console.log))
      }
    });
  }
  static getVideoInfo(videoId: string) {
    let queryString = '';
    const queryObject: {[key: string]: string} = {
      linkinfo: `https://www.youtube.com/watch?v=${videoId}`,
      lang: 'en',
      option: '100',
      country: 'undefined'
    };
    queryString = Object.keys(queryObject).map(key => `${key}=${encodeURI(queryObject[key])}`).join('&');
    return fetch(`https://x2convert.com/ajax2/getFile.ashx?${queryString}`, {
      method: 'POST',
    }).then(r => r.json());
  }
}
