import React from 'react';
import { IconStyle, ActionIcon } from '../../../../shared/Common/Icon';
import { tsToLocaleDate, readableBytes, useOutsideAlerter } from '../../../../utils/utils';
import { Table } from '../../../../components/Table/Table';
import { Text } from '../../../../components/Typography/Text';
import { VodItem, SearchResult } from '../../../redux-flow/store/VOD/General/types';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { VideosFiltering, FilteringVodState } from './VideosFiltering';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { DropdownList, DropdownItem, DropdownItemText } from '../../../../components/FormsComponents/Dropdown/DropdownStyle';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { PaywallBulkForm, DeleteBulkForm, OnlineBulkForm, ThemeBulkForm } from '../../Playlist/List/BulkModals';
import { SeparatorHeader } from '../../Folders/FoldersStyle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { ThemesData } from '../../../redux-flow/store/Settings/Theming';
import { handleFeatures } from '../../../shared/Common/Features';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import { emptyContentListHeader, emptyContentListBody } from '../../../shared/List/emptyContentListState';
import { Modal } from '../../../../components/Modal/Modal';
import { MoveItemModal } from '../../Folders/MoveItemsModal';
import { FolderTree, rootNode } from '../../../utils/folderService';
import { FolderTreeNode, ContentType } from '../../../redux-flow/store/Folders/types';
import { NewFolderModal } from '../../Folders/NewFolderModal';
import { bulkActionsService } from '../../../redux-flow/store/Common/bulkService';
import { Size, NotificationType } from '../../../../components/Toast/ToastTypes';
import { DeleteContentModal } from '../../../shared/List/DeleteContentModal';

