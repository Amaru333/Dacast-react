import React from 'react';
import { Modal, ModalFooter } from '../../../components/Modal/Modal';
import { PaymentModalProps } from '../../../components/Modal/ModalTypes';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { useHistory } from 'react-router';



export const PaymentFailedModal = (props: PaymentModalProps) => {

    let history = useHistory()

    return (
        <Modal icon={{ name: "warning_outlined", color: "red" }} size="small" modalTitle="Payment Declined" toggle={props.toggle} opened={props.opened} hasClose={true}>
            <div className="mt2 mb3">
                {props.children}
            </div>
            <ModalFooter>
                <Button onClick={props.toggle}>Confirm</Button>
                <Button onClick={() => {history.push('/account/billing')}} typeButton="tertiary">Update Payment Method</Button>
            </ModalFooter>
        </Modal>
    )
}