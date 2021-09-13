import React from "react";
import styled from "styled-components";

import ParticipantBlock from "./ParticipantBlock";

export default function Participants({ members }) {
  return (
    <ParticipantsContainer>
      <span style={{ padding: "10px 0 10px 10px" }}>Manage participants</span>
      {members.map((member) => (
        <ParticipantBlock name={member} />
      ))}
    </ParticipantsContainer>
  );
}

export const ParticipantsContainer = styled.div<{}>`
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: #2b2b2b;
  width: 320px;
`;
