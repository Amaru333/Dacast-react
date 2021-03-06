import * as React from "react";
import { Text } from "../Typography/Text";
import styled from 'styled-components';
import { AvatarProps } from './AvatarTypes';
import { AvatarColorsArray } from '../../styled/types';

export const getRandomColor = (name: string) => {
    var hash = 0;

    if (name.length === 0) return hash;
    for (var i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    return Math.abs(hash % AvatarColorsArray.length);
}

const assignAvatarColor = (userRole: string, name: string) => {
    switch (userRole) {
        case "Owner":
            return "green"
        case "Admin":
            return "pink"
        case "Creator":
            return "blue-2"
        default:
            return AvatarColorsArray[getRandomColor(name)]
    }
}

export const Avatar = (props: AvatarProps) => {

    const getInitials = (name: string) => {
        var names = name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
        
        return initials;
    }
    
    
    
    return (
        <AvatarStyle {...props}>
            
            <TextStyle color="white" size={props.size === "small" ? 12 : 20} weight="med">{getInitials(props.name)}</TextStyle>
            
        </AvatarStyle>
    )
}

Avatar.defaultProps = {size: "small"}

export const AvatarStyle = styled.div<AvatarProps>`
    background-color: ${props => props.userRole ? props.theme.colors[assignAvatarColor(props.userRole, props.name)] : props.theme.colors[AvatarColorsArray[getRandomColor(props.name)]]};
    width: ${props => props.size === "small" ? "24px" : "40px"};
    height: ${props => props.size === "small" ? "24px" : "40px"};
    border-radius: 50%;
    text-align: center;
    display: table;
`

export const TextStyle = styled(Text)`
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    letter-spacing: 0.05em;
`