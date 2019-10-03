import * as React from "react";
import { Text } from "../Typography/Text";
import Icon from '@material-ui/core/Icon';
import { ModalProps } from './ModalTypes';
import { ModalContainerStyle, ModalTitleStyle, IconStyle, ModalCloseButtonStyle, OverlayStyle, ModalBodyStyle, ModalFooterStyle } from './ModalStyle';

export const Modal = (props: ModalProps) => {

    var { icon, ...other } = props;

    return (
        <React.Fragment>
            <ModalContainerStyle {...other}>
                <ModalTitleStyle>
                    {icon ? (
                        <IconStyle iconColor={icon.color} ><Icon>{icon.name}</Icon></IconStyle>
                    ) : null}
                    <Text color="gray-1" size={24} weight="med">
                        {props.title}
                    </Text>
                    <ModalCloseButtonStyle onClick={() => props.toggle()}>
                        <Icon>close</Icon>
                    </ModalCloseButtonStyle>
                </ModalTitleStyle>
                {props.children}
            </ModalContainerStyle>
            <OverlayStyle opened={props.opened } />
        </React.Fragment>
    );

}

Modal.defaultProps = { size: "large", opened: false};


export const ModalContent = (props: React.HTMLAttributes<HTMLDivElement>) => {

    return (
        <ModalBodyStyle {...props} >
            {props.children}
        </ModalBodyStyle>
    )

}

export const ModalFooter = (props: React.HTMLAttributes<HTMLDivElement>) => {

    return (
        <ModalFooterStyle {...props} >
            {props.children}
        </ModalFooterStyle>
    )

}