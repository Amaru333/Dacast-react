import styled from "styled-components";
import React from "react";
import { IconStyle } from "../../../shared/Common/Icon";

export default function Controls() {
  return (
    <ControlsContainer>
      <SettingGroup>
        <IconContainer>
          <IconStyle
            style={{ color: "white", marginBottom: "8px" }}
            className="mr1 self-center"
          >
            insert_link
          </IconStyle>
          <span style={{ fontSize: "12px" }}>Share Link</span>
        </IconContainer>
        <IconContainer>
          <IconStyle
            style={{ color: "white", marginBottom: "8px" }}
            className="mr1 self-center"
          >
            people
          </IconStyle>

          <span style={{ fontSize: "12px" }}>Participants</span>
        </IconContainer>
      </SettingGroup>
      <SettingGroup>
        <IconContainer>
          <IconStyle
            style={{ color: "white", marginBottom: "8px" }}
            className="mr1 self-center"
          >
            mic
          </IconStyle>
        </IconContainer>
        <IconContainer>
          <IconStyle
            style={{ color: "white", marginBottom: "8px" }}
            className="mr1 self-center"
          >
            videocam
          </IconStyle>
        </IconContainer>
        <IconContainer>
          <button>Leave</button>
        </IconContainer>
      </SettingGroup>
      <SettingGroup>
        <IconContainer>
          <IconStyle
            style={{ color: "white", marginBottom: "8px" }}
            className="mr1 self-center"
          >
            present_to_all
          </IconStyle>
          <span style={{ fontSize: "12px" }}>Share Screen</span>
        </IconContainer>
        <IconContainer>
          <IconStyle
            style={{ color: "white", marginBottom: "8px" }}
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
