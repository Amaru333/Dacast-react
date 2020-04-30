import React from 'react'
import { ModalCard, ModalContent, ModalFooter } from '../../../../components/Modal/ModalCard'
import { Input } from '../../../../components/FormsComponents/Input/Input'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { Text } from '../../../../components/Typography/Text'

import axios from 'axios'
import { LoginContainer, ImageStyle } from '../../../shared/Register/RegisterStyle'
import { IconStyle } from '../../../../shared/Common/Icon';
import { useQuery } from '../../../../utils/utils';

const logo = require('../../../../../public/assets/logo.png');


export const ChangePassword = (props: any) => {

    let query = useQuery()

    const [email, setEmail] = React.useState<string>(null)

    React.useEffect(() => {
        // request to get the token
        axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/reset-password/send-token', {email: query.get('email')})
            .then(response => {
                setEmail(response.data.data)
            })
    }, [])

    const [newPassword, setNewPassword] = React.useState<string>('')
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)

    const handleChangePassword = (passwordText: string) => {
        axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/reset-password', {newPassword: passwordText, email: 'whatever@dacast.com', verificationToken: '9098'})
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