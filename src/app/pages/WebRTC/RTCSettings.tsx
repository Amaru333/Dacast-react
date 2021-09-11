import React from "react";
import styled from "styled-components";
import { IconStyle } from "../../../shared/Common/Icon";

export default function RTCSettings() {
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
          }}
        >
          Settings
        </p>
        <div>
          <p style={{ display: "flex", placeItems: "center" }}>
            <IconStyle style={{ color: "black" }} className="mr1 self-center">
              headset
            </IconStyle>
            <span className="m0">Audio</span>
          </p>
          <p style={{ display: "flex", placeItems: "center" }}>
            <IconStyle style={{ color: "black" }} className="mr1 self-center">
              videocam
            </IconStyle>
            <span className="m0">Video</span>
          </p>
        </div>
        <div>Quick guide for live streaming with Web RTC</div>
      </SettingMenu>
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
            <p style={{ fontSize: "14px", fontWeight: "500" }}>Microphone</p>
            <Select>
              <option>Default</option>
              <option>Front Panel</option>
            </Select>
            <Button>Test Mic</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "14px", fontWeight: "500" }}>Speaker</p>
            <Select>
              <option>Default</option>
              <option>Front Panel</option>
            </Select>
            <Button>Test Speakers</Button>
          </div>
        </div>
      </AudioController>
    </SettingContainer>
  );
}

export const SettingContainer = styled.div<{}>`
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  margin: 20px;
  width: 680px;
`;

export const SettingMenu = styled.div<{}>`
  border-right: 1px solid #c8d1e0;
  width: 188px;
  padding: 20px;
  height: 680px;
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
