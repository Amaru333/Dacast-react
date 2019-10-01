import * as React from "react";
import styled, { css } from 'styled-components';
import { Text } from '../../Typography/Text';

export interface InputCheckboxSpecificProps {
    label?: string;
    disabled?: boolean;
    indeterminate?: boolean;
}

type InputCheckboxProps = InputCheckboxSpecificProps & React.HTMLAttributes<HTMLInputElement>;

export const InputCheckbox: React.SFC<InputCheckboxProps> = (props) => {

    let checkboxRef = React.useRef<HTMLInputElement>(null);

    const handleIndeterminate = () => {
        if(checkboxRef.current !== null && typeof checkboxRef.current !== 'undefined' && props.indeterminate === true) {
            checkboxRef.current.indeterminate = true
        }
    }
    let {label, className, ...other} = props;

    return (
        <ContainerStyle className={className} >
            <InputCheckboxStyle {...other} type="checkbox" ref={checkboxRef} onClick={handleIndeterminate} />
            {label ? <LabelStyle disabled={props.disabled} > <Text color={props.disabled ? "gray-4" : "gray-1" } size={14} weight="med" > {props.label} </Text> </LabelStyle> : null}
        </ContainerStyle>
    )
    }

InputCheckbox.defaultProps = {disabled: false, indeterminate: false}

const ContainerStyle = styled.div<InputCheckboxProps>`
    display: inline-flex;
    height:auto;
`;

const LabelStyle = styled.label<InputCheckboxProps>`
    display: flex;
    height:auto;
    margin-bottom: 4px;
`;

const InputCheckboxStyle = styled.input<InputCheckboxProps>`
    display: flex;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background-color: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    border-radius: 2px;
    margin-left: 2px;
    height:16px;
    width: 16px;
    color: ${props => props.theme.colors["gray-1"]};
    ${props => props.disabled && css`
        opacity: 0.5;
    `}
    &:hover {
        ${props => !props.disabled && css`
        cursor: pointer;
    `}
    }
    &:focus {
      outline: rgb(59, 153, 252) auto 5px;
    }
`;