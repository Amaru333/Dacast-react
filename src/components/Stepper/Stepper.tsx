import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepperProps } from './StepperTypes';

export const CustomStepper = (props: StepperProps) => {

    const steps: string[] = props.steps

    return (
        <Stepper {...props} alternativeLabel>
            {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
        </Stepper>
    )
}