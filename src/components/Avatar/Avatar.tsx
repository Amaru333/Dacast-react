import * as React from "react";
import { Text } from "../Typography/Text";
import styled from 'styled-components';
import { AvatarProps } from './AvatarTypes';
import { AvatarColorsArray } from '../../styled/types';

const getInitials = (name: string) => {
    var names = name.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    
    return initials;
}

const getColor = (name: string) => {
    var hash = 0;

    if (name.length === 0) return hash;
    for (var i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    return Math.abs(hash % AvatarColorsArray.length);
}

export const Avatar = (props: AvatarProps) => {

    return (
        <AvatarStyle {...props}>
            
            <TextStyle color="white" size={20} weight="med">{getInitials(props.name)}</TextStyle>
            
        </AvatarStyle>
    )
}

export const AvatarStyle = styled.div<AvatarProps>`
    background-color: ${props => props.theme.colors[AvatarColorsArray[getColor(props.name)]]};
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
    letter-spacing: 0.05em;
`