import React from 'react';
import { LoginContainer, ImageStyle } from '../Login/Login'
import { ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { ModalCard } from '../../../components/Modal/ModalCard';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';

const logo = require('../../../../public/assets/logo.png');


export const SignUpPage = () => {
    return(
        <LoginContainer>
            <ImageStyle className="mx-auto" src={logo} />
            <ModalCard className="mx-auto" size="small" title="Sign Up" >
                <ModalContent className="clearfix">
                    <div className="col col-12">
                        <Input type="text" className="col col-6 pr1" label="First Name" placeholder="First Name"  />
                        <Input type="text" className="col col-6 pl1" label="Last Name" placeholder="Last Name" />
                    </div>
                    <Input className="col col-12" type="url" label="Company Website" placeholder="Company Website"  />
                    <Input className="col col-12" type="email" label="Email Address" placeholder="Email Address" />
                    <Input className="col col-12" type="tel" label="Phone Number" placeholder="Phone Number" />
                    <Input className="col col-12" type="password" label="Create Password" placeholder="Password" />
                    <p>
                        <Text color="gray-1" size={12} weight="reg" >Already have an account? <a href="#" >Log in.</a></Text><br />
                        <div className="mt1">
                            <Text color="gray-1" size={12} weight="reg" >By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></Text>
                        </div>
                        
                    </p>
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Sign Up</Button>
                    <Button sizeButton="large" typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </ModalCard>
        </LoginContainer>
        
    )
}