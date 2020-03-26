import React from 'react'
import { useHistory } from 'react-router-dom'
import { ModalCard, ModalContent, ModalFooter } from '../../../components/Modal/ModalCard'
import { Text } from '../../../components/Typography/Text'
import { Button } from '../../../components/FormsComponents/Button/Button'

export const ActivatedAccountPage = () => {

    let history = useHistory()

    return (
        <div>
            <ModalCard className="mx-auto" size="small" title="Account Activated!" >
                <ModalContent className="clearfix">
                    <Text className="col col-12" size={14} weight="reg" color="gray-3">Your account has been activated! You can now login.</Text>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {history.push('/login')}} sizeButton="large" typeButton="primary">Login</Button>
                </ModalFooter>
            </ModalCard>
        </div>
    )
}