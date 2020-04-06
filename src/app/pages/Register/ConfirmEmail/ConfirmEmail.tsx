import React from 'react';
import { LoginContainer, ImageStyle } from '../../../shared/Register/RegisterStyle';
import { ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { ModalCard } from '../../../../components/Modal/ModalCard';
import { Text } from '../../../../components/Typography/Text';
import { ConfirmEmailComponentProps } from '../../../containers/Register/ConfirmEmail'

const logo = require('../../../../../public/assets/logo.png');


export const ConfirmEmailPage = (props: ConfirmEmailComponentProps) => {

    React.useEffect(() => {
        props.confirmEmail(props.email)
    }, [])
    
    return(
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo}/>
            <ModalCard className="mx-auto" size="small" title="Confirm Email Address">
                <ModalContent>
                    <div className="my1">
                        <Text size={14} weight="reg">We have sent an email to {props.email}</Text>
                    </div>
                    <div className="my1">
                        <Text size={14} weight="reg">To complete the registration process, please click the link in the email to confirm your email address.</Text>
                    </div>
                    
                </ModalContent>
                <ModalFooter>
                    <div className="mt2">
                        <Text size={12} weight="reg">Didn’t receive an email? <a href='#' onClick={() => props.confirmEmail(props.email)}>Re-send email confirmation.</a></Text>
                    </div>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>
    )
}