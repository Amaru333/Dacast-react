import React from 'react' 
import { ModalContent, ModalFooter } from '../../../components/Modal/ModalCard'
import { ModalCard } from '../../../components/Modal/ModalCard'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Text } from '../../../components/Typography/Text'
import { ResetPasswordComponentProps } from '../../../containers/Register/ResetPassword'

export const ResetPasswordPage = (props: ResetPasswordComponentProps) => {

    const [email, setEmail] = React.useState<string>(null)

    return (
        <div>
            <ModalCard className="mx-auto" size="small" title="Password Reset" >
                <ModalContent className="clearfix">
                    <Text className="col col-12" size={14} weight="reg" color="gray-3">Enter your email address to reset your password.</Text>
                    <Input type="email" className="col col-12" label="Email Address" placeholder="Email Address" onChange={(event) => setEmail(event.currentTarget.value)} />   
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => props.resetPassword(email)} sizeButton="large" typeButton="primary">Reset Password</Button>
                    <Button sizeButton="large" typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </ModalCard>
        </div>
    )
}