import * as React from "react";

type Size = 'large' | 'small'
type Type = 'primary' | 'secondary' | 'ghost' | 'tertiary'

export interface ButtonAppProps {
    size: Size,
    type: Type,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export class ButtonApp extends React.Component<ButtonAppProps> {

    constructor(props: ButtonAppProps) {
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

