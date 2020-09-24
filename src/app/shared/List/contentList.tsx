import React from 'react';
import { IconStyle, ActionIcon } from '../../../shared/Common/Icon';
import { tsToLocaleDate, readableBytes, useOutsideAlerter, useQuery } from '../../../utils/utils';
import { Table } from '../../../components/Table/Table';
import { Text } from '../../../components/Typography/Text';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Pagination } from '../../../components/Pagination/Pagination';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { DropdownList, DropdownItem, DropdownItemText } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { SeparatorHeader, TitleContainer, ListContentTitle } from '../../../app/pages/Folders/FoldersStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { handleFeatures } from '../../shared/Common/Features';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import { emptyContentListHeader, emptyContentListBody } from '../../shared/List/emptyContentListState';
import { Modal } from '../../../components/Modal/Modal';
import { MoveItemModal } from '../../../app/pages/Folders/MoveItemsModal';
import { FolderTree, rootNode } from '../../utils/services/folder/folderService';
import { FolderTreeNode } from '../../redux-flow/store/Folders/types';
import { NewFolderModal } from '../../../app/pages/Folders/NewFolderModal';
import { DeleteContentModal } from '../../shared/List/DeleteContentModal';
import { SearchResult } from '../../redux-flow/store/Content/General/types';
import { ThemesData } from '../../redux-flow/store/Settings/Theming';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm, ThemeBulkForm } from './BulkModals';
import { AddStreamModal } from '../../containers/Navigation/AddStreamModal';
import { AddPlaylistModal } from '../../containers/Navigation/AddPlaylistModal';
import { ContentFiltering, FilteringContentState } from './ContentFiltering';
import EventHooker from '../../utils/services/event/eventHooker';

