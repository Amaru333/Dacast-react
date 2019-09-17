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
            <InputStyle myCustomProps={myCustomProps}  {...other} />
        );
    }
}

const InputStyle = styled.input<InputProps>`
    border: 1px solid #C8D1E0;
    background: #F5F7FA;
    box-sizing: border-box;
`;
