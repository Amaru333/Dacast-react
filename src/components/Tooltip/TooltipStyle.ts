import styled from 'styled-components';
import { TooltipProps } from './TooltipTypes';

export const StorybookInputContainerStyle = styled.div<TooltipProps  & {visibility: boolean; top: number; left: number}>`
    background-color: ${props => props.theme.colors["gray-10"] };
    border: 1px solid ${props => props.theme.colors["gray-7"] };
    border-radius: ${props => props.theme.borderRadius };
    display: inline-block;
    visibility: ${props => props.visibility ? "visible" : "hidden"};
    padding: 4px 8px;
    position:absolute;
    top: ${props => props.top }px;
    left: ${props => props.left }px;
    transition:none;
    max-width: 250px;
    box-shadow: 0px 2px 4px ${props => props.theme.colors.overlay20 };
`;