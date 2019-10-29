import React from 'react';
import { storiesOf } from '@storybook/react'
import { Avatar } from '../components/Avatar/Avatar';

storiesOf('Avatars', module)
    .add('Avatars', () => ( 
        <React.Fragment>
            <div className="m3"> 
                <Avatar size="large" name="Jake Napper"></Avatar><br/>
                <Avatar size="large" name="Rich Jenkins"></Avatar><br/>
                <Avatar size="large" name="Johanna Lynch"></Avatar><br/>
            </div>

            <div className="m3">
                <Avatar name="Quentin Benyahia"></Avatar><br/>
                <Avatar name="Clement Bisssonnier"></Avatar><br/>
                <Avatar name="Jeffrey Lucas"></Avatar><br/>
            </div>
           
            

        </React.Fragment>
    ))