export interface VideosListProps {
    items: SearchResult;
    themesList: ThemesData;
    getVodList: Function;
    deleteVodList: Function;
    getThemesList: Function;
    showVodDeletedToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

export const VideosListPage = (props: VideosListProps) => {

    let history = useHistory()

    const [selectedVod, setSelectedVod] = React.useState<string[]>([]);
    const [bulkOnlineOpen, setBulkOnlineOpen] = React.useState<boolean>(false);
    const [bulkPaywallOpen, setBulkPaywallOpen] = React.useState<boolean>(false);
    const [bulkThemeOpen, setBulkThemeOpen] = React.useState<boolean>(false);
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false);
    const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState<boolean>(false);
    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);
    const bulkDropdownRef = React.useRef<HTMLUListElement>(null);
    const [selectedFilters, setSelectedFilter] = React.useState<any>(null)
    const [paginationInfo, setPaginationInfo] = React.useState<{page: number; nbResults: number}>({page:1,nbResults:10})
    const [searchString, setSearchString] = React.useState<string>(null)
    const [sort, setSort] = React.useState<string>('created-at-desc')
    const [currentFolder, setCurrentFolder] = React.useState<FolderTreeNode>(rootNode)
    const [newFolderModalOpened, setNewFolderModalOpened] = React.useState<boolean>(false);
    const [deleteContentModalOpened, setDeleteContentModalOpened] = React.useState<boolean>(false)
    const [contentToDelete, setContentToDelete] = React.useState<{id: string; title: string}>({id: null, title: null})
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)

    let foldersTree = new FolderTree(() => {}, setCurrentFolder)

    React.useEffect(() => {
        foldersTree.initTree()
    }, [])


    const parseFiltersToQueryString = (filters: FilteringVodState) => {
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

            if(filters.afterDate || filters.beforeDate) {
                returnedString+= `created-at=${filters.afterDate ? filters.afterDate : ''},${filters.beforeDate ? filters.beforeDate : ''}&`
            }
            if(filters.sizeStart || filters.sizeEnd) {
                returnedString+= `size=${filters.sizeStart ? filters.sizeStart : ''},${filters.sizeEnd ? filters.sizeEnd : ''}&`
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
        if(!deleteContentModalOpened && !bulkOnlineOpen && !bulkDeleteOpen && !bulkPaywallOpen && !contentLoading) {
            setContentLoading(true)
            setTimeout(() => {
                props.getVodList(parseFiltersToQueryString(selectedFilters)).then(() => {
                    setContentLoading(false)
                }).catch(() => {
                    setContentLoading(false)
                })  
            }, 5000)

        }
    }, [selectedFilters, searchString, paginationInfo, sort, deleteContentModalOpened, bulkOnlineOpen, bulkDeleteOpen, bulkPaywallOpen])

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

    const renderStatusLabel = (status: string) => {
        switch (status) {
            case 'online':
                return <Label backgroundColor="green20" color="green" label="Online" />
            case 'offline':
                return <Label backgroundColor="red20" color="red" label="Offline" />
            default:
                return <Label backgroundColor="gray-7" color="gray-1" label="Processing" />

        }
    }

    const vodListHeaderElement = () => {
        return {
            data: [
                {cell: <InputCheckbox className="inline-flex" label="" key="checkboxVodListBulkAction" indeterminate={selectedVod.length >= 1 && selectedVod.length < props.items.results.length} defaultChecked={selectedVod.length === props.items.results.length} id="globalCheckboxVodList"
                    onChange={(event) => {
                        if (event.currentTarget.checked) {
                            const editedSelectedVod = props.items.results.map(item => { return item.objectID })
                            setSelectedVod(editedSelectedVod);
                        } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                            setSelectedVod([])
                        }
                    }} />},
                // {cell: <></>},
                {cell: <Text key="nameVodList" size={14} weight="med" color="gray-1">Title</Text>, sort: 'title'},
                {cell: <Text key="sizeVodList" size={14} weight="med" color="gray-1">Size</Text>},
                // NOT V1 {cell: <Text key="viewsVodList" size={14} weight="med" color="gray-1">Views</Text>},
                {cell: <Text key="viewsVodList" size={14} weight="med" color="gray-1">Created Date</Text>, sort: 'created-at'},
                {cell: <Text key="statusVodList" size={14} weight="med" color="gray-1">Status</Text>},
                {cell: <Text key="statusVodList" size={14} weight="med" color="gray-1">Features</Text>},
                {cell: <div style={{ width: "80px" }} ></div>},
            ], 
            defaultSort: 'created-at',
            sortCallback: (value: string) => setSort(value)
        }
    }

    const vodListBodyElement = () => {
        if (props.items) {
            return props.items.results.map((value) => {
                return {data: [
                    <div key={"checkbox" + value.objectID} style={ {paddingTop:8 , paddingBottom: 8 } } className='flex items-center'>
                        <InputCheckbox className="inline-flex pr2" label="" defaultChecked={selectedVod.includes(value.objectID)} id={"checkboxVod" + value.objectID.toString()} onChange={(event) => {
                            if (event.currentTarget.checked && selectedVod.length < props.items.totalResults) {
                                setSelectedVod([...selectedVod, value.objectID])
                            } else {
                                const editedSelectedVod = selectedVod.filter(item => item !== value.objectID)
                                setSelectedVod(editedSelectedVod);
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
                    <Text key={"title" + value.objectID} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"size" + value.objectID} size={14} weight="reg" color="gray-1">{value.size ? readableBytes(value.size) : ''}</Text>,
                    // NOT V1 <Text key={"views" + value.objectID} size={14} weight="reg" color="gray-1">{value.views}</Text>,
                    <Text key={"created" + value.objectID} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.createdAt, DateTime.DATETIME_SHORT)}</Text>,
                    <Text key={"status" + value.objectID} size={14} weight="reg" color="gray-1">{renderStatusLabel(value.status)}</Text>,
                    <div className='flex'>{value.featuresList ? handleFeatures(value, value.objectID.toString()) : null}</div>,
                    <div key={"more" + value.objectID} className="iconAction right mr2" >
                        <ActionIcon id={"deleteTooltip" + value.objectID}>
                            <IconStyle onClick={() => { setContentToDelete({id: value.objectID, title: value.title});setDeleteContentModalOpened(true) }} className="right mr1" >delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + value.objectID}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + value.objectID}>
                            <IconStyle onClick={() => {history.push('/videos/' + value.objectID + '/general') }} className="right mr1" >edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + value.objectID}>Edit</Tooltip>  
                    </div>,
                ], 
                callback: (value: VodItem) => { },
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
                    onClick={() => { item.function(true); setDropdownIsOpened(false); }}>
                    <DropdownItemText size={14} weight='reg' color={'gray-1'}>{item.name}</DropdownItemText>
                </DropdownItem>
            )
        })
    }

    const handleBulkAction = async (contentList: ContentType[], action: string, targetValue?: string | boolean) => {
        return await bulkActionsService(contentList, action, targetValue).then((response) => {
            switch(action) {
                case 'online':
                    setBulkOnlineOpen(false)
                    break
                case 'delete':
                    setBulkDeleteOpen(false)
                    break
                case 'theme': 
                    setBulkThemeOpen(false)
                    break
                case 'paywall': 
                    setBulkPaywallOpen(false)
                    break
                default:
                    break
            }
            setSelectedVod([])
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <>
            <div className='flex items-center mb2'>
                <div className="flex-auto items-center flex">
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag  noBorder={true} placeholder="Search by Title..." style={{display: "inline-block"}} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => {setSearchString(value[0]);console.log(value[0])}}   />
                </div>
                <div className="flex items-center" >
                    {selectedVod.length > 0 &&
                        <Text className=" ml2" color="gray-3" weight="med" size={12} >{selectedVod.length} items</Text>
                    }
                    <div className="relative">
                        <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} disabled={selectedVod.length === 0} buttonColor="gray" className="relative  ml2" sizeButton="small" typeButton="secondary" >Bulk Actions</Button>
                        <DropdownList ref={bulkDropdownRef} hasSearch={false} style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                            {renderList()}
                        </DropdownList>
                    </div>
                    <SeparatorHeader className="mx2 inline-block" />
                    <VideosFiltering setSelectedFilter={setSelectedFilter} />                
                    <Button onClick={() => history.push('/uploader')} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Upload Video</Button>
                </div>
            </div>        
            <Table contentLoading={contentLoading} className="col-12" id="videosListTable" headerBackgroundColor="white" header={props.items.results.length > 0 ? vodListHeaderElement() : emptyContentListHeader()} body={props.items.results.length > 0 ?vodListBodyElement() : emptyContentListBody('No items matched your search')} hasContainer />
            <Pagination totalResults={props.items.totalResults} displayedItemsOptions={[10, 20, 100]} callback={(page: number, nbResults: number) => {setPaginationInfo({page:page,nbResults:nbResults})}} />
            <OnlineBulkForm showToast={props.showVodDeletedToast} actionFunction={handleBulkAction} items={selectedVod.map((vod) => {return {id:vod, type: 'vod'}})} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
            <DeleteBulkForm showToast={props.showVodDeletedToast} actionFunction={handleBulkAction} items={selectedVod.map((vod) => {return {id:vod, type: 'vod'}})} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
            <PaywallBulkForm showToast={props.showVodDeletedToast} actionFunction={handleBulkAction} items={selectedVod.map((vod) => {return {id:vod, type: 'vod'}})} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
            
            {
                bulkThemeOpen &&
                <ThemeBulkForm showToast={props.showVodDeletedToast} getThemesList={() => props.getThemesList()} actionFunction={handleBulkAction} themes={props.themesList ? props.themesList.themes : []} items={selectedVod.map((vod) => {return {id:vod, type: 'vod'}})} open={bulkThemeOpen} toggle={setBulkThemeOpen} />
            }
            <Modal hasClose={false} modalTitle={selectedVod.length === 1 ? 'Move 1 item to...' : 'Move ' + selectedVod.length + ' items to...'} toggle={() => setMoveItemsModalOpened(!moveItemsModalOpened)} opened={moveItemsModalOpened}>
                {
                    moveItemsModalOpened && 
                    <MoveItemModal showToast={props.showVodDeletedToast} setMoveModalSelectedFolder={(s: string) => {}} submit={async(folderIds: string[]) => {await foldersTree.moveToFolder(folderIds, selectedVod.map(vodId => {return {id: vodId, type: 'vod'}}))}} initialSelectedFolder={currentFolder.fullPath} goToNode={foldersTree.goToNode} toggle={setMoveItemsModalOpened} newFolderModalToggle={setNewFolderModalOpened} />
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
                    <DeleteContentModal showToast={props.showVodDeletedToast} toggle={setDeleteContentModalOpened} contentName={contentToDelete.title} deleteContent={async () => {await props.deleteVodList(contentToDelete.id)}} />
                }
            </Modal>
        </>

    )

}


