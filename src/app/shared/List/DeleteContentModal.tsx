import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';

export const DeleteContentModal = (props: {showToast: (text: string, size: Size, notificationType: NotificationType) => void; toggle: (b: boolean) => void; contentName: string; deleteContent: () => Promise<void>}) => {

    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        props.deleteContent().then(() => {
            setButtonLoading(false)
            props.toggle(false)            
            props.showToast(`${props.contentName} successfully deleted`, 'fixed', 'success')
        }).catch((error) => {
            setButtonLoading(false)
            props.showToast(`${props.contentName} couldn't be deleted`, 'fixed', 'error')
        })
    }

    return (
        <div className='flex flex-column'>
            <div style={{overflowWrap: "break-word"}}><Text className='py1' size={14} weight='reg'>Are you sure that you want to delete {props.contentName}?</Text></div>
            <Text className='py1' size={14} weight='med' >Deleted videos stay in the Trash for the next 30 days. </Text>
            <div className='flex mt2'>
                <Button isLoading={buttonLoading} onClick={() => handleSubmit()} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Delete</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}