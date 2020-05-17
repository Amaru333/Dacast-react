import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const NewFolderModal = (props: {submit: Function; toggle: Function; folderPath: string; buttonLabel: 'Create' | 'Rename'}) => {
    const [folderName, setFolderName] =React.useState<string>('')

    return (
        <div className='flex flex-column'>
            <Input className='mb2' id='newFolderModalFolderInput' defaultValue={folderName} onChange={(event) => setFolderName(event.currentTarget.value)} label='Name' />
            <div className='mt2'>
                <Button disabled={folderName.length === 0} onClick={() => props.submit(folderName, props.folderPath)}className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>{props.buttonLabel}</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue' >Cancel</Button>
            </div>
        </div>
    )
}