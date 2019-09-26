import * as React from "react";
import styled, { css } from "styled-components";
import { Text } from "../../Typography/Text";
import Icon from '@material-ui/core/Icon';
import { ColorsApp } from '../../../styled/types';

type Size = "large" | "small";

export interface ModalCustomProps {
    size: Size;
    title: string;
    isClosable?: boolean;
    icon?: { name: string; color: ColorsApp };
    opened: boolean;
    toggle: () => void;
    hideOverlay? : boolean;
}

type ModalProps = ModalCustomProps & React.HTMLAttributes<HTMLDivElement>

export class ModalContent extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    constructor(props: React.HTMLAttributes<HTMLDivElement>) {
        super(props);
    }
    render() {
        return (
            <ModalBodyStyle {...this.props} >
                {this.props.children}
            </ModalBodyStyle>
        )
    }
}

export class ModalFooter extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    constructor(props: React.HTMLAttributes<HTMLDivElement>) {
        super(props);
    }
    render() {
        return (
            <ModalFooterStyle {...this.props} >
                {this.props.children}
            </ModalFooterStyle>
        )
    }
}

export class Modal extends React.Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
    }

    render() {
        var { isClosable, icon, hideOverlay, ...other } = this.props;

        return (
            <React.Fragment>
                <ModalContainerStyle {...other}>
                    <ModalTitleStyle>
                        {icon ? (
                            <IconStyle iconColor={icon.color} ><Icon>{icon.name}</Icon></IconStyle>
                        ) : null}
                        <Text size={24} weight="med">
                            {this.props.title}
                        </Text>
                        {isClosable && this.props.toggle ? (
                            <ModalCloseButtonStyle onClick={() => this.props.toggle()}>
                                <Icon>close</Icon>
                            </ModalCloseButtonStyle>
                        ) : null}
                    </ModalTitleStyle>
                    {this.props.children}
                </ModalContainerStyle>
                <OverlayStyle opened={this.props.opened && !hideOverlay} />
            </React.Fragment>
        );
    }

    static defaultProps = { size: "large", opened: false, toggle: () => { }, hideOverlay: false};

}
const IconStyle = styled.div<{ iconColor: ColorsApp }>`
    color: ${props => props.theme.colors[props.iconColor]};
    float: left;
`;

const OverlayStyle = styled.div<{ opened: boolean }>`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    ${props => props.opened && css`
        display: block;
        background: ${props => props.theme.colors.overlay70};
    `}
`;

//Should be fixed ...
const ModalContainerStyle = styled.div<ModalProps>`
  box-sizing: border-box;
  padding: 24px 24px 32px 24px;
  width: ${props => (props.size === "small" ? "400px" : "600px")};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0px 4px 4px rgba(34, 47, 62, 0.2);
  display: ${props => (props.opened ? "block" : "none")};
  position: absolute;
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
`;

const ModalBodyStyle = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 32px;
    flex-wrap: wrap;
    & > * { 
        margin-bottom: 8px;
    }
`;

const ModalFooterStyle = styled.div`
    & > * { 
        margin-right: 12px;
    }
`;