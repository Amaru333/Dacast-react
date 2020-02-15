import React from 'react';
import { Text } from '../../components/Typography/Text';
import { Button } from '../../components/FormsComponents/Button/Button';
export const EmptyTrashModal = (props: {toggle: Function}) => {

    return (
        <div>
            <Text size={14} weight='reg'>Are you sure that you want to Empty the Trash?</Text>
            <Text size={14} weight='med' >Any content emptied from the Trash will not be retrievable and something about getting back the storage space.</Text>
            <div className='flex my2'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Empty</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}