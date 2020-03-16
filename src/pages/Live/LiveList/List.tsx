import React from 'react';
import { Table } from '../../../components/Table/Table';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../components/Typography/Text';
import { tsToLocaleDate, readableBytes } from '../../../utils/utils';
import { IconStyle } from '../../../shared/Common/Icon';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { LiveItem } from '../../../redux-flow/store/Live/General/types';
import { LiveTabs } from '../../../containers/Live/LiveTabs';
import { LivesFiltering } from './LivesFiltering';
import { Pagination } from '../../../components/Pagination/Pagination'
import { Tooltip } from '../../../components/Tooltip/Tooltip'
import { ActionIcon } from '../../../shared/ActionIconStyle';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { SeparatorHeader } from '../../Folders/FoldersStyle';
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm } from '../../Playlist/List/BulkModals';
import { AddStreamModal } from '../../../containers/Navigation/AddStreamModal';
import { UserAccountPrivileges } from '../../../containers/Navigation/NavigationTypes';
import { handleFeatures } from '../../../shared/Common/Features';

export interface LiveListProps {
    liveList: LiveItem[];
    themesList: ThemeOptions[];
    deleteLiveChannel: Function;
}

export const LiveListPage = (props: LiveListProps) => {

    const [selectedLive, setSelectedLive] = React.useState<string[]>([]);
    const [showLiveTabs, setShowLiveTabs] = React.useState<boolean>(false)
    const [selectedLiveId, setSelectedLiveId] = React.useState<LiveItem>(null)

    React.useEffect(() => {
        setShowLiveTabs(location.pathname !== '/livestreams')

    }, [location])

    React.useEffect(() => {

    }, [selectedLive])

    const liveListHeaderElement = () => {
        return {data: [
            {cell: <InputCheckbox
                className="inline-flex"
                key="checkboxLiveListBulkAction"
                indeterminate={selectedLive.length >= 1 && selectedLive.length < props.liveList.length}
                defaultChecked={selectedLive.length === props.liveList.length}
                id="globalCheckboxLiveList"
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedselectedLive = props.liveList.map(item => { return item.id })
                        setSelectedLive(editedselectedLive);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setSelectedLive([])
                    }
                }
                }
            />},
            // {cell: <></>},
            {cell: <Text key="nameLiveList" size={14} weight="med" color="gray-1">Name</Text>, sort: 'Name'},
            {cell: <Text key="viewsLiveList" size={14} weight="med" color="gray-1">Created Date</Text>, sort: 'Created Date'},
            {cell: <Text key="statusLiveList" size={14} weight="med" color="gray-1">Status</Text>},
            {cell: <Text key="statusLiveList" size={14} weight="med" color="gray-1">Features</Text>},
            {cell: <div style={{ width: "80px" }} ></div>},
        ], defaultSort: 'Created Date'}
    }

    const liveListBodyElement = () => {
        if (props.liveList) {
            return props.liveList.map((value) => {
                return {data: [
                    <div key={"checkbox" + value.id} className='flex items-center'> 
                        <InputCheckbox className="inline-flex" label="" defaultChecked={selectedLive.includes(value.id)} id={"checkbox" + value.id} onChange={(event) => {
                            if (event.currentTarget.checked && selectedLive.length < props.liveList.length) {
                                setSelectedLive([...selectedLive, value.id])
                            } else {
                                const editedselectedLive = selectedLive.filter(item => item !== value.id)
                                setSelectedLive(editedselectedLive);
                            }
                        }
                        } />
                        <img className="p2" key={"thumbnail" + value.id} width={70} height={42} src={value.thumbnail} ></img>
                    </div>,
                    <Text key={"title" + value.id} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"created" + value.id} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <Text key={"status" + value.id} size={14} weight="reg" color="gray-1">{value.streamOnline ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                    <div className='flex'>{handleFeatures(value, value.id)}</div>,
                    <div key={"more" + value.id} className="iconAction right mr2" >
                        <ActionIcon id={"editTooltip" + value.id}>
                            <IconStyle onClick={() => { setSelectedLiveId(value); setShowLiveTabs(true) }} className="right mr1" >edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + value.id}>Edit</Tooltip>
                        <ActionIcon id={"deleteTooltip" + value.id}>
                            <IconStyle onClick={() => { props.deleteLiveChannel(value.id) }} className="right mr1" >delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + value.id}>Delete</Tooltip>    
                    </div>,
                ]}
            })
        }
    }

    const [bulkOnlineOpen, setBulkOnlineOpen] = React.useState<boolean>(false);
    const [bulkPaywallOpen, setBulkPaywallOpen] = React.useState<boolean>(false);
    const [bulkThemeOpen, setBulkThemeOpen] = React.useState<boolean>(false);
    const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState<boolean>(false);

    const bulkActions = [
        { name: 'Online/Offline', function: setBulkOnlineOpen },
        { name: 'Paywall On/Off', function: setBulkPaywallOpen },
        { name: 'Change Theme', function: setBulkThemeOpen },
        { name: 'Move To', function: setBulkThemeOpen },
        { name: 'Delete', function: setBulkDeleteOpen },
    ]

    const renderList = () => {
        return bulkActions.map((item, key) => {
            return (
                <DropdownItem
                    isSingle
                    key={item.name}
                    className={key === 1 ? 'mt1' : ''}
                    isSelected={false}
                    onClick={() => item.function(true)}>
                    <DropdownItemText size={14} weight='reg' color={'gray-1'}>{item.name}</DropdownItemText>
                </DropdownItem>
            )
        })
    }

    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);
    const [addStreamModalOpen, setAddStreamModalOpen] = React.useState<boolean>(false)


    /** TO BE REMOVED AND TAKE REAL USER PRIVILEGES */
    const UserAccountPrivileges: UserAccountPrivileges = {
        standard: true,
        compatible: true,
        premium: true,
        rewind: true
    }

    return (
        showLiveTabs ?
            <LiveTabs live={selectedLiveId} setShowLiveTabs={setShowLiveTabs} liveId={location.pathname === '/livestreams' ? selectedLiveId.id.toString() : location.pathname.split('/')[2]} history={props.history} />
            :
            <>
                <div className='flex items-center mb2'>
                    <div className="flex-auto items-center flex">
                        <IconStyle coloricon='gray-3'>search</IconStyle>
                        <InputTags  noBorder={true} placeholder="Search Lives..." style={{display: "inline-block"}} defaultTags={[]}   />
                    </div>
                    <div className="flex items-center" >
                        {selectedLive.length > 0 ?
                            <Text className=" ml2" color="gray-3" weight="med" size={12} >{selectedLive.length} items</Text>
                            : null
                        }
                        <div className="relative">
                            <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} disabled={selectedLive.length === 0} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Bulk Actions</Button>
                            <DropdownList hasSearch={false} style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                                {renderList()}
                            </DropdownList>
                        </div>
                        <SeparatorHeader className="mx2 inline-block" />
                        <LivesFiltering setSelectedLive={setSelectedLive} />              
                        <Button onClick={() => setAddStreamModalOpen(true)} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Create Live Stream</Button>
                    </div>
                </div>
                
                <Table className="col-12" id="liveListTable" headerBackgroundColor="white" header={liveListHeaderElement()} body={liveListBodyElement()} />
                <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />
                <OnlineBulkForm items={selectedLive} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
                <DeleteBulkForm items={selectedLive} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
                <PaywallBulkForm items={selectedLive} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
                <AddStreamModal toggle={() => setAddStreamModalOpen(false)} opened={addStreamModalOpen === true} privileges={UserAccountPrivileges} />
            </>
    )
}