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
    functionCancel?: React.Dispatch<React.SetStateAction<boolean>>;
    stepperData?: any;
    updateStepperData?: React.Dispatch<React.SetStateAction<any>>;
    widthSecondStep? : number;
    isLoading?: boolean;
}

export type StepperProps = StepperSpecificProps & React.HTMLAttributes<HTMLDivElement>