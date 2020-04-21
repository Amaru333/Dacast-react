import React from 'react';
import { IconStyle, ActionIcon } from '../../../../shared/Common/Icon';
import { tsToLocaleDate, readableBytes, useOutsideAlerter } from '../../../../utils/utils';
import { Table } from '../../../../components/Table/Table';
import { Text } from '../../../../components/Typography/Text';
import { VodItem, SearchResult } from '../../../redux-flow/store/VOD/General/types';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { VideoTabs } from '../../../containers/Videos/VideoTabs';
import { VideosFiltering } from './VideosFiltering';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { DropdownList, DropdownItem, DropdownItemText } from '../../../../components/FormsComponents/Dropdown/DropdownStyle';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { PaywallBulkForm, DeleteBulkForm, OnlineBulkForm } from '../../Playlist/List/BulkModals';
import { SeparatorHeader } from '../../Folders/FoldersStyle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { handleFeatures } from '../../../shared/Common/Features';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

export interface VideosListProps {
    items: SearchResult;
    themesList: ThemeOptions[];
    getVodList: Function;
    deleteVodList: Function;
    showVodDeletedToast: Function;
}

export const VideosListPage = (props: VideosListProps) => {

    let history = useHistory()

    const [selectedVod, setSelectedVod] = React.useState<string[]>([]);
    const [showVodTabs, setShowVodTabs] = React.useState<boolean>(false);
    const [selectedVodId, setSelectedVodId] = React.useState<VodItem>(null);
    const [bulkOnlineOpen, setBulkOnlineOpen] = React.useState<boolean>(false);
    const [bulkPaywallOpen, setBulkPaywallOpen] = React.useState<boolean>(false);
    const [bulkThemeOpen, setBulkThemeOpen] = React.useState<boolean>(false);
    const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState<boolean>(false);
    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);
    const bulkDropdownRef = React.useRef<HTMLUListElement>(null);

    useOutsideAlerter(bulkDropdownRef, () => {
        setDropdownIsOpened(!dropdownIsOpened)
    })

    const bulkActions = [
        { name: 'Online/Offline', function: setBulkOnlineOpen },
        { name: 'Paywall On/Off', function: setBulkPaywallOpen },
        { name: 'Change Theme', function: setBulkThemeOpen },
        { name: 'Move To', function: setBulkThemeOpen },
        { name: 'Delete', function: setBulkDeleteOpen },
    ]

    React.useEffect(() => {
        setShowVodTabs(location.pathname !== '/videos')

    }, [location])

    React.useEffect(() => {
    }, [selectedVod])



    const vodListHeaderElement = () => {
        return {data: [
            {cell: <InputCheckbox className="inline-flex" label="" key="checkboxVodListBulkAction" indeterminate={selectedVod.length >= 1 && selectedVod.length < props.items.totalResults} defaultChecked={selectedVod.length === props.items.totalResults} id="globalCheckboxVodList"
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedSelectedVod = props.items.results.map(item => { return item.objectID })
                        setSelectedVod(editedSelectedVod);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setSelectedVod([])
                    }
                }} />},
            // {cell: <></>},
            {cell: <Text key="nameVodList" size={14} weight="med" color="gray-1">Name</Text>, sort: 'Name'},
            {cell: <Text key="sizeVodList" size={14} weight="med" color="gray-1">Size</Text>},
            {cell: <Text key="viewsVodList" size={14} weight="med" color="gray-1">Views</Text>},
            {cell: <Text key="viewsVodList" size={14} weight="med" color="gray-1">Created Date</Text>, sort: 'Created Date'},
            {cell: <Text key="statusVodList" size={14} weight="med" color="gray-1">Status</Text>},
            {cell: <Text key="statusVodList" size={14} weight="med" color="gray-1">Features</Text>},
            {cell: <div style={{ width: "80px" }} ></div>},
        ], defaultSort: 'Created Date'}
    }

    const vodListBodyElement = () => {
        if (props.items) {
            return props.items.results.map((value) => {
                return {data: [
                    <div key={"checkbox" + value.objectID} className='flex items-center'>
                        <InputCheckbox className="inline-flex" label="" defaultChecked={selectedVod.includes(value.objectID)} id={"checkboxVod" + value.objectID.toString()} onChange={(event) => {
                            if (event.currentTarget.checked && selectedVod.length < props.items.totalResults) {
                                setSelectedVod([...selectedVod, value.objectID])
                            } else {
                                const editedSelectedVod = selectedVod.filter(item => item !== value.objectID)
                                setSelectedVod(editedSelectedVod);
                            }
                        }
                        } />
                        <img className="pl2" key={"thumbnail" + value.objectID} width={50} height={42} src={value.thumbnail} />
                    </div>,
                    <Text key={"title" + value.objectID} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"size" + value.objectID} size={14} weight="reg" color="gray-1">{readableBytes(value.size)}</Text>,
                    <Text key={"views" + value.objectID} size={14} weight="reg" color="gray-1">{value.views}</Text>,
                    <Text key={"created" + value.objectID} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.createdAt, DateTime.DATETIME_SHORT)}</Text>,
                    <Text key={"status" + value.objectID} size={14} weight="reg" color="gray-1">{value.status === 'online' ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                    <div className='flex'>{value.features ? handleFeatures(value, value.objectID.toString()) : null}</div>,
                    <div key={"more" + value.objectID} className="iconAction right mr2" >
                        <ActionIcon id={"editTooltip" + value.objectID}>
                            <IconStyle onClick={() => { setSelectedVodId(value); setShowVodTabs(true) }} className="right mr1" >edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + value.objectID}>Edit</Tooltip>
                        <ActionIcon id={"deleteTooltip" + value.objectID}>
                            <IconStyle onClick={() => { props.deleteVodList(value.title);props.showVodDeletedToast(`${value.title} has been deleted`, 'flexible', "success") }} className="right mr1" >delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + value.objectID}>Delete</Tooltip>  
                    </div>,
                ], 
                callback: (value: VodItem) => {setSelectedVodId(value); setShowVodTabs(true) },
                callbackData: value
                }
            })
        }
    }

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


    return (
        showVodTabs ?
            <VideoTabs video={selectedVodId} setShowVideoTabs={setShowVodTabs} videoId={location.pathname === '/videos' && selectedVodId ? selectedVodId.objectID.toString() : location.pathname.split('/')[2]} />
            :
            <>
            <div className='flex items-center mb2'>
                <div className="flex-auto items-center flex">
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags  noBorder={true} placeholder="Search Videos..." style={{display: "inline-block"}} defaultTags={[]}   />
                </div>
                <div className="flex items-center" >
                    {selectedVod.length > 0 ?
                        <Text className=" ml2" color="gray-3" weight="med" size={12} >{selectedVod.length} items</Text>
                        : null
                    }
                    <div className="relative">
                        <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} disabled={selectedVod.length === 0} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Bulk Actions</Button>
                        <DropdownList ref={bulkDropdownRef} hasSearch={false} style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                            {renderList()}
                        </DropdownList>
                    </div>
                    <SeparatorHeader className="mx2 inline-block" />
                    <VideosFiltering setSelectedVod={setSelectedVod} />                
                    <Button onClick={() => history.push('/uploader')} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Upload Video</Button>
                </div>
            </div>

                
                <Table className="col-12" id="videosListTable" headerBackgroundColor="white" header={vodListHeaderElement()} body={vodListBodyElement()} hasContainer />
                <Pagination totalResults={props.items.totalResults} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />
                <OnlineBulkForm items={selectedVod} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
                <DeleteBulkForm items={selectedVod} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
                <PaywallBulkForm items={selectedVod} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
            </>

    )

}


