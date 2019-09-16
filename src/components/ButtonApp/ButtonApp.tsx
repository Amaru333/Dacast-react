import * as React from "react";

type Size = 'large' | 'small'
type Type = 'primary' | 'secondary' | 'ghost' | 'tertiary'

export interface ButtonAppProps {
    sizeButton: Size,
    type: Type,
}

type ButtonProps = ButtonAppProps & React.HTMLProps<HTMLButtonElement>;

export class ButtonApp extends React.Component<ButtonProps> {

    constructor(props: ButtonProps) {
        super(props);
    }

    render() {

        var { size, type, ...other } = this.props;

        return (
            <button {...other} >
                {this.props.children}
            </button>
        );
    }
}

