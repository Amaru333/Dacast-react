import styled, { css } from "styled-components";

export const StepperContainerStyle = styled.div<{opened: boolean; isMobile: boolean}>`
    box-sizing: border-box;
    display: none;
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

    ${props => props.opened && css`
        display: flex;
    `}

    ${props => props.isMobile && css`
        padding: 16px;
        width: 300px;
        top: 45%;
    `};
`
export const StepperStyle = styled.div<{isMobile: boolean}>`

    & .MuiStepper-root {
        ${props => props.isMobile && css `
            padding: 24px 0;
        `}
    }
    
    & .MuiStepConnector-lineHorizontal {
        border-top-width: 4px;
        border-radius: 4px;
        border-color: ${props => props.theme.colors["gray-7"]}
    }

    & .MuiStepConnector-active, .MuiStepConnector-completed  {
        & > * { 
            border-color: ${props => props.theme.colors["violet"]};
        }
    }

    & .MuiStepIcon-root {
        color: ${props => props.theme.colors["gray-7"]}
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

    & .MuiStepLabel-label.MuiStepLabel-completed{
        color: ${props => props.theme.colors["gray-7"]}
    }
`
export const StepperContentStyle = styled.div<{isMobile: boolean}>`
    ${props => props.isMobile && css`
        max-height: 300px;
        overflow: auto;
    `};
`

export const StepStyle = styled.div`
`
export const StepperFooterStyle = styled.div`
bottom: 0;
position: relative;
margin-top: 32px;
    & > * { 
            margin-right: 12px;
        }
`
export const StepperHeaderStyle = styled.div`
text-align: center;
`