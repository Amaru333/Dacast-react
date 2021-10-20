import React from "react";
import { IconStyle } from "../../../shared/Common/Icon";
import styled from "styled-components";

export default function ParticipantBlock({ name }) {
  const [toggleMute, setToggleMute] = React.useState<boolean>(false);

  const handleMute = () => {
    setToggleMute(!toggleMute);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 0 10px 10px",
        placeContent: "space-between",
      }}
    >
      <p>{name}</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
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
        </div>
        <div>
          <ToggleButtons>
            <IconStyle
              style={{ color: "white", margin: "0px 0px 0px 0px" }}
              className="mr1 self-center"
            >
              more_vert
            </IconStyle>
          </ToggleButtons>
        </div>
      </div>
    </div>
  );
}

export const ToggleButtons = styled.div<{}>`
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 40px;
  margin: 0px;
  align-self: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export const OffButtons = styled.div<{}>`
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 40px;
  margin: 0px;
  align-self: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
