import React from 'react';
import { storiesOf } from '@storybook/react'
import { Badge } from '../components/Badge/Badge';

storiesOf('Badges', module)
    .add('Badges', () => ( 
        <React.Fragment>
            <Badge number="8"/><br/>
            <Badge number="99"/><br/>
            <Badge number="100"/><br/>
            <Badge number="999"/><br/>
            <Badge number="1000"/><br/>
            <Badge number="" />
        </React.Fragment>
    ))