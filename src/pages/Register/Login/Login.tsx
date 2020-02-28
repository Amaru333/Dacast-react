import React from 'react';
import styled from 'styled-components';
import { ModalCard, ModalFooter, ModalContent } from '../../../components/Modal/ModalCard';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';

const logo = require('../../../../public/assets/logo.png');

interface LoginComponentProps {
    login: Function;
}
export const LoginPage = (props: LoginComponentProps) => {

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const submitLogin = (username: string, password: string) => {
        props.login(username, password)
    }

    return (
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo} />
            <ModalCard className="mx-auto" size="small" title="User Login" >
                <ModalContent className="clearfix">
                    <Input type="email" className="col col-12" label="Email Address" placeholder="Email Address" value={username} onChange={event => setUsername(event.currentTarget.value)} />
                    <Input type="password" className="col col-12" label="Password" icon="visibility_off" placeholder="Password" value={password} onChange={event => setPassword(event.currentTarget.value)}/>
                    <Text className="col col-12" color="gray-1" size={12} weight="reg">Don&apos;t have an account? <a href="/signup">Sign up</a></Text>
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

export const LoginContainer = styled.div`
    width:auto;
    background: #EBEFF5;
`