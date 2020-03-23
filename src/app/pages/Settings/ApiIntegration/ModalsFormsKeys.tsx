import { ApiKeyItem, EncoderKeyItem, WebHookItem, S3KeyItem } from '../../../redux-flow/store/Settings/ApiIntegration';
import * as React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../../components/FormsComponents/Input/InputRadio';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';

const ApiKeysForm = (props: {item?: ApiKeyItem; toggle: Function}) => {
    
    
    return (
        <form>
            <Input defaultValue={ props.item? props.item.label : ""} disabled={false} required id="encoder" type="text" className="col col-12 mb2" label="Name" placeholder="Name"  />
            <Text size={14} weight="med" className='inline-block mb1' >Access Type</Text>
            <div className="mb3">
                <InputRadio defaultChecked={props.item && props.item.type == 'rw'} className="col col-6" value="rw" name="type" label="Read-Write"></InputRadio>
                <InputRadio defaultChecked={props.item && props.item.type == 'ro'} className="col col-6" value="ro" name="type" label="Read-Only"></InputRadio>
                <div className="clearfix"></div>
            </div>
            <Button sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Generate"}</Button>
            <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </form>
    )

}

const WebHooksForm = (props: {item?: WebHookItem; toggle: Function}) => {
    
    return (
        <form>
            <Input defaultValue={ props.item? props.item.url : ""} disabled={false} required id="encoder" type="text" className="col col-12 mb2" label="URL" placeholder="URL"  />
            <Text size={14} weight="med" className='inline-block mb1' >Method</Text>
            <div className="mb3">
                <InputRadio defaultChecked={props.item && props.item.method == 'GET'} className="col col-6" value="GET" name="type" label="GET"></InputRadio>
                <InputRadio defaultChecked={props.item && props.item.method == 'POST'} className="col col-6" value="POST" name="type" label="POST"></InputRadio>
                <div className="clearfix"></div>
            </div>
            <Button sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Submit"}</Button>
            <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </form>
    )

}


const EncoderKeysForm = (props: {item?: EncoderKeyItem; toggle: Function}) => {
    const [selectedValue, setSelectedValue] = React.useState<string>('');

    console.log(selectedValue);
    return (
        <form>
            <DropdownSingle
                isInModal   
                className='mb2 col col-12'                  
                dropdownTitle='Encoder'
                list={{'Dacast OBS Studio': false, ' Telestream WireCast': false, 'Other': false}}
                id='amountDropdown'
                callback={setSelectedValue}
            />
            <Input defaultValue={ props.item? props.item.encoder : ""} disabled={false} required id="encoder" type="text" className={(selectedValue !== 'Other' ? 'display-none ' : '')+" col col-12 mb3"} label="Name" placeholder="Name"  />
            <Button sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Generate"}</Button>
            <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2"  typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </form>
    )
}

const S3KeysForm = (props: {item?: S3KeyItem; toggle: Function}) => {
    return (
        <form>
            <Input defaultValue={ props.item? props.item.name : ""} disabled={false} required id="s3KeyName" type="text" className="col col-12 mb3" label="Name" placeholder="Key Name"  />
            <Button sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Generate"}</Button>
            <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2"  typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </form>
    )

}

export {ApiKeysForm, EncoderKeysForm, WebHooksForm, S3KeysForm} ;