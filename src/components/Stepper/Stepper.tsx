import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Text } from "../Typography/Text";
import { StepperProps } from './StepperTypes';
import { StepperContainerStyle, StepperContentStyle, StepperFooterStyle, StepperHeaderStyle, StepperStyle, StepperNextButton } from './StepperStyles';
import { Button } from '../FormsComponents/Button/Button';
import { OverlayStyle } from '../Modal/ModalStyle';
import {isMobile} from "react-device-detect";

export const CustomStepper = (props: StepperProps) => {

    const [stepIndex, setStepIndex] = React.useState<number>(0)
    const [stepValidated, setStepValidated] = React.useState<boolean>(true)

    React.useEffect(() => {
        if (!props.opened) {
            setStepIndex(0)
        }
    }, [props.opened])

    const steps: string[] = props.stepTitles
    const renderStepperContent = (stepIndex: number, stepperData: any, updateStepperData: Function, finalFunction?: Function) => {    
        const Test: React.FC<any> = props.stepList[stepIndex]
        return  (
            <Test
                stepperData={stepperData} 
                updateStepperData={updateStepperData}
                setStepValidated={setStepValidated} 
                finalFunction={finalFunction} 
                usefulFunctions={props.usefulFunctions}
            />
        )
        
    };

    const nextStep = () => {
        if(stepIndex < props.stepList.length - 1) {
            setStepIndex(stepIndex + 1)
            setStepValidated(true)
        }
    }

    const previousStep = () => {
        if(stepIndex > 0) {
            setStepIndex( stepIndex - 1);
            setStepValidated(true)
        }
    }

    console.log(stepIndex);
    return (
        <React.Fragment>
            <StepperContainerStyle containerWidth={props.widthSecondStep && stepIndex === 1 ? props.widthSecondStep : null} opened={props.opened} isMobile={isMobile}>
                <StepperHeaderStyle>
                    <Text size={24} weight="reg">{props.stepperHeader}</Text>
                </StepperHeaderStyle>
                <StepperStyle isMobile={isMobile}>
                    <Stepper activeStep={stepIndex} alternativeLabel>
                        {steps.map((label) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </StepperStyle>
                <StepperContentStyle isMobile={isMobile}> 
                    {renderStepperContent(stepIndex, props.stepperData, props.updateStepperData, props.finalFunction)}
                </StepperContentStyle>
                <StepperFooterStyle>
                    <StepperNextButton id='stepperNextButton' {...props.nextButtonProps} disabled={!stepValidated} onClick={nextStep}>
                        {(stepIndex >= props.stepList.length - 1) ? props.lastStepButton : props.nextButtonProps.buttonText}
                    </StepperNextButton>
                    {stepIndex !== 0 ?
                        <Button {...props.backButtonProps}  onClick={previousStep}>{props.backButtonProps.buttonText}</Button> : null
                    }
                    <Button onClick={(event) => {event.preventDefault();props.functionCancel(false);setStepIndex(0)}} {...props.cancelButtonProps} typeButton="tertiary">{props.cancelButtonProps.buttonText}</Button>
                </StepperFooterStyle>
            </StepperContainerStyle>
            <OverlayStyle opened={props.opened}/>
        </React.Fragment>
    )
}