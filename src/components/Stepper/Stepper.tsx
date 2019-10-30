import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepperProps } from './StepperTypes';
import { StepperContainerStyle, StepperContentStyle } from './StepperStyles';

export const CustomStepper = (props: StepperProps) => {

    const stepIndex = 3;

    const steps: string[] = props.steps

    const renderStepperContent = (stepIndex: number) => {
      console.log(props.stepList)
      return (
        
        props.stepList[stepIndex]()
      
        )
    };

    return (

        <StepperContainerStyle>
          <Stepper activeStep={stepIndex} {...props} alternativeLabel>
              {steps.map((label, index) => {
            
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
          </Stepper>
          <StepperContentStyle>
            {renderStepperContent(stepIndex)}
          </StepperContentStyle>
        </StepperContainerStyle>
        
    )
}