interface ContentListProps {
    contentType: string
    items: SearchResult;
    themesList: ThemesData;
    getContentList: (qs: string, contentType: string) => Promise<void>;
    deleteContentList: (voidId: string, contentType: string) => Promise<void>;
    getThemesList: () => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

export const ContentListPage = (props: ContentListProps) => {

    let history = useHistory()

    let qs = useQuery()

    const formatFilters = () => {
        let filters: FilteringContentState = {
            status: {
                online: qs.toString().indexOf('online') > -1,
                offline: qs.toString().indexOf('offline') > -1
            },
            features: {
                paywall: qs.toString().indexOf('paywall') > -1,
                advertising: qs.toString().indexOf('advertising') > -1,
                playlists: qs.toString().indexOf('playlists') > -1,
                // recording: qs.toString().indexOf('recording') > -1,
                // rewind: qs.toString().indexOf('rewind') > -1
            },
            afterDate: parseInt(qs.get('afterDate')) || false,
            beforeDate: parseInt(qs.get('beforeDate')) || false,
            sizeEnd: qs.get('sizeEnd'),
            sizeStart: qs.get('sizeStart')
        }
        return filters
    }

    const [selectedContent, setSelectedContent] = React.useState<string[]>([]);
    const [bulkOnlineOpen, setBulkOnlineOpen] = React.useState<boolean>(false);
    const [bulkPaywallOpen, setBulkPaywallOpen] = React.useState<boolean>(false);
    const [bulkThemeOpen, setBulkThemeOpen] = React.useState<boolean>(false);
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false);
    const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState<boolean>(false);
    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);
    const bulkDropdownRef = React.useRef<HTMLUListElement>(null);
    const [selectedFilters, setSelectedFilter] = React.useState<FilteringContentState>(formatFilters())
    const [paginationInfo, setPaginationInfo] = React.useState<{page: number; nbResults: number}>({page: parseInt(qs.get('page')) || 1, nbResults: parseInt(qs.get('perPage')) || 10})
    const [searchString, setSearchString] = React.useState<string>(qs.get('keyword') || null)
    const [sort, setSort] = React.useState<string>(qs.get('sortBy') || 'created-at-desc')
    const [currentFolder, setCurrentFolder] = React.useState<FolderTreeNode>(rootNode)
    const [newFolderModalOpened, setNewFolderModalOpened] = React.useState<boolean>(false);
    const [deleteContentModalOpened, setDeleteContentModalOpened] = React.useState<boolean>(false)
    const [contentToDelete, setContentToDelete] = React.useState<{id: string; title: string}>({id: null, title: null})
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const [fetchContent, setFetchContent] = React.useState<boolean>(false)
    const [updateList, setListUpdate] = React.useState<'online' | 'offline' | 'paywall' | 'deleted'>('online')
    const [contentList, setContentList] = React.useState<SearchResult>(props.items)
    const [addStreamModalOpen, setAddStreamModalOpen] = React.useState<boolean>(false)
    const [addPlaylistModalOpen, setAddPlaylistModalOpen] = React.useState<boolean>(false)
    const [qsParams, setQsParams] = React.useState<string>(qs.toString() || 'status=online,offline&page=1&perPage=10&sortBy=created-at-desc')

    let foldersTree = new FolderTree(() => {}, setCurrentFolder)

    React.useEffect(() => {
        let vodUploadedHandler = () => {
            //set timer
            console.log('vod was uploaded!')
        }
        EventHooker.subscribe('EVENT_VOD_UPLOADED', vodUploadedHandler)
        foldersTree.initTree()
        // const interval = setInterval(() => {
        //     setFetchContent(true)
        //   }, 60000)

        return () => {
            EventHooker.unsubscribe('EVENT_VOD_UPLOADED', vodUploadedHandler)
        }
    }, [])

    React.useEffect(() => {
        setContentList(props.items)
    }, [props.items])

    React.useEffect(() => {
        if(selectedContent.length > 0) {
            setContentList({
                ...contentList, 
                results: contentList.results.map((item) => {
                    if(selectedContent.indexOf(item.objectID) > -1) {
                        return {
                            ...item,
                            status: updateList !== 'paywall' ? updateList : item.status,
                            featuresList: updateList === 'paywall' && item.featuresList.paywall ? {...item.featuresList, paywall: false} : item.featuresList
                        }
                    }
                    return {
                        ...item
                    }

                })
            })
        }
        setSelectedContent([])
    }, [updateList])


    const formatFiltersToQueryString = (filters: FilteringContentState, pagination: {page: number; nbResults: number}, sortValue: string, keyword: string, ) => {
        let returnedString= `page=${pagination.page}&perPage=${pagination.nbResults}`
        if(filters) {
            
            if(filters.features) {
                returnedString += '&features=' + (filters.features.advertising ? 'advertising' : '') + (filters.features.paywall ? ',paywall' : '') + (filters.features.playlists ? ',playlists' : '') + (filters.features.recording ? ',recording' : '') + (filters.features.rewind ? ',rewind' : '')
            }

            if(filters.status) {
                returnedString += '&status=' + (filters.status.online ? 'online' : '') + (filters.status.offline ? ',offline' : '')
            }

            if(filters.afterDate) {
                returnedString += `&afterDate=${filters.afterDate}`
            }

            if(filters.beforeDate) {
                returnedString += `&beforeDate=${filters.beforeDate}`
            }

            if(filters.sizeStart) {
                returnedString += `&sizeStart=${filters.sizeStart}`
            }

            if(filters.sizeEnd) {
                returnedString += `&sizeEnd=${filters.sizeEnd}`
            }
        }
        if(keyword) {
            returnedString += `&keyword=${keyword}`
        }
        if(sortValue) {
            returnedString += `&sortBy=${sortValue}`
        }

        if(returnedString.indexOf('status=&') > -1) {
            returnedString = returnedString.replace('status=&','status=online,offline&')
        }

        if(returnedString.indexOf('features=&') > -1) {
            returnedString = returnedString.replace('features=&','')
        }

        if(returnedString.indexOf('status') === -1) {
            returnedString += '&status=online,offline'
        }
        setQsParams(returnedString)
    }

    React.useEffect(() => {
        if(!fetchContent) {
            setFetchContent(true)
        }
    }, [qsParams])

    React.useEffect(() => {
        if(fetchContent) {
            setContentLoading(true)
            props.getContentList(qsParams, props.contentType).then(() => {
                setContentLoading(false)
                setFetchContent(false)
                history.push(`${location.pathname}?${qsParams}`)
            }).catch(() => {
                setContentLoading(false)
                setFetchContent(false)
            })  
        }
    }, [fetchContent])

    useOutsideAlerter(bulkDropdownRef, () => {
        setDropdownIsOpened(!dropdownIsOpened)
    })

    const bulkActions = [
        { name: 'Online/Offline', function: setBulkOnlineOpen },
        { name: 'Paywall Off', function: setBulkPaywallOpen },
        { name: 'Change Theme', function: setBulkThemeOpen },
        { name: 'Move To', function: setMoveItemsModalOpened },
        { name: 'Delete', function: setBulkDeleteOpen },
    ]

    const handleURLName = (contentType: string) => {
        switch (contentType) {
            case 'vod':
                return 'videos'
            case 'live':
                return 'livestreams'
            case 'playlist':
                return 'playlists'
        }
    }

    const contentListHeaderElement = () => {
        return {
            data: [
                {cell: <InputCheckbox className="inline-flex" label="" key="checkboxcontentListBulkAction" indeterminate={selectedContent.length >= 1 && selectedContent.length < contentList.results.filter(item => item.status !== 'deleted').length} defaultChecked={selectedContent.length === contentList.results.filter(item => item.status !== 'deleted').length} id="globalCheckboxcontentList"
                    onChange={(event) => {
                        if (event.currentTarget.checked) {
                            const editedselectedContent = contentList.results.filter(item => item.status !== 'deleted').map(item => { return item.objectID })
                            setSelectedContent(editedselectedContent);
                        } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                            setSelectedContent([])
                        }
                    }} />},
                // {cell: <></>},
                {cell: <Text key="namecontentList" size={14} weight="med" color="gray-1">Title</Text>, sort: 'title'},
                {cell: <Text key="sizecontentList" size={14} weight="med" color="gray-1">Size</Text>},
                // NOT V1 {cell: <Text key="viewscontentList" size={14} weight="med" color="gray-1">Views</Text>},
                {cell: <Text key="viewscontentList" size={14} weight="med" color="gray-1">Created Date</Text>, sort: 'created-at'},
                {cell: <Text key="statuscontentList" size={14} weight="med" color="gray-1">Status</Text>},
                {cell: <Text key="statuscontentList" size={14} weight="med" color="gray-1">Features</Text>},
                {cell: <div style={{ width: "80px" }} ></div>},
            ], 
            defaultSort: 'created-at',
            sortCallback: (value: string) => {setSort(value); formatFiltersToQueryString(selectedFilters, paginationInfo, value, searchString)}
        }
    }

    const handleContentStatus = (status: string, type: string, size: number) =>{
        switch(status) {
            case 'online':
                return type === 'vod' && !size ? <Label backgroundColor="gray-5" color="gray-1" label="Processing" /> : <Label backgroundColor="green20" color="green" label="Online" />
            case 'offline':
            case 'deleted':
                return <Label backgroundColor="red20" color="red" label={status.charAt(0).toUpperCase() + status.slice(1)} />  
            default:
            return null
        }
    }

    const contentListBodyElement = () => {
        if (contentList) {
            return contentList.results.map((value) => {
                return {
                    data: [
                        <div key={"checkbox" + value.objectID} style={ {paddingTop:8 , paddingBottom: 8 } } className='flex items-center'> 
                            <InputCheckbox className="inline-flex pr2" label="" defaultChecked={selectedContent.includes(value.objectID)} id={"checkbox" + value.objectID} onChange={(event) => {
                                if (event.currentTarget.checked && selectedContent.length < contentList.results.length) {
                                    setSelectedContent([...selectedContent, value.objectID])
                                } else {
                                    const editedselectedLive = selectedContent.filter(item => item !== value.objectID)
                                    setSelectedContent(editedselectedLive);
                                }
                            }
                            } />
                            {
                                value.thumbnail ? 
                                    <img className="mr1" key={"thumbnail" + value.objectID} width={94} height={54} src={value.thumbnail} />
                                    :
                                    <div className='mr1 relative justify-center flex items-center' style={{width: 94, height: 54, backgroundColor: '#AFBACC'}}>
                                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                                    </div>
                            }
                        </div>,
                        <TitleContainer>
                            <ListContentTitle onClick={() => !(value.type === 'vod' && !value.size) && history.push('/' + handleURLName(props.contentType) + '/' + value.objectID + '/general')} key={"title" + value.objectID} size={14} weight="reg" color="gray-1">{value.title}</ListContentTitle>
                        </TitleContainer>
                        ,
                        <Text onClick={() => !(value.type === 'vod' && !value.size) && history.push('/' + handleURLName(props.contentType) + '/' + value.objectID + '/general')} key={"size" + value.objectID} size={14} weight="reg" color="gray-1">{value.size ? readableBytes(value.size) : ''}</Text>,
                        <Text onClick={() => !(value.type === 'vod' && !value.size) && history.push('/' + handleURLName(props.contentType) + '/' + value.objectID + '/general')} key={"created" + value.objectID} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.createdAt, DateTime.DATETIME_SHORT)}</Text>,
                        <Text onClick={() => !(value.type === 'vod' && !value.size) && history.push('/' + handleURLName(props.contentType) + '/' + value.objectID + '/general')} key={"status" + value.objectID} size={14} weight="reg" color="gray-1">{handleContentStatus(value.status, value.type, value.size)}</Text>,
                        <div onClick={() => !(value.type === 'vod' && !value.size) && history.push('/' + handleURLName(props.contentType) + '/' + value.objectID + '/general')} className='flex'>{value.featuresList ? handleFeatures(value, value.objectID) : null}</div>,
                        value.status !== 'deleted' && !(value.type === 'vod' && !value.size) ?
                            <div key={"more" + value.objectID} className="iconAction right mr2" >
                                <ActionIcon id={"deleteTooltip" + value.objectID}>
                                <IconStyle onClick={() => { {setContentToDelete({id: value.objectID, title: value.title});setSelectedContent([value.objectID]);setDeleteContentModalOpened(true)} }} className="right mr1" >delete</IconStyle>
                                </ActionIcon>
                                <Tooltip target={"deleteTooltip" + value.objectID}>Delete</Tooltip> 
                                <ActionIcon id={"editTooltip" + value.objectID}>
                                    <IconStyle onClick={() => {history.push('/' + handleURLName(props.contentType) + '/' + value.objectID + '/general') }} className="right mr1" >edit</IconStyle>
                                </ActionIcon>
                                <Tooltip target={"editTooltip" + value.objectID}>Edit</Tooltip>
                            </div>
                        : <span></span>

                    ],
                    isSelected: selectedContent.includes(value.objectID),
                    isDisabled: value.status === 'deleted',
                    isProcessing: (value.type === 'vod' && !value.size)
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
                    onClick={() => { item.function(true); setDropdownIsOpened(false); }}>
                    <DropdownItemText size={14} weight='reg' color={'gray-1'}>{item.name}</DropdownItemText>
                </DropdownItem>
            )
        })
    }

    return (
        <>
            <div className='flex items-center mb2'>
                <div className="flex-auto items-center flex">
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag  noBorder={true} placeholder="Search by Title..." style={{display: "inline-block"}} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => {setSearchString(value[0]);formatFiltersToQueryString(selectedFilters, paginationInfo, sort, value[0])}}   />
                </div>
                <div className="flex items-center" >
                    {selectedContent.length > 0 &&
                        <Text className=" ml2" color="gray-3" weight="med" size={12} >{selectedContent.length} {selectedContent.length === 1 ? "Item" : "Items"}</Text>
                    }
                    <div className="relative">
                        <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} disabled={selectedContent.length === 0} buttonColor="gray" className="relative  ml2" sizeButton="small" typeButton="secondary" >Bulk Actions</Button>
                        <DropdownList ref={bulkDropdownRef} hasSearch={false} style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                            {renderList()}
                        </DropdownList>
                    </div>
                    <SeparatorHeader className="mx2 inline-block" />
                    <ContentFiltering defaultFilters={selectedFilters} setSelectedFilter={(filters) => {setSelectedFilter(filters);formatFiltersToQueryString(filters, paginationInfo, sort, searchString)}} contentType={props.contentType} />                
                    {
                        props.contentType === "vod" &&
                            <Button onClick={() => history.push('/uploader')} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Upload Video</Button>
                    }
                    {
                        props.contentType === "live" &&
                            <Button onClick={() => setAddStreamModalOpen(true)} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Create Live Stream</Button> 
                    }
                    {
                        props.contentType === "playlist" && 
                            <Button buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" onClick={() => setAddPlaylistModalOpen(true)} >Create Playlist</Button> 
                    }
                </div>
            </div>        
            <Table contentLoading={contentLoading} className="col-12" id="videosListTable" headerBackgroundColor="white" header={contentList.results.length > 0 ? contentListHeaderElement() : emptyContentListHeader()} body={contentList.results.length > 0 ?contentListBodyElement() : emptyContentListBody('No items matched your search')} hasContainer />
            <Pagination totalResults={contentList.totalResults} defaultDisplayedOption={paginationInfo.nbResults} defaultPage={paginationInfo.page} displayedItemsOptions={[10, 20, 100]} callback={(page: number, nbResults: number) => {setPaginationInfo({page:page,nbResults:nbResults});formatFiltersToQueryString(selectedFilters, {page:page,nbResults:nbResults}, sort, searchString)}} />
            <OnlineBulkForm updateList={setListUpdate} showToast={props.showToast} items={selectedContent.map((vod) => {return {id:vod, type: props.contentType === 'live' ? 'channel' : props.contentType as 'vod' | 'channel' | 'playlist'}})} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
            <DeleteBulkForm updateList={setListUpdate} showToast={props.showToast} items={selectedContent.map((vod) => {return {id:vod, type: props.contentType === 'live' ? 'channel' : props.contentType as 'vod' | 'channel' | 'playlist'}})} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
            <PaywallBulkForm updateList={setListUpdate} showToast={props.showToast} items={selectedContent.map((vod) => {return {id:vod, type: props.contentType === 'live' ? 'channel' : props.contentType as 'vod' | 'channel' | 'playlist'}})} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
            
            {
                bulkThemeOpen &&
                <ThemeBulkForm updateList={setListUpdate} showToast={props.showToast} getThemesList={() => props.getThemesList()} themes={props.themesList ? props.themesList.themes : []} items={selectedContent.map((vod) => {return {id:vod, type: props.contentType === 'live' ? 'channel' : props.contentType as 'vod' | 'channel' | 'playlist'}})} open={bulkThemeOpen} toggle={setBulkThemeOpen} />
            }
            <Modal hasClose={false} modalTitle={selectedContent.length === 1 ? 'Move 1 item to...' : 'Move ' + selectedContent.length + ' items to...'} toggle={() => setMoveItemsModalOpened(!moveItemsModalOpened)} opened={moveItemsModalOpened}>
                {
                    moveItemsModalOpened && 
                    <MoveItemModal showToast={props.showToast} setMoveModalSelectedFolder={(s: string) => {}} submit={async(folderIds: string[]) => {await foldersTree.moveToFolder(folderIds, selectedContent.map(vodId => {return {id: vodId, type: props.contentType === 'live' ? 'channel' : props.contentType as 'vod' | 'channel' | 'playlist'}}))}} initialSelectedFolder={currentFolder.fullPath} goToNode={foldersTree.goToNode} toggle={setMoveItemsModalOpened} newFolderModalToggle={setNewFolderModalOpened} />
                }
            </Modal>
            <Modal style={{ zIndex: 100000 }} overlayIndex={10000} hasClose={false} size='small' modalTitle='Create Folder' toggle={() => setNewFolderModalOpened(!newFolderModalOpened)} opened={newFolderModalOpened} >
                {
                    newFolderModalOpened && <NewFolderModal buttonLabel={'Create'} folderPath={currentFolder.fullPath} submit={foldersTree.addFolder} toggle={setNewFolderModalOpened} showToast={() => {}} />
                }
            </Modal>
            <Modal icon={{ name: 'warning', color: 'red' }} hasClose={false} size='small' modalTitle='Delete Content?' toggle={() => setDeleteContentModalOpened(!deleteContentModalOpened)} opened={deleteContentModalOpened} >
                {
                    deleteContentModalOpened &&
                    <DeleteContentModal showToast={props.showToast} toggle={setDeleteContentModalOpened} contentName={contentToDelete.title} deleteContent={async () => {await props.deleteContentList(contentToDelete.id, props.contentType).then(() => setListUpdate('deleted'))}} />
                }
            </Modal>
            <AddStreamModal  toggle={() => setAddStreamModalOpen(false)} opened={addStreamModalOpen === true} />
            <AddPlaylistModal toggle={() => setAddPlaylistModalOpen(false)} opened={addPlaylistModalOpen === true} />
        </>

    )
}

