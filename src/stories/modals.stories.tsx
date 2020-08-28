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
            <Button className="m2" onClick={() => toggleModal("modal1")} sizeButton="large" typeButton="primary" > Open warning modal </Button>
            <Modal icon={{ name: "warning", color: "red" }} opened={openedModals['modal1']} toggle={() => toggleModal("modal1")} size="small" modalTitle="Warning Modal Title">
                <ModalContent>
                    <Text color="gray-1" size={14} weight="med">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget blandit tellus. Morbi placerat augue ut luctus sodales. Maecenas euismod.</Text>
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Action</Button>
                    <Button sizeButton="large" typeButton="tertiary">Discard Action</Button>
                </ModalFooter>
            </Modal>

            <Button className="m2" onClick={() => toggleModal("modal2")} sizeButton="large" typeButton="primary" > Open small modal </Button>
            <Modal toggle={() => toggleModal("modal2")} opened={openedModals['modal2']} size="small" modalTitle="Small Modal With Inputs">
                <ModalContent>
                    <Input className='col col-12' disabled={false} required={false} label="Example Input"></Input>
                    <Input className='col col-12' disabled={false} required={false} label="Example other Input"></Input>
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Action</Button>
                    <Button sizeButton="large" typeButton="secondary">Discard Action</Button>
                </ModalFooter>

            </Modal>

            <Button className="m2" onClick={() => toggleModal("modal3")} sizeButton="large" typeButton="primary" > Open large modal </Button>
            <Modal toggle={() => toggleModal("modal3")} opened={openedModals['modal3']} modalTitle="Large Modal With Inputs">
                <ModalContent>
                    <Input className='col col-12 sm-col-6 pr1' disabled={false} required={false} label="Example Input"></Input>
                    <Input className='col col-12 sm-col-6 pl1' disabled={false} required={false} label="Example other Input"></Input>

                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Action</Button>
                    <Button sizeButton="large" typeButton="tertiary">Discard Action</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    ))