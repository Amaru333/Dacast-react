import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Modal, ModalFooter, ModalContent } from '../components/FormsComponents/Modal/Modal';
import { Input } from '../components/FormsComponents/Input/Input';
import { Text } from '../components/Typography/Text';
import { Button } from '../components/FormsComponents/Button/Button';
import styled from 'styled-components';

const logo = require('./logo.png');
const stories = storiesOf('Sign Up Form', module);
stories.addDecorator(withKnobs);

stories.add('Form', () => {
    return (
        <ScrollableContainer>
            <ImageStyle src={logo} />
            <Modal style={{ top: "38%" }} size="small" opened={true} title="Sign Up" >
                <ModalContent className="clearfix">
                    <div className="col col-12">
                        <Input type="text" className="col col-6 pr1" label="First Name" placeholder="First Name" />
                        <Input type="text" className="col col-6 pl1" label="Last Name" placeholder="Last Name" />
                    </div>
                    <div className="col col-12">
                        <Input type="url" label="Company Website" placeholder="Company Website" />
                    </div>
                    <div className="col col-12">
                        <Input type="email" label="Email Address" placeholder="Email Address" />
                    </div>
                    <div className="col col-12">
                        <Input type="tel" label="Contact Number" placeholder="Contact Number" />
                    </div>
                    <div className="col col-12">
                        <Input type="password" label="Password" placeholder="Password" icon="visibility_off" />
                    </div>
                    <p><Text size={12} weight="reg" >Already have an account? <a href="#" >Log in.</a></Text><br />
                        <Text size={12} weight="reg" >By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></Text></p>
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Sign Up</Button>
                    <Button sizeButton="large" typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </Modal>
        </ScrollableContainer>
    );
})

var ImageStyle = styled.img`
    width: 400px;
    left: 50%;
    right: 50%;
    top: 9%;
    position: absolute;
    display: block;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
`

var ScrollableContainer = styled.div`
    height: 1400px;
    width:auto;
    background: grey;
    overflow-y: scroll;
`