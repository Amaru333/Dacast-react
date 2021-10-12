import React from "react";
import styled from "styled-components";
import { IconStyle } from "../../../shared/Common/Icon";
import { Modal } from "@material-ui/core";
import AddStreamModal from "./AddStreamModal";
import AddLiveStreamModal from "./AddLiveStreamModal";

export default function StreamModeModal(props: {
  toggle: () => void;
  opened: boolean;
}) {
  const [modalOpen, setModalOpen] = React.useState<boolean>(props.opened);
  const [createModalOpen, setCreateModalOpen] = React.useState<boolean>(false);
  const [
    createLiveStreamModalOpen,
    setCreateLiveStreamModalOpen,
  ] = React.useState<boolean>(false);
  return (
    <div>
      <AddStreamModal
        opened={createModalOpen}
        toggle={() => setCreateModalOpen(!createModalOpen)}
      />
      <AddLiveStreamModal
        opened={createLiveStreamModalOpen}
        toggle={() => setCreateLiveStreamModalOpen(!createLiveStreamModalOpen)}
      />
      <Modal open={modalOpen}>
        <PopupContainer>
          <p style={{ fontSize: "36px", margin: "20px 0px 40px 0px" }}>
            Create Live Stream
          </p>
          <p>Select method of streaming</p>
          <OptionContainer>
            <ShadowBox
              onClick={() => {
                setModalOpen(false);
                setCreateModalOpen(true);
              }}
            >
              <IconStyle
                style={{ color: "#222F3E", fontSize: "30px" }}
                className="mb2 self-center"
              >
                videocam
              </IconStyle>
              <b>Use Encoder</b>
              <p>Setup required</p>
            </ShadowBox>
            <ShadowBox
              onClick={() => {
                setModalOpen(false);
                setCreateLiveStreamModalOpen(true);
              }}
            >
              <IconStyle
                style={{ color: "#222F3E" }}
                className="mb2 self-center"
              >
                desktop_windows
              </IconStyle>
              <b>Use Webcam</b>
              <p>No setup required</p>
            </ShadowBox>
          </OptionContainer>
        </PopupContainer>
      </Modal>
    </div>
  );
}

export const PopupContainer = styled.div<{}>`
  width: 440px;
  background-color: #fff;
  color: "black";
  border-radius: 4px;
  padding: 40px;
  margin: auto;
  margin-left: 40vw;
  margin-top: 30vh;
  font-weight: 500px;
`;

export const ShadowBox = styled.div<{}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 140px;
  border-radius: 8px;
  cursor: pointer
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background-color: #edf0fe;
  }
`;

export const OptionContainer = styled.div<{}>`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;
