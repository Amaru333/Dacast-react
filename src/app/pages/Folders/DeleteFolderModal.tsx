import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';

export const DeleteFolderModal = (props: {showToast: (text: string, size: Size, notificationType: NotificationType) => void;toggle: (b: boolean) => void; folderName: string; deleteFolder: () => Promise<void>}) => {

    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        props.deleteFolder().then(() => {
            setButtonLoading(false)
            props.toggle(false)            
            props.showToast(`${props.folderName} successfully deleted`, 'flexible', 'success')
        }).catch(() => {
            setButtonLoading(false)
            props.showToast(`${props.folderName} couldn't be deleted`, 'flexible', 'success')
        })
    }

    return (
        <div className='flex flex-column'>
            <Text className='py1' size={14} weight='reg'>Are you sure that you want to delete {props.folderName} ?</Text>
            <Text className='py1' size={14} weight='med' >Folders will be deleted permanently and assets will be moved to Unsorted. </Text>
            <div className='flex mt2'>
                <Button isLoading={buttonLoading} onClick={() => handleSubmit()} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Delete</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}