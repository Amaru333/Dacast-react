import * as React from "react";
import styled from 'styled-components';

export interface InputSpecificProps {
    label?: string
}

type InputProps = InputSpecificProps & React.HTMLAttributes<HTMLInputElement>;

export class Input extends React.Component<InputProps> {

    constructor(props: InputProps) {
        super(props);
    }

    render() {

        var { label, ...other } = this.props;

        return (
            <ContainerStyle>
                <InputStyle  {...other} />
            </ContainerStyle>
        );
    }
}

const ContainerStyle = styled.div<InputProps>`
    flex: 1;
    flex-direction: column;
    width:auto;
    height:auto;
`;


const InputStyle = styled.input<InputProps>`
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    padding: 8px 12px;
    ::placeholder{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
    }
`;
