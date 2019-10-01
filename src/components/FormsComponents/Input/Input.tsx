import * as React from "react";
import { Text } from '../../Typography/Text';
import Icon from '@material-ui/core/Icon';
import { InputProps } from './InputTypes';
import { ContainerStyle, LabelStyle, RelativeContainer, InputStyle, HelpStyle, IconStyle } from './InputStyle';

export class Input extends React.Component<InputProps> {

    constructor(props: InputProps) {
        super(props);
    }

    render() {

        var { label, icon, help, isError, className, ...other } = this.props;

        return (
            <ContainerStyle className={className} >
                {label ? <LabelStyle disabled={this.props.disabled} > <Text color={ this.props.disabled ? "gray-4" : "gray-1" } size={14} weight="med" > {this.props.label} </Text> </LabelStyle> : null}
                <RelativeContainer>
                    <InputStyle isError={isError} {...other} />
                    {icon ? <IconStyle><Icon>{icon}</Icon></IconStyle> : null}
                </RelativeContainer>
                {help ? <HelpStyle>
                    <Text color={this.props.isError ? "red" : this.props.disabled ? "gray-4" : "gray-3"} size={12} weight="reg"> {help} </Text>
                </HelpStyle> : null}
            </ContainerStyle>
        );
    }

    static defaultProps = { isError: false, disabled: false }

}
