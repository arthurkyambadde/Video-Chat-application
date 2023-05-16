import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import AgoraRTM, { RtmClient } from "agora-rtm-sdk";

function PeerChat() {
  const APP_ID: string = "8e25c6aed3084e6e98c07745dedc382f";
  let token: any = null;
  let uid: any = String(Math.random() * 10000);
  let client: RtmClient;
  let channel;
  //
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  let peerConnection: RTCPeerConnection;

  const servers: any = {
    iceservers: [
      {
        urls: [
          "stun:stun1.1.google.com:19302",
          "stun:stun2.1.google.com:19302",
        ],
      },
    ],
  };

  //handle user joined
  const handleUserJoined = async (MemberId: any) => {
    console.log("new user has joined", MemberId);
    createOffer(MemberId);
  };
  //

  //handle message from peer
  const handleMessageFromPeer = (message: any, MemberId: any) => {
    message = JSON.parse(message.text);

    if (message.type === "offer") {
      createAnswer(MemberId, message.offer);
    }
    if (message.type === "answer") {
      addAnswer(message.answer);
    }
    if (message.type === "candidate") {
      if (peerConnection) {
        peerConnection.addIceCandidate(message.candidate);
      }
    }
  };
  //

  let localStream: MediaStream;
  const constraints = { video: true, audio: true };

  async function initialize() {
    try {
      client = await AgoraRTM.createInstance(APP_ID);
      await client.login({ uid, token });

      channel = client.createChannel("main");
      await channel.join();

      channel.on("MemberJoined", handleUserJoined);

      client.on("MessageFromPeer", handleMessageFromPeer);

      localStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  const createPeerConnection = async (MemberId: any) => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();

    peerConnection.ontrack = (event) => {
      remoteStream.addTrack(event.track);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    };

    if (!localStream) {
      localStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    }

    localStream.getTracks().forEach((track: any) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event: any) => {
      event.streams[0].getTracks().forEach((track: any) => {
        remoteStream.addTrack(track);
      });
    };

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        client.sendMessageToPeer(
          {
            text: JSON.stringify({
              type: "candidate",
              candidate: event.candidate,
            }),
          },
          MemberId
        );
      }
    };
  };

  let remoteStream: MediaStream;

  let createOffer = async (MemberId: any) => {
    await createPeerConnection(MemberId);

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    //send message to joined client

    client.sendMessageToPeer(
      {
        text: JSON.stringify({
          type: "offer",
          offer: offer,
        }),
      },
      MemberId
    );
  };

  let createAnswer = async (MemberId: any, offer: any) => {
    await createPeerConnection(MemberId);

    await peerConnection.setRemoteDescription(offer);

    let answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    client.sendMessageToPeer(
      {
        text: JSON.stringify({
          type: "answer",
          answer: answer,
        }),
      },
      MemberId
    );
  };

  let addAnswer = async (answer: any) => {
    if (!peerConnection.currentRemoteDescription) {
      peerConnection.setRemoteDescription(answer);
    }
  };

  return (
    <div id="peerchat_videos" className={styles.peerchat_container}>
      <video
        className={styles.video_player}
        id="user_1"
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
      ></video>
      <video
        className={styles.video_player}
        id="user_2"
        ref={remoteVideoRef}
        autoPlay
        playsInline
      ></video>
    </div>
  );
}

export default PeerChat;
