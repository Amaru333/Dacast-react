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
import { handleValidationForm } from '../../../utils/custom-hooks/formValidationHook';
import { ReCaptcha } from 'react-recaptcha-v3'
import axios from 'axios'
import { Bubble } from '../../../../components/Bubble/Bubble';
 

const logo = require('../../../../../public/assets/logo.png');


export const SignupPage = (props: SignupContainerProps) => {

    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false)
    const [recaptchaToken, setRecaptchaToken] = React.useState<string>('')

    const { register, handleSubmit, errors } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })
    let history = useHistory();

    const verifyCallback = (recaptchaToken: string) => {
        setRecaptchaToken(recaptchaToken);
    }

    const updateToken = () => {
        recaptcha.execute();
    }
    
    let recaptcha = React.useRef<any>(null)

    const onSubmit = (data: UserInfo) => { 
        setSubmitLoading(true);
        data.token = recaptchaToken;
        props.signup(data)
        .then(() => setSubmitLoading(false))
    }

    React.useEffect(() => {
        if (props.UserInfo.email) {
            history.push('/confirm-email')
        }
    }, [props.UserInfo.email])

    useKeyboardSubmit( ()=> {
        if(!submitLoading) {
            handleSubmit(onSubmit)
        }
    })

    return (<LoginContainer>
        <ImageStyle className="mx-auto" src={logo} />
        <ModalCard className="mx-auto" size="small" title="Sign Up">
            <ModalContent className="clearfix">
                <form id="formSignUp" onSubmit={handleSubmit(onSubmit)}>
                    <Input {...handleValidationForm('firstName', errors)} ref={register({ required: "Required"})} type="text" className="col col-6 pr1 pt1" label="First Name" placeholder="First Name" />
                    <Input {...handleValidationForm('lastName', errors)} ref={register({ required: "Required" })} name="lastName" type="text" className="col col-6 pl1 pt1" label="Last Name" placeholder="Last Name" />
                    <Input {...handleValidationForm('email', errors, 'email', register)} className="col col-12 pt2" label="Email Address" placeholder="Email Address" />
                    <Input {...handleValidationForm('phone', errors, 'tel', register)} className="col col-12 pt2" label="Phone Number" placeholder="Phone Number" />
                    <Input {...handleValidationForm('companyName', errors)} ref={register({ required: "Required"})} type="text" className="col col-12 pt2" label="Company Name" placeholder="Company Name" />
                    <Input {...handleValidationForm('website', errors, 'url', register)} className="col col-12 pt2" label="Company Website" placeholder="Company Website"  />
                    <div className='flex relative col col-12 pt2 pb25'>
                        <Input {...handleValidationForm('password', errors, 'password', register)} className="col col-12" type={passwordVisible ? "text" : "password"} label="Create Password" placeholder="Password" />
                        <IconStyle onClick={() => setPasswordVisible(!passwordVisible)} className='absolute pointer top-1 right-0 pt35 pr2' coloricon='gray-3'>{passwordVisible ? 'visibility_off' : 'visibility_on'}</IconStyle>
                    </div>  
                    <Text className="left" color="gray-1" size={12} weight="reg">Already have an account? <a href="/login">Log in.</a></Text><br />
                    <Text className="left mt1" color="gray-1" size={12} weight="reg">By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></Text>
                </form>
                <ReCaptcha
                    ref={recaptcha}
                    sitekey="6LekUrsZAAAAAL3l5GxJ157Yw9qWDwEOyvo_gGCy"
                    action='action_name'
                    verifyCallback={verifyCallback}
                />
            </ModalContent>
            <Bubble hidden={!props.UserInfo || (props.UserInfo && !props.UserInfo.signupError)} type='error' className='my2'>
                {props.UserInfo.signupError}
            </Bubble>
            <ModalFooter>
                <Button sizeButton="large" isLoading={submitLoading} typeButton="primary" type="submit" form="formSignUp">Sign Up</Button>
                <Button sizeButton="large" typeButton="tertiary" onClick={() => history.push("/login")}>Cancel</Button>
            </ModalFooter>
        </ModalCard>
    </LoginContainer>);
}