import React from 'react';
import styled from 'styled-components';
import { ModalCard, ModalFooter, ModalContent } from '../../../Modal/ModalCard';
import { Input } from '../../../FormsComponents/Input/Input';
import { Text } from '../../..//Typography/Text';
import { Button } from '../../../FormsComponents/Button/Button';
import { isLoggedIn, addToken } from '../../../../utils/token';
import { TokenInfos } from '../../../../redux-flow/store/Register/Login';



const logo = require('../../../../../public/assets/logo.png');

interface LoginComponentProps {
    login: Function;
    loginInfos: TokenInfos,
    history: any;
}
export const LoginPage = (props: LoginComponentProps) => {

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const submitLogin = (username:string, password:string) => {
        props.login({username, password})
        if(props.loginInfos && props.loginInfos.token.length > 0) {
            addToken(props.loginInfos);
            props.history.push('/dashboard');
        }
    }
    return (
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo} />
            <ModalCard className="mx-auto" size="small" title="User Login" >
                <ModalContent className="clearfix">
                    <Input type="email" className="col col-12" label="Email Address" placeholder="Email Address" value={username} onChange={event => setUsername(event.currentTarget.value)} />
                    <Input type="password" className="col col-12" label="Password" icon="visibility_off" placeholder="Password" value={password} onChange={event => setPassword(event.currentTarget.value)}/>
                    <Text className="col col-12" color="gray-1" size={12} weight="reg">Don&apos;t have an account? <a href="#">Sign up</a></Text>
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" onClick={() => submitLogin(username, password)} typeButton="primary">Log In</Button>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>

    )
}

const ImageStyle = styled.img`
    width: 307.5px;
    display: block;
    box-sizing: border-box;
`

const LoginContainer = styled.div`
    width:auto;
    background: #EBEFF5;
`