import * as React from "react";
import styled, { css } from 'styled-components';
import { Text } from '../../Typography/Text';
import Icon from '@material-ui/core/Icon';

export interface InputSpecificProps {
    label?: string;
    icon?: string;
    help?: string;
    isError?: boolean;
    disabled?: boolean;
}

type InputProps = InputSpecificProps & React.HTMLAttributes<HTMLInputElement>;

export class Input extends React.Component<InputProps> {

    constructor(props: InputProps) {
        super(props);
    }

    render() {

        var { label, icon, help, isError, ...other } = this.props;

        return (
            <ContainerStyle>
                {label ? <LabelStyle disabled={this.props.disabled} > <Text size={14} weight="med" > {this.props.label} </Text> </LabelStyle> : null}
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

const ContainerStyle = styled.div<InputProps>`
    display: flex;
    flex-direction: column;
    width:auto;
    height:auto;
`;

const HelpStyle = styled.div<InputProps>`
    margin-top: 8px;
`;

const RelativeContainer = styled(ContainerStyle)`
    position: relative;
`;

const IconStyle = styled.div<InputProps>`
    position: absolute;
    right: 12px;
    top: 8px;    
    color: ${props => props.disabled ? props.theme.colors["gray-6"] : props.theme.colors["gray-3"]};
`;

const LabelStyle = styled.label<InputProps>`
    display: flex;
    width:auto;
    height:auto;
    margin-bottom: 4px;
`;

const InputStyle = styled.input<InputProps>`
    display: flex;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    padding: 8px 12px;
    height:40px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: ${props => props.theme.colors["gray-1"]};
    ${props => props.isError && css`
        border-bottom: 2px solid ${props => props.theme.colors["red"]};
        background: ${props => props.theme.colors["red10"]};
    `}
    ${props => props.disabled && css`
        background: ${props => props.theme.colors["gray-8"]};
    `}
    ::placeholder{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: ${props => props.theme.colors["gray-5"]};
        ${props => props.disabled && css`
            color: ${props => props.theme.colors["gray-6"]} ;
        `}
    }
    &:focus {
        border: 1px solid ${props => props.theme.colors["violet"]} ;
        ${props => props.isError && css`
            border-bottom: 2px solid ${props => props.theme.colors["red"]};
        `}
    }
`;
