//REPLACE THIS WITH SVG LATER
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { EmptyProgressBar, StepperProgressBar, StepperProgressContainer, StepperProgressWrapper, StepTitle, StepTitleNumber } from './StepperStyles';
import { Step } from './StepperTypes';

export const StepperProgress = (props: {stepList: Step[], currentStep: number}) => {

    const progressPerStep = 100 / (props.stepList.length - 1);
    const progress = props.currentStep * progressPerStep;

    return (
        <StepperProgressContainer>
            <StepperProgressWrapper>
                <StepperProgressBar progress={progress} />
                <EmptyProgressBar/>
                {props.stepList.map((step, i) => {
                    return (
                        <StepTitle isCurrentStep={i === props.currentStep}>
                            <StepTitleNumber isFutureStep={i > props.currentStep}>
                                {i < props.currentStep ? <Icon fontSize="small" style={{color: "white"}}>check</Icon> :  (i + 1)}
                            </StepTitleNumber>
                            {step.title}
                        </StepTitle>
                    );
                })}
            </StepperProgressWrapper>
        </StepperProgressContainer>
    )
}