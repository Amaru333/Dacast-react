import { Modal } from "@material-ui/core";
import React from "react";
import { Bubble } from "../../../components/Bubble/Bubble";
import { Button } from "../../../components/FormsComponents/Button/Button";
import { Input } from "../../../components/FormsComponents/Input/Input";
import { getKnowledgebaseLink } from "../../constants/KnowledgbaseLinks";
import { useHistory } from "react-router";
import styled from "styled-components";
import { DropdownSingle } from "../../../components/FormsComponents/Dropdown/DropdownSingle";

export default function AddLiveStreamModal(props: {
  toggle: () => void;
  opened: boolean;
}) {
  const handleCancel = () => {
    props.toggle();
  };
  let history = useHistory();
  return (
    <Modal open={props.opened}>
      <PopupContainer>
        <Bubble className="mt1" type="info">
          Need help creating a Live Stream? Visit the{" "}
          <a
            href={getKnowledgebaseLink("Live")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Knowledge Base
          </a>
        </Bubble>

        <Input
          placeholder="My Live Stream"
          id="liveStreamModalInput"
          className="col col-12 mt1"
          label="Title"
          style={{ marginBottom: "20px" }}
        />
        <DropdownSingle
          id="Source Region"
          list={[
            { title: "Americas", data: "americas" },
            {
              title: "Austrilia and Asia Pacific",
              data: "austrilia_and_asia_pacific",
            },
            {
              title: "Europe, Middle East & Africa",
              data: "europe_middle_east_africa",
            },
          ]}
          dropdownTitle={"Source Region"}
        />
        <Button
          onClick={() => {
            history.push(`/livestreams/test/general`);
          }}
          typeButton="primary"
        >
          Create
        </Button>
        <Button typeButton="tertiary" onClick={() => handleCancel()}>
          Cancel
        </Button>
      </PopupContainer>
    </Modal>
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
