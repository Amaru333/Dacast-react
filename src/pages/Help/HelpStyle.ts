import styled, {css} from 'styled-components';
import { Card } from '../../components/Card/Card';
import { Icon } from '@material-ui/core';

export const SmallHelpCard = styled(Card)`
height: 168px;
padding: 16px;
`

export const HelpCardHeader = styled.div`
display: flex;
`


export const LargeHelpCard = styled(Card)`
    height: 187px;
    background-color: ${props => props.theme.colors["violet20"]};
`

export const HelpCardContent = styled.div`
display: flex;
flex-direction: column;
`

export const CardPlaceholder = styled.div`
width: 119px;
height: 100%;
display: flex;
flex-direction: column;
`

export const HelpPageIcon = styled(Icon)`
filter: invert(33%) sepia(98%) saturate(7488%) hue-rotate(235deg) brightness(99%) contrast(86%);
`