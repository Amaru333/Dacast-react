import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { segmentService } from '../../utils/services/segment/segmentService';

export const NewFolderModal = (props: {submit: (folderName: string, folderPath: string) => Promise<string>; toggle: (b: boolean) => void; folderPath: string; buttonLabel: 'Create' | 'Rename'; showToast: (text: string, size: Size, notificationType: NotificationType) => void; loadContent?: () => void}) => {
    const [folderName, setFolderName] =React.useState<string>('')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        let actionWord = props.buttonLabel === 'Create' ? 'added' : 'saved'
        props.submit(folderName, props.folderPath).then(() => {
            setTimeout(() => {
                props.loadContent()
                props.showToast(`${folderName} has been ${actionWord}`, 'fixed', "success")
                props.toggle(false)
                setButtonLoading(false)
            }, 5000)
            segmentService.track('Folder Created', {
                action: 'Folder Created',
                'folder_id': folderName, 
                step: 1,
            })  
        }).catch(() => {
            setButtonLoading(false)
            props.showToast(`${folderName} couldn't be ${actionWord}!`, 'fixed', "error")
        })
    }

    return (
        <div className='flex flex-column'>
            <Input className='mb2' id='newFolderModalFolderInput' defaultValue={folderName} onChange={(event) => setFolderName(event.currentTarget.value)} label='Title' />
            <div className='mt2'>
                <Button isLoading={buttonLoading} disabled={folderName.length === 0} onClick={() => handleSubmit()}className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>{props.buttonLabel}</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue' >Cancel</Button>
            </div>
        </div>
    )
}