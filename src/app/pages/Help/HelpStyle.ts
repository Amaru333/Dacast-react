import styled from 'styled-components';
import { Card } from '../../../components/Card/Card';
import { IconStyle } from '../../../shared/Common/Icon';

export const SmallHelpCard = styled(Card)`
height: 168px;
padding: 16px;
`

export const HelpCardHeader = styled.div`
display: flex;
`

export const LargeHelpCard = styled(Card)`
    position: relative;
    height: 187px;
    background-color: ${props => props.theme.colors["violet20"]};
    display: flex;
    flex-direction: row;
    padding: 16px;
`

export const HelpCardContent = styled.div`
display: flex;
flex-direction: column;

`

export const CardPlaceholder = styled.div`
width: 40%;
height: 100%;
display: flex;
flex-direction: column;
`

export const ButtonContainer = styled.div`
    position: absolute;
    bottom: 24px;
`

export const HelpPageIcon = styled(IconStyle)`
    color: ${props => props.theme.colors["dark-violet"]};
`
