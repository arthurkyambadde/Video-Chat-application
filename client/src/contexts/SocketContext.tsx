import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext({});

const socket = io("http://localhost:5000/");
//

console.log(socket, "socket");

const ContextProvider = ({ children }: any) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState<any>({});
  const [me, setMe] = useState("");
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [newMessage, setNewMessage] = useState({});

  const myVideo = useRef<any>(null);
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream: any) => {
        setStream(currentStream);

        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      console.log("from who", from, name, signal);
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on("userExists", function (data) {
      console.log("user exists", data);
    });
    socket.on("userSet", function (data) {
      setUser(data.username);
      setLoggedIn(true);
    });

    socket.on("newmsg", function (data) {
      setNewMessage(data);
      console.log("new message", data);
    });
  }, []);

  function sendMessage() {
    socket.emit("msg", { message: textMessage, user: user });
    console.log("message sent");
  }

  function setUsername() {
    socket.emit("setUsername", name);
  }

  const answerCall = () => {
    setCallAccepted(true);

    const peer: any = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data: any) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream: any) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: any) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        setUsername,
        loggedIn,
        textMessage,
        setTextMessage,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
