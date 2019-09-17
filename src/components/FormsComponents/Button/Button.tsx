import * as React from "react";
import styled from 'styled-components';

type Size = 'large' | 'small'
type Type = 'primary' | 'secondary' | 'ghost' | 'tertiary'

export interface ButtonCustomProps {
    sizeButton?: Size,
    typeButton?: Type,
}

type ButtonProps = ButtonCustomProps & React.HTMLAttributes<HTMLButtonElement>;

export class Button extends React.Component<ButtonProps> {

    constructor(props: ButtonProps) {
        super(props);
    }

    render() {

        var { sizeButton, typeButton, ...other } = this.props;

        return (
            <ButtonStyle {...other} >
                {this.props.children}
            </ButtonStyle>
        );
    }
}

const ButtonStyle = styled.button<ButtonProps>`
    border: 1px solid #C8D1E0;
    background: ${ props => props.theme.colors.main === "small" ? 'black' : 'white' } ;
    box-sizing: border-box;
`;


