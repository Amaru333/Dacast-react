import * as React from "react";
import { Text } from "../Typography/Text";
import { ModalCardProps } from './ModalTypes';
import { ModalContent, ModalFooter } from './Modal';
import { ModalCardContainerStyle, ModalTitleStyle } from './ModalStyle';
import { IconStyle } from "../../shared/Common/Icon";

export { ModalContent, ModalFooter} ;

export const ModalCard = (props: ModalCardProps) => {

    var { icon, ...other } = props;

    return (
        <ModalCardContainerStyle {...other}>
            <ModalTitleStyle>
                {icon && <IconStyle style={{float: 'left', marginTop: '4px', marginRight: '8px'}} coloricon={icon.color} >{icon.name}</IconStyle>}
                <Text color="gray-1" size={24} weight="med">
                    {props.title}
                </Text>
            </ModalTitleStyle>
            {props.children}
        </ModalCardContainerStyle>
    );
}

ModalCard.defaultProps = { size: "large"};