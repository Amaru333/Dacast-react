import styled, { css } from "styled-components";
import { StepperProps } from './StepperTypes';
import Stepper from '@material-ui/core/Stepper';

export const StepperContainerStyle = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 24px;
    width: 600px;
    height: auto;
    min-height: 472px;
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 0px 4px 4px rgba(34, 47, 62, 0.2);
    overflow: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.colors["white"]};
    z-index: 9999;
`
export const StepperStyle = styled.div`
    
    & .MuiStepConnector-lineHorizontal {
        border-top-width: 4px;
        border-radius: 4px;
    }

    & .MuiStepConnector-active, .MuiStepConnector-completed  {
        & > * { 
            border-color: ${props => props.theme.colors["violet"]};
        }
        
    }

    & .MuiStepIcon-root.MuiStepIcon-active, .MuiStepIcon-root.MuiStepIcon-completed {
        color: ${props => props.theme.colors["violet"]}
    }

    & .MuiTypography-body2 {
        font-size: 12px;
        line-height: 16px;
    }

    & .MuiStepLabel-label.MuiStepLabel-alternativeLabel{
        margin-top: 8px;
    }
    
`
export const StepperContentStyle = styled.div`

`

export const StepStyle = styled.div`
`
export const StepperFooterStyle = styled.div`
bottom: 0;
margin-bottom: 24px;
margin-top: 42px;
    & > * { 
            margin-right: 12px;
        }
`
export const StepperHeaderStyle = styled.div`
text-align: center;
`