import * as React from "react";
import { Text } from "../Typography/Text";
import Icon from '@material-ui/core/Icon';
import { ModalProps } from './ModalTypes';
import { ModalContainerStyle, ModalTitleStyle, IconStyle, ModalCloseButtonStyle, OverlayStyle, ModalBodyStyle, ModalFooterStyle } from './ModalStyle';
import { useOutsideAlerter } from '../../utils/utils';

export const Modal = (props: ModalProps) => {

    var { icon, hasClose,  ...other } = props;

    let modalRef = React.useRef<HTMLDivElement>(null);
    useOutsideAlerter(modalRef, () => props.toggle());

    return (
        <React.Fragment>
            <ModalContainerStyle ref={modalRef} hasClose={hasClose} {...other}>
                <ModalTitleStyle>
                    {icon ? (
                        <IconStyle iconColor={icon.color} ><Icon>{icon.name}</Icon></IconStyle>
                    ) : null}
                    <Text color="gray-1" size={24} weight="med">
                        {props.title}
                    </Text>
                    {
                        hasClose ? 
                        <ModalCloseButtonStyle onClick={() => props.toggle()}>
                        <Icon>close</Icon>
                    </ModalCloseButtonStyle>
                    : null
                    }
                </ModalTitleStyle>
                {props.children}
            </ModalContainerStyle>
            <OverlayStyle opened={props.opened } />
        </React.Fragment>
    );

}

Modal.defaultProps = { size: "large", opened: false, hasClose: true};


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