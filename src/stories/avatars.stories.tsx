import React from 'react';
import { storiesOf } from '@storybook/react'
import { Avatar } from '../components/Avatar/Avatar';

storiesOf('Avatars', module)
    .add('Avatars', () => ( 
        <React.Fragment>
            <Avatar name="Jake Napper"></Avatar><br/>
            <Avatar name="Rich Jenkins"></Avatar><br/>
            <Avatar name="Johanna Lynch"></Avatar><br/>
            <Avatar name="Quentin Benyahia"></Avatar><br/>
            <Avatar name="Clement Bisssonnier"></Avatar><br/>
            <Avatar name="Jeffrey Lucas"></Avatar><br/>

        </React.Fragment>
    ))