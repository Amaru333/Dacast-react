import React from 'react';
import { Modal, ModalContent, ModalFooter } from '../../../Modal/Modal';
import { Button } from '../../../FormsComponents/Button/Button';

export const ThumbnailModal = (props) => {

    return (
        <Modal size="small" title="Add Thumbnail" toggle={props.toggle} opened={props.opened}>
                <ModalContent>

                </ModalContent>
                <ModalFooter>
                    <Button>Select</Button>
                    <Button onClick={props.toggle} typeButton="secondary">Cancel</Button> 
                </ModalFooter>
            </Modal>
    )
}