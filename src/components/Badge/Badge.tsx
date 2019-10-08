import * as React from "react";
import { Text } from "../Typography/Text";
import styled, { css } from 'styled-components';
import { BadgeProps } from './BadgeTypes';

export const Badge = (props: BadgeProps) => {

    return (
        <BadgeStyle {...props}>
            {
                props.number.length > 0 ?
            <TextStyle color="white" size={12} weight="med">{props.number.length > 3 ? "999+" : props.number}</TextStyle>
                : null
            }
        </BadgeStyle>
    )
}

export const BadgeStyle = styled.div<{number: string}>`
    border-radius: 100px;
    height: 20px;
    width: auto;
    min-width: 20px;
    background-color: ${props => props.theme.colors["coral"]};
    display: inline-block;
    text-align: center;
    ${props => props.number.length === 0 && css`
    border-radius: 100px;
    height: 10px;
    min-width: 10px;
    `}  
`

export const TextStyle = styled(Text)`
    padding: 0px 4px;
`