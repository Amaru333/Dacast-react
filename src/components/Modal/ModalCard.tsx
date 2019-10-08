import * as React from "react";
import { Text } from "../Typography/Text";
import Icon from '@material-ui/core/Icon';
import { ModalCardProps } from './ModalTypes';
import { ModalContent, ModalFooter } from './Modal';
import { ModalCardContainerStyle, ModalTitleStyle, IconStyle } from './ModalStyle';

export { ModalContent, ModalFooter} ;

export const ModalCard = (props: ModalCardProps) => {

    var { icon, ...other } = props;

    return (
        <ModalCardContainerStyle {...other}>
            <ModalTitleStyle>
                {icon ? (
                    <IconStyle iconColor={icon.color} ><Icon>{icon.name}</Icon></IconStyle>
                ) : null}
                <Text color="gray-1" size={24} weight="med">
                    {props.title}
                </Text>
            </ModalTitleStyle>
            {props.children}
        </ModalCardContainerStyle>
    );
}

ModalCard.defaultProps = { size: "large"};