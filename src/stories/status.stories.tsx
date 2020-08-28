import React from 'react';
import { storiesOf } from '@storybook/react'
import { Status } from '../components/Status/Status';
import { Text } from '../components/Typography/Text'

storiesOf('Status', module)
    .add('Status', () => ( 
        <React.Fragment>
            
            <div className="flex"><Status className="m1" color="green"/><Text> Online/Connected Status </Text></div>
            <div className="flex"><Status className="m1" color="yellow"/><Text> Away Status </Text></div>
            <div className="flex"><Status className="m1" color="red"/><Text> Offline/Disconnected Status </Text></div>
        </React.Fragment>
    ))