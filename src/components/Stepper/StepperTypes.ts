import { Type, Size } from '../FormsComponents/Button/ButtonTypes';

interface StepperButtonType {
    typeButton?: Type;
    sizeButton?: Size;
    buttonText: string;
}

export interface StepperSpecificProps {
    stepperHeader: string;
    stepTitles: string[];
    stepList: (() => JSX.Element)[];
    lastStepButton: string;
    nextButtonProps: StepperButtonType;
    backButtonProps: StepperButtonType;
    cancelButtonProps: StepperButtonType;
    finalFunction: (() => void);
}

export type StepperProps = StepperSpecificProps & React.HTMLAttributes<HTMLDivElement>