import styled, { css } from "styled-components";
import { Button } from '../../../components/FormsComponents/Button/Button';

export const ArrowButton = styled(Button)`
    padding: 0 8px;
`

export const DisabledSection = styled.div<{settingsEditable: boolean}>`
    pointer-events: none;
    opacity: 0.5;
    ${props => props.settingsEditable && css`
        pointer-events: auto;
        opacity: 1;
    `}
`