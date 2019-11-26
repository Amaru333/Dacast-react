import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Text } from "../Typography/Text";
import { StepperProps } from './StepperTypes';
import { StepperContainerStyle, StepperContentStyle, StepperFooterStyle, StepperHeaderStyle, StepperStyle } from './StepperStyles';
import { Button } from '../FormsComponents/Button/Button';
import { OverlayStyle } from '../Modal/ModalStyle';

export const CustomStepper = (props: StepperProps) => {

    const [stepIndex, setStepIndex] = React.useState<number>(0)

    const steps: string[] = props.stepTitles
    const renderStepperContent = (stepIndex: number, stepperData: any, updateStepperData: Function) => {
        console.log(stepperData)
        return ( 
            props.stepList[stepIndex](stepperData, updateStepperData)
        )
    };

    const nextStep = () => {
        if(stepIndex < props.stepList.length - 1) {
            setStepIndex(stepIndex + 1)
        }
        else {
            props.finalFunction()
        }
    }

    const previousStep = () => {
        if(stepIndex > 0) {
            setStepIndex( stepIndex - 1);
        }
    }

    return (
        <React.Fragment>
        <StepperContainerStyle opened={props.opened}>
            <StepperHeaderStyle>
                <Text size={24} weight="reg">{props.stepperHeader}</Text>
            </StepperHeaderStyle>
            <StepperStyle>
                <Stepper activeStep={stepIndex} {...props} alternativeLabel>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </StepperStyle>
            <StepperContentStyle> 
                {renderStepperContent(stepIndex, props.stepperData, props.updateStepperData)}
            </StepperContentStyle>
            <StepperFooterStyle>
                <Button {...props.nextButtonProps} onClick={nextStep}>
                    {(stepIndex >= props.stepList.length - 1) ? props.lastStepButton : props.nextButtonProps.buttonText}
                </Button>
                {(stepIndex !== 0) &&
                <Button {...props.backButtonProps} onClick={previousStep}>{props.backButtonProps.buttonText}</Button>
                }
                <Button onClick={(event) => {event.preventDefault();props.functionCancel(false);setStepIndex(0)}} {...props.cancelButtonProps} typeButton="tertiary">{props.cancelButtonProps.buttonText}</Button>
            </StepperFooterStyle>
        </StepperContainerStyle>
        <OverlayStyle opened={props.opened}/>
        </React.Fragment>
    )
}