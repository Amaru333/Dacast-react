export interface StepperSpecificProps {
    stepTitles: string[]
    stepList: (() => JSX.Element)[]
    lastStepButton: string
}

export type StepperProps = StepperSpecificProps & React.HTMLAttributes<HTMLDivElement>