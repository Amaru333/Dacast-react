import { useForm } from 'react-hook-form'
import React from 'react'
import { IconStyle } from '../../../shared/Common/Icon'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Modal } from '../../../components/Modal/Modal'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Text } from '../../../components/Typography/Text'
import { showToastNotification } from '../../redux-flow/store/Toasts'
import { useHistory } from 'react-router'
import { axiosClient } from '../../utils/services/axios/axiosClient'
import { handleValidationForm } from '../../utils/custom-hooks/formValidationHook'
import { segmentService } from '../../utils/services/segment/segmentService'

export const AddExpoModal = (props: {toggle: Function, opened: boolean}) => {

    let history = useHistory()

    const { register, handleSubmit, errors} = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)


    const onSubmit = async (data: {title: string}) => {

        setButtonLoading(true)
        
        return await axiosClient.post('/expos',
            {
                title: data.title
            }
        ).then((response) => {
            setButtonLoading(false)
            showToastNotification(`Expos ${data.title} created!`, 'fixed', 'success')
            props.toggle();
            history.push(`/expos/${response.data.id}/general`)
            segmentService.track('Expo Created', {
                action: 'Create Expo',
                'expo_id': response.data.id,
                step: 1,
            })
        }).catch((error) => {
            setButtonLoading(false)
            showToastNotification('Error while creating your expos.', 'fixed', 'error')
        })
    }
    return (
        <Modal modalTitle="Create Expo" toggle={() => props.toggle()} size="small" opened={props.opened} >
            <form onSubmit={handleSubmit(onSubmit)} >
                <Input {...handleValidationForm('title', errors)} ref={register({ required: "Required"})} id="title" type="text" className="col col-12 clearfix mb2" label="Title" placeholder=""  />
                <div className="mb2 col col-12 clearfix">
                    <IconStyle className="mr1 left" >info_outlined</IconStyle>
                    <Text className={"grid"} size={14} weight="reg" color="gray-1" >Need help creating an Expo? Visit the <a rel="noopener noreferrer" target="_blank" href="https://www.dacast.com/support/knowledgebase/expo-video-portal/">Knowledge Base</a></Text>
                </div>
                <Button isLoading={buttonLoading} type="submit" sizeButton="large" typeButton="primary" buttonColor="blue" >Create</Button>
                <Button sizeButton="large" onClick={()=> props.toggle()} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </form>
        </Modal>
    )

}
