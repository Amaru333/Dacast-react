import React from "react";
import { Button } from "../../../../components/FormsComponents/Button/Button";
import { Modal } from "../../../../components/Modal/Modal";
import { Text } from "../../../../components/Typography/Text";

export const ContactOwnerModal = (props: {toggle: React.Dispatch<React.SetStateAction<boolean>>; opened: boolean}) => {

    return (
        <React.Fragment>
            <Modal modalTitle="Access restricted" size="small" hasClose={false} toggle={() => props.toggle(false)} opened={props.opened} >
                <Text className='py1 col col-12'>Only the Account Owner can buy more seats.</Text>
                <Text className='py1 col col-12' weight='med'>Please contact the Account Owner to proceed.</Text>
                <Button buttonColor='blue' className='my1' typeButton='primary' sizeButton='small' onClick={() => props.toggle(false)}>Okay</Button>
            </Modal>
        </React.Fragment>
    )
}