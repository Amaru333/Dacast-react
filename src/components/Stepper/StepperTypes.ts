import { Type, Size } from '../FormsComponents/Button/ButtonTypes';

interface StepperButtonType {
    typeButton?: Type;
    sizeButton?: Size;
    buttonText: string;
}

export interface StepperSpecificProps {
    stepperHeader: string;
    stepTitles: string[];
    stepList: React.FC<any>[];
    lastStepButton: string;
    nextButtonProps: StepperButtonType;
    backButtonProps: StepperButtonType;
    cancelButtonProps: StepperButtonType;
    finalFunction: Function;
    opened: boolean;
    functionCancel?: Function;
    stepperData?: any;
    updateStepperData?: any;
    usefulFunctions?: {[key: string]: Function};
    stepperStaticData?: {[key: string]: any};
}

export type StepperProps = StepperSpecificProps & React.HTMLAttributes<HTMLDivElement>