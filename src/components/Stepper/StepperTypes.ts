import { Type, Size } from '../FormsComponents/Button/ButtonTypes';

interface StepperButtonType {
    typeButton?: Type;
    sizeButton?: Size;
    buttonText: string;
    isLoading?: boolean
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
    usefulFunctions?: {[key: string]: any};
    stepperStaticData?: {[key: string]: any};
    widthSecondStep? : number;
    isLoading?: boolean;
}

export type StepperProps = StepperSpecificProps & React.HTMLAttributes<HTMLDivElement>