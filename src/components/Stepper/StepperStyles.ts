import styled, { css } from "styled-components";
import { Button } from '../FormsComponents/Button/Button';

export const StepperContainerStyle = styled.div<{opened: boolean; isMobile: boolean; containerWidth?: number}>`
    box-sizing: border-box;
    display: none;
    flex-direction: column;
    padding: 24px;
    
    width: 600px;
    
    height: auto;
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 0px 4px 4px rgba(34, 47, 62, 0.2);
    max-height: 90%;
    overflow-x: auto;
    position: fixed;
    left: 50%;
    top: 50vh;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.colors["white"]};
    z-index: 9999;

    ${props => props.opened && css`
        display: flex;
    `}

    ${props => props.containerWidth && css`
        width: ${props => props.containerWidth+"%"};
    `}


    @media (max-width: 40em) {
        padding: 16px;
        width: 80%;
        top: 45%;
    }
`

export const StepperContentStyle = styled.div<{isMobile: boolean}>`
    ${props => props.isMobile && css`
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

export const StepperNextButton = styled(Button)`
&:focus {
    background: ${props => props.theme.colors["violet"]};
    outline: none;
  };
`

export const StepperProgressContainer = styled.div`
    /* position: absolute;
    top: 15px; */
    width: 100%;
    z-index: 9;
`

export const StepperProgressWrapper = styled.div`
    width: 70%;
    position: relative;
    display: flex;
    margin: auto;
    justify-content: space-between;
`

export const EmptyProgressBar = styled.div`
    position: absolute;
    height: 4px;
    top: 13px;
    z-index: -2;
    background: ${props => props.theme.colors["gray-7"]};
    width: 100%;
`

export const StepperProgressBar = styled.div<{progress: number}>`
    position: absolute;
    height: 4px;
    top: 13px;
    z-index: -1;
    background: ${props => props.theme.colors["violet"]};
    width: ${props => props.progress + "%"};
`

export const StepTitle = styled.div<{isCurrentStep: boolean}>`
    text-align: center;
    font-size: 12px;
    font-weight: ${props => props.isCurrentStep ? "500" : "400"};
    color: ${props => props.isCurrentStep ? props.theme.colors["black"] : props.theme.colors["gray-5"]};
    align-items: center;
    background: #fff;
    display: flex;
    flex-direction: column;
    min-width: 48px;
`

export const StepTitleNumber = styled.div<{isFutureStep: boolean}>`
    background: ${props => props.isFutureStep ? props.theme.colors["gray-7"] : props.theme.colors["violet"]};
    height: 24px;
    width: 24px;
    margin: 0 auto 8px;
    border: 3px solid #fff;
    border-radius: 100%;
    color: white;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`
