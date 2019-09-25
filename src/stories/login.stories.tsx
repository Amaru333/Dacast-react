import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Input} from '../components/FormsComponents/Input/Input'
import styled from 'styled-components';
import "../scss/style.scss";
import { Modal, ModalContent, ModalFooter } from '../components/FormsComponents/Modal/Modal';
import { Button } from '../components/FormsComponents/Button/Button';
import { Text } from "../components/Typography/Text";


storiesOf('Login', module)
    .add('Login form', () => ( 
        <React.Fragment>
            <Modal size="small" opened={true} title="User Login">
                <ModalContent className="clearfix">
                    
                        <Input className="col col-12" label="Email Address" placeholder="Email Address"></Input>
                        <Input className="col col-12" label="Password" icon="visibility_off" placeholder="Password"></Input>
                    
                        
                    
                    <Text className="col-12" size={12} weight="reg">Don't have an account? <a href="#">Sign up</a></Text>
                </ModalContent>
                <ModalFooter>
                    <Button>Log In</Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>

    ) );