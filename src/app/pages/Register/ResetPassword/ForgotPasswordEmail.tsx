import React from 'react';
import { LoginContainer, ImageStyle } from '../../../shared/Register/RegisterStyle';
import { ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { ModalCard } from '../../../../components/Modal/ModalCard';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { useHistory } from 'react-router';
import { useQuery } from '../../../../utils/utils';

const logo = require('../../../../../public/assets/logo.png');

export const ForgotPasswordEmail = () => {

    let history = useHistory()
    let query = useQuery()
    
    return (
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo}/>
            <ModalCard className="mx-auto" size="small" title="Check your emails">
                <ModalContent>
                    <div className="my1">
                        <Text size={14} weight="reg">We have sent an email to {query.get('email')}</Text>
                    </div>
                    <div className="my1">
                        <Text size={14} weight="reg">Please follow the steps in the email to reset your password.</Text>
                    </div>
                    
                </ModalContent>
                <ModalFooter>
                    <div className="mt1">
                        <Text size={12} weight="reg">Didn’t receive an email? <a href='#' onClick={() => {}}>Re-send email confirmation.</a></Text>
                    </div>
                    <Button className='mt2' onClick={() => history.push('/login')} buttonColor='blue' typeButton='primary' sizeButton='large'>Back to Log In</Button>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>
    )
}