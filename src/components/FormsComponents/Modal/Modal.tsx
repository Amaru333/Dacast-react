import * as React from "react";
import styled from 'styled-components';
import { Text } from '../../Typography/Text';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CloseIcon from '@material-ui/icons/Close';

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

        return  <ModalContainerStyle {...this.props}>
            <ModalTitleStyle>
                { isWarning ? <ReportProblemOutlinedIcon></ReportProblemOutlinedIcon> : null}
                <Text size={24} weight="med">{this.props.titleModal}</Text>
                { isClosable ? <ModalCloseButtonStyle><CloseIcon></CloseIcon></ModalCloseButtonStyle>: null}
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
    border-radius: ${props => props.theme.borderRadius};
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
const ModalContentStyle = styled.div`
    
`