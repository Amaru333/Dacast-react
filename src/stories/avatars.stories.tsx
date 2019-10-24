import React from 'react';
import { storiesOf } from '@storybook/react'
import { Avatar } from '../components/Avatar/Avatar';

storiesOf('Avatars', module)
    .add('Avatars', () => ( 
        <React.Fragment>
            <Avatar/>
        </React.Fragment>
    ))