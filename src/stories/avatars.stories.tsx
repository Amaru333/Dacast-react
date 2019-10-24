import React from 'react';
import { storiesOf } from '@storybook/react'
import { Avatar } from '../components/Avatar/Avatar';

storiesOf('Avatars', module)
    .add('Avatars', () => ( 
        <React.Fragment>
            <Avatar name="Jake Napper"></Avatar><br/>
            <Avatar name="Steve Jobs"></Avatar>
        </React.Fragment>
    ))