import React from 'react';
import { ModalCard, ModalFooter, ModalContent } from '../../../../components/Modal/ModalCard';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { LoginContainer, ImageStyle } from '../../../shared/Register/RegisterStyle'
import { useKeyboardSubmit, useQuery } from '../../../../utils/utils';
import { IconStyle } from '../../../../shared/Common/Icon';
import { LoginComponentProps } from '../../../containers/Register/Login/Login';

const logo = require('../../../../../public/assets/logo.png');

export const LoginPage = (props: LoginComponentProps) => {

    let query = useQuery()

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(query.get('email')){
            props.confirmEmail(query.get('email'))
            console.log('sup')
        }
    }, [])

    const enableSubmit = () => {
        return username.length > 0 && password.length > 0
    }

    const submitLogin = () => {
        setButtonLoading(true);
        if(enableSubmit()) {
            props.login(username, password,() =>  setButtonLoading(false))
        }
    }

    useKeyboardSubmit(submitLogin)

    return (
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo} />
            <ModalCard className="mx-auto" size="small" title="User Login" >
                <ModalContent className="clearfix">
                    <Input type="email" className="col col-12 pt1" label="Email Address" placeholder="Email Address" value={username} onChange={event => setUsername(event.currentTarget.value)} />
                    <div className=" relative col col-12 flex pt1">
                        <div className='relative flex col col-12'>
                            <Input type={passwordVisible ? "text" : "password"} className='col col-12'  label="Password" placeholder="Password" value={password} onChange={event => setPassword(event.currentTarget.value)}/>
                            <IconStyle onClick={() => setPasswordVisible(!passwordVisible)} className='absolute pointer top-0 right-0 pt35 pr2' coloricon='gray-3'>{passwordVisible ? 'visibility_off' : 'visibility_on'}</IconStyle>
                        </div>
                        <Text color="gray-1" className='absolute right-0 pt1' size={12} weight="reg"><a href="/forgot-password">Forgot your password?</a></Text>
                    </div>

                    <Text className="col col-12" color="gray-1" size={12} weight="reg">Don&apos;t have an account? <a href="/signup">Sign up</a></Text>
                </ModalContent>
                <ModalFooter>
                    <Button isLoading={buttonLoading} disabled={!enableSubmit()} sizeButton="large" onClick={() => submitLogin()} typeButton="primary">Log In</Button>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>

    )
}