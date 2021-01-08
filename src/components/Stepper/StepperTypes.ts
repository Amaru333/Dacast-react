export interface Step {
    title: string;
    content: React.FC<any>;
    extras?: any
}

export interface StepperSpecificProps {
    stepperHeader: string;
    stepList: Step[];
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