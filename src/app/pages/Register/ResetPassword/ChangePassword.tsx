import React from 'react'
import { ModalCard, ModalContent, ModalFooter } from '../../../../components/Modal/ModalCard'
import { Input } from '../../../../components/FormsComponents/Input/Input'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { Text } from '../../../../components/Typography/Text'
import axios from 'axios'
import { LoginContainer, ImageStyle } from '../../../shared/Register/RegisterStyle'
import { IconStyle } from '../../../../shared/Common/Icon';
import { useQuery } from '../../../../utils/utils';
import { useHistory } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../../redux-flow/store';
import { Action } from '../../../redux-flow/store/Register/ResetPassword/actions';
import { Size, NotificationType } from '../../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../../redux-flow/store/Toasts/actions';
import { connect } from 'react-redux';

const logo = require('../../../../../public/assets/logo.png');

export interface ChangePasswordProps {
    showToast: Function;
}

const ChangePassword = (props: ChangePasswordProps) => {

    let query = useQuery()
    let history = useHistory()

    const [newPassword, setNewPassword] = React.useState<string>('')
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)

    const handleChangePassword = (passwordText: string) => {
        axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/reset-password', {newPassword: passwordText, email: query.get('email'), verificationToken: query.get('reset_code')})
        history.push('/login')
        props.showToast("Your password has been reset", 'flexible', "success")
    }
    return (
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo} />
            <ModalCard className='mx-auto' size="small" title="Reset Password">
                <ModalContent >
                    <Text size={14}>Please enter your new password.</Text>
                    <div className=" relative col col-12 flex">
                        <Input 
                            disabled={false} 
                            defaultValue={''}
                            onChange={(event) => setNewPassword(event.currentTarget.value)}
                            type={passwordVisible ? "text" : "password"} 
                            className="col col-12" 
                            id="newPassword" 
                            label="New Password" 
                            placeholder="New Password" 
                            help='Your password must contain at least 6 characters.'
                            required
                        />
                        <IconStyle onClick={() => setPasswordVisible(!passwordVisible)} className='absolute pointer top-0 right-0 pt35 pr2' coloricon='gray-3'>{passwordVisible ? 'visibility_off' : 'visibility_on'}</IconStyle>
                    </div>
                </ModalContent>
                <ModalFooter>
                    <Button disabled={newPassword.length < 5} onClick={() => handleChangePassword(newPassword)} sizeButton="large" typeButton="primary">Change Password</Button>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>

    )
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(null, mapDispatchToProps)(ChangePassword)