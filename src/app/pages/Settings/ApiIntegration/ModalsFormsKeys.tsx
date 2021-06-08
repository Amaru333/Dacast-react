import { ApiKeyItem, EncoderKeyItem, WebHookItem, S3KeyItem } from '../../../redux-flow/store/Settings/ApiIntegration';
import * as React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../../components/FormsComponents/Input/InputRadio';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { handleValidationForm } from '../../../utils/custom-hooks/formValidationHook';
import { useForm } from 'react-hook-form';

const ApiKeysForm = (props: {item?: ApiKeyItem; toggle: React.Dispatch<React.SetStateAction<boolean>>; action: (apiKey: ApiKeyItem) => Promise<void>}) => {

    const [apiKey, setApiKey] = React.useState<ApiKeyItem>(props.item || {label: '', clientId: null, type: 'rw', authToken: null, created: 0})
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleActionClick = () => { 
        setButtonLoading(true)
        props.action(apiKey)
        .then(() => {
            setButtonLoading(false)
            props.toggle(false)
        })
        .catch(() => setButtonLoading(false))
    }

    return (
        <div>
            <Input defaultValue={apiKey.label}  
                id="encoder" className="col col-12 mb2" label="Name" placeholder="Name" onChange={(event) => setApiKey({...apiKey, label: event.currentTarget.value})}  />
            <Text size={14} weight="med" className='inline-block mb1' >Access Type</Text>
            {/* <div className="mb3">
                <InputRadio defaultChecked={apiKey.type == 'rw'} className="col col-6" value="rw" name="type" label="Read-Write"></InputRadio>
                <InputRadio defaultChecked={apiKey.type == 'ro'} className="col col-6" value="ro" name="type" label="Read-Only"></InputRadio>
                <div className="clearfix"></div>
            </div> */}
            <Button isLoading={buttonLoading} onClick={handleActionClick} sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Generate"}</Button>
            <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </div>
    )

}

const WebHooksForm = (props: {item?: WebHookItem; toggle: Function}) => {
    
    const { register, handleSubmit, errors} = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })

    const onSubmit = (data: any) => { 
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Input {...handleValidationForm('url', errors)} ref={register({ required: "Required"})} defaultValue={ props.item? props.item.url : ""} id="encoder" type="text" className="col col-12 mb2" label="URL" placeholder="URL"  />
            <Text size={14} weight="med" className='inline-block mb1' >Method</Text>
            <div className="mb3">
                <InputRadio defaultChecked={(props.item && props.item.method == 'GET') || !props.item} className="col col-6" value="GET" name="type" label="GET"></InputRadio>
                <InputRadio defaultChecked={props.item && props.item.method == 'POST'} className="col col-6" value="POST" name="type" label="POST"></InputRadio>
                <div className="clearfix"></div>
            </div>
            <Button type="submit" sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Submit"}</Button>
            <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </form>
    )

}


const EncoderKeysForm = (props: {item?: EncoderKeyItem; toggle: Function}) => {
    const [selectedValue, setSelectedValue] = React.useState<string>('');

    const { register, handleSubmit, errors} = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })

    const onSubmit = (data: any) => { 
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <DropdownSingle
                isInModal   
                className='mb2 col col-12'                  
                dropdownTitle='Encoder'
                list={{'Dacast OBS Studio': false, ' Telestream WireCast': false, 'Other': false}}
                id='amountDropdown'
                callback={setSelectedValue}
            />
            {
                selectedValue === 'Other' &&
                <Input {...handleValidationForm('name', errors)} ref={register({ required: "Required"})} 
                    defaultValue={ props.item? props.item.encoder : ""} id="encoder" type="text" className={"col col-12 mb3"} label="Name" placeholder="Name"  />
            }
            <Button type-="submit" sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Generate"}</Button>
            <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2"  typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </form>
    )
}

const S3KeysForm = (props: {item?: S3KeyItem; toggle: Function}) => {
    const { register, handleSubmit, errors} = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })

    const onSubmit = (data: any) => { 
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Input {...handleValidationForm('name', errors)} ref={register({ required: "Required"})}
                defaultValue={ props.item? props.item.name : ""}  id="s3KeyName" type="text" className="col col-12 mb3" label="Name" placeholder="Key Name"  />
            <Button sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Generate"}</Button>
            <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2"  typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </form>
    )

}

export {ApiKeysForm, EncoderKeysForm, WebHooksForm, S3KeysForm} ;