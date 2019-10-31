import * as React from "react"
import Icon from '@material-ui/core/Icon';
import { HeaderStyle, IconContainerStyle, HeaderIconStyle } from './HeaderStyle';
import Burger from '../../containers/Navigation/Burger';

export interface HeaderProps {
    isOpen: boolean;
    setOpen: Function;
    isMobile: boolean;
}


export const Header = (props: HeaderProps) => {

    return (
        
        <HeaderStyle>
            {props.isMobile ? <Burger isOpen={props.isOpen} onClick={() => props.setOpen(!props.isOpen)} /> : null}
            <IconContainerStyle>
                <HeaderIconStyle><Icon>notifications</Icon></HeaderIconStyle>
                <HeaderIconStyle><Icon>help</Icon></HeaderIconStyle>
                <HeaderIconStyle><Icon>account_circle</Icon></HeaderIconStyle>
            </IconContainerStyle>
        </HeaderStyle>
    )
}

