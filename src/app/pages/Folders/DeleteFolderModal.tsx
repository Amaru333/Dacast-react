import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
export const DeleteFolderModal = (props: {toggle: (b: boolean) => void; folderName: string; deleteFolder: () => void}) => {

    return (
        <div>
            <Text size={14} weight='reg'>Are you sure that you want to delete {props.folderName} ?</Text>
            <Text size={14} weight='med' >This folder and any sub folders will be deleted permanently. </Text>
            <div className='flex my2'>
                <Button onClick={() => props.deleteFolder()} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Delete</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}