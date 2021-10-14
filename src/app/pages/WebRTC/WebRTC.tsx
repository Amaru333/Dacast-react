import React from "react";
import styled from "styled-components";
import Logo from "../../../../public/assets/logo_white.png";
import { IconStyle } from "../../../shared/Common/Icon";
import { Text } from "../../../components/Typography/Text";
import RTCSettings from "./RTCSettings";
import ParticipantBlock from "./ParticipantBlock";
import { Modal } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function WebRTCPage() {
  const history = useHistory();
  const [playing, setPlaying] = React.useState<boolean>(false);

  const [toggleMute, setToggleMute] = React.useState<boolean>(false);
  const [toggleCam, setToggleCam] = React.useState<boolean>(false);

  const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false);
  const handleSettingsOpen = () => {
    setSettingsOpen(false);
  };

  const [recordLiveStreamPopUp, setRecordLiveStreamPopUp] = React.useState<
    boolean
  >(false);
  const closeRecordLiveStreamPopUp = () => {
    setRecordLiveStreamPopUp(false);
  };

  const [leaveStreamPopUp, setLeaveStreamPopUp] = React.useState<boolean>(
    false
  );
  const closeLeaveStreamPopUp = () => {
    setLeaveStreamPopUp(false);
  };

  const [
    screenSharePermissionPopUp,
    setScreenSharePermissionPopUp,
  ] = React.useState<boolean>(false);
  const closeScreenSharePermissionPopUp = () => {
    setScreenSharePermissionPopUp(false);
  };

  const handleMute = () => {
    setToggleMute(!toggleMute);
  };

  const handleCam = () => {
    setToggleCam(!toggleCam);
  };

  const [toggleParticipants, setToggleParticipants] = React.useState<boolean>(
    false
  );

  const memberList = ["test", "abc", "xyz"];

  const handleParticipants = () => {
    setToggleParticipants(!toggleParticipants);
  };

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
            </MenuOptionContainer>
          </div>
        </MenuBar>

        <VideoContainer>
          <Navigation>
            <p style={{ marginLeft: "10px" }}>New live stream</p>
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
            <ControlsContainer>
              <SettingGroup>
                <IconContainer>
                  <IconStyle
                    style={{ color: "white", margin: "0px 0px 8px 0px" }}
                    className="mr1 self-center"
                  >
                    insert_link
                  </IconStyle>
                  <span style={{ fontSize: "12px" }}>Share Link</span>
                </IconContainer>
                <div onClick={handleParticipants}>
                  <IconContainer>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 8px 0px" }}
                      className="mr1 self-center"
                    >
                      people
                    </IconStyle>

                    <span style={{ fontSize: "12px" }}>Participants</span>
                  </IconContainer>
                </div>
              </SettingGroup>
              <SettingGroup>
                {toggleMute === true ? (
                  <ToggleButtons onClick={handleMute}>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 0px 0px" }}
                      className="mr1 self-center"
                    >
                      mic
                    </IconStyle>
                  </ToggleButtons>
                ) : (
                  <OffButtons onClick={handleMute}>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 0px 0px" }}
                      className="mr1 self-center"
                    >
                      mic_off
                    </IconStyle>
                  </OffButtons>
                )}
                {toggleCam === true ? (
                  <ToggleButtons onClick={handleCam}>
                    <IconStyle
                      style={{ color: "white", margin: "0px 0px 0px 0px" }}
                      className="mr1 self-center"
                    >
                      videocam
                    </IconStyle>
                  </ToggleButtons>
                ) : (
                  <OffButtons onClick={handleCam}>
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
                  <Button
                    onClick={() => {
                      setLeaveStreamPopUp(true);
                    }}
                  >
                    Leave
                  </Button>
                </ButtonContainer>
              </SettingGroup>
              <SettingGroup>
                <div onClick={() => setScreenSharePermissionPopUp(true)}>
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
      <Modal open={settingsOpen} onClose={handleSettingsOpen}>
        <RTCSettings />
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
      <Modal open={leaveStreamPopUp} onClose={closeLeaveStreamPopUp}>
        <PopupContainer style={{ height: "152px" }}>
          <p style={{ fontSize: "24px", margin: "20px 0px 40px 0px" }}>
            You left the stream
          </p>
          <div>
            <PrimaryButton
              onClick={() => {
                history.push("/");
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
      <Modal
        open={screenSharePermissionPopUp}
        onClose={closeScreenSharePermissionPopUp}
      >
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
