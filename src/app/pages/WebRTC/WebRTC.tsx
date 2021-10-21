import React from "react";
import styled from "styled-components";
import Logo from "../../../../public/assets/logo_white.png";
import { IconStyle } from "../../../shared/Common/Icon";
import { Text } from "../../../components/Typography/Text";
import RTCSettings from "./RTCSettings";
import ParticipantBlock from "./ParticipantBlock";
import { Modal } from "@material-ui/core";
import WebRTCAdaptor from '../../../utils/webrtc/adaptor';
import { useHistory } from "react-router-dom";
import { useNetwork } from "../../utils/custom-hooks/networkNavigatorHook";
import { Toast } from "../../../components/Toast/Toast";
import { ToastContainer } from "../../../components/Toast/ToastStyle";
import { getUrlParam } from "../../../utils/utils";
import { dacastSdk } from "../../utils/services/axios/axiosClient";

let navigator: any = window.navigator;
let previewStream: any;
let webRTCAdaptor: any;
let autoRepublishIntervalJob: any;
let autoRepublishEnabled: any;
let sessionTimer: any;

export default function WebRTCPage() {

  const contentId = getUrlParam('contentId')
  let isOnline = useNetwork();
  const history = useHistory();
  const [playing, setPlaying] = React.useState<boolean>(false);

  const [permissionDenied, setPermissionDenied] = React.useState<boolean>(false);
  const [toggleMic, setToggleMic] = React.useState<boolean>(true);
  const [toggleCam, setToggleCam] = React.useState<boolean>(true);
  const [toggleScreen, setToggleScreen] = React.useState<boolean>(false);
  const [startSession, setStartSession] = React.useState<boolean>(false);
  const [webRtcSettings, setWebRtcSetting] = React.useState<any>({});
  const [sessionTime, setSessionTime] = React.useState<any>("00:00:00");
  const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false);
  const handleSettingsOpen = () => {
    setSettingsOpen(false);
    setPlaying(true);
  };

  const [recordLiveStreamPopUp, setRecordLiveStreamPopUp] = React.useState<boolean>(false);
  const closeRecordLiveStreamPopUp = () => {
    setRecordLiveStreamPopUp(false);
  };

  const [leaveStreamPopUp, setLeaveStreamPopUp] = React.useState<boolean>(false);
  const closeLeaveStreamPopUp = () => {
    setLeaveStreamPopUp(false);
  };

  const [screenSharePermissionPopUp, setScreenSharePermissionPopUp] = React.useState<boolean>(false);
  const closeScreenSharePermissionPopUp = () => {
    // setScreenSharePermissionPopUp(false);
  };


  const [toggleParticipants, setToggleParticipants] = React.useState<boolean>(false);

  const memberList: any = [];

  const handleParticipants = () => {
    setToggleParticipants(!toggleParticipants);
  };

  React.useEffect(() => {
    const fetch = async () => {
      let result = await dacastSdk.getWebRtcSettings(contentId);
      result.duration = 0;
      setWebRtcSetting(result)
      console.log("WebRTC settings :: ", result)
    }
    fetch()
  }, [])

  React.useEffect(() => {
    if (webRTCAdaptor) {
      if (toggleCam) {
        webRTCAdaptor.turnOnLocalCamera();
      } else {
        webRTCAdaptor.turnOffLocalCamera();
      }
    }
  }, [toggleCam]);

  React.useEffect(() => {
    if (webRTCAdaptor) {
      if (toggleMic) {
        webRTCAdaptor.unmuteLocalMic();
      } else {
        webRTCAdaptor.muteLocalMic();
      }
    }
  }, [toggleMic]);

  React.useEffect(() => {
    if (webRTCAdaptor) {
      if (toggleScreen) {
        webRTCAdaptor.switchDesktopCapture(webRtcSettings.streamId);
      } else {
        webRTCAdaptor.switchVideoCameraCapture(webRtcSettings.streamId);
        setToggleCam(true);
      }
    }
  }, [toggleScreen]);

  React.useEffect(() => {
    if (isOnline) {
      checkForCameraMic();
    }
  }, [isOnline]);

  React.useEffect(() => {
    if (playing) {
      startPreview();
    }
  }, [playing]);

  const checkForCameraMic = () => {
    if (localStorage.getItem("activeCameraId") && localStorage.getItem("activeMicId")) {
      setPlaying(true);
    } else {
      navigator.getUserMedia({
        audio: true,
        video: true,
      }, (stream: any) => {
        stream.getTracks().forEach((track: any) => track.stop());
        setSettingsOpen(true);
      }, (err: any) => {
        setPermissionDenied(true);
      });
    }
  }
  const startPreview = () => {
    navigator.getUserMedia({
      audio: false,
      video: localStorage.getItem("activeCameraId") ? { deviceId: localStorage.getItem("activeCameraId") } : true,
    }, (stream: any) => {
      let media: any = document.getElementById("localVideo");
      if (media) {
        media.srcObject = previewStream = stream;
        media.muted = true;
      }
    }, (err: any) => console.log(err)
    );
  }
  const timeToString = (seconds: any) => {
    var hours: any = Math.floor(seconds / 3600);
    var minutes: any = Math.floor((seconds - hours * 3600) / 60);
    var seconds: any = seconds - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  };
  const checkAndRepublishIfRequired = () => {
    var iceState = webRTCAdaptor.iceConnectionState(webRtcSettings.streamId);
    console.log("Ice state checked = " + iceState);

    if (iceState == null || iceState == "failed" || iceState == "disconnected") {
      webRTCAdaptor.stop(webRtcSettings.streamId);
      webRTCAdaptor.closePeerConnection(webRtcSettings.streamId);
      webRTCAdaptor.closeWebSocket();
      initStreaming();
    }
  }
  const initStreaming = () => {
    if (previewStream) {
      previewStream.getTracks().forEach((track: any) => track.stop());
      previewStream = null;
    }
    var pc_config = {
      iceServers: [{
        'urls': 'stun:stun1.l.google.com:19302'
      },],
    };

    var sdpConstraints = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false,
    };

    var mediaConstraints: any = {
      video: {
        width: 1920,
        height: 1080,
      },
      audio: true,
    };
    if (localStorage.getItem("activeCameraId")) {
      mediaConstraints.video.deviceId = localStorage.getItem("activeCameraId");
    }
    if (localStorage.getItem("activeMicId")) {
      mediaConstraints.audio = { deviceId: localStorage.getItem("activeMicId") };
    }
    webRTCAdaptor = new WebRTCAdaptor({
      websocket_url: webRtcSettings.socketUrl,
      mediaConstraints: mediaConstraints,
      peerconnection_config: pc_config,
      sdp_constraints: sdpConstraints,
      localVideoId: "localVideo",
      debug: false,
      bandwidth: webRtcSettings.bitrate,
      dataChannelEnabled: false,
      callback: (info: any, obj: any) => {
        console.log("WebRTCAdaptor :: info : ", info);
        if (info == "initialized") {
          webRTCAdaptor.publish(webRtcSettings.streamId, null);
        } else if (info == "publish_started") {
          if (autoRepublishEnabled && autoRepublishIntervalJob == null) {
            autoRepublishIntervalJob = setInterval(() => {
              checkAndRepublishIfRequired();
            }, 3000);
          }
          if (!sessionTimer) {
            sessionTimer = setInterval(() => {
              webRtcSettings.duration++;
              setSessionTime(timeToString(webRtcSettings.duration));
            }, 1000);
          }
        } else if (info == "publish_finished") {
        } else if (info == "browser_screen_share_supported") {
        } else if (info == "screen_share_stopped") {
          setToggleScreen(false);
          setToggleCam(true);
        } else if (info == "refreshConnection") {
          checkAndRepublishIfRequired();
        }
      },
      callbackError: function (error: any, message: any) {
        console.log("WebRTCAdaptor :: error : ", error, message);
      }
    });
  }
  const stopStreaming = () => {
    if (webRTCAdaptor) {
      if (autoRepublishIntervalJob != null) {
        clearInterval(autoRepublishIntervalJob);
        autoRepublishIntervalJob = null;
      }
      webRTCAdaptor.stop(webRtcSettings.streamId);
      startPreview();
      setStartSession(false);
      setLeaveStreamPopUp(false);
      if (sessionTimer) {
        clearInterval(sessionTimer);
        webRtcSettings.duration = 0;
        setSessionTime("00:00:00");
        sessionTimer = null;
      }
    }
  }
  const shareLink = () => {
    window.open(webRtcSettings.shareLink, "_blank")
  }

  return (
    <div style={{ height: "100vh", padding: "0", margin: "0" }}>
      <RTCContainer>
        <MenuBar>
          <LogoContainer>
            <a href="/">
              <img src={Logo} />
            </a>
          </LogoContainer>
          <div className="flex-col">
            <MenuOptionContainer onClick={() => setRecordLiveStreamPopUp(true)}>
              <MenuOptions>
                <IconStyle
                  style={{ color: "white" }}
                  className="mr1 self-center"
                >
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
            </MenuOptionContainer>
            <MenuOptionContainer>
              <MenuOptions>
                <IconStyle
                  style={{ color: "white" }}
                  className="mr1 self-center"
                >
                  record
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
            </MenuOptionContainer>
          </div>
        </MenuBar>

        <VideoContainer>
          <Navigation>
            <p style={{ marginLeft: "10px" }}>{webRtcSettings.title}</p>
            <div>
              <IconStyle
                style={{ color: "white", marginTop: "7px", cursor: "pointer" }}
                className="mr1 self-center"
                onClick={() => {
                  history.push("/");
                }}
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
            <p style={{ color: "#fff", alignSelf: "center" }}>{sessionTime}</p>
            {/* <p style={{ color: "#fff", alignSelf: "center" }}>
              <IconStyle
                style={{ color: "white", margin: "0" }}
                className="mr1 self-center"
              >
                people
              </IconStyle>
            </p> */}
          </Timer>
          {playing === true ? (
            <div style={{ textAlign: "center" }}>
              <video
                autoPlay
                muted
                id="localVideo"
                className="media_feed"
                style={{ height: "calc(100vh - 190px)" }}
              ></video>
            </div>
          ) : (
            <InactiveContainer>
              <IconStyle style={{ color: "white", fontSize: "80px" }}>
                videocam_off
              </IconStyle>
              <p style={{ fontSize: "24px" }}>
                Enable camera and microphone to start streaming
              </p>
              {permissionDenied && <p style={{ fontSize: "24px" }}>
                Please go to your computer settings to enable
              </p>}
            </InactiveContainer>
          )}
          <div className="app_input">
            <ControlsContainer>
              <SettingGroup>
                <IconContainer
                  onClick={() => { shareLink() }}
                >
                  <IconStyle
                    style={{ color: "white", margin: "0px 0px 8px 0px" }}
                    className="mr1 self-center"
                  >
                    file_copy_outlined
                  </IconStyle>
                  <span style={{ fontSize: "12px" }}>Share Link</span>
                </IconContainer>
                {/* <div onClick={handleParticipants}>
                  <IconContainer>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 8px 0px" }}
                      className="mr1 self-center"
                    >
                      people
                    </IconStyle>

                    <span style={{ fontSize: "12px" }}>Participants</span>
                  </IconContainer>
                </div> */}
              </SettingGroup>
              <SettingGroup>
                {toggleMic === true ? (
                  <ToggleButtons onClick={() => { setToggleMic(!toggleMic) }}>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 0px 0px" }}
                      className="mr1 self-center"
                    >
                      mic
                    </IconStyle>
                  </ToggleButtons>
                ) : (
                  <OffButtons onClick={() => { setToggleMic(!toggleMic) }}>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 0px 0px" }}
                      className="mr1 self-center"
                    >
                      mic_off
                    </IconStyle>
                  </OffButtons>
                )}
                {toggleCam === true ? (
                  <ToggleButtons onClick={() => { setToggleCam(!toggleCam) }}>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 0px 0px" }}
                      className="mr1 self-center"
                    >
                      videocam
                    </IconStyle>
                  </ToggleButtons>
                ) : (
                  <OffButtons onClick={() => { setToggleCam(!toggleCam) }}>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 0px 0px" }}
                      className="mr1 self-center"
                    >
                      videocam_off
                    </IconStyle>
                  </OffButtons>
                )}
                <ButtonContainer
                  style={{ padding: "0px", alignSelf: "center" }}
                >
                  {startSession === true ? (
                    <Button
                      onClick={() => {
                        setLeaveStreamPopUp(true);
                      }}
                    >
                      Leave
                    </Button>
                  ) : (
                    <Button
                      style={{ background: "#4967EE" }}
                      onClick={() => {
                        setStartSession(true);
                        initStreaming();
                      }}
                    >
                      Start
                    </Button>
                  )}
                </ButtonContainer>
              </SettingGroup>
              <SettingGroup>
                <div onClick={() => setToggleScreen(!toggleScreen)}>
                  <IconContainer>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 8px 0px" }}
                      className="mr1 self-center"
                    >
                      present_to_all
                    </IconStyle>
                    <span style={{ fontSize: "12px" }}>Share Screen</span>
                  </IconContainer>
                </div>
                <div
                  onClick={() => {
                    setSettingsOpen(true);
                  }}
                >
                  <IconContainer>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 8px 0px" }}
                      className="mr1 self-center"
                    >
                      settings
                    </IconStyle>
                    <span style={{ fontSize: "12px" }}>Settings</span>
                  </IconContainer>
                </div>
              </SettingGroup>
            </ControlsContainer>
          </div>
        </VideoContainer>

        {toggleParticipants && (
          <>
            <ParticipantsContainer>
              <span style={{ padding: "20px 0 10px 10px" }}>
                Manage participants
              </span>
              {memberList.map((member) => (
                <ParticipantBlock name={member} />
              ))}
            </ParticipantsContainer>
          </>
        )}
      </RTCContainer>
      <Modal open={settingsOpen}>
        <RTCSettings onClose={handleSettingsOpen} />
      </Modal>
      <Modal open={recordLiveStreamPopUp} onClose={closeRecordLiveStreamPopUp}>
        <PopupContainer>
          <p style={{ fontSize: "24px", margin: "50px 0px 0px 0px" }}>
            Record Live Stream?
          </p>
          <p style={{ fontSize: "14px", margin: "10px 0px 40px 0px" }}>
            You can edit your recording in your Video tab later
          </p>
          <div>
            <PrimaryButton>Yes</PrimaryButton>
            <SecondaryButton onClick={() => setRecordLiveStreamPopUp(false)}>
              No
            </SecondaryButton>
          </div>
        </PopupContainer>
      </Modal>
      <Modal open={leaveStreamPopUp}>
        <PopupContainer style={{ height: "152px" }}>
          <p style={{ fontSize: "24px", margin: "20px 0px 40px 0px" }}>
            You left the stream
          </p>
          <div>
            <PrimaryButton
              onClick={() => {
                stopStreaming();
              }}
            >
              Close
            </PrimaryButton>
            <SecondaryButton onClick={closeLeaveStreamPopUp}>
              Rejoin Stream
            </SecondaryButton>
          </div>
        </PopupContainer>
      </Modal>
      <Modal open={screenSharePermissionPopUp}>
        <PopupContainer>
          <p style={{ fontSize: "24px", margin: "50px 0px 0px 0px" }}>
            Allow app.dacast.com to
          </p>
          <p
            style={{
              fontSize: "14px",
              margin: "20px 0px 40px 0px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconStyle
              style={{ color: "black", margin: "0px 0px 0px 0px" }}
              className="mr1 self-center"
            >
              present_to_all
            </IconStyle>{" "}
            &nbsp; share my screen
          </p>
          <div>
            <PrimaryButton>Allow</PrimaryButton>
            <SecondaryButton onClick={closeScreenSharePermissionPopUp}>
              Deny
            </SecondaryButton>
          </div>
        </PopupContainer>
      </Modal>
      {!isOnline && (
        <ToastContainer>
          <Toast
            toast={{
              text: "No Internet Connection",
              timestamp: 1592399420,
              size: "flexible",
              notificationType: "error",
            }}
          />
        </ToastContainer>
      )}
      {/* <StreamEnded />
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

export const ControlsContainer = styled.div<{}>`
  display: flex;
  color: #fff;
  background-color: #2b2b2b;
  justify-content: space-between;
  border-top: 1px solid #58606e;
`;

export const SettingGroup = styled.div<{}>`
  display: flex;
  padding: 5px 15px 5px 15px;
`;

export const IconContainer = styled.div<{}>`
  display: flex;
  flex-direction: column;
  padding: 5px 15px 5px 15px;
  cursor: pointer;

  &:hover {
    background-color: #1b1c1e;
  }
`;

export const ToggleButtons = styled.div<{}>`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.2);
  height: 40px;
  width: 40px;
  margin: 0px;
  align-self: center;
  justify-content: center;
  border-radius: 20px;
  margin-right: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export const ButtonContainer = styled.div<{}>`
  display: flex;
  flex-direction: column;
  padding: 5px 15px 5px 15px;
  cursor: pointer;
`;

export const Button = styled.button<{}>`
  background: #d14642;
  height: 40px;
  width: 116px;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: #e3908e;
  }
`;

export const OffButtons = styled.div<{}>`
  display: flex;
  flex-direction: column;
  background-color: #d14642;
  height: 40px;
  width: 40px;
  margin: 0px;
  align-self: center;
  justify-content: center;
  border-radius: 20px;
  margin-right: 15px;
  cursor: pointer;

  &:hover {
    background-color: #e3908e;
  }
`;

export const ParticipantsContainer = styled.div<{}>`
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: #2b2b2b;
  width: 320px;
`;

export const MenuOptionContainer = styled.div<{}>`
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

export const PopupContainer = styled.div<{}>`
  width: 400px;
  height: 228px;
  background-color: #fff;
  color: "black";
  border-radius: 4px;
  padding: 10px 40px 10px 40px;
  font-weight: 500px;
  margin: auto;
  margin-top: 100px;
`;

export const PrimaryButton = styled.button<{}>`
  background-color: #4967ee;
  padding: 10px;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 80px;
  cursor: pointer;
`;

export const SecondaryButton = styled.button<{}>`
  background-color: #fff;
  padding: 10px;
  color: #4967ee;
  border: none;
  border-radius: 4px;
  width: 130px;
  cursor: pointer;
`;
