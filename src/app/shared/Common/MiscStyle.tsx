import styled from "styled-components";
import { Button } from '../../../components/FormsComponents/Button/Button';

export const ArrowButton = styled(Button)`
    padding: 0 8px;
`

export const Divider = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`