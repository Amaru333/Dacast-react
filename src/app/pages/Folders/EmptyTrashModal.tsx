import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { dacastSdk } from '../../utils/services/axios/axiosClient';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
export const EmptyTrashModal = (props: {toggle: (b: boolean) => void;showToast: (text: string, size: Size, notificationType: NotificationType) => void; loadContent?: () => void}) => {

    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        setButtonLoading(true)
        await dacastSdk.deleteEmptyTrash()
        .then(() => {
            setTimeout(() => {
                props.loadContent()
                props.showToast('Your Trash has been emptied', 'fixed', "success")
                props.toggle(false)
                setButtonLoading(false)
            }, 5000)
        }).catch(() => {
            setButtonLoading(false)
            props.showToast('Couldn\'t empty the Trash', 'fixed', "error")

        })
    }
    return (
        <div>
            <Text size={14} weight='reg'>Are you sure that you want to Empty the Trash?</Text>
            <Text size={14} weight='med' >Content will be irrevocably deleted and the storage it occupied will become free in your account.</Text>
            <div className='flex my2'>
                <Button isLoading={buttonLoading} onClick={async () => {await handleSubmit()}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Empty</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}