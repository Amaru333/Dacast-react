import React from "react";
import styled from "styled-components";
import { IconStyle } from "../../../../shared/Common/Icon";

export default function ShareScreenPermission() {
  return (
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
        <SecondaryButton>Deny</SecondaryButton>
      </div>
    </PopupContainer>
  );
}

export const PopupContainer = styled.div<{}>`
  width: 400px;
  height: 228px;
  background-color: #fff;
  color: "black";
  border-radius: 4px;
  padding: 40px;
  font-weight: 500px;
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
  width: 80px;
  cursor: pointer;
`;
