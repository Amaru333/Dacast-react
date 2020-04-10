import React from 'react';
import { LoginContainer, ImageStyle } from '../../../shared/Register/RegisterStyle'
import { ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { ModalCard } from '../../../../components/Modal/ModalCard';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { SignupContainerProps } from '../../../containers/Register/SignUp/SignUp';
import { defaultStateSignup, UserInfo } from '../../../redux-flow/store/Register/SignUp/types';
import { useHistory } from 'react-router-dom';
import { useKeyboardSubmit } from '../../../../utils/utils';
import { IconStyle } from '../../../../shared/Common/Icon';

const logo = require('../../../../../public/assets/logo.png');


export const SignupPage = (props: SignupContainerProps) => {

    let history = useHistory()

    const [userInfo, setUserInfo] = React.useState<UserInfo>(defaultStateSignup)
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)

    const validateForm = () => {
        return Object.keys(userInfo).every(key => userInfo[key] || key === 'id')
    }

    const submitSignup = () => {
        if(validateForm) {
            props.signup(userInfo)
            history.push('/confirm-email')
        }
    }

    useKeyboardSubmit(submitSignup)

    return (<LoginContainer>
        <ImageStyle className="mx-auto" src={logo} />
        <ModalCard className="mx-auto" size="small" title="Sign Up">
            <ModalContent className="clearfix">
                <div className="col col-12">
                    <Input type="text" className="col col-6 pr1" label="First Name" placeholder="First Name" onChange={event => setUserInfo({...userInfo, firstName: event.currentTarget.value})} />
                    <Input type="text" className="col col-6 pl1" label="Last Name" placeholder="Last Name" onChange={event => setUserInfo({...userInfo, lastName: event.currentTarget.value})} />
                </div>
                <Input className="col col-12" type="url" label="Company Website" placeholder="Company Website" onChange={event => setUserInfo({...userInfo, website: event.currentTarget.value})} />
                <Input className="col col-12" type="email" label="Email Address" placeholder="Email Address" onChange={event => setUserInfo({...userInfo, email: event.currentTarget.value})} />
                <Input className="col col-12" label="Phone Number" placeholder="Phone Number" onChange={event => setUserInfo({...userInfo, phone: event.currentTarget.value})} />
                <div className='flex relative col col-12'>
                    <Input className="col col-12" type={passwordVisible ? "text" : "password"} label="Create Password" placeholder="Password" onChange={event => setUserInfo({...userInfo, password: event.currentTarget.value})} />
                    <IconStyle onClick={() => setPasswordVisible(!passwordVisible)} className='absolute pointer top-0 right-0 pt35 pr2' coloricon='gray-3'>{passwordVisible ? 'visibility_off' : 'visibility_on'}</IconStyle>
                </div>
                <p>
                    <Text color="gray-1" size={12} weight="reg">Already have an account? <a href="/login">Log in.</a></Text><br />
                    <div className="mt1">
                        <Text color="gray-1" size={12} weight="reg">By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></Text>
                    </div>

                </p>
            </ModalContent>
            <ModalFooter>
                <Button disabled={!validateForm()} sizeButton="large" typeButton="primary" onClick={() => submitSignup()}>Sign Up</Button>
                <Button sizeButton="large" typeButton="tertiary" onClick={() => history.push("/login")}>Cancel</Button>
            </ModalFooter>
        </ModalCard>
    </LoginContainer>);
}