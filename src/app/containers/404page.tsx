import * as React from 'react';
import styled from 'styled-components';
import { Text } from "../../components/Typography/Text"
import { Button } from '../../components/FormsComponents/Button/Button';
import { useHistory } from 'react-router-dom'
import { userToken } from '../utils/services/token/tokenService';

export const NotFound = () => {
    let history = useHistory()
    return(
        <React.Fragment>
            <TopHalf>
                <GiantText size={12} weight="med" >404</GiantText>
            </TopHalf>
            <BottomHalf>
                <BottomText size={40} weight="med">Page Not Found</BottomText>
                <BottomText size={14} weight="reg">The page you are looking for might have been removed, had it’s name changed or is temporarily unavailable.</BottomText>
                <DashboardButton onClick={() => history.push('/')}>{userToken.isLoggedIn() ?  'Go To Dashboard' : 'Log in'}</DashboardButton>
            </BottomHalf>
        </React.Fragment>

    )
}

const TopHalf = styled.div`
background-color: ${props => props.theme.colors['violet40']};
height: 50vh;
width: 100%;
display: flex;
align-items: flex-end;
justify-content: center;
`

const BottomHalf = styled.div`
height: 50vh;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding-top: 12px;
`

const GiantText = styled(Text)`
font-size: 200px;
line-height: 234px;
color: ${props => props.theme.colors['dark-violet']};
`

const BottomText = styled(Text)`
margin-top: 24px;
`

const DashboardButton = styled(Button)`
margin-top: 32px;
`
