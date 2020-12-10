import React from 'react';
import { ModalCard, ModalFooter, ModalContent } from '../../../../components/Modal/ModalCard';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { LoginContainer, ImageStyle } from '../../../shared/Register/RegisterStyle'
import { useKeyboardSubmit, useQuery } from '../../../../utils/utils';
import { IconStyle } from '../../../../shared/Common/Icon';
import { LoginComponentProps } from '../../../containers/Register/Login/Login';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { isMobile } from 'react-device-detect';
import { handleValidationForm } from '../../../utils/custom-hooks/formValidationHook';
import { useForm } from 'react-hook-form';
import { LoginInfos } from '../../../redux-flow/store/Register/Login';

const logo = require('../../../../../public/assets/logo.png');

export const LoginPage = (props: LoginComponentProps) => {

    let query = useQuery()

    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [migratedUserMessage, setMigratedUserMessage] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (query.get('email')) {
            props.confirmEmail(query.get('email'))
        }
        if (query.get('from') && query.get('from') === 'legacy') {
            setMigratedUserMessage(true)
        }
    }, [])

    const { register, handleSubmit, errors } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })

    const enableSubmit = () => {
        return true;
    }

    const submitLogin = (data: LoginInfos) => {
        setButtonLoading(true);
        props.login(data)
        .then(() => setButtonLoading(false))
        .catch(() => setButtonLoading(false))
    }

    useKeyboardSubmit( ()=> {
        if(!buttonLoading) {
            handleSubmit(submitLogin)
        }
    })

    return (
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo} />
            <ModalCard className={"mx-auto" + (isMobile ? " col-12-important" : "")} size="small" title="User Login" >
                <form id="formSignUp" onSubmit={handleSubmit(submitLogin)}>
                    <ModalContent className="clearfix">
                        <Input {...handleValidationForm('email', errors, 'email', register)} type="email" className="col col-12 pt1" label="Email Address" placeholder="Email Address" />
                        <div className=" relative col col-12 flex pt1">
                            <div className='relative flex col col-12'>
                                <Input {...handleValidationForm('password', errors, 'password', register)} type={passwordVisible ? "text" : "password"} className='col col-12' label="Password" placeholder="Password" />
                                <IconStyle onClick={() => setPasswordVisible(!passwordVisible)} className='absolute pointer top-0 right-0 pt35 pr2' coloricon='gray-3'>{passwordVisible ? 'visibility_off' : 'visibility_on'}</IconStyle>
                            </div>
                            <Text color="gray-1" className='absolute right-0 pt1' size={12} weight="reg"><a href="/forgot-password">Forgot your password?</a></Text>
                        </div>

                        <Text className="col col-12" color="gray-1" size={12} weight="reg">Don&apos;t have an account? <a href="/signup">Sign up</a></Text>
                    </ModalContent>
                    <Bubble hidden={!props.loginInfos || (props.loginInfos && !props.loginInfos.error)} type='error' className='my2'>
                        Unable to sign in. Please check your details and try again.
                    </Bubble>
                    {
                        migratedUserMessage && 
                        <Bubble type='info' className='my2'>
                            <span>You have been upgraded to our new customer portal.</span>
                            <br/>
                            <span>Please login here and start using the new Dashboard</span>                    
                        </Bubble>
                    }
                    <ModalFooter>
                        <Button isLoading={buttonLoading} disabled={!enableSubmit()} sizeButton="large"  type="submit" typeButton="primary">Log In</Button>
                    </ModalFooter>
                </form>
            </ModalCard>
        </LoginContainer>
    )
}