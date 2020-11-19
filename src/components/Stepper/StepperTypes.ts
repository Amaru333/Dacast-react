import { Type, Size } from '../FormsComponents/Button/ButtonTypes';

export interface Step {
    title: string;
    content: () => JSX.Element;
    extras?: any
}

export interface StepperSpecificProps {
    stepperHeader: string;
    stepTitles: string[];
    stepList: React.FC<any>[];
    lastStepButton: string;
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