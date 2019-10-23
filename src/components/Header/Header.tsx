import * as React from "react"
import Icon from '@material-ui/core/Icon';
import { HeaderStyle, IconContainerStyle, HeaderIconStyle } from './HeaderStyle';

export const Header = () => {

    return (
        
        <HeaderStyle>
            <IconContainerStyle>
                <HeaderIconStyle><Icon>notifications</Icon></HeaderIconStyle>
                <HeaderIconStyle><Icon>help</Icon></HeaderIconStyle>
                <HeaderIconStyle><Icon>account_circle</Icon></HeaderIconStyle>
            </IconContainerStyle>
        </HeaderStyle>
    )
}

