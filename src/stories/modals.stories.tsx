import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Modal} from '../components/FormsComponents/Modal/Modal'
import {Button} from '../components/FormsComponents/Button/Button'
import {Input} from '../components/FormsComponents/Input/Input'
import {Text} from '../components/Typography/Text'

storiesOf('Modals', module)
    .add('Modal', () => ( 
        <React.Fragment>
            <Modal sizeModal="small" titleModal="Test title" isWarning>
                <div className="modal-content">
                    <Text size={14} weight="med">This is some text</Text>
                </div>
                <div className="modal-footer">
                    <Button sizeButton="large" typeButton="primary">Primary</Button>
                    <Button sizeButton="large" typeButton="tertiary">Tertiary</Button>
                </div>
            </Modal>

            <Modal sizeModal="small" titleModal="Modal With Inputs" isClosable>
                <div className="modal-content">
                    <Input label="Test 1"></Input>
                    <Input label="Test 2"></Input>
                
                </div>
                <div className="modal-footer">
                    <Button sizeButton="large" typeButton="primary">Do the thing</Button>
                    <Button sizeButton="large" typeButton="secondary">Don&apos;t do the thing</Button>
                </div>
            

            </Modal>

            <Modal titleModal="Modal With Inputs" isClosable>
                <div className="modal-content">
                    <Input label="Test 1"></Input>
                    <Input label="Test 2"></Input>
                
                </div>
                <div className="modal-footer">
                    <Button sizeButton="large" typeButton="primary">Do the thing</Button>
                    <Button sizeButton="large" typeButton="tertiary">Don&apos;t do the thing</Button>
                </div>
            </Modal>
        </React.Fragment>
    ))