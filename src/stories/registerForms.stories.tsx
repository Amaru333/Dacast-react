import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Modal, ModalFooter, ModalContent } from '../components/FormsComponents/Modal/Modal';
import { Input } from '../components/FormsComponents/Input/Input';
import { Text } from '../components/Typography/Text';
import { Button } from '../components/FormsComponents/Button/Button';
import styled from 'styled-components';

const logo = require('./logo.png');
const stories = storiesOf('Register Forms', module);
stories.addDecorator(withKnobs);

stories.add('Sign Up', () => {
    return (
        <ScrollableContainer>
            <ImageStyle src={logo} />
            <Modal hideOverlay={true} style={{ top: "465px" }} size="small" opened={true} title="Sign Up" >
                <ModalContent className="clearfix">
                    <div className="col col-12">
                        <Input type="text" className="col col-6 pr1" label="First Name" placeholder="First Name" />
                        <Input type="text" className="col col-6 pl1" label="Last Name" placeholder="Last Name" />
                    </div>
                    <Input className="col col-12" type="url" label="Company Website" placeholder="Company Website" />
                    <Input className="col col-12" type="email" label="Email Address" placeholder="Email Address" />
                    <Input className="col col-12" type="tel" label="Contact Number" placeholder="Contact Number" />
                    <Input className="col col-12" type="password" label="Password" placeholder="Password" icon="visibility_off" />
                    <p>
                        <Text size={12} weight="reg" >Already have an account? <a href="#" >Log in.</a></Text><br />
                        <Text size={12} weight="reg" >By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></Text>
                    </p>
                </ModalContent>
                <ModalFooter>
                    <Button>Sign Up</Button>
                    <Button typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </Modal>
        </ScrollableContainer>
    );
})

stories.add('Log In', () => {
    return (
        <ScrollableContainer>
            <ImageStyle src={logo} />
            <Modal hideOverlay={true} style={{ top: "332px" }} size="small" opened={true} title="User Login" >
                <ModalContent className="clearfix">
                    <Input type="email" className="col col-12" label="Email Address" placeholder="Email Address" />
                    <Input type="password" className="col col-12" label="Password" icon="visibility_off" placeholder="Password" />
                    <Text className="col col-12" size={12} weight="reg">Don&apos;t have an account? <a href="#">Sign up</a></Text>
                </ModalContent>
                <ModalFooter>
                    <Button>Log In</Button>
                </ModalFooter>
            </Modal>
        </ScrollableContainer>
    );
})

stories.add('Reset Password', () => {
    return (
        <ScrollableContainer>
            <ImageStyle src={logo} />
            <Modal hideOverlay={true} style={{ top: "287px" }} size="small" opened={true} title="Password Reset" >
                <ModalContent className="clearfix">
                    <Text className="col col-12" size={14} weight="reg" color="gray-3">Enter your email address to reset your password.</Text>
                    <Input type="email" className="col col-12" label="Email Address" placeholder="Email Address" />   
                </ModalContent>
                <ModalFooter>
                    <Button>Reset Password</Button>
                    <Button typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </Modal>
        </ScrollableContainer>
    );
})

stories.add('Confirm Email Address', () => {
    return (
        <ScrollableContainer>
            <ImageStyle src={logo} />
            <Modal hideOverlay={true} style={{ top: "317px" }} size="small" opened={true} title="Confirm Email Address" >
                <ModalContent className="clearfix">
                    <Text className="col col-12" size={14} weight="reg" color="gray-3">We have sent an email to <a href="#">john.doe@hotmail.com.</a></Text>
                    <Text className="col col-12" size={14} weight="reg" color="gray-3">To complete the registration process please click the link in the email to confirm your email address.</Text>  
                </ModalContent>
                <ModalFooter>
                    <Text className="col col-12" size={12} weight="reg" color="gray-3">Didn't recieve an email? <a href="#">Re-send email confirmation.</a></Text>
                </ModalFooter>
            </Modal>
        </ScrollableContainer>
    )
})

var ImageStyle = styled.img`
    width: 307.5px;
    left: 50%;
    right: 50%;
    top: 85px;
    position: absolute;
    display: block;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
`

var ScrollableContainer = styled.div`
    height: 1400px;
    width:auto;
    background: #EBEFF5;
    overflow-y: scroll;
`
