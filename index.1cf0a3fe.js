window.addEventListener("load", function() {
    if (typeof RTCPeerConnection !== "function") {
        console.log("p2p: RTCPeerConnection is undefined");
        return;
    }
    /**
   * @type {RTCConfiguration}
   */ const conf = {};
    const pc = new RTCPeerConnection(conf);
    pc.oniceconnectionstatechange = ()=>{
        console.log(pc.connectionState);
    };
    pc.ondatachannel = (event)=>{
        console.log(event);
    };
    const dc = pc.createDataChannel("online");
    dc.onerror = (error)=>{
        console.error(error);
    };
    dc.onclose = ()=>{
        console.log("DC closed");
    };
    dc.onmessage = (message)=>{
        console.log(message);
    };
    dc.onopen = ()=>{
        dc.send(JSON.stringify({
            online: true
        }));
    };
});

//# sourceMappingURL=index.1cf0a3fe.js.map
