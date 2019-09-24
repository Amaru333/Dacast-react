import * as React from "react";
import styled, {css} from "styled-components";
import { Text } from "../../Typography/Text";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import CloseIcon from "@material-ui/icons/Close";

type Size = "large" | "small";

export interface ModalCustomProps {
  size: Size;
  title: string;
  isClosable?: boolean;
  isWarning?: boolean;
  opened: boolean;
  toggle: () => void;
}

export class Modal extends React.Component<ModalCustomProps> {
  constructor(props: ModalCustomProps) {
    super(props);
  }

  render() {
    const isClosable = this.props.isClosable;
    const isWarning = this.props.isWarning;

    return (
      <React.Fragment>
        <ModalContainerStyle {...this.props}>
          <ModalTitleStyle>
            {isWarning ? (
              <ReportProblemOutlinedIcon></ReportProblemOutlinedIcon>
            ) : null}
            <Text size={24} weight="med">
              {this.props.title}
            </Text>
            {isClosable && this.props.toggle ? (
              <ModalCloseButtonStyle onClick={() => this.props.toggle()}>
                <CloseIcon></CloseIcon>
              </ModalCloseButtonStyle>
            ) : null}
          </ModalTitleStyle>
          <ModalContentStyle>{this.props.children}</ModalContentStyle>
        </ModalContainerStyle>
        <OverlayStyle opened={this.props.opened} />
      </React.Fragment>
    );
  }

  static defaultProps = { size: "large", opened: false, toggle: () => {} };

}

const OverlayStyle = styled.div<{opened: boolean}>`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    ${props => props.opened && css`
        display: block;
        background: ${props => props.theme.colors.overlay70 };
    `}
`;

const ModalContainerStyle = styled.div<ModalCustomProps>`
  box-sizing: border-box;
  padding: 24px;
  width: ${props => (props.size === "small" ? "400px" : "600px")};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0px 4px 4px rgba(34, 47, 62, 0.2);
  display: ${props => (props.opened ? "block" : "none")};
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors["white"]};
  z-index: 9999;
`;
const ModalTitleStyle = styled.div`
  margin-bottom: 16px;
`;
const ModalCloseButtonStyle = styled.button`
  float: right;
  border: none;
  background: white;
`;
const ModalContentStyle = styled.div``;
