import React from 'react';
import { storiesOf } from '@storybook/react'
import { Badge } from '../components/Badge/Badge';

storiesOf('Badges', module)
    .add('Badges', () => ( 
        <React.Fragment>
            <Badge className="m1" number={8}/><br/>
            <Badge className="m1" number={99}/><br/>
            <Badge className="m1" number={100}/><br/>
            <Badge className="m1" number={999}/><br/>
            <Badge className="m1" number={1000}/><br/>
        </React.Fragment>
    ))