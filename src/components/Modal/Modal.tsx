import * as React from "react";
import { Text } from "../Typography/Text";
import Icon from '@material-ui/core/Icon';
import { ModalProps } from './ModalTypes';
import { ModalContainerStyle, ModalTitleStyle, ModalCloseButtonStyle, OverlayStyle, ModalBodyStyle, ModalFooterStyle } from './ModalStyle';
import {isMobile} from "react-device-detect";
import { IconStyle } from "../../shared/Common/Icon";

export const Modal = (props: ModalProps) => {

    var { icon, hasClose,  ...other } = props;

    let modalRef = React.useRef<HTMLDivElement>(null);
    //useOutsideAlerter(modalRef, () => props.toggle());
    return (
        <React.Fragment>
            <ModalContainerStyle isMobile={isMobile} ref={modalRef} hasClose={hasClose} {...other}>
                <ModalTitleStyle>
                    {icon && <IconStyle style={{float: 'left', marginRight: '6px'}} fontSize='large'  coloricon={icon.color} >{icon.name}</IconStyle>}
                    <Text color="gray-1" size={24} weight="med">
                        {props.modalTitle}
                    </Text>
                    { hasClose && <ModalCloseButtonStyle onClick={() => props.toggle()}><Icon fontSize="small">close</Icon></ModalCloseButtonStyle>}
                </ModalTitleStyle>
                {props.children}
            </ModalContainerStyle>
            <OverlayStyle index={props.overlayIndex} opened={props.opened} />
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
