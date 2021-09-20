import * as React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { Modal } from '../../../components/Modal/Modal';
import { ThemeOptions } from '../../redux-flow/store/Settings/Theming';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { BulkActionItem } from '../../redux-flow/store/common/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { bulkActionsService } from '../../redux-flow/store/Common/bulkService';
import { ContentStatus } from '../../redux-flow/store/Common/types';

interface PropsBulkModal {
    items?: BulkActionItem[]; 
    open: boolean; 
    toggle: (b: boolean) => void;
    updateList?: (data: ContentStatus | 'paywall') => void;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    isInFolder?: boolean;
} 

const setBulkItemCount = (items: BulkActionItem[]) => {
    return `${items.length} ${items.length === 1 ? " item" : " items"}`
}

const DeleteBulkForm = (props: PropsBulkModal) => { 
     
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        setButtonLoading(true)
        bulkActionsService(props.items, 'delete').then((response) => {
            if (!response.errors) {
                props.toggle(false)
                props.updateList('Deleted')
                props.showToast(`${setBulkItemCount(props.items)} have been deleted`, 'fixed', 'success')
            } else {
                props.showToast(response.items.find(item => {return item.status === 500}).error, 'fixed', 'error')
            }
            setButtonLoading(false)
        }).catch(() => {
            setButtonLoading(false)
            props.showToast(`${setBulkItemCount(props.items)} couldn't be deleted`, 'fixed', 'error')

        })
    }

    return (
        <Modal allowNavigation={false} hasClose={false}  icon={ {name: "warning", color: "red"} } toggle={() => props.toggle(!props.open)} modalTitle={"Delete "+ setBulkItemCount(props.items)} size="small" opened={props.open}>
            <div className='flex flex-column'>
                <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Are you sure that you want to delete the " + setBulkItemCount(props.items) + "?" }</Text>
                {
                    props.isInFolder ?
                    <Text size={14} weight="med" className='inline-block mb3 mt1' >Folders will be deleted permanently and videos inside it will be moved to Unsorted. All other assets will be moved to Unsorted.</Text>
                    :
                    <Text size={14} weight="med" className='inline-block mb3 mt1' >Deleted videos will stay in the Trash for 30 days. Other assets will be deleted permanently.</Text>
                }
                <div className='mt2'>
                    <Button isLoading={buttonLoading} onClick={async () => await handleSubmit()} sizeButton="large" typeButton="primary" buttonColor="blue" >Delete</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>

            </div>
        </Modal>
    )
}

const ThemeBulkForm = (props: PropsBulkModal & { themes: ThemeOptions[]; getThemesList: () => Promise<void>}) => {

    const [selectedTheme, setSelectedTheme] = React.useState<string>(null);
    const [themesList, setThemesList] = React.useState<ThemeOptions[]>([])
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const themesListDropdown = themesList.map((item) => {
        let themesListDropdownItem: DropdownSingleListItem = {title: null, data: null}
        themesListDropdownItem.title = item.themeName
        themesListDropdownItem.data = item
        return themesListDropdownItem
    })

    const handleSubmit = async () => {
        setButtonLoading(true)
        bulkActionsService(props.items, 'theme', selectedTheme).then((response) => {
            if (!response.errors) {
                props.toggle(false)
                props.showToast(`Theme has been assigned to ${setBulkItemCount(props.items)} `, 'fixed', 'success')
            } else {
                props.showToast(response.items.find(item => {return item.status === 500}).error, 'fixed', 'error')
            }
            setButtonLoading(false)
        }).catch(() => {
            setButtonLoading(false)
            props.showToast(`Theme couldn't be assigned to ${setBulkItemCount(props.items)}`, 'fixed', 'error')

        })
    }

    React.useEffect(() => {
        if(!props.themes || props.themes.length === 0 || themesList.length === 0) {
            props.getThemesList()
        }
    }, [])

    React.useEffect(() => {
        if(props.themes && props.themes.length > 0) {
            setThemesList(props.themes)

        }
    }, [props.themes])

    return (
        <Modal allowNavigation={false} hasClose={false}  toggle={() => props.toggle(!props.open)} modalTitle={"Update "+ setBulkItemCount(props.items) } size="small" opened={props.open}>
            <div className='col col-12 flex flex-column'>
                {
                    themesList.length === 0 ?
                    <div className='my2 ml4 col col-12 relative'>
                        <LoadingSpinner size='medium' color='violet' />
                    </div>
                    :
                    <>
                        <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Update Theme Status for "+ setBulkItemCount(props.items) + "?"}</Text>
                        <DropdownSingle className="mb3"
                            dropdownTitle='Theme' 
                            id='thumbnailPositionDropdown' 
                            list={themesListDropdown}
                            isInModal={true} 
                            callback={(item: DropdownSingleListItem) => {setSelectedTheme(item.data.id)}} 
                        />
                    </>

                }
                <div className='flex'>
                <Button isLoading={buttonLoading} onClick={async () => {await handleSubmit()}} sizeButton="large" disabled={selectedTheme === null} typeButton="primary" buttonColor="blue" >Save</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>

            </div>
        </Modal>
    )
}


const OnlineBulkForm = (props: PropsBulkModal) => {

    const [online, setOnline] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        setButtonLoading(true)
        bulkActionsService(props.items, 'online', online).then((response) => {
            if (!response.errors) {
                props.toggle(false)
                props.updateList(online ? 'Online' : 'Offline')
                props.showToast(`${setBulkItemCount(props.items)} ${props.items.length === 1 ? "has" : "have"} been turned ` + (online ? 'Online' : 'Offline'), 'fixed', 'success')
            } else {
                props.showToast(response.items.find(item => {return item.status === 500}).error, 'fixed', 'error')
            }
            setButtonLoading(false)
        }).catch(() => {
            setButtonLoading(false)
            props.showToast(`${setBulkItemCount(props.items)} couldn't be turned ` + (online ? 'Online' : 'Offline'), 'fixed', 'error')

        })
    }

    return (
        <Modal allowNavigation={false} hasClose={false}  toggle={() => props.toggle(!props.open)} modalTitle={"Update "+ setBulkItemCount(props.items)} size="small" opened={props.open}>
            <div>
                <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Update the Status for " + setBulkItemCount(props.items) + "?"}</Text>
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
        bulkActionsService(props.items, 'paywall', false).then((response) => {
            if (!response.errors) {
                props.toggle(false)
                props.updateList('paywall')
                props.showToast(`Paywall has been turned Offline for ${setBulkItemCount(props.items)}`, 'fixed', 'success')
            } else {
                props.showToast(response.items.find(item => {return item.status === 500}).error, 'fixed', 'error')
            }
            setButtonLoading(false)
        }).catch(() => {
            setButtonLoading(false)
            props.showToast('Paywall couldn\'t be turned Offline', 'fixed', 'error')

        })
    }

    return (
        <Modal allowNavigation={false} hasClose={false} toggle={() => props.toggle(!props.open)} modalTitle={"Update "+ setBulkItemCount(props.items)} size="small" opened={props.open}>
            <div>
                <Text size={14} weight="reg" className='inline-block mb1 mt1' >{"Turn off Paywall Status for "+ setBulkItemCount(props.items) + "?"}</Text>
                <div className='mt2'>
                    <Button isLoading={buttonLoading} onClick={async () => {await handleSubmit()}} sizeButton="large" typeButton="primary" buttonColor="blue" >Save</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>

            </div>
        </Modal>
    )
}

export {DeleteBulkForm, ThemeBulkForm, OnlineBulkForm, PaywallBulkForm } ;