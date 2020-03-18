import React from 'react'
import { ModalCard, ModalContent } from '../../../../components/Modal/ModalCard'
import { Input } from '../../../../components/FormsComponents/Input/Input'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import axios from 'axios'

export const ChangePassword = (props: any) => {

    const [email, setEmail] = React.useState<string>(null)

    React.useEffect(() => {
        // request to get the token
        axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/reset-password/send-token', {email: 'jean.bernardo@dacast.com'})
        .then(response => {
            debugger
            setEmail(response.data.data)
        })
    }, [])

    const [newPassword, setNewPassword] = React.useState<string>(null)
    const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>(null)

    const handleChangePassword = (passwordText: string) => {
        axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/reset-password', {newPassword: passwordText, email: 'jean.bernardo@dacast.com', verificationToken: '9098'})
    }
    return (
        <ModalCard size="small" title="Reset Password">
        <ModalContent>
            <Input 
                disabled={false} 
                defaultValue={''}
                onChange={(event) => setNewPassword(event.currentTarget.value)}
                type="password" 
                className="col col-12" 
                id="newPassword" 
                label="New Password" 
                placeholder="New Password" 
                help='Must contain more than 6 characters'
                required
            />
            <Input 
                disabled={false} 
                defaultValue={''}
                onChange={(event) => setConfirmNewPassword(event.currentTarget.value)}
                type="password" 
                className="col col-12" 
                id="confirmPassword" 
                label="Confirm Password" 
                placeholder="Confirm Password" 
                required
            />
            <Button disabled={newPassword !== confirmNewPassword} onClick={() => handleChangePassword(newPassword)} sizeButton="large" typeButton="primary">Change Password</Button>
        </ModalContent>
        
        {/* <ModalFooter>
            
        </ModalFooter> */}
        </ModalCard>
    )
}