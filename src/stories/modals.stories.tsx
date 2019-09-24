import React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Modal} from '../components/FormsComponents/Modal/Modal'
import {Button} from '../components/FormsComponents/Button/Button'
import {Input} from '../components/FormsComponents/Input/Input'
import {Text} from '../components/Typography/Text'


var openedModals : any = {
    "modal1" : false,
    "modal2": false,
    "modal3": false
}
var toggleModal = ( name : any ) => {
    openedModals[name] = !openedModals[name];
    forceReRender();
}

storiesOf('Modals', module)
  .add('Modal', () => ( 
    <React.Fragment>
        <Button onClick={() => toggleModal("modal1") } > Open warning modal </Button>
        <Modal opened={openedModals['modal1']} toggle={() => toggleModal("modal1")} size="small" title="Test title" isWarning isClosable>
            <div className="modal-content">
                 <Text size={14} weight="med">This is some text</Text>
            </div>
            <div className="modal-footer">
            <Button sizeButton="large" typeButton="primary">Primary</Button>
            <Button sizeButton="large" typeButton="tertiary">Tertiary</Button>
            </div>
        </Modal>

    
        <Button onClick={() => toggleModal("modal2") } > Open small modal </Button>

        <Modal toggle={() => toggleModal("modal2")} opened={openedModals['modal2']} size="small" title="Modal With Inputs" isClosable>
            <div className="modal-content">
                <Input label="Test 1"></Input>
                <Input label="Test 2"></Input>

                
                </div>
                <div className="modal-footer">
                    <Button sizeButton="large" typeButton="primary">Do the thing</Button>
                    <Button sizeButton="large" typeButton="secondary">Don&apos;t do the thing</Button>
                </div>
            


        </Modal>
       
        <Button onClick={() => toggleModal("modal3") } > Open large modal </Button>
        <Modal toggle={() => toggleModal("modal3")} opened={openedModals['modal3']} title="Modal With Inputs" isClosable>
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