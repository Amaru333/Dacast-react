import * as React from 'react';
import { ToastProps } from './ToastTypes';
import { Text } from '../Typography/Text';
import { ToastStyle, IconStyle, ToastCloseButtonStyle } from './ToastStyle';
import Icon from '@material-ui/core/Icon';

export const Toast = (props: ToastProps) => {
    
    const renderIcon = (props: ToastProps) => {
        switch(props.toast.notificationType) {
            case "error":
                return <Icon style={{color: "white"}}>warning_amber</Icon>;
            case "success":
                return <Icon style={{color: "white"}}>check</Icon>;
            case "information":
                return <Icon style={{color: "white"}}>info_outline</Icon>;
            case "warning":
                return <Icon>error_outline</Icon>;   
            case "other":
                return <Icon style={{color: "white"}}>notifications_none</Icon>;
        }
    }

    return (
        <ToastStyle {...props}>                    
            <Text color={(props.toast.notificationType == "warning") ? "black" : "white"} size={16} weight="reg">{props.toast.text}</Text>
            <IconStyle>{renderIcon(props)}</IconStyle>
            {props.toast.size == "fixed" ? (
                <ToastCloseButtonStyle notificationType={props.toast.notificationType} >
                    <Icon>close</Icon>
                </ToastCloseButtonStyle>
            ) 
                : null}            
        </ToastStyle>

    );
}