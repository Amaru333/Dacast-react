import React from 'react';
import { Modal, ModalFooter } from '../../../components/Modal/Modal';
import { PaymentModalProps } from '../../../components/Modal/ModalTypes';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { useHistory } from 'react-router';



export const PaymentSuccessModal = (props: PaymentModalProps) => {

    let history = useHistory()

    return (
        <Modal hasClose={false} icon={{ name: "check_circle_outline", color: "green" }} size="small" modalTitle="Payment Successful" toggle={props.toggle} opened={props.opened} >
                    <div className="mt2 mb3">
                        {props.children}
                    </div>
                    <ModalFooter>
                        <Button onClick={props.toggle}>Confirm</Button>
                        <Button onClick={() => {history.push('/account/invoices')}} typeButton="tertiary">See Invoices</Button>
                    </ModalFooter>
                </Modal>
    )
}