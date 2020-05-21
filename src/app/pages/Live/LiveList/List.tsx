import React from 'react';
import { Table } from '../../../../components/Table/Table';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../../components/Typography/Text';
import { tsToLocaleDate, getPrivilege } from '../../../../utils/utils';
import { IconStyle, ActionIcon } from '../../../../shared/Common/Icon';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { SearchResult } from '../../../redux-flow/store/Live/General/types';
import { LivesFiltering, FilteringLiveState } from './LivesFiltering';
import { Pagination } from '../../../../components/Pagination/Pagination'
import { Tooltip } from '../../../../components/Tooltip/Tooltip'
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownItem, DropdownItemText, DropdownList } from '../../../../components/FormsComponents/Dropdown/DropdownStyle';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { SeparatorHeader } from '../../Folders/FoldersStyle';
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm } from '../../Playlist/List/BulkModals';
import { AddStreamModal } from '../../../containers/Navigation/AddStreamModal';
import { handleFeatures } from '../../../shared/Common/Features';
import { useHistory } from 'react-router-dom'
import { DateTime } from 'luxon';
import { emptyContentListHeader, emptyContentListBody } from '../../../shared/List/emptyContentListState';
import { Modal } from '../../../../components/Modal/Modal';
import { MoveItemModal } from '../../Folders/MoveItemsModal';
import { NewFolderModal } from '../../Folders/NewFolderModal';
import { FolderTree, rootNode } from '../../../utils/folderService';
import { FolderTreeNode, ContentType } from '../../../redux-flow/store/Folders/types';
import { bulkActionsService } from '../../../redux-flow/store/Common/bulkService';

export interface LiveListProps {
    liveList: SearchResult;
    themesList: ThemeOptions[];
    deleteLiveChannel: Function;
    getLiveList: Function;
}

export const LiveListPage = (props: LiveListProps) => {

    let history = useHistory()

    const [selectedLive, setSelectedLive] = React.useState<string[]>([]);
    const [selectedFilters, setSelectedFilter] = React.useState<any>(null)
    const [paginationInfo, setPaginationInfo] = React.useState<{page: number; nbResults: number}>({page:1,nbResults:10})
    const [searchString, setSearchString] = React.useState<string>(null)
    const [sort, setSort] = React.useState<string>(null)
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false);
    const [currentFolder, setCurrentFolder] = React.useState<FolderTreeNode>(rootNode)
    const [newFolderModalOpened, setNewFolderModalOpened] = React.useState<boolean>(false);


    let foldersTree = new FolderTree(() => {}, setCurrentFolder)

    React.useEffect(() => {
        foldersTree.initTree()
    }, [])

    const parseFiltersToQueryString = (filters: FilteringLiveState) => {
        let returnedString= `page=${paginationInfo.page}&per-page=${paginationInfo.nbResults}&`
        if(filters) {
            
            Object.keys(filters).map((filter) => {
                if(filter.toLowerCase().indexOf('date') === -1 && filter.toLowerCase().indexOf('size') === -1 && Object.values(filters[filter]).some(v => v)) {
                    returnedString += filter + '='
                    Object.keys(filters[filter]).map((subfilter, i) => {
                        if(filters[filter][subfilter]) {
                            returnedString += subfilter + ','
                        }
                    })  
                    returnedString += '&'                
                    returnedString = returnedString.replace(',&','&')
                }            
            })

            if(filters.afterDate || filters.beforedate) {
                returnedString+= `created-at=${filters.beforedate ? filters.beforedate : ''},${filters.afterDate ? filters.afterDate : ''}&`
            }
        }
        if(searchString) {
            returnedString += `keyword=${searchString}&`
        }
        if(sort) {
            returnedString += `sort-by=${sort}&`
        }
        if(returnedString.indexOf('status') === -1) {
            returnedString += 'status=online,offline,processing'
        }
        return returnedString

    }

    React.useEffect(() => {
        props.getLiveList(parseFiltersToQueryString(selectedFilters))    
    }, [selectedFilters, searchString, paginationInfo, sort])

    const liveListHeaderElement = () => {
        return {
            data: [
                {cell: <InputCheckbox
                    className="inline-flex"
                    key="checkboxLiveListBulkAction"
                    indeterminate={selectedLive.length >= 1 && selectedLive.length < props.liveList.results.length}
                    defaultChecked={selectedLive.length === props.liveList.results.length}
                    id="globalCheckboxLiveList"
                    onChange={(event) => {
                        if (event.currentTarget.checked) {
                            const editedselectedLive = props.liveList.results.map(item => { return item.objectID })
                            setSelectedLive(editedselectedLive);
                        } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                            setSelectedLive([])
                        }
                    }
                    }
                />},
                // {cell: <></>},
                {cell: <Text key="nameLiveList" size={14} weight="med" color="gray-1">Name</Text>, sort: 'title'},
                {cell: <Text key="viewsLiveList" size={14} weight="med" color="gray-1">Created Date</Text>, sort: 'created-at'},
                {cell: <Text key="statusLiveList" size={14} weight="med" color="gray-1">Status</Text>},
                {cell: <Text key="statusLiveList" size={14} weight="med" color="gray-1">Features</Text>},
                {cell: <div key="emptyCellLiveList" style={{ width: "80px" }} ></div>},
            ], 
            defaultSort: 'created-at',
            sortCallback: (value: string) => setSort(value)    
        }
    }

    const liveListBodyElement = () => {
        if (props.liveList) {
            return props.liveList.results.map((value) => {
                return {data: [
                    <div key={"checkbox" + value.objectID} className='flex items-center'> 
                        <InputCheckbox className="inline-flex" label="" defaultChecked={selectedLive.includes(value.objectID)} id={"checkbox" + value.objectID} onChange={(event) => {
                            if (event.currentTarget.checked && selectedLive.length < props.liveList.results.length) {
                                setSelectedLive([...selectedLive, value.objectID])
                            } else {
                                const editedselectedLive = selectedLive.filter(item => item !== value.objectID)
                                setSelectedLive(editedselectedLive);
                            }
                        }
                        } />
                        {
                            value.thumbnail ? 
                                <img className="pl2" key={"thumbnail" + value.objectID} width={74} height={42} src={value.thumbnail} />
                                :
                                <div className='ml2 relative justify-center flex items-center' style={{width: 74, height: 42, backgroundColor: '#AFBACC'}}>
                                    <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                                </div>
                        }
                    </div>,
                    <Text key={"title" + value.objectID} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"created" + value.objectID} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.createdAt, DateTime.DATETIME_SHORT)}</Text>,
                    <Text key={"status" + value.objectID} size={14} weight="reg" color="gray-1">{value.status === "online" ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                    <div className='flex'>{value.featuresList ? handleFeatures(value, value.objectID) : null}</div>,
                    <div key={"more" + value.objectID} className="iconAction right mr2" >
                        <ActionIcon id={"editTooltip" + value.objectID}>
                            <IconStyle onClick={() => {history.push('/livestreams/' + value.objectID + '/general') }} className="right mr1" >edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + value.objectID}>Edit</Tooltip>
                        <ActionIcon id={"deleteTooltip" + value.objectID}>
                            <IconStyle onClick={() => { {props.deleteLiveChannel(value.objectID)} }} className="right mr1" >delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + value.objectID}>Delete</Tooltip>    
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
        { name: 'Online/Offline', function: setBulkOnlineOpen, enabled: true },
        { name: 'Paywall On/Off', function: setBulkPaywallOpen, enabled: getPrivilege('privilege-paywall') },
        { name: 'Change Theme', function: setBulkThemeOpen, enabled: true },
        { name: 'Move To', function: setMoveItemsModalOpened, enabled: getPrivilege('privilege-folders') },
        { name: 'Delete', function: setBulkDeleteOpen, enabled: true },
    ]

    const renderList = () => {
        return bulkActions.map((item, key) => {
            if(!item.enabled) return;
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

    const handleBulkAction = (contentList: ContentType[], action: string) => {
        bulkActionsService(contentList, action).then((response) => {

        }).catch((error) => {
            console.log(error)
        })
    }

    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);
    const [addStreamModalOpen, setAddStreamModalOpen] = React.useState<boolean>(false)

    return (
            <>
                <div className='flex items-center mb2'>
                    <div className="flex-auto items-center flex">
                        <IconStyle coloricon='gray-3'>search</IconStyle>
                        <InputTags  noBorder={true} placeholder="Search by Name..." style={{display: "inline-block"}} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => {setSearchString(value[0])}}   />
                    </div>
                    <div className="flex items-center" >
                        {selectedLive.length > 0 ?
                            <Text className=" ml2" color="gray-3" weight="med" size={12} >{selectedLive.length} items</Text>
                            : null
                        }
                        <div className="relative">
                            <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} disabled={selectedLive.length === 0} buttonColor="gray" className="relative  ml2" sizeButton="small" typeButton="secondary" >Bulk Actions</Button>
                            <DropdownList direction='up' hasSearch={false} style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                                {renderList()}
                            </DropdownList>
                        </div>
                        <SeparatorHeader className="mx2 inline-block" />
                        <LivesFiltering setSelectedFilter={setSelectedFilter} />              
                        <Button onClick={() => setAddStreamModalOpen(true)} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Create Live Stream</Button>
                    </div>
                </div>
                
                <Table className="col-12" id="liveListTable" headerBackgroundColor="white" header={props.liveList.results.length > 0 ? liveListHeaderElement() : emptyContentListHeader()} body={props.liveList.results.length > 0 ? liveListBodyElement() : emptyContentListBody('No items matched your search')} hasContainer />
                <Pagination totalResults={props.liveList.totalResults} displayedItemsOptions={[10, 20, 100]} callback={(page: number, nbResults: number) => {setPaginationInfo({page:page,nbResults:nbResults})}} />
                <OnlineBulkForm actionFunction={handleBulkAction} items={selectedLive.map((live) => {return {id: live, type:'channel'}})} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
                <DeleteBulkForm actionFunction={handleBulkAction} items={selectedLive.map((live) => {return {id: live, type:'channel'}})} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
                <PaywallBulkForm actionFunction={handleBulkAction} items={selectedLive.map((live) => {return {id: live, type:'channel'}})} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
                <AddStreamModal  toggle={() => setAddStreamModalOpen(false)} opened={addStreamModalOpen === true} />
                <Modal hasClose={false} modalTitle={selectedLive.length === 1 ? 'Move 1 item to...' : 'Move ' + selectedLive.length + ' items to...'} toggle={() => setMoveItemsModalOpened(!moveItemsModalOpened)} opened={moveItemsModalOpened}>
                {
                    moveItemsModalOpened && 
                    <MoveItemModal submit={async(folderIds: string[]) => {await foldersTree.moveToFolder(folderIds, selectedLive.map(vodId => {return {id: vodId, type: 'channel'}}))}} initialSelectedFolder={currentFolder.fullPath} goToNode={foldersTree.goToNode} toggle={setMoveItemsModalOpened} newFolderModalToggle={setNewFolderModalOpened} />
                }
            </Modal>
            <Modal style={{ zIndex: 100000 }} overlayIndex={10000} hasClose={false} size='small' modalTitle='Create Folder' toggle={() => setNewFolderModalOpened(!newFolderModalOpened)} opened={newFolderModalOpened} >
                {
                    newFolderModalOpened && <NewFolderModal buttonLabel={'Create'} folderPath={currentFolder.fullPath} submit={foldersTree.addFolder} toggle={setNewFolderModalOpened} showToast={() => {}} />
                }
            </Modal>
            </>
    )
}