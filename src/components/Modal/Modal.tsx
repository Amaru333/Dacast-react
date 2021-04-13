import * as React from "react";
import { Text } from "../Typography/Text";
import Icon from '@material-ui/core/Icon';
import { ModalProps } from './ModalTypes';
import { ModalContainerStyle, ModalTitleStyle, ModalCloseButtonStyle, OverlayStyle, ModalBodyStyle, ModalFooterStyle } from './ModalStyle';
import {isMobile} from "react-device-detect";
import { IconStyle } from "../../shared/Common/Icon";
import { responsiveMenu } from '../../utils/utils';

export const Modal = (props: ModalProps) => {

    var { icon, hasClose,  ...other } = props;
    const { currentNavWidth } = responsiveMenu();

    let modalRef = React.useRef<HTMLDivElement>(null);
    //useOutsideAlerter(modalRef, () => props.toggle());
    return (
        <React.Fragment>
            <ModalContainerStyle isMobile={isMobile} ref={modalRef} hasClose={hasClose} {...other} style={{ marginLeft: !isMobile && props.allowNavigation && `calc(${currentNavWidth} / 2)`, zIndex: props.allowNavigation ? 9991 : 9999 }}>
                <ModalTitleStyle>
                    {icon && <IconStyle style={{float: 'left', marginRight: '6px'}} fontSize='large'  coloricon={icon.color} >{icon.name}</IconStyle>}
                    <Text color="gray-1" size={24} weight="med">
                        {props.modalTitle}
                    </Text>
                    { hasClose && <ModalCloseButtonStyle onClick={() => props.toggle()}><Icon fontSize="small">close</Icon></ModalCloseButtonStyle>}
                </ModalTitleStyle>
                {props.children}
            </ModalContainerStyle>
            <OverlayStyle index={props.overlayIndex} opened={props.opened} style={{ marginLeft: !isMobile && props.allowNavigation && `${currentNavWidth}`, zIndex: props.allowNavigation ? 9990 : 9998 }} />
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
