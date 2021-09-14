import React from "react";
import styled from "styled-components";
import Thumbnail from "../../../../../public/assets/thumbnail.jpg";

export default function StreamEnded() {
  return (
    <PopupContainer>
      <p
        style={{
          fontSize: "20px",
          margin: "10px 0px 10px 0px",
          padding: "20px 20px 0px 20px",
        }}
      >
        New live stream
      </p>
      <img src={Thumbnail} style={{ width: "467px" }} />
      <p style={{ marginLeft: "20px" }}>
        <b style={{ fontWeight: "500" }}>Duration: </b>02:30:00
      </p>
      <p style={{ marginLeft: "20px", fontSize: "14px" }}>
        Your live stream was saved to videos
      </p>
      <p style={{ marginLeft: "20px", fontSize: "14px" }}>
        Your can edit or delete this live stream in the video tab
      </p>
      <div style={{ padding: "15px 0 0 20px" }}>
        <PrimaryButton>Edit</PrimaryButton>
        <SecondaryButton>Close</SecondaryButton>
      </div>
    </PopupContainer>
  );
}

export const PopupContainer = styled.div<{}>`
  width: 467px;
  height: 562px;
  background-color: #fff;
  color: "black";
  border-radius: 4px;
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
