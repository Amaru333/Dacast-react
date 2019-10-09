import React from 'react';
import { storiesOf } from '@storybook/react'
import { Status } from '../components/Status/Status';


storiesOf('Status', module)
    .add('Status', () => ( 
        <React.Fragment>
            <Status color="red"/><br/>
            <Status color="green"/><br/>
            <Status color="yellow"/><br/>
        </React.Fragment>
    ))