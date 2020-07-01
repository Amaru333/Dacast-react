import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const NewFolderModal = (props: {submit: Function; toggle: Function; folderPath: string; buttonLabel: 'Create' | 'Rename'; showToast: Function; loadContent?: Function}) => {
    const [folderName, setFolderName] =React.useState<string>('')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        let actionWord = props.buttonLabel === 'Create' ? 'added' : 'saved'
        props.submit(folderName, props.folderPath).then(() => {
            setTimeout(() => {
                props.loadContent()
                props.showToast(`${folderName} has been ${actionWord}`, 'flexible', "success")
                props.toggle(false)
                setButtonLoading(false)
            }, 5000)

        }).catch(() => {
            setButtonLoading(false)
            props.showToast(`${folderName} couldn't be ${actionWord}!`, 'flexible', "error")
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