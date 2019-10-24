import * as React from "react";
import { Text } from "../Typography/Text";
import styled, { css } from 'styled-components';
import { AvatarProps } from './AvatarTypes';

const getInitials = (name: string) => {
    var names = name.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    
        return initials;
}

export const Avatar = (props: AvatarProps) => {

    return (
        <AvatarStyle {...props}>
            {
                <TextStyle color="white" size={16} weight="med">{getInitials(props.name)}</TextStyle>
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