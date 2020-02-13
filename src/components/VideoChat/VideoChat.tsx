import React from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import "./VideoChat.scss";

let socket: any;
const VideoChat2: React.FC = () => {
  const ENDPOINT = "http://localhost:3000";
  const videoArea: any = React.createRef<HTMLVideoElement>();
  const myVideo: any = React.createRef<HTMLVideoElement>();
  const thereVideo: any = React.createRef<HTMLVideoElement>();
  const inputRef: any = React.createRef();
  const inputRef2: any = React.createRef();
  const SIGNAL_ROOM: any = "SIGNAL_ROOM";
  let startStream: any;
  let rtcPeerConn: any;

  const configuration: any = {
    iceServers: [
      {
        url: "stun:stun.l.google.com:19302"
      }
    ]
  };

  const [form, setForm] = React.useState({
    myName: "",
    myMessage: ""
  });

  const [messages, setMessages]: any = React.useState([]);
  const [signalingMessages, setSignalMessages]: any = React.useState([]);

  const router = useRouter();

  const onChange = (e: any) => {
    const { id, value } = e.target;

    setForm({
      ...form,
      [id]: value
    });
  };

  const logError = (error: any) => {
    setSignalMessages([
      ...signalingMessages,
      { message: `${error.name} : ${error.message}` }
    ]);
  };

  const sendLocalDesc = (desc: any) => {
    rtcPeerConn.setLocalDescription(desc, function() {
      setSignalMessages([
        ...signalingMessages,
        { message: "sending local description" }
      ]);
      socket.emit(
        "signal",
        {
          type: "SDP",
          message: JSON.stringify({ sdp: rtcPeerConn.localDescription }),
          room: SIGNAL_ROOM
        },
        logError
      );
    });
  };

  const startSignaling = () => {
    const myVideo2: any = document.querySelector("#myVideo");
    const theirVideo2: any = document.querySelector("#theirVideo");
    setSignalMessages([
      ...signalingMessages,
      {
        message: "starting signaling..."
      }
    ]);

    rtcPeerConn = new webkitRTCPeerConnection(configuration);

    rtcPeerConn.onicecandidate = (e: any) => {
      if (e.candidate) {
        socket.emit("signal", {
          type: "ice candidate",
          message: JSON.stringify({ candidate: e.candidate }),
          room: SIGNAL_ROOM
        });
        setSignalMessages([
          ...signalingMessages,
          { message: "completed that ice candidate..." }
        ]);
      }
    };

    // let the 'negotiationneded' event trigger offer generation
    rtcPeerConn.onnegotiationneeded = function() {
      setSignalMessages([
        ...signalingMessages,
        { message: "on negotiation called" }
      ]);

      rtcPeerConn.createOffer(sendLocalDesc, logError);
    };

    // once remote stream arrives, show it in the remote video element
    rtcPeerConn.onaddstream = (e: any) => {
      setSignalMessages([
        ...signalingMessages,
        { message: "going to add their stream..." }
      ]);
      theirVideo2.srcObject = e.stream;
    };

    navigator.getUserMedia =
      (navigator as any).getUserMedia ||
      (navigator as any).webkitGetUserMedia ||
      (navigator as any).mozGetUserMedia ||
      (navigator as any).msGetUserMedia;

    (navigator as any).getUserMedia(
      {
        audio: true,
        video: true
      },
      (stream: any) => {
        setSignalMessages([
          ...signalingMessages,
          { message: "going to display my stream..." }
        ]);

        myVideo2.srcObject = stream;
        rtcPeerConn.addStream(stream);
      },
      logError
    );
  };

  React.useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit(
      "join",
      {
        room: `${router.query.room}`,
        signalRoom: SIGNAL_ROOM,
        name: `${router.query.name}`
      },
      () => {}
    );

    socket.emit("signal", {
      type: "user_here",
      message: "Are you ready for a call?",
      signalRoom: SIGNAL_ROOM
    });

    socket.on("signaling_message", (data: any) => {
      console.log(data);
      setSignalMessages([...signalingMessages, data]);

      if (!rtcPeerConn) startSignaling();

      if (data.type != "user_here") {
        var message = JSON.parse(data.message);

        if (message.sdp) {
          rtcPeerConn.setRemoteDescription(
            new RTCSessionDescription(message.sdp),
            function() {
              //if we received an offer, we need to answer

              if (rtcPeerConn.remoteDescription.type === "offer") {
                rtcPeerConn.createAnswer(sendLocalDesc, logError);
              }
            },
            logError
          );
        } else {
          rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate));
        }
      }
    });
    return () => {
      (io as any).disConnect();

      socket.off();
    };
  }, []);

  React.useEffect(() => {
    socket.on("message", (msg: any) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const onSubmit = () => {
    socket.emit("sendMessage", form.myMessage, () => {
      setForm({ ...form, myMessage: "" });
    });
  };

  return (
    <div>
      {/* <video id="videoTag" autoPlay ref={videoArea}></video> */}
      <video id="myVideo" ref={myVideo} autoPlay></video>
      <video id="theirVideo" ref={thereVideo} autoPlay></video>
      <div>
        <label>Message</label>
        <input
          id="myMessage"
          type="text"
          value={form.myMessage}
          onChange={e => onChange(e)}
        />
        <button id="sendMessage" onClick={() => onSubmit()}>
          submit
        </button>
        <div id="chatArea">
          Message Output: <br />
          {messages.map((item: any, index: number) => {
            console.log(item);
            return (
              <li key={index}>
                {item.user !== "admin" && `${item.user}:`}
                {item.text}
              </li>
            );
          })}
        </div>
        <div id="signalingArea">
          signalMessage:
          {signalingMessages.map((item: any, index: number) => {
            return <li key={index}>{item.message}</li>;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoChat2;
