import * as React from 'react';
import { LoadingSpinnerProps } from './LoadingSpinnerTypes'
import { LoadingSpinnerStyle } from './LoadingSpinnerStyle'

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props: LoadingSpinnerProps) => {
    if(props.hidden)
        return <></>
        
    return (
        <LoadingSpinnerStyle className={props.className} center={props.center} size={props.size} color={props.color} />
    );
}