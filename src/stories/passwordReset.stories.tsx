import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Input} from '../components/FormsComponents/Input/Input'
import styled from 'styled-components';
import "../scss/style.scss";
import { Modal, ModalContent, ModalFooter } from '../components/FormsComponents/Modal/Modal';
import { Button } from '../components/FormsComponents/Button/Button';
import { Text } from "../components/Typography/Text";


storiesOf('Password Reset', module)
    .add('Password Reset form', () => ( 
        <React.Fragment>
            <Modal size="small" opened={true} title="Password Reset" isClosable>
                <ModalContent className="clearfix">
                        <Text className="col-12" size={14} weight="reg" color="gray-3">Enter your email address to reset your password.</Text>
                        <Input className="col col-12" label="Email Address" placeholder="Email Address"></Input>   
                </ModalContent>
                <ModalFooter>
                    <Button>Reset Password</Button>
                    <Button typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>

    ) );