import React, { HTMLAttributes } from 'react';
import { BurgerStyle } from './NavigationStyle';
import { IconStyle } from '../../../shared/Common/Icon';

const Burger = (props: {isOpen: boolean} & HTMLAttributes<HTMLDivElement>) => {
    return (
        <BurgerStyle {...props}>
            {props.isOpen ? 
                <IconStyle>close</IconStyle> :
                <IconStyle>menu</IconStyle>
            }
        </BurgerStyle>
    )
}

export default Burger;