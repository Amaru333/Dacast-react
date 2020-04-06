import React from 'react' 
import { ModalContent, ModalFooter } from '../../../../components/Modal/ModalCard'
import { ModalCard } from '../../../../components/Modal/ModalCard'
import { Input } from '../../../../components/FormsComponents/Input/Input'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { Text } from '../../../../components/Typography/Text'
import { ForgotPasswordComponentProps } from '../../../containers/Register/ForgotPassword'
import { useHistory } from 'react-router'
import { LoginContainer, ImageStyle } from '../../../shared/Register/RegisterStyle'

const logo = require('../../../../../public/assets/logo.png');


export const ForgotPasswordPage = (props: ForgotPasswordComponentProps) => {

    const [email, setEmail] = React.useState<string>(null)
    let history = useHistory()

    return (
        <LoginContainer>
        <ImageStyle className="mx-auto" src={logo} />
            <ModalCard className="mx-auto" size="small" title="Password Reset" >
                <ModalContent className="clearfix">
                    <Text className="col col-12" size={14} weight="reg" color="gray-3">Enter your email address to reset your password.</Text>
                    <Input type="email" className="col col-12" label="Email Address" placeholder="Email Address" onChange={(event) => setEmail(event.currentTarget.value)} />   
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {props.forgotPassword(email); history.push('/reset-password')}} sizeButton="large" typeButton="primary">Reset Password</Button>
                    <Button onClick={() => {history.push('/login')}} sizeButton="large" typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>
    )
}