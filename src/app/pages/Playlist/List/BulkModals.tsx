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
import { ContentType } from '../../../redux-flow/store/Folders/types';
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { NotificationType, Size } from '../../../../components/Toast/ToastTypes';
import { button } from '@storybook/addon-knobs';

interface PropsBulkModal {
    items?: ContentType[]; 
    open: boolean; 
    toggle: Function;
    actionFunction: Function;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
} 


const DeleteBulkForm = (props: PropsBulkModal) => {   
     
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        setButtonLoading(true)
        let item = props.items.length > 1 ? 'items' : 'item'
        props.actionFunction(props.items, 'delete').then(() => {
            setButtonLoading(false)
            props.toggle(false)
            props.showToast(`${props.items.length} ${item} have been deleted`, 'flexible', 'success')
        }).catch(() => {
            setButtonLoading(false)
            
            props.showToast(`${props.items.length} ${item} couldn't be deleted`, 'flexible', 'success')

        })
    }

    return (
        <Modal hasClose={false}  icon={ {name: "warning", color: "red"} } toggle={() => props.toggle(!props.open)} modalTitle={"Delete "+ props.items.length+" Items"} size="small" opened={props.open}>
            <div>
                <Text size={14} weight="reg" className='inline-block mb3 mt1' >{"Are you sure that you want to delete these "+ props.items.length +" items?"}</Text>
    <Text size={14} weight="reg" className='inline-block mb3 mt1' >{props.items.some(item => item.type === 'folder') ? 'Folders will be deleted permanently and assets will ' : 'Deleted assets '}stay in the Trash for 30 days.</Text>

                <Button isLoading={buttonLoading} onClick={async () => await handleSubmit()} sizeButton="large" typeButton="primary" buttonColor="blue" >Save</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
        </Modal>
    )
}

const ThemeBulkForm = (props: PropsBulkModal & { themes: ThemeOptions[]; getThemesList:() => void}) => {

    const [selectedTheme, setSelectedTheme] = React.useState<string>(null);
    const [themesList, setThemesList] = React.useState<ThemeOptions[]>([])
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        setButtonLoading(true)
        props.actionFunction(props.items, 'theme', selectedTheme).then(() => {
            setButtonLoading(false)
            props.toggle(false)
            props.showToast(`Theme has been assigned to ${props.items.length} items`, 'flexible', 'success')
        }).catch(() => {
            setButtonLoading(false)
            props.showToast(`Theme couldn't be assigned to ${props.items.length} items`, 'flexible', 'success')

        })
    }

    React.useEffect(() => {
        if(props.themes.length === 0 && themesList.length === 0) {
            props.getThemesList()
        }
    }, [])

    React.useEffect(() => {
        if(props.themes.length > 0) {
            setThemesList(props.themes)

        }
    }, [props.themes])

    return (
        <Modal hasClose={false}  toggle={() => props.toggle(!props.open)} modalTitle={"Update "+ props.items.length+" Items"} size="small" opened={props.open}>
            <div>
                {
                    themesList.length === 0 ?
                    <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
                    :
                    <>
                        <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Update Theme Status "+ props.items.length +" selected items?"}</Text>
                        <DropdownSingle className="mb3"
                            dropdownTitle='Theme' 
                            id='thumbnailPositionDropdown' 
                            list={themesList.reduce((reduced: DropdownListType, item: ThemeOptions) => {return {...reduced, [item.themeName]: false}}, {})}
                            isInModal={true} 
                            callback={(value: string) => {setSelectedTheme(themesList.filter(theme => theme.themeName === value)[0].id)}} 
                        />
                    </>

                }
                <Button isLoading={buttonLoading} onClick={async () => {await handleSubmit()}} sizeButton="large" disabled={selectedTheme === null} typeButton="primary" buttonColor="blue" >Save</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
        </Modal>
    )
}


const OnlineBulkForm = (props: PropsBulkModal) => {

    const [online, setOnline] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        setButtonLoading(true)
        props.actionFunction(props.items, 'online', online).then(() => {
            setButtonLoading(false)
            props.toggle(false)
            props.showToast(`${props.items.length} items have been turned ` + (online ? 'Online' : 'Offline'), 'flexible', 'success')
        }).catch(() => {
            setButtonLoading(false)
            props.showToast(`${props.items.length} items couldn't be turned ` + (online ? 'Online' : 'Offline'), 'flexible', 'success')

        })
    }

    return (
        <Modal hasClose={false}  toggle={() => props.toggle(!props.open)} modalTitle={"Update "+ props.items.length+" Items"} size="small" opened={props.open}>
            <div>
                <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Update the Status for "+ props.items.length +" selected items?"}</Text>
                <Toggle defaultChecked={online} onChange={(event) => {setOnline(!online)}}label={online ? "Online" : 'Offline'} className="mb3" />
                <Button isLoading={buttonLoading} onClick={async () => {await handleSubmit()}} sizeButton="large" typeButton="primary" buttonColor="blue" >Save</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
        </Modal>
    )
}


const PaywallBulkForm = (props: PropsBulkModal) => {

    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        setButtonLoading(true)
        props.actionFunction(props.items, 'paywall', false).then(() => {
            setButtonLoading(false)
            props.toggle(false)
            props.showToast(`Paywall has been turned Offline for ${props.items.length} items`, 'flexible', 'success')
        }).catch(() => {
            setButtonLoading(false)
            props.showToast('Paywall couldn\'t be turned Offline', 'flexible', 'success')

        })
    }

    return (
        <Modal hasClose={false} toggle={() => props.toggle(!props.open)} modalTitle={"Update "+ props.items.length+" Items"} size="small" opened={props.open}>
            <div>
                <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Turn off Paywall Status for "+ props.items.length +" selected items?"}</Text>
                <div className='mt2'>
                    <Button isLoading={buttonLoading} onClick={async () => {await handleSubmit()}} sizeButton="large" typeButton="primary" buttonColor="blue" >Save</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>

            </div>
        </Modal>
    )
}

export {DeleteBulkForm, ThemeBulkForm, OnlineBulkForm, PaywallBulkForm } ;