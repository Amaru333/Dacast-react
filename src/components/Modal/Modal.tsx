import * as React from "react";
import { Text } from "../Typography/Text";
import Icon from '@material-ui/core/Icon';
import { ModalProps } from './ModalType';
import { ModalContainerStyle, ModalTitleStyle, IconStyle, ModalCloseButtonStyle, OverlayStyle, ModalBodyStyle, ModalFooterStyle } from './ModalStyle';

export class Modal extends React.Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
    }

    render() {
        var { icon, ...other } = this.props;

        return (
            <React.Fragment>
                <ModalContainerStyle {...other}>
                    <ModalTitleStyle>
                        {icon ? (
                            <IconStyle iconColor={icon.color} ><Icon>{icon.name}</Icon></IconStyle>
                        ) : null}
                        <Text size={24} weight="med">
                            {this.props.title}
                        </Text>
                        <ModalCloseButtonStyle onClick={() => this.props.toggle()}>
                            <Icon>close</Icon>
                        </ModalCloseButtonStyle>
                    </ModalTitleStyle>
                    {this.props.children}
                </ModalContainerStyle>
                <OverlayStyle opened={this.props.opened } />
            </React.Fragment>
        );
    }

    static defaultProps = { size: "large", opened: false};

}

export class ModalContent extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    constructor(props: React.HTMLAttributes<HTMLDivElement>) {
        super(props);
    }
    render() {
        return (
            <ModalBodyStyle {...this.props} >
                {this.props.children}
            </ModalBodyStyle>
        )
    }
}

export class ModalFooter extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    constructor(props: React.HTMLAttributes<HTMLDivElement>) {
        super(props);
    }
    render() {
        return (
            <ModalFooterStyle {...this.props} >
                {this.props.children}
            </ModalFooterStyle>
        )
    }
}