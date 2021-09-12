import styled from "styled-components";
import React from "react";
import { IconStyle } from "../../../shared/Common/Icon";

export default function Controls() {
  const [toggleMute, setToggleMute] = React.useState<boolean>(false);
  const [toggleCam, setToggleCam] = React.useState<boolean>(false);

  const handleMute = () => {
    setToggleMute(!toggleMute);
  };

  const handleCam = () => {
    setToggleCam(!toggleCam);
  };

  return (
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
        <IconContainer>
          <IconStyle
            style={{ color: "white", margin: "0px 0px 8px 0px" }}
            className="mr1 self-center"
          >
            people
          </IconStyle>

          <span style={{ fontSize: "12px" }}>Participants</span>
        </IconContainer>
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
        <IconContainer style={{ padding: "0px", alignSelf: "center" }}>
          <Button>Leave</Button>
        </IconContainer>
      </SettingGroup>
      <SettingGroup>
        <IconContainer>
          <IconStyle
            style={{ color: "white", margin: "0px 0px 8px 0px" }}
            className="mr1 self-center"
          >
            present_to_all
          </IconStyle>
          <span style={{ fontSize: "12px" }}>Share Screen</span>
        </IconContainer>
        <IconContainer>
          <IconStyle
            style={{ color: "white", margin: "0px 0px 8px 0px" }}
            className="mr1 self-center"
          >
            settings
          </IconStyle>
          <span style={{ fontSize: "12px" }}>Settings</span>
        </IconContainer>
      </SettingGroup>
    </ControlsContainer>
  );
}

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

export const Button = styled.button<{}>`
  background-color: #d14642;
  height: 40px;
  width: 116px;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #e3908e;
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
