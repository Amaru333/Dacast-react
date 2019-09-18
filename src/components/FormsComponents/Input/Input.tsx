import * as React from "react";
import styled from 'styled-components';

export interface InputSpecificProps {
    myCustomProps?: any
}

type InputProps = InputSpecificProps & React.HTMLAttributes<HTMLInputElement>;

export class Input extends React.Component<InputProps> {

    constructor(props: InputProps) {
        super(props);
    }

    render() {

        var { myCustomProps, ...other } = this.props;

        return (
            <ContainerStyle>
                <InputStyle myCustomProps={myCustomProps}  {...other} />
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
    border: 1px solid ${props => props.theme.colors.orange};
    background: #F5F7FA;
    box-sizing: border-box;
`;
