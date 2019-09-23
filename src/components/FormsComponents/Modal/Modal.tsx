import * as React from "react";
import styled from 'styled-components';
import { Text } from '../../Typography/Text';

type Size = "large" | "small"

export interface ModalCustomProps{
    sizeModal: Size;
    titleModal: string;
    isClosable?: boolean;
    isWarning?: boolean;
}

export class Modal extends React.Component<ModalCustomProps>{
    constructor(props: ModalCustomProps) {
        super(props)
    }
    render() {
        const isClosable = this.props.isClosable;
        const isWarning = this.props.isWarning;
        let closeIcon;
        let warningIcon;

        if (isClosable) {
            closeIcon = <ModalCloseButtonStyle> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                        </ModalCloseButtonStyle>
        } else {
            closeIcon = null;
        }

        if (isWarning) {
            warningIcon = <ModalWarningIconStyle xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></ModalWarningIconStyle>
        } else {
            warningIcon = null;
        }

        return  <ModalContainerStyle{...this.props}>
                    <ModalTitleStyle>
                        {warningIcon}
                        <Text size={24} weight="med">{this.props.titleModal}</Text>
                        {closeIcon}
                    </ModalTitleStyle>
                    <ModalContentStyle>{this.props.children}</ModalContentStyle>
                </ModalContainerStyle>
        }

    
    static defaultProps = {sizeModal: "large"}
}

const ModalContainerStyle = styled.div<ModalCustomProps>`
    box-sizing: border-box;
    padding: 24px;
    width: ${props => (props.sizeModal === "small") ? "400px" : "600px"};
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(34, 47, 62, 0.2);
    `

const ModalTitleStyle = styled.div`
    margin-bottom: 16px;
`

const ModalCloseButtonStyle = styled.button`
float: right;
border: none;
background: white;

`

const ModalWarningIconStyle = styled.svg`
`

const ModalContentStyle = styled.div`
    
`
