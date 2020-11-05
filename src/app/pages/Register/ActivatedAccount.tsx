import React from 'react'
import { useHistory } from 'react-router-dom'
import { ModalCard, ModalContent, ModalFooter } from '../../../components/Modal/ModalCard'
import { Text } from '../../../components/Typography/Text'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Card } from '../../../components/Card/Card'
import { LoginContainer, ImageStyle } from '../../shared/Register/RegisterStyle'

const logo = require("../../../../public/assets/logo.png");

export const ActivatedAccountPage = () => {

    let history = useHistory()

    return (
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo} />
            <ModalCard className="mx-auto flex justify-center flex-column" title="">
                <div className="col col-12 flex justify-center">
                    <Text size={24} weight="med">Thank you for activating your account</Text>
                </div>
                <ModalContent className="clearfix mt3">
                    <div className="col col-12 flex justify-center">
                        <Text size={14} weight="reg" color="gray-3">Your email has been confirmed and your account is activated.</Text>
                    </div>
                    <div className="col col-12 mt25 flex justify-center">
                        <Text size={14} weight="reg" color="gray-3">Log in to get started</Text>
                    </div>
                </ModalContent>
                <ModalFooter className="flex justify-center">
                    <Button onClick={() => {history.push('/login')}} sizeButton="large" typeButton="primary">Login</Button>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>
    )
}