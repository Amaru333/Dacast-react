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
import { useForm } from 'react-hook-form'
import { handleValidationForm } from '../../../utils/hooksFormSubmit';

const logo = require('../../../../../public/assets/logo.png');


export const SignupPage = (props: SignupContainerProps) => {

    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false)

    const { register, handleSubmit, errors } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })
    let history = useHistory();

    const onSubmit = (data: UserInfo) => { 
        setSubmitLoading(true);
        props.signup(data, () => {
            history.push('/confirm-email');
            setSubmitLoading(false);
        });
    }

    useKeyboardSubmit( ()=> handleSubmit(onSubmit) )

    console.log(errors);
    return (<LoginContainer>
        <ImageStyle className="mx-auto" src={logo} />
        <ModalCard className="mx-auto" size="small" title="Sign Up">
            <ModalContent className="clearfix">
                <form id="formSignUp" onSubmit={handleSubmit(onSubmit)}>
                    <Input {...handleValidationForm('firstName', errors)} ref={register({ required: "Required"})} type="text" className="col col-6 pr1 pt1" label="First Name" placeholder="First Name" />
                    <Input {...handleValidationForm('lastName', errors)} ref={register({ required: "Required" })} name="lastName" type="text" className="col col-6 pl1 pt1" label="Last Name" placeholder="Last Name" />
                    <Input {...handleValidationForm('website', errors, 'url', register)} className="col col-12 pt2" label="Company Website" placeholder="Company Website"  />
                    <Input {...handleValidationForm('email', errors, 'email', register)} className="col col-12 pt2" label="Email Address" placeholder="Email Address" />
                    <Input {...handleValidationForm('phone', errors, 'tel', register)} className="col col-12 pt2" label="Phone Number" placeholder="Phone Number" />
                    <div className='flex relative col col-12 pt2 pb25'>
                        <Input {...handleValidationForm('password', errors, 'password', register)} className="col col-12" type={passwordVisible ? "text" : "password"} label="Create Password" placeholder="Password" />
                        <IconStyle onClick={() => setPasswordVisible(!passwordVisible)} className='absolute pointer top-1 right-0 pt35 pr2' coloricon='gray-3'>{passwordVisible ? 'visibility_off' : 'visibility_on'}</IconStyle>
                    </div>
                    <Text className="left" color="gray-1" size={12} weight="reg">Already have an account? <a href="/login">Log in.</a></Text><br />
                    <Text className="left mt1" color="gray-1" size={12} weight="reg">By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></Text>
                </form>
                
            </ModalContent>
            <ModalFooter>
                <Button sizeButton="large" isLoading={submitLoading} typeButton="primary" type="submit" form="formSignUp">Sign Up</Button>
                <Button sizeButton="large" typeButton="tertiary" onClick={() => history.push("/login")}>Cancel</Button>
            </ModalFooter>
        </ModalCard>
    </LoginContainer>);
}