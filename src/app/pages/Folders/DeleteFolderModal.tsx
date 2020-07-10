import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const DeleteFolderModal = (props: {toggle: (b: boolean) => void; folderName: string; deleteFolder: () => Promise<void>}) => {

    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        props.deleteFolder().then(() => {
            setButtonLoading(false)
            props.toggle(false)
        }).catch(() => {
            setButtonLoading(false)
        })
    }

    return (
        <div className='flex flex-column'>
            <Text size={14} weight='reg'>Are you sure that you want to delete {props.folderName} ?</Text>
            <Text size={14} weight='med' >This folder and any sub folders will be deleted permanently. </Text>
            <Text size={14} weight='med' >Any items inside won’t be deleted and will be moved to Unsorted if it isn’t already in another location. </Text>
            <div className='flex my2'>
                <Button isLoading={buttonLoading} onClick={() => handleSubmit()} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Delete</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}