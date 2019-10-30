export interface StepperSpecificProps {
    steps: string[]
    stepList: (() => JSX.Element)[]
}

export type StepperProps = StepperSpecificProps & React.HTMLAttributes<HTMLDivElement>