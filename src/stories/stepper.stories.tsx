import React from 'react';
import { storiesOf } from '@storybook/react'
import { CustomStepper } from '../components/Stepper/Stepper';
import { Text } from '../components/Typography/Text'

const exampleStep1 = () => {
    return (
        <Text size={20} weight="reg">This is step 1</Text>
    )
}

const exampleStep2 = () => {
    return (
       <Text size={20} weight="reg">This is step 2</Text> 
    )
}

const exampleStep3 = () => {
    return (
       <Text size={20} weight="reg">This is step 3</Text> 
    )
}

const exampleStep4 = () => {
    return (
       <Text size={20} weight="reg">All done!</Text> 
    )
}

const stepList = [exampleStep1, exampleStep2, exampleStep3, exampleStep4]

storiesOf('Stepper', module)
    .add('Stepper', () => ( 
        <React.Fragment>
           <CustomStepper stepList={stepList} stepTitles={["Step 1", "Step 2", "Step 3"]} lastStepButton="Purchase"/>
        </React.Fragment>
    ))