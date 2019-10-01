import React from 'react';
import { storiesOf } from '@storybook/react';
import {Toggle} from '../components/Toggle/toggle'

storiesOf('Toggle Switch', module)
    .add('Toggle Switch', () => ( 
        <React.Fragment>
            <Toggle label="Test"></Toggle>
            <Toggle label="Test2"></Toggle>
        </React.Fragment>

    ))