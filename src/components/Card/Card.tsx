import * as React from "react";
import { CardStyle } from './CardStyle';
import { isMobile } from 'react-device-detect'

export const Card = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const {className, ...other} = props;

    return (
        <CardStyle isMobile={isMobile} className={className+" p25"} {...other}>
            {props.children}
        </CardStyle>
    )
}