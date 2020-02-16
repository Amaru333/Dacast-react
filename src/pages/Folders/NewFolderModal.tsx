import React from 'react';
import {Input} from '../../components/FormsComponents/Input/Input';
import { Button } from '../../components/FormsComponents/Button/Button';

export const NewFolderModal = (props: {toggle: Function}) => {
    return (
        <div>
            <Input id='newFolderModalFolderInput' label='Name' />
            <div className='my2'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue' >Cancel</Button>
            </div>
        </div>
    )
}