import * as React from "react";
import styled, { css } from "styled-components";
import Icon from '@material-ui/core/Icon';
import {Text}from "./Typography/Text"
import { ColorsApp } from '../styled/types';

type Size = "flexible" | "fixed";
type NotificationType = "error" | "success" | "information" | "warning" | "other"

export interface ToastCustomProps {

    size: Size
    notificationType: NotificationType;
    
}

type ToastProps = ToastCustomProps & React.HTMLAttributes<HTMLDivElement>

//maybe make a new component for every type of toast?

export class Toast extends React.Component<ToastProps> {

    constructor(props: ToastProps){
        super(props)
    }


     renderIcon = (props: ToastProps) => {
         switch(props.notificationType) {
            case "error":
                return <Icon style={{color: "white"}}>warning_amber</Icon>;
            case "success":
                return <Icon style={{color: "white"}}>check</Icon>;
            case "information":
                 return <Icon style={{color: "white"}}>info_outline</Icon>;
             case "warning":
                 return <Icon>info_outline</Icon>;   
             case "other":
                 return <Icon style={{color: "white"}}>notifications_none</Icon>;
         }
     }
    
    render(){

        return ( <ToastStyle {...this.props}>
                    
                    <Text color={(this.props.notificationType == "warning") ? "black" : "white"} size={16} weight="reg">{this.props.children}</Text>
                    <IconStyle>{this.renderIcon(this.props)}</IconStyle>
                    <ToastCloseButtonStyle notificationType={this.props.notificationType} onClick={() => console.log("toast closed")}>
                                <Icon>close</Icon>
                            </ToastCloseButtonStyle>
                </ToastStyle>

        )}

        static defaultProps = { size: "fixed"}

}

const ToastStyle = styled.div<ToastProps>`
    width: 400px;
    height: 40px;
    border: none;
    padding: 8px 16px;
    box-sizing: border-box;

    ${props => (props.notificationType == "error") && css`
    background-color: ${props => props.theme.colors["red"]};
`}

${props => (props.notificationType == "success") && css`
    background-color: ${props => props.theme.colors["green"]};
`}

${props => (props.notificationType == "information") && css`
    background-color: ${props => props.theme.colors["blue"]};
`}
${props => (props.notificationType == "warning") && css`
    background-color: ${props => props.theme.colors["yellow"]};
`}
${props => (props.notificationType == "other") && css`
    background-color: ${props => props.theme.colors["gray-2"]};
`}
`
    


const IconStyle = styled.div`
    color: ${props => props.theme.colors};
    float: left;
    margin-right: 8px;
`;

const ToastCloseButtonStyle = styled.button<{notificationType: NotificationType} & React.HTMLAttributes<HTMLButtonElement>>`
  float: right;
  border: none;
  color: ${props => (props.notificationType == "warning" ? props.theme.colors["black"] : props.theme.colors["white"] )};
  background: inherit;
  `;