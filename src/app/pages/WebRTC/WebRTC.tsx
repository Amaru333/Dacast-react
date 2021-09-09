import React from "react";
import styled from "styled-components";
import Logo from "../../../../public/assets/logo_white.png";
import { IconStyle } from "../../../shared/Common/Icon";
import { Text } from "../../../components/Typography/Text";

export default function WebRTCPage() {
  const [playing, setPlaying] = React.useState<boolean>(false);

  const startMedia = () => {
    setPlaying(true);
    navigator.getUserMedia(
      {
        video: true,
        audio: true,
      },
      (stream: any) => {
        let media = document.getElementsByClassName("media_feed")[0];
        if (media) {
          media.srcObject = stream;
        }
      },
      (err: any) => console.log(err)
    );
  };

  const stopMedia = () => {
    setPlaying(false);
    let media = document.getElementsByClassName("media_feed")[0];
    media.srcObject.getTracks()[0].stop();
    media.srcObject = null;
  };

  return (
    <RTCContainer>
      <MenuBar>
        <LogoContainer>
          <img src={Logo} />
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
      {playing === true ? (
        <video
          autoPlay
          className="media_feed"
          style={{ padding: "5vh", height: "70vh" }}
        ></video>
      ) : (
        <InactiveContainer>
          <p>Not playing</p>
        </InactiveContainer>
      )}
      <div className="app_input">
        {playing ? (
          <button onClick={stopMedia}>Stop</button>
        ) : (
          <button onClick={startMedia}>Start</button>
        )}
      </div>
    </RTCContainer>
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
`;

export const MenuBar = styled.div<{}>`
  background-color: #2b2b2b;
  border-right: 1px solid #58606e;
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
