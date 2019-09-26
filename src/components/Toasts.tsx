import * as React from "react";
import styled, { css } from "styled-components";
import Icon from '@material-ui/core/Icon';
import {Text}from "./Typography/Text"
import { ColorsApp } from '../styled/types';

type Size = "flexible" | "fixed";
type notificationType = "error" | "success" | "information" | "warning" | "other"

export interface ToastCustomProps {
    icon: { name: string, color: ColorsApp };
    size: Size
    notificationType: notificationType
}

type ToastProps = ToastCustomProps & React.HTMLAttributes<HTMLDivElement>

export class Toast extends React.Component<ToastProps> {
    constructor(props: ToastProps){
        super(props)
    }

    render(){
        var { icon, ...other} = this.props

        return ( <ToastStyle {...this.props}>
                    <IconStyle iconColor={icon.color} ><Icon>{icon.name}</Icon></IconStyle>
                    <Text size={16} weight="reg">{this.props.children}</Text>
                    <ToastCloseButtonStyle onClick={() => console.log("toast closed")}>
                                <Icon>close</Icon>
                            </ToastCloseButtonStyle>
                </ToastStyle>

        )}

        static defaultProps = { size: "fixed"}

}

const ToastStyle = styled.div<ToastProps>`
    width: 400px;
    height: 40px;
    border: 1px solid black;
    padding: 8px 16px;
    box-sizing: border-box;
`

const IconStyle = styled.div<{ iconColor: ColorsApp }>`
    color: ${props => props.theme.colors[props.iconColor]};
    float: left;
    margin-right: 8px;
`;

const ToastCloseButtonStyle = styled.button`
  float: right;
  border: none;
  `;