import React from 'react';
import { ModalCard, ModalFooter, ModalContent } from '../../../../components/Modal/ModalCard';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { LoginContainer, ImageStyle } from '../../../shared/Register/RegisterStyle'

const logo = require('../../../../../public/assets/logo.png');

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
                    <div className=" relative col col-12 flex">
                        <Input type="password" className='col col-12'  label="Password" icon="visibility_off" placeholder="Password" value={password} onChange={event => setPassword(event.currentTarget.value)}/>
                        <Text color="gray-1" className='absolute right-0 pt1' size={12} weight="reg"><a href="/forgot-password">Forgot your password?</a></Text>
                    </div>

                    <Text className="col col-12" color="gray-1" size={12} weight="reg">Don&apos;t have an account? <a href="/signup">Sign up</a></Text>
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" onClick={() => submitLogin(username, password)} typeButton="primary">Log In</Button>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>

    )
}