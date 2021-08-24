import React from 'react';
import { Text } from "../Typography/Text";
import { StepperProps } from './StepperTypes';
import { StepperContainerStyle, StepperContentStyle, StepperFooterStyle, StepperHeaderStyle, StepperNextButton } from './StepperStyles';
import { Button } from '../FormsComponents/Button/Button';
import { OverlayStyle } from '../Modal/ModalStyle';
import {isMobile} from "react-device-detect";
import { StepperProgress } from './StepperProgress';

export const useStepperFinalStepAction = (buttonId: string, callback: Function) => {
    const finalStepAction = () => {if(document.getElementById(buttonId).innerText !== 'Next') {
        callback()
    }}
    React.useEffect(() => {
        document.getElementById(buttonId).addEventListener('click', finalStepAction)

        return () => {
            document.getElementById(buttonId).removeEventListener('click', finalStepAction)
        }

    }, [callback])
}

export const CustomStepper = <ExtraProps extends {}>(props: StepperProps & ExtraProps) => {

    const [stepIndex, setStepIndex] = React.useState<number>(0)
    const [stepValidated, setStepValidated] = React.useState<boolean>(true)

    React.useEffect(() => {
        if (!props.opened) {
            setStepIndex(0)
        }
    }, [props.opened])

    useStepperFinalStepAction('stepperNextButton', () => {props.finalFunction()})

    const renderStepperContent = (stepIndex: number, stepperData: any, updateStepperData: Function, finalFunction?: Function) => {    
        const Step: React.FC<any> = props.stepList[stepIndex].content
        return  (
            <Step
                stepperData={stepperData} 
                updateStepperData={updateStepperData}
                setStepValidated={setStepValidated} 
                finalFunction={finalFunction} 
                {...props}
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
    return (
        <React.Fragment>
            <StepperContainerStyle containerWidth={props.widthSecondStep && stepIndex === 1 ? props.widthSecondStep : null} opened={props.opened} isMobile={isMobile}>
                <StepperHeaderStyle>
                    <Text size={24} weight="med">{props.stepperHeader}</Text>
                </StepperHeaderStyle>
                <div className="mb25 mt25">
                    <StepperProgress  stepList={props.stepList} currentStep={stepIndex} />
                </div>
                <StepperContentStyle isMobile={isMobile}> 
                    {renderStepperContent(stepIndex, props.stepperData, props.updateStepperData, props.finalFunction)}
                </StepperContentStyle>
                <StepperFooterStyle>
                    <StepperNextButton id='stepperNextButton' typeButton="primary" sizeButton="large" isLoading={props.isLoading} disabled={!stepValidated} onClick={nextStep}>
                        {(stepIndex >= props.stepList.length - 1) ? props.lastStepButton : "Next"}
                    </StepperNextButton>
                    {stepIndex !== 0 &&
                        <Button typeButton="secondary" sizeButton="large"  onClick={previousStep}>Back</Button>
                    }
                    <Button onClick={() => props.functionCancel(false)} sizeButton="large" typeButton="tertiary">Cancel</Button>
                </StepperFooterStyle>
            </StepperContainerStyle>
            <OverlayStyle opened={props.opened}/>
        </React.Fragment>
    )
}