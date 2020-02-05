import * as React from "react";
import { Text } from "../Typography/Text";
import styled, { css } from 'styled-components';
import { BadgeProps } from './BadgeTypes';

export const Badge = (props: BadgeProps) => {

    return (
        <BadgeStyle {...props}>
            {
                <TextStyle color="white" size={12} weight="med">{props.number > 999 ? "999+" : props.number}</TextStyle>
            }
        </BadgeStyle>
    )
}
Badge.defaultProps = {color: "coral"}

export const BadgeStyle = styled.div<BadgeProps>`
    border-radius: 100px;
    height: 20px;
    width: auto;
    min-width: 20px;
    background-color: ${props => props.theme.colors[props.color]};
    align-items: center;
    display: inline-flex;
    justify-content: center;
`

export const TextStyle = styled(Text)`
    padding: 0px 4px;
`