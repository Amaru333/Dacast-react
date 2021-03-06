import styled from 'styled-components';
import { Card } from '../../../../components/Card/Card';

export const RenditionsWidget = styled(Card)`
height: 104px;
width: 271px;
display: flex;
text-align: center;
flex-grow: 1;
`

export const RenditionsTable = styled.div`
height: 410px;
background-color: white;
border: solid 1px ${props => props.theme.colors["gray-8"]};
`

export const ButtonContainer = styled.div`
height: 410px;
display: flex;
flex-direction: column;
justify-content: center;
margin: 0 16px;
`

