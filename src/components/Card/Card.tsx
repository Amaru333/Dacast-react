import * as React from "react";
import { CardStyle } from './CardStyle';

export const Card = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const {className, ...other} = props;

    return (
        <CardStyle className={className+" p25"} {...other}>
            {props.children}
        </CardStyle>
    )
}