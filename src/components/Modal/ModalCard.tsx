import * as React from "react";
import { Text } from "../Typography/Text";
import Icon from '@material-ui/core/Icon';
import { ModalCardProps } from './ModalType';
import { ModalContent, ModalFooter } from './Modal';
import { ModalCardContainerStyle, ModalTitleStyle, IconStyle } from './ModalStyle';

export { ModalContent, ModalFooter} ;
export class ModalCard extends React.Component<ModalCardProps> {
    constructor(props: ModalCardProps) {
        super(props);
    }

    render() {
        var { icon, ...other } = this.props;

        return (
            <ModalCardContainerStyle {...other}>
                <ModalTitleStyle>
                    {icon ? (
                        <IconStyle iconColor={icon.color} ><Icon>{icon.name}</Icon></IconStyle>
                    ) : null}
                    <Text size={24} weight="med">
                        {this.props.title}
                    </Text>
                </ModalTitleStyle>
                {this.props.children}
            </ModalCardContainerStyle>
        );
    }

    static defaultProps = { size: "large"};

}