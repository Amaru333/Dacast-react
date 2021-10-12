import { Modal } from "@material-ui/core";
import React from "react";
import { Bubble } from "../../../../components/Bubble/Bubble";
import { Button } from "../../../../components/FormsComponents/Button/Button";
import { Input } from "../../../../components/FormsComponents/Input/Input";
import { getKnowledgebaseLink } from "../../../constants/KnowledgbaseLinks";
import { useHistory } from "react-router";

export default function AddLiveStreamModal2(props: {
  toggle: () => void;
  opened: boolean;
}) {
  const handleCancel = () => {
    props.toggle();
  };
  let history = useHistory();
  return (
    <Modal open={props.opened}>
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
    </Modal>
  );
}
