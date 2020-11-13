import React from 'react'
import { useHistory } from 'react-router-dom'
import { ModalCard, ModalContent, ModalFooter } from '../../../components/Modal/ModalCard'
import { Text } from '../../../components/Typography/Text'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Card } from '../../../components/Card/Card'
import { LoginContainer, ImageStyle } from '../../shared/Register/RegisterStyle'

const logo = require("../../../../public/assets/logo.png");

export const ActivatedAccountPage = (props: {activationError: string}) => {

    const accountActive = (props.activationError === "" || props.activationError === "Account has already been activated")

    let history = useHistory()

    const setHeader = (activationError: string) => {
        if(activationError === ""){
            return "Thank you for activating your account"
        } else if(activationError === "Account has already been activated") {
            return "Your account has already been activated"
        } else {
            return "Your account cannot be found"
        }
    }

    return (
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo} />
            <ModalCard className="mx-auto flex justify-center flex-column" title="">
                <div className="col col-12 flex justify-center">
                    <Text size={24} weight="med">{setHeader(props.activationError)}</Text>
                </div>
                <ModalContent className="clearfix mt3">
                    <div className="col col-12 flex justify-center">
                        <Text size={14} weight="reg" color="gray-3">{accountActive ? "Your email has been confirmed and your account is activated." : "We couldn’t find an account associated with this email address."}</Text>
                    </div>
                    <div className="col col-12 mt25 flex justify-center">
                        <Text size={14} weight="reg" color="gray-3">{accountActive ? "Log in to get started" : "Need help? Contact Us."}</Text>
                    </div>
                </ModalContent>
                <ModalFooter className="flex justify-center">
                    <Button onClick={() => { accountActive ? history.push('/login') : console.log('something')}} sizeButton="large" typeButton="primary">{accountActive ? "Login" : "Contact Us"}</Button>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>
    )
}