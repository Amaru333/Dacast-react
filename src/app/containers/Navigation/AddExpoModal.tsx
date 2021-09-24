import { useForm } from 'react-hook-form'
import React from 'react'
import { IconStyle } from '../../../shared/Common/Icon'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Modal } from '../../../components/Modal/Modal'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Text } from '../../../components/Typography/Text'
import { useHistory } from 'react-router'
import { dacastSdk } from '../../utils/services/axios/axiosClient'
import { handleValidationForm } from '../../utils/custom-hooks/formValidationHook'
import { segmentService } from '../../utils/services/segment/segmentService'
import { store } from '../..'
import { showToastNotification } from '../../redux-flow/store/Toasts'
import { Trans, useTranslation } from 'react-i18next'

export const AddExpoModal = (props: {toggle: Function, opened: boolean}) => {

    let history = useHistory()

    const { register, handleSubmit, errors} = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const { t } = useTranslation()

    const onSubmit = async (data: {title: string}) => {

        setButtonLoading(true)
        
        return await dacastSdk.postExpo({title: data.title})
        .then((response) => {
            setButtonLoading(false)
            store.dispatch(showToastNotification(`Expo successfully created`, 'fixed', 'success'));
            props.toggle();
            segmentService.track('Expo Created', {
                action: 'Create Expo',
                'expo_id': response.id,
                step: 1,
            })
            history.push(`/expos/${response.id}/setup`)
        }).catch((error) => {
            setButtonLoading(false)
            store.dispatch(showToastNotification('Error while creating your expos.', 'fixed', 'error'));
        })
    }
    return (
        <Modal modalTitle={t('expo_create_expo_modal_button')} toggle={() => props.toggle()} size="small" opened={props.opened} >
            <form onSubmit={handleSubmit(onSubmit)} >
                <Input {...handleValidationForm('title', errors)} ref={register({ required: "Required"})} id="title" type="text" className="col col-12 clearfix mb2" label={t('common_content_list_table_header_title')} placeholder=""  />
                <div className="mb2 col col-12 clearfix">
                    <IconStyle className="mr1 left" >info_outlined</IconStyle>
                    <Text className={"grid"} size={14} weight="reg" color="gray-1" ><Trans i18nKey='expo_create_expo_modal_help_text'>Need help creating an Expo? Visit the <a rel="noopener noreferrer" target="_blank" href="https://www.dacast.com/support/knowledgebase/expo-video-portal/">Knowledge Base</a></Trans></Text>
                </div>
                <Button isLoading={buttonLoading} type="submit" sizeButton="large" typeButton="primary" buttonColor="blue" >{t('common_button_text_create')}</Button>
                <Button sizeButton="large" onClick={()=> props.toggle()} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >{t('common_button_text_cancel')}</Button>
            </form>
        </Modal>
    )

}
