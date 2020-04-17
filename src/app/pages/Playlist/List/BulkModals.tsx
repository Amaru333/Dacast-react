import * as React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../../components/FormsComponents/Input/InputRadio';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Modal } from '../../../../components/Modal/Modal';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';

interface PropsBulkModal {
    items?: string[]; 
    open: boolean; 
    toggle: Function;
} 


const DeleteBulkForm = (props: PropsBulkModal) => {    
    return (
        <Modal hasClose={false}  icon={ {name: "warning", color: "red"} } toggle={() => props.toggle(!props.open)} modalTitle={"Delete "+ props.items.length+" Items"} size="small" opened={props.open}>
            <form>
                <Text size={14} weight="reg" className='inline-block mb3 mt1' >{"Are you sure you want to deleted "+ props.items.length +" selected items?"}</Text>
                <Button sizeButton="large" typeButton="primary" buttonColor="blue" >Save</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </form>
        </Modal>
    )
}

const ThemeBulkForm = (props: PropsBulkModal & { themes: ThemeOptions[] }) => {

    const [selectedTheme, setSelectedTheme] = React.useState<string>(null);

    return (
        <Modal hasClose={false}  toggle={() => props.toggle(!props.open)} modalTitle={"Update "+ props.items.length+" Items"} size="small" opened={props.open}>
            <form>
                <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Update Theme Status "+ props.items.length +" selected items?"}</Text>
                <DropdownSingle className="mb3"
                    dropdownTitle='Thumbnail Position' 
                    id='thumbnailPositionDropdown' 
                    list={props.themes.reduce((reduced: DropdownListType, item: ThemeOptions) => {return {...reduced, [item.themeName]: false}}, {})}
                    isInModal={true} 
                    callback={(value: string) => setSelectedTheme(value)} />
                <Button sizeButton="large" disabled={selectedTheme === null} typeButton="primary" buttonColor="blue" >Save</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </form>
        </Modal>
    )
}


const OnlineBulkForm = (props: PropsBulkModal) => {
    return (
        <Modal hasClose={false}  toggle={() => props.toggle(!props.open)} modalTitle={"Update "+ props.items.length+" Items"} size="small" opened={props.open}>
            <form>
                <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Update the Status for "+ props.items.length +" selected items?"}</Text>
                <Toggle label="Online" className="mb3" />
                <Button sizeButton="large" typeButton="primary" buttonColor="blue" >Save</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </form>
        </Modal>
    )
}


const PaywallBulkForm = (props: PropsBulkModal) => {
    return (
        <Modal hasClose={false} toggle={() => props.toggle(!props.open)} modalTitle={"Update "+ props.items.length+" Items"} size="small" opened={props.open}>
            <form>
                <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Turn off Paywall Status for "+ props.items.length +" selected items?"}</Text>
                <div className='mt2'>
                    <Button sizeButton="large" typeButton="primary" buttonColor="blue" >Save</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>

            </form>
        </Modal>
    )
}

export {DeleteBulkForm, ThemeBulkForm, OnlineBulkForm, PaywallBulkForm } ;