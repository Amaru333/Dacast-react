import React, { HTMLAttributes } from 'react';
import { BurgerStyle } from './NavigationStyle';
import { Icon } from '@material-ui/core';

const Burger = (props: {isOpen: boolean} & HTMLAttributes<HTMLDivElement>) => {
    return (
        <BurgerStyle {...props}>
            {props.isOpen ? 
                <Icon>close</Icon> :
                <Icon>menu</Icon>
            }
        </BurgerStyle>
    )
}

export default Burger;