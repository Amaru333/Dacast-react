import React from 'react';
import { storiesOf } from '@storybook/react'
import { CustomStepper } from '../components/Stepper/Stepper';

storiesOf('Stepper', module)
    .add('Stepper', () => ( 
        <React.Fragment>
            
           <CustomStepper steps={["Step 1", "Step 2", "Step 3"]}/>
            

        </React.Fragment>
    ))