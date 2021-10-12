import React from "react";
import styled from "styled-components";
import { DropdownSingle } from "../../../components/FormsComponents/Dropdown/DropdownSingle";
import { IconStyle } from "../../../shared/Common/Icon";

export default function RTCSettings() {
  const [activeTab, setActiveTab] = React.useState<string>("audio");

  //   const startMedia = () => {
  //     navigator.getUserMedia(
  //       {
  //         video: true,
  //         audio: true,
  //       },
  //       (stream: any) => {
  //         let media = document.getElementsByClassName("media_feed")[0];
  //         if (media) {
  //           media.srcObject = stream;
  //         }
  //       },
  //       (err: any) => console.log(err)
  //     );
  //   };

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

  return (
    <SettingContainer>
      <SettingMenu>
        <p
          style={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "24px",
            margin: 0,
            marginBottom: "10px",
            padding: "30px 0px 10px 30px",
          }}
        >
          Settings
        </p>
        <div>
          <Tab
            style={{
              backgroundColor: activeTab === "audio" && "#EDF0FE",
              borderLeft: activeTab === "audio" && "4px solid #284CEB",
            }}
            onClick={() => {
              setActiveTab("audio");
            }}
          >
            <IconStyle style={{ color: "black" }} className="mr1 self-center">
              headset
            </IconStyle>
            <span className="m0" style={{ fontSize: "14px" }}>
              Audio
            </span>
          </Tab>
          <Tab
            style={{
              backgroundColor: activeTab === "video" && "#EDF0FE",
              borderLeft: activeTab === "video" && "4px solid #284CEB",
            }}
            onClick={() => {
              setActiveTab("video");
            }}
          >
            <IconStyle style={{ color: "black" }} className="mr1 self-center">
              videocam
            </IconStyle>
            <span className="m0" style={{ fontSize: "14px" }}>
              Video
            </span>
          </Tab>
        </div>
        <div
          style={{
            marginTop: "400px",
            fontSize: "14px",
            padding: "0px 15px 30px 15px",
            fontWeight: "500",
          }}
        >
          Quick guide for live streaming with Web RTC
        </div>
      </SettingMenu>
      {activeTab === "audio" ? (
        <AudioController>
          <div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                margin: 0,
                textAlign: "right",
              }}
            >
              <IconStyle style={{ color: "black" }} className="mr1 self-center">
                close
              </IconStyle>
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <DropdownSingle
                id="Microphone"
                list={[
                  { title: "Default", data: "default" },
                  { title: "Front Panel", data: "front_panel" },
                ]}
                dropdownTitle={"Microphone"}
              />
              <Button>Test Mic</Button>
              <IconStyle style={{ color: "black" }} className="mr1 mt2 mb3">
                mic
              </IconStyle>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DropdownSingle
                id="Speaker"
                list={[
                  { title: "Default", data: "default" },
                  { title: "Front Panel", data: "front_panel" },
                ]}
                dropdownTitle={"Speaker"}
              />
              <Button>Test Speakers</Button>
              <IconStyle style={{ color: "black" }} className="mr1 mt2 mb3">
                volume_up
              </IconStyle>
            </div>
          </div>
        </AudioController>
      ) : (
        <VideoController>
          <div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                margin: 0,
                textAlign: "right",
              }}
            >
              <IconStyle style={{ color: "black" }} className="mr1 self-center">
                close
              </IconStyle>
            </p>
            <video
              autoPlay
              className="media_feed"
              style={{
                margin: "30px",
                width: "-webkit-fill-available",
                borderRadius: "8px",
              }}
            ></video>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "16px", fontWeight: "500" }}>Camera</p>
              <Select>
                <option>Face Time Built In HD</option>
                <option>Default</option>
              </Select>
            </div>
          </div>
        </VideoController>
      )}
    </SettingContainer>
  );
}

export const SettingContainer = styled.div<{}>`
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  margin: auto;
  margin-top: 100px;
  width: 680px;
  width: fit-content;
`;

export const SettingMenu = styled.div<{}>`
  border-right: 1px solid #c8d1e0;
  width: 188px;
  //   padding: 20px;
`;

export const AudioController = styled.div<{}>`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 392px;
`;

export const Button = styled.button<{}>`
  color: #4967ee;
  font-weight: 500;
  border: 1px solid #4967ee;
  padding: 8px;
  background-color: #fff;
  width: fit-content;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 20px;
`;

export const Select = styled.select<{}>`
  border: 1px solid #c8d1e0;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  width: fit-content;
`;

export const Tab = styled.p<{}>`
  display: flex;
  place-items: center;
  margin: 0;
  padding: 15px;
  cursor: pointer;
`;

export const VideoController = styled.div<{}>`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 392px;
`;
