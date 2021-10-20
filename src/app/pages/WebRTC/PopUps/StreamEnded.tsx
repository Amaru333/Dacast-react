import React from "react";
import styled from "styled-components";

export default function StreamEnded() {
  return (
    <PopupContainer>
      <p style={{ fontSize: "24px", margin: "20px 0px 40px 0px" }}>
        This stream has ended
      </p>
      <div>
        <PrimaryButton>Edit</PrimaryButton>
        <SecondaryButton>Cancel</SecondaryButton>
      </div>
    </PopupContainer>
  );
}

export const PopupContainer = styled.div<{}>`
  width: 400px;
  height: 152px;
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
