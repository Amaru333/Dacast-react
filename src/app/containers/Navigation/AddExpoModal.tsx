import { useForm } from 'react-hook-form'
import React from 'react'
import { handleValidationForm } from '../../utils/hooksFormSubmit'
import { IconStyle } from '../../../shared/Common/Icon'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Modal } from '../../../components/Modal/Modal'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Text } from '../../../components/Typography/Text'

export const AddExpoModal = (props: {toggle: Function, opened: boolean}) => {


    const { register, handleSubmit, errors} = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })

    const onSubmit = (data: any) => { 
    }

    return (
        <Modal modalTitle="Create Expo" toggle={() => props.toggle()} size="small" opened={props.opened} >
            <form onSubmit={handleSubmit(onSubmit)} >
                <Input {...handleValidationForm('title', errors)} ref={register({ required: "Required"})} id="title" type="text" className="col col-12 clearfix mb2" label="Title" placeholder=""  />
                <div className="mb2 col col-12 clearfix">
                    <IconStyle className="mr1 left" >info_outlined</IconStyle>
                    <Text className={"grid"} size={14} weight="reg" color="gray-1" >Need help creating an Expo? Visit the <a rel="noopener noreferrer" target="_blank" href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                </div>
                <Button type="submit" sizeButton="large" typeButton="primary" buttonColor="blue" >Create</Button>
                <Button sizeButton="large" onClick={()=> props.toggle()} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </form>
        </Modal>
    )

}
