import React from 'react'
import { Modal } from '../../../components/Modal/Modal'
import { Text } from '../../../components/Typography/Text'
import { Button } from '../../../components/FormsComponents/Button/Button'

export const ConfirmationModal  = (props: {submit: Function; toggle: Function; isOpened: boolean}) => {
    return (
        <Modal hasClose={false} toggle={() => props.toggle(!props.isOpened)} opened={props.isOpened} title='Confirm changes' >
            <Text size={14}>Are you sure you want to save these changes?</Text>
            <div className='my2 flex'>
                <Button className='mr2'  onClick={() => props.submit()} typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </Modal>
    )
}