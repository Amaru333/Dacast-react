import React from 'react';
import { storiesOf } from '@storybook/react';
import {Toggle} from '../components/Toggle/toggle'
import { action } from '@storybook/addon-actions';

storiesOf('Toggle Switch', module)
    .add('Toggle Switch', () => ( 
        <React.Fragment>
            <Toggle className="m1" callback={action("Switch Toggle Trigger")} label="Toggle" />
            <Toggle className="m1" callback={action("Switch Toggle Trigger")} label="Toggle default checked" defaultChecked={true} />
        </React.Fragment>

    ))