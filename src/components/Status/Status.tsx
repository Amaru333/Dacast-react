import * as React from "react";
import styled from 'styled-components';
import { ColorsApp } from '../../app/styled/types';

export interface CustomStatusProps {color: ColorsApp}
export type StatusProps = CustomStatusProps & React.HTMLAttributes<HTMLDivElement>

export const Status = (props: StatusProps) => {

    return (
        <StatusStyle {...props}/>
    )
}

export const StatusStyle = styled.div<{color: ColorsApp}>`
width: 8px;
height: 8px;
border-radius: 100px;
background-color: ${props => props.theme.colors[props.color]}
`