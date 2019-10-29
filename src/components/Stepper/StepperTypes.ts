export interface StepperSpecificProps {
    steps: string[]
}

export type StepperProps = StepperSpecificProps & React.HTMLAttributes<HTMLDivElement>