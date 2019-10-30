import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepperProps } from './StepperTypes';
import { StepperContainerStyle, StepperContentStyle, StepperFooterStyle } from './StepperStyles';
import { Button } from '../FormsComponents/Button/Button';

export const CustomStepper = (props: StepperProps) => {

    const [stepIndex, setStepIndex] = React.useState<number>(0)

    const steps: string[] = props.stepTitles

    const renderStepperContent = (stepIndex: number) => {
      return ( 
        props.stepList[stepIndex]()
        )
    };

    const nextStep = () => {
      if(stepIndex < props.stepList.length - 1) {
        setStepIndex(stepIndex + 1)
      }
      else {
        finalStep()
      }
    }

    const previousStep = () => {
      if(stepIndex > 0) {
        setStepIndex( stepIndex - 1);
      }
    }

    const finalStep = () => {
      console.log("submitted!")
    }

    return (

        <StepperContainerStyle>
            <Stepper activeStep={stepIndex} {...props} alternativeLabel>
                {steps.map((label) => {
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
            <StepperFooterStyle>
              <Button {...props.nextButtonProps} onClick={nextStep}>
                {(stepIndex >= props.stepList.length - 2) ? props.lastStepButton : props.nextButtonProps.buttonText}
              </Button>
              {(stepIndex !== 0) &&
                <Button {...props.backButtonProps} onClick={previousStep}>{props.backButtonProps.buttonText}</Button>
              }
              <Button {...props.cancelButtonProps} typeButton="tertiary">{props.cancelButtonProps.buttonText}</Button>
            </StepperFooterStyle>
        </StepperContainerStyle>
        
    )
}