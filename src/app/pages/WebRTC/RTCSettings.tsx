import React from "react";
import styled from "styled-components";
import { DropdownSingle } from "../../../components/FormsComponents/Dropdown/DropdownSingle";
import { DropdownSingleListItem } from "../../../components/FormsComponents/Dropdown/DropdownTypes";
import { IconStyle } from "../../../shared/Common/Icon";
import SoundMeter from '../../../utils/webrtc/soundmeter';

let navigator: any = window.navigator;
let AudioContext = window.AudioContext || window.webkitAudioContext;

let videoStream: any;
let audioStream: any;
let soundMeter: any;
let meterRefresh: any;

export default function RTCSettings(props) {
  const [activeTab, setActiveTab] = React.useState<string>("audio");
  const [recording, setRecording] = React.useState<boolean>(false);
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [micIntensity, setMicIntensity] = React.useState(0);
  const [speakerIntensity, setSpeakerIntensity] = React.useState(0);

  let [cameraDevicesList, setCameraList] = React.useState([]);
  let [micDevicesList, setMicList] = React.useState([]);
  let [defaultCamera, setDefaultCamera] = React.useState("");
  let [defaultMic, setDefaultMic] = React.useState("");

  const [testMic, setTestMic] = React.useState<boolean>(false);

  if (!cameraDevicesList.length && !micDevicesList.length) {
    navigator.mediaDevices.enumerateDevices().then(function (devices: any) {
      devices.forEach((device: any, i: any) => {
        if (device.kind === "videoinput") {
          cameraDevicesList.push({
            data: device.deviceId,
            title: device.label || "Camera " + (i + 1),
          });
        } else if (device.kind === "audioinput") {
          micDevicesList.push({
            data: device.deviceId,
            title: device.label || "Mic " + (i + 1),
          });
        }
      });
      if (localStorage.getItem("activeCameraId")) {
        var selectedCamera = cameraDevicesList.find(
          (device) => device.data === localStorage.getItem("activeCameraId")
        );
        setDefaultCamera(selectedCamera ? selectedCamera.title : (cameraDevicesList.length ? cameraDevicesList[0].title : ""));
      } else {
        setDefaultCamera(cameraDevicesList.length ? cameraDevicesList[0].title : "");
      }
      if (localStorage.getItem("activeMicId")) {
        var selectedCamera = micDevicesList.find(
          (device) => device.data === localStorage.getItem("activeMicId")
        );
        setDefaultMic(selectedCamera ? selectedCamera.title : (cameraDevicesList.length ? cameraDevicesList[0].title : ""));
      } else {
        setDefaultMic(micDevicesList.length ? micDevicesList[0].title : "");
      }

      setCameraList(cameraDevicesList);
      setMicList(micDevicesList);
    });
  }

  const startTestCamera = () => {
    navigator.getUserMedia({
      audio: false,
      video: localStorage.getItem("activeCameraId") ? { deviceId: localStorage.getItem("activeCameraId") } : true,
    }, (stream: any) => {
      let media: any = document.getElementById("testVideo");
      if (media) {
        media.srcObject = videoStream = stream;
        media.muted = true;
      }
    }, (err: any) => console.log(err)
    );
  }
  React.useEffect(() => {
    if (activeTab === "video") {
      startTestCamera();
    } else if (videoStream) {
      videoStream.getTracks().forEach((track: any) => track.stop());
      videoStream = null;
    }
  }, [activeTab]);

  React.useEffect(() => {
    if (testMic) {
      navigator.getUserMedia({
        video: false,
        audio: localStorage.getItem("activeMicId") ? { deviceId: localStorage.getItem("activeMicId") } : true,
      }, (stream: any) => {
        let media: any = document.getElementById("testMic");
        if (media) {
          media.srcObject = audioStream = stream;
          media.muted = true;

          soundMeter = new SoundMeter(new AudioContext());
          soundMeter.connectToSource(stream, function (e) {
            if (e) return;
            meterRefresh = setInterval(() => {
              if (Math.ceil(soundMeter.instant * 100) < 15) {
                setMicIntensity(Math.ceil(soundMeter.instant * 100));
              } else {
                setMicIntensity(15);
              }
            }, 200);
          });
        }
      }, (err: any) => console.log(err)
      );
    } else if (audioStream) {
      audioStream.getTracks().forEach((track: any) => track.stop());
      soundMeter.stop();
      clearInterval(meterRefresh);
      setMicIntensity(0);
      audioStream = null;
    }
  }, [testMic]);

  const setSelectedMic = (deviceId: any) => {
    localStorage.setItem("activeMicId", deviceId);
  }
  const setSelectedCamera = (deviceId: any) => {
    localStorage.setItem("activeCameraId", deviceId);
    startTestCamera();
  }
  const closeSettings = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track: any) => track.stop());
      audioStream = null;
    }
    if (videoStream) {
      videoStream.getTracks().forEach((track: any) => track.stop());
      videoStream = null;
    }

    // storing default devices as first devices in dropdown if not selected exclusively and closing the modal
    if (!localStorage.getItem("activeCameraId") && cameraDevicesList.length) {
      localStorage.setItem("activeCameraId", cameraDevicesList[0].data);
    }
    if (!localStorage.getItem("activeMicId") && micDevicesList.length) {
      localStorage.setItem("activeMicId", micDevicesList[0].data);
    }
    props.onClose();
  }
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
            marginTop: "80%",
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
              <IconStyle
                style={{ color: "black", cursor: "pointer" }}
                className="mr1 self-center"
                onClick={() => { closeSettings() }}
              >
                close
              </IconStyle>
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <DropdownSingle
                id="Microphone"
                list={micDevicesList}
                dropdownTitle={"Microphone"}
                dropdownDefaultSelect={defaultMic}
                callback={(item: DropdownSingleListItem) => {
                  setSelectedMic(item.data);
                }}
              />
              {recording === false && playing === false ? (
                <Button
                  onClick={() => {
                    setTestMic(!testMic);
                    setRecording(true);
                  }}
                >
                  Test Mic
                </Button>
              ) : (
                <div style={{ display: "flex" }}>
                  <Button
                    onClick={() => {
                      setTestMic(!testMic);
                      setRecording(false);
                    }}
                    style={{ background: "#B6C2F8" }}
                  >
                    Recording
                  </Button>
                  <p
                    style={{
                      color: "#284CEB",
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: "500",
                      margin: "30px 0px 0px 10px",
                    }}
                  >
                    Speak into your microphone
                  </p>
                </div>
              )}
              {testMic && (
                <video
                  autoPlay
                  style={{ visibility: "hidden", height: "0px", width: "0px" }}
                  id="testMic"
                ></video>
              )}
              <div style={{ display: "flex" }}>
                <IconStyle style={{ color: "black" }} className="mr1 mt2 mb3">
                  mic
                </IconStyle>
                {[...Array(micIntensity)].map((e, i) => (
                  <GreenBar key={i} />
                ))}
                {[...Array(15 - micIntensity)].map((e, i) => (
                  <GrayBar key={i} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DropdownSingle
                id="Speaker"
                list={[]}
                dropdownTitle={"Speaker"}
              />
              <Button>Test Speakers</Button>
              <div style={{ display: "flex" }}>
                <IconStyle style={{ color: "black" }} className="mr1 mt2 mb3">
                  volume
                </IconStyle>
                {[...Array(speakerIntensity)].map((e, i) => (
                  <GreenBar key={i} />
                ))}
                {[...Array(15 - speakerIntensity)].map((e, i) => (
                  <GrayBar key={i} />
                ))}
              </div>
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
              <IconStyle
                style={{ color: "black", cursor: "pointer" }}
                className="mr1 self-center"
                onClick={() => { closeSettings() }}
              >
                close
              </IconStyle>
            </p>
            <video
              autoPlay
              id="testVideo"
              style={{
                margin: "30px",
                width: "-webkit-fill-available",
                borderRadius: "8px",
              }}
            ></video>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DropdownSingle
                id="Camera"
                list={cameraDevicesList}
                dropdownTitle={"Camera"}
                dropdownDefaultSelect={defaultCamera}
                callback={(item: DropdownSingleListItem) => {
                  setSelectedCamera(item.data);
                }}
              />
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

export const GreenBar = styled.div<{}>`
  width: 10px;
  height: 24px;
  radius: 2px;
  background-color: #1e874b;
  border-radius: 2px;
  margin-right: 7px;
  align-self: center;
  margin-bottom: 20px;
`;

export const GrayBar = styled.div<{}>`
  width: 10px;
  height: 24px;
  radius: 2px;
  background-color: #dde3ed;
  border-radius: 2px;
  margin-right: 7px;
  align-self: center;
  margin-bottom: 20px;
`;
