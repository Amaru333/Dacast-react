import * as React from "react";
import { Text } from "../Typography/Text";
import styled, { css } from 'styled-components';
// import { AvatarProps } from './AvatarTypes';

export const Avatar = () => {

    return (
        <AvatarStyle>
            {
                <TextStyle color="white" size={16} weight="med">JN</TextStyle>
            }
        </AvatarStyle>
    )
}

export const AvatarStyle = styled.div`
background-color: ${props => props.theme.colors["red"]};
width: 40px;
height: 40px;
border-radius: 50%;
text-align: center;
position: relative;
display: table;
`

export const TextStyle = styled(Text)`
display: table-cell;
vertical-align: middle;
text-align: center;
font-size: 20px;
line-height:28px;
letter-spacing: 0.05em;
`