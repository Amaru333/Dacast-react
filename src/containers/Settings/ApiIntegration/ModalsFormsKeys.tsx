import { ApiKeyItem, EncoderKeyItem } from '../../../redux-flow/store/Settings/ApiIntegration';
import * as React from 'react';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';

const ApiKeysForm = (props: {item?: ApiKeyItem, toggle: Function}) => {
    
    return (
        <form>
            <Input defaultValue={ props.item? props.item.label : ""} disabled={false} required id="encoder" type="text" className="col col-12 mb2" label="Name" placeholder="Name"  />
            <Text size={14} weight="med" className='inline-block mb1' >Access Type</Text>
            <div className="mb3">
                <InputRadio defaultChecked={props.item && props.item.type == 'rw'} className="col col-6" value="rw" name="type" label="Read-Write"></InputRadio>
                <InputRadio defaultChecked={props.item && props.item.type == 'ro'} className="col col-6" value="ro" name="type" label="Read-Only"></InputRadio>
                <div className="clearfix"></div>
            </div>
            <Button sizeButton="small" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Generate"}</Button>
            <Button onClick={()=> props.toggle(false)} type="button" className="ml2" sizeButton="small" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </form>
    )

}

const EncoderKeysForm = (props: {item?: EncoderKeyItem, toggle: Function}) => {
    
    return (
        <form>
            <Input defaultValue={ props.item? props.item.encoder : ""} disabled={false} required id="encoder" type="text" className="col col-12 mb2" label="Name" placeholder="Name"  />
            <Button sizeButton="small" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Generate"}</Button>
            <Button onClick={()=> props.toggle(false)} type="button" className="ml2" sizeButton="small" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
        </form>
    )

}

export {ApiKeysForm, EncoderKeysForm} ;

