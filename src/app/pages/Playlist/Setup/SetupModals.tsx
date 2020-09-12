import * as React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';
import { Modal } from '../../../../components/Modal/Modal';

interface PropsBulkModal {
    open: boolean; 
    toggle: (b: boolean) => void;
    callBackSuccess: Function;
} 


const SwitchTabConfirmation = (props: PropsBulkModal & {tab: string}) => {    
    return (
        <Modal icon={ {name: "warning", color: "red"} } toggle={() => props.toggle(!props.open)} modalTitle={"Select by "+ props.tab} size="small" opened={props.open}>
            <form>
                <Text size={14} weight="reg" className='inline-block mb3 mt1' >{"Switching to view "+props.tab+" will clear all of your selected items. "}</Text>
                <Button sizeButton="large" typeButton="primary" buttonColor="blue" onClick={(e) => {e.preventDefault();props.callBackSuccess();props.toggle(false);} } >Continue</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </form>
        </Modal>
    )
}

const PlaylistSettings = (props: PropsBulkModal) => {    
    const [inputValue, setInputValue] = React.useState<string>("");

    return (
        <Modal toggle={() => props.toggle(!props.open)} modalTitle={"Playlist Settings"} size="small" opened={props.open} hasClose={false}>
            <form>
                <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} disabled={false} required id="encoder" className="col col-12 mb3" label="Max Number of Items" placeholder="100"  />
                <Button sizeButton="large" typeButton="primary" buttonColor="blue" onClick={(e) => {e.preventDefault();props.callBackSuccess(parseInt(inputValue));props.toggle(false) } } >Save</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </form>
        </Modal>
    )
}


export {SwitchTabConfirmation, PlaylistSettings} ;