const player = {
    ref: null,
    done: false
};
function onYouTubeIframeAPIReady() {
    player.ref = new YT.Player("player", {
        height: "0",
        width: "0",
        videoId: "tGfQYbArQhc",
        autoplay: 1,
        controls: 0,
        loop: 1,
        playerVars: {
            playsinline: 1
        },
        events: {}
    });
}
window.addEventListener("load", ()=>{
    const playerAction = document.getElementById("player-action");
    const icon = playerAction.getElementsByTagName("img")[0];
    playerAction.addEventListener("click", ()=>{
        const playerState = player.ref.getPlayerState();
        const isPaused = [
            YT.PlayerState.UNSTARTED,
            YT.PlayerState.PAUSED,
            YT.PlayerState.CUED
        ];
        if (isPaused.includes(playerState)) {
            player.ref.playVideo();
            icon.src = "play-circle.svg";
        } else if (playerState === YT.PlayerState.PLAYING) {
            player.ref.stopVideo();
            icon.src = "pause-circle.svg";
        }
    });
});

//# sourceMappingURL=index.0aae7d61.js.map
