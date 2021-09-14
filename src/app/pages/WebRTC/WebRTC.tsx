import React from "react";
import styled from "styled-components";
import Logo from "../../../../public/assets/logo_white.png";
import { IconStyle } from "../../../shared/Common/Icon";
import { Text } from "../../../components/Typography/Text";
import RTCSettings from "./RTCSettings";
import Controls from "./Controls";
import Participants from "./Participants";
import RecordStream from "./PopUps/RecordStream";
import ShareScreenPermission from "./PopUps/ShareScreenPermission";
import LeftStream from "./PopUps/LeftStream";
import StreamEnded from "./PopUps/StreamEnded";
import ThumbnailPopUp from "./PopUps/ThumbnailPopUp";

export default function WebRTCPage() {
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [playingAudio, setPlayingAudio] = React.useState<boolean>(false);
  const [userAudio, setUserAudio] = React.useState<boolean>(true);
  const [userVideo, setVideo] = React.useState<boolean>(true);

  const [toggleParticipants, setToggleParticipants] = React.useState<boolean>(
    false
  );
  // const startMedia = () => {
  //   setPlaying(true);
  //   navigator.getUserMedia(
  //     {
  //       video: true,
  //       // audio: true,
  //     },
  //     (stream: any) => {
  //       let media = document.getElementsByClassName("media_feed")[0];
  //       if (media) {
  //         media.srcObject = stream;
  //       }
  //     },
  //     (err: any) => console.log(err)
  //   );
  // };

  // const startMediaAudio = () => {
  //   setPlayingAudio(true);
  //   navigator.getUserMedia(
  //     {
  //       // video: true,
  //       audio: true,
  //     },
  //     (stream: any) => {
  //       let media = document.getElementsByClassName("media_feed")[0];
  //       if (media) {
  //         media.srcObject = stream;
  //       }
  //     },
  //     (err: any) => console.log(err)
  //   );
  // };

  // const toggleAudio = () => {
  //   navigator.getUserMedia({
  //     audio: !userAudio,
  //   });
  // };

  // const toggleVideo = () => {
  //   navigator.getUserMedia({
  //     audio: !userVideo,
  //   });
  // };

  // const stopMedia = () => {
  //   setPlaying(false);
  //   let media = document.getElementsByClassName("media_feed")[0];
  //   media.srcObject.getTracks()[0].stop();
  //   media.srcObject = null;
  // };

  const memberList = ["test", "abc", "xyz"];

  const handleParticipants = () => {
    setToggleParticipants(!toggleParticipants);
  };

  return (
    <div>
      <RTCContainer>
        <MenuBar>
          <LogoContainer>
            <a href="/">
              <img src={Logo} />
            </a>
          </LogoContainer>
          <div className="flex-col">
            <MenuOptions>
              <IconStyle style={{ color: "white" }} className="mr1 self-center">
                videocam
              </IconStyle>
              <Text
                style={{ color: "white" }}
                size={14}
                weight="reg"
                className="mt0 inline-block"
              >
                Stream
              </Text>
            </MenuOptions>
            <MenuOptions>
              <IconStyle style={{ color: "white" }} className="mr1 self-center">
                radio_button_checked
              </IconStyle>
              <Text
                style={{ color: "white" }}
                size={14}
                weight="reg"
                className="mt0 inline-block"
              >
                Recording
              </Text>
            </MenuOptions>
          </div>
        </MenuBar>

        <VideoContainer>
          <Navigation>
            <p style={{ marginLeft: "10px" }}>New live stream</p>
            <div>
              <IconStyle
                style={{ color: "white", marginTop: "7px" }}
                className="mr1 self-center"
              >
                exit_to_app
              </IconStyle>
            </div>
          </Navigation>
          <Timer>
            <p
              style={{
                color: "#fff",
                border: "1px solid #fff",
                alignSelf: "center",
                padding: "3px",
              }}
            >
              <span style={{ color: "#D14642" }}>•</span>&nbsp;&nbsp;LIVE
            </p>
            <p style={{ color: "#fff", alignSelf: "center" }}>00:00:00</p>
            <p style={{ color: "#fff", alignSelf: "center" }}>
              <IconStyle
                style={{ color: "white", margin: "0" }}
                className="mr1 self-center"
              >
                people
              </IconStyle>
            </p>
          </Timer>
          {playing === true ? (
            <video
              autoPlay
              className="media_feed"
              style={{ padding: "5vh", height: "70vh" }}
            ></video>
          ) : (
            <InactiveContainer>
              <IconStyle style={{ color: "white", fontSize: "80px" }}>
                videocam_off
              </IconStyle>
              <p style={{ fontSize: "24px" }}>
                Enable camera and microphone to start recording
              </p>
            </InactiveContainer>
          )}
          <div className="app_input">
            {/* {playing ? (
              <button onClick={stopMedia}>Stop</button>
            ) : (
              <button onClick={startMedia}>Start</button>
            )}
            {playingAudio ? (
              <button onClick={stopMedia}>Stop Audio</button>
            ) : (
              <button onClick={startMediaAudio}>Start Audio</button>
            )} */}
            <Controls />
          </div>
        </VideoContainer>

        {toggleParticipants && <Participants members={memberList} />}
      </RTCContainer>
      {/* <button onClick={handleParticipants}>Participants</button> */}
      {/* <RTCSettings />
      <RecordStream />
      <ShareScreenPermission />
      <LeftStream />
      <StreamEnded />
      <ThumbnailPopUp /> */}
    </div>
  );
}

export const RTCContainer = styled.div<{}>`
  display: flex;
  background-color: #1b1c1e;
`;

export const InactiveContainer = styled.div<{}>`
  display: flex;
  height: 75vh;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Timer = styled.div<{}>`
  display: flex;
  width: 15%;
  justify-content: space-around;
`;

export const MenuBar = styled.div<{}>`
  background-color: #2b2b2b;
  border-right: 1px solid #58606e;
`;

export const Navigation = styled.div<{}>`
  color: #fff;
  display: flex;
  background-color: #2b2b2b;
  width: 100%;
  height: 40px;
  text-align: right;
  align-items: center;
  padding: 10px 0px 10px 0px;
  justify-content: space-between;
  border-bottom: 1px solid #58606e;
`;

export const MenuOptions = styled.div<{}>`
  display: flex;
  padding: 10px 0px 10px 20px;
`;

export const LogoContainer = styled.div<{}>`
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #58606e;
  margin-bottom: 10px;
`;

export const VideoContainer = styled.div<{}>`
  width: -webkit-fill-available;
`;
