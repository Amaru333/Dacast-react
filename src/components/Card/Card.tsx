import * as React from "react";
import { CardStyle } from './CardStyle';
import { isMobile } from 'react-device-detect'
import { ColorsApp } from '../../styled/types';

export const Card = (props: React.HTMLAttributes<HTMLDivElement> & {backgroundColor: ColorsApp}) => {

    const {className, backgroundColor,  ...other} = props;

    return (
        <CardStyle backgroundColor={backgroundColor} isMobile={isMobile} className={className} {...other}>
            {props.children}
        </CardStyle>
    )
}

Card.defaultProps = {backgroundColor: 'white'}