import playIcon from '../icons/play-circle.svg';
import pauseIcon from '../icons/pause-circle.svg';

class Notify {
  constructor() {
    this._requestPermission();
  }

  _requestPermission = async () => {
    const isAllowed = (status) => ['granted'].includes(status);

    if (!('Notification' in window)) return Promise.resolve(false);

    return Notification.requestPermission()
      .then((result) => isAllowed(result))
      .catch((err) => {
        console.error(err);
        return false;
      });
  };

  async notify(message) {
    const allowed = await this._requestPermission();
    if (!allowed || !message) return;

    new Notification('Timer', { body: message });
  }
}

window.addEventListener('load', function () {
  const PLAYER = {
    ref: new YT.Player('player', {
      height: '0',
      width: '0',
      videoId: 'tGfQYbArQhc',
      autoplay: 1,
      controls: 0,
      loop: 1,
      playerVars: {
        playsinline: 1,
      },
      events: {},
    }),
    metadata: {
      title: null,
    },
    done: false,
  };

  const playerAction = document.getElementById('player-action');
  const playerIcon = playerAction.getElementsByTagName('img')?.[0];

  if (!playerAction || !playerIcon) return;

  const notification = new Notify();

  playerAction.addEventListener('click', async (event) => {
    event.preventDefault();
    const button = event.currentTarget ?? {};

    const disableOrEnableButton = () => (button.disabled = !button.disabled);

    disableOrEnableButton();

    const videoTitle = PLAYER.ref.videoTitle;
    const playerState = PLAYER.ref.getPlayerState();

    if (videoTitle) PLAYER.metadata.title = videoTitle;

    const isPaused = [
      YT.PlayerState.UNSTARTED,
      YT.PlayerState.PAUSED,
      YT.PlayerState.CUED,
    ];

    if (isPaused.includes(playerState)) {
      PLAYER.ref.playVideo();
      playerIcon.src = pauseIcon;

      if (PLAYER.metadata.title)
        await notification.notify(`Tocando "${PLAYER.metadata.title}"`);
    } else if (playerState === YT.PlayerState.PLAYING) {
      PLAYER.ref.stopVideo();
      playerIcon.src = playIcon;

      if (PLAYER.metadata.title)
        await notification.notify(`"${PLAYER.metadata.title}" pausado`);
    }

    disableOrEnableButton();
  });

  this.window.addEventListener('keydown', (ev) => {
    const isUp = [ev.code, ev.key].includes('ArrowUp');
    const isDown = [ev.code, ev.key].includes('ArrowDown');

    if (!PLAYER.ref) return;
    const volume = PLAYER.ref.getVolume();
    const jump = volume % 2 !== 0 ? 3 : 2;

    if (isUp && volume < 100) {
      const newVolumeValue = volume + jump;
      PLAYER.ref.setVolume(newVolumeValue);
      console.log(
        `Action: Volume Up ( from = ${volume}, to = ${newVolumeValue})`
      );
    }

    if (isDown && volume > 0) {
      const newVolumeValue = volume - jump;
      PLAYER.ref.setVolume(newVolumeValue);
      console.log(
        `Action: Volume Down ( from = ${volume}, to = ${newVolumeValue})`
      );
    }
  });
});
