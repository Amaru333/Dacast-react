import React from 'react';
import { storiesOf } from '@storybook/react'
import { ColorPicker } from '../components/ColorPicker/ColorPicker';

storiesOf('Color Picker', module)
    .add('Color Picker', () => ( 
        <React.Fragment>
            <div className="col col-4 p2">
                <ColorPicker defaultColor="red" />
            </div>
        </React.Fragment>
    ))