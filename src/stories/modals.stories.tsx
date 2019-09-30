import React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { Modal, ModalContent, ModalFooter } from '../components/Modal/Modal'
import { Button } from '../components/FormsComponents/Button/Button'
import { Input } from '../components/FormsComponents/Input/Input'
import { Text } from '../components/Typography/Text'


var openedModals: any = {
    "modal1": false,
    "modal2": false,
    "modal3": false
}
var toggleModal = (name: any) => {
    openedModals[name] = !openedModals[name];
    forceReRender();
}

storiesOf('Modals', module)
    .add('Modal', () => (
        <React.Fragment>
            <Button className="m2" onClick={() => toggleModal("modal1")} > Open warning modal </Button>
            <Modal icon={{ name: "warning", color: "red" }} opened={openedModals['modal1']} toggle={() => toggleModal("modal1")} size="small" title="Test title">
                <ModalContent>
                    <Text size={14} weight="med">This is some text</Text>
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Primary</Button>
                    <Button sizeButton="large" typeButton="tertiary">Tertiary</Button>
                </ModalFooter>
            </Modal>

            <Button className="m2" onClick={() => toggleModal("modal2")} > Open small modal </Button>
            <Modal toggle={() => toggleModal("modal2")} opened={openedModals['modal2']} size="small" title="Modal With Inputs">
                <ModalContent>
                    <Input label="Test 1"></Input>
                    <Input label="Test 2"></Input>


                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Do the thing</Button>
                    <Button sizeButton="large" typeButton="secondary">Don&apos;t do the thing</Button>
                </ModalFooter>

            </Modal>

            <Button className="m2" onClick={() => toggleModal("modal3")} > Open large modal </Button>
            <Modal toggle={() => toggleModal("modal3")} opened={openedModals['modal3']} title="Modal With Inputs">
                <ModalContent>
                    <Input label="Test 1"></Input>
                    <Input label="Test 2"></Input>

                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Do the thing</Button>
                    <Button sizeButton="large" typeButton="tertiary">Don&apos;t do the thing</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    ))