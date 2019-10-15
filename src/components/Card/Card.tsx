import * as React from "react";
import { CardStyle } from './CardStyle';

export const Card = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <CardStyle {...props}>
            {props.children}
        </CardStyle>
    )
}