import React from 'react'
import { FoldersTreeSection, ContentSection, FolderRow, SeparatorHeader, RowIconContainer } from './FoldersStyle'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Text } from '../../../components/Typography/Text'
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox'
import { IconStyle, IconGreyActionsContainer } from '../../../shared/Common/Icon'
import { Label } from '../../../components/FormsComponents/Label/Label'
import { Table } from '../../../components/Table/Table'
import { Pagination } from '../../../components/Pagination/Pagination'
import { FoldersFiltering, FoldersFilteringState } from './FoldersFiltering'
import { Modal } from '../../../components/Modal/Modal'
import { NewFolderModal } from './NewFolderModal'
import { MoveItemModal } from './MoveItemsModal'
import { tsToLocaleDate, useMedia } from '../../../utils/utils'
import { FolderTreeNode, FolderAsset, ContentType } from '../../redux-flow/store/Folders/types'
import { BreadcrumbDropdown } from './BreadcrumbDropdown'
import { FoldersComponentProps } from '../../containers/Folders/Folders'
import { InputTags } from '../../../components/FormsComponents/Input/InputTags'
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle'
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm, ThemeBulkForm } from '../Playlist/List/BulkModals'
import { EmptyTrashModal } from './EmptyTrashModal'
import { DropdownCustom } from '../../../components/FormsComponents/Dropdown/DropdownCustom'
import { handleFeatures } from '../../shared/Common/Features'
import { DateTime } from 'luxon'
import { FolderTree, rootNode } from '../../utils/folderService'
import { useHistory } from 'react-router'
import { bulkActionsService } from '../../redux-flow/store/Common/bulkService'
import { emptyContentListHeader, emptyContentListBody } from '../../shared/List/emptyContentListState';

export const FoldersPage = (props: FoldersComponentProps) => {

    let smallScreen = useMedia('(max-width: 40em)')
    let history = useHistory()
    const FIXED_FOLDERS = ['Library', 'Unsorted', 'Trash']

    const [folderTree, setFoldersTree] = React.useState<FolderTreeNode>(rootNode)
    const [newFolderModalOpened, setNewFolderModalOpened] = React.useState<boolean>(false)
    const [currentFolder, setCurrentFolder] = React.useState<FolderTreeNode>(rootNode)
    const [selectedFolder, setSelectedFolder] = React.useState<string>('Library')
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false)
    const [checkedItems, setCheckedItems] = React.useState<ContentType[]>([])
    const [foldersTreeHidden, setFoldersTreeHidden] = React.useState<boolean>(smallScreen)
    const [newFolderModalAction, setNewFolderModalAction] = React.useState<'Rename Folder' | 'New Folder'>('New Folder')
    const [emptyTrashModalOpened, setEmptyTrashModalOpened] = React.useState<boolean>(false)
    const [bulkOnlineOpen, setBulkOnlineOpen] = React.useState<boolean>(false)
    const [bulkPaywallOpen, setBulkPaywallOpen] = React.useState<boolean>(false)
    const [bulkThemeOpen, setBulkThemeOpen] = React.useState<boolean>(false)
    const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState<boolean>(false)
    const [bulkActionsDropdownIsOpened, setBulkActionsDropdownIsOpened] = React.useState<boolean>(false)
    const [folderAssetSelected, setFolderAssetSelected] = React.useState<number>(0)

    const [selectedFilters, setSelectedFilter] = React.useState<FoldersFilteringState>(null)
    const [paginationInfo, setPaginationInfo] = React.useState<{page: number; nbResults: number}>({page:1,nbResults:10})
    const [searchString, setSearchString] = React.useState<string>(null)
    const [sort, setSort] = React.useState<string>(null)

    const bulkActionsDropdownListRef = React.useRef<HTMLUListElement>(null);

    let foldersTree = new FolderTree(setFoldersTree, setCurrentFolder)

    const parseFiltersToQueryString = (filters: FoldersFilteringState) => {
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
        if(returnedString.indexOf('status') === -1 && selectedFolder !== 'Trash') {
            returnedString += 'status=online,offline,processing'
        } else if(selectedFolder === 'Trash') {
            returnedString += 'status=deleted'
        }

        if(currentFolder.id && FIXED_FOLDERS.indexOf(selectedFolder) === -1) {
            returnedString += `&folders=${currentFolder.id}`
        }

        if(FIXED_FOLDERS.indexOf(selectedFolder) > -1) {
            returnedString += `&content-types=channel,vod,playlist`
        } else {
            returnedString += `&content-types=channel,vod,playlist,folder`
        }
        if(selectedFolder === 'Unsorted') {
            returnedString += '&tags=no_folder'
        }
        return returnedString

    }

    React.useEffect(() => {
        props.getFolderContent(parseFiltersToQueryString(selectedFilters))
    }, [selectedFilters, searchString, paginationInfo, sort])


    React.useEffect(() => {
        const wait = async () => {
            await foldersTree.initTree()
        }
        wait()
    }, [])

    React.useEffect(() => {
        if(currentFolder.id) {
            setSelectedFolder(currentFolder.id)
            props.getFolderContent(parseFiltersToQueryString(selectedFilters))
        }

    }, [currentFolder])

    React.useEffect(() => {
        setCheckedItems([])
        if(FIXED_FOLDERS.indexOf(selectedFolder) > -1) {
            props.getFolderContent(parseFiltersToQueryString(selectedFilters))
            // setCurrentFolder(null)
        }
    }, [selectedFolder])

    // useEasyOutsideAlerter(bulkActionsDropdownListRef, () => {
    //     setBulkActionsDropdownIsOpened(false)
    // });

    const bulkActions = [
        { name: 'Online/Offline', function: setBulkOnlineOpen },
        { name: 'Paywall Off', function: setBulkPaywallOpen },
        { name: 'Change Theme', function: setBulkThemeOpen },
        { name: 'Move To', function: setMoveItemsModalOpened },
        { name: 'Delete', function: setBulkDeleteOpen },
    ]

    const renderList = () => {
        const customBulkActions = folderAssetSelected > 0 ? bulkActions.filter(action => action.name === 'Move To' || action.name === 'Delete') : bulkActions
        return customBulkActions.map((item, key) => {
            return (
                <DropdownItem
                    isSingle
                    key={item.name}
                    className={key === 0 ? 'mt1' : ''}
                    isSelected={false}
                    onClick={() =>{ item.function(true); setBulkActionsDropdownIsOpened(false)}}>
                    <DropdownItemText size={14} weight='reg' color={'gray-1'}>{item.name}</DropdownItemText>
                </DropdownItem>
            )
        })
    }

    const foldersContentTableHeader = () => {
        return {
            data: [
                {
                    cell: <InputCheckbox key='tableHeaderCheckboxCell' id='tableHeaderCheckbox'
                        indeterminate={checkedItems.length >= 1 && checkedItems.length < props.folderData.requestedContent.results.length}
                        defaultChecked={checkedItems.length === props.folderData.requestedContent.results.length}
                        onChange={(event) => {
                            if (event.currentTarget.checked) {
                                let folderCounter = 0
                                const editedItem: ContentType[] = props.folderData.requestedContent.results.map(item => {
                                    if (item.type === 'folder') {
                                        folderCounter += 1
                                    }
                                    return {id: item.objectID, type: item.type}
                                })
                                setFolderAssetSelected(folderCounter);
                                setCheckedItems(editedItem);
                            } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                                setCheckedItems([])
                                setFolderAssetSelected(0)
                            }
                        }
                        }
                    />
                },
                { cell: <Text key='tableHeaderNameCell' size={14} weight='med'>Title</Text>, sort: 'title' },
                { cell: <Text key='tableHeaderDurationCell' size={14} weight='med'>Duration</Text> },
                { cell: <Text key='tableHeaderCreatedCell' size={14} weight='med'>Created Date</Text>, sort: 'created-at' },
                { cell: <Text key='tableHeaderStatusCell' size={14} weight='med'>Status</Text> },
                { cell: <Text key='tableHeaderFeaturesCell' size={14} weight='med'>Features</Text> },
                { cell: <span key='tableHeaderEmptyCell2'></span> }
            ], 
            defaultSort: 'created-at',
            sortCallback: (value: string) => setSort(value)
        }
    }

    const handleCheckboxChange = (item: ContentType, isChecked: boolean) => {
        if (checkedItems.find((option) => option.id === item.id)) {
            setCheckedItems(checkedItems.filter(option => { return option.id !== item.id }));
        } else {
            setCheckedItems([...checkedItems, item]);
        }
        if (isChecked && item.type === 'folder') {
            setFolderAssetSelected(folderAssetSelected + 1)
        } else if (!isChecked && item.type === 'folder') {
            setFolderAssetSelected(folderAssetSelected > 0 ? folderAssetSelected - 1 : 0)
        }
    }

    const handleRowIconType = (item: FolderAsset) => {
        switch (item.type) {
            case 'playlist':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID} fontSize="large">playlist_play</IconStyle>
            case 'folder':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID} fontSize="large">folder_open</IconStyle>
            case 'channel':
            case 'vod':
                return item.thumbnail ? 
                    <img key={"thumbnail" + item.objectID} width={74} height={42} src={item.thumbnail} ></img> 
                    :
                    <div className='relative justify-center flex items-center' style={{width: 74, height: 42, backgroundColor: '#AFBACC'}}>
                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                    </div>
            default:
                return
        }
    }

    const handleMoreActions = (item: FolderAsset): string[] => {
        if (item.status === 'deleted') {
            return ['Restore']
        }
        if (item.type === 'folder') {
            return [ 'View', 'Rename', 'Move', 'Delete']
        }
        return ['Edit', 'Move', 'Delete']
    }

    const handleEditAsset = (asset: ContentType) => {
        switch(asset.type) {
            case 'vod':
                history.push('/videos/' + asset.id + '/general')
                break
            case 'channel':
                history.push('/livestreams/' + asset.id + '/general')
                break
            case 'playlist':
                history.push('/playlists/' + asset.id + '/general')
                break
            case 'folder':
                break
            default:
                break 
        }
    }

    const handleAssetDropdownOptions = (option: string, asset: ContentType, folderNode?: FolderTreeNode) => {
        switch (option) {
            case 'Edit': 
                handleEditAsset(asset)
                break
            case 'Move':
                setCheckedItems([asset])
                setMoveItemsModalOpened(true)
                break
            case 'Delete':
                if(asset.type !== 'folder') {
                    props.deleteContent(asset)
                } else {
                    foldersTree.deleteFolders([asset.id], asset.fullPath)
                }
                break
            case 'View' :
                foldersTree.navigateToFolder(folderNode)
                break
            case 'Restore':
                props.restoreContent([asset])
                break
            default:
                break
        }
    }


    const handleFolderDropdownOptions = (option: string) => {
        switch (option) {
            case 'Rename':
                setNewFolderModalAction('Rename Folder')
                setNewFolderModalOpened(true)
                break
            case 'Move':
                setCheckedItems([{id: currentFolder.id, type: 'folder'}])
                setMoveItemsModalOpened(true)
                break
            case 'Delete':
                foldersTree.deleteFolders([currentFolder.id], currentFolder.fullPath)
                break
            case 'New Folder': 
                setNewFolderModalAction('New Folder')
                setNewFolderModalOpened(true)
                break
            default:
                break
        }
    }

    const handleBulkAction = (contentList: ContentType[], action: string, targetValue?: string | boolean) => {
        bulkActionsService(contentList, action, targetValue).then((response) => {
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
        }).catch((error) => {
            console.log(error)
        })
    }

    const foldersContentTableBody = () => {
        if (props.folderData.requestedContent) {
            return props.folderData.requestedContent.results.map((row) => {
                return {
                    data: [
                        <div key={'foldersTableInputCheckbox' + row.objectID} className='flex items-center'>
                            <InputCheckbox id={row.objectID + row.type + 'InputCheckbox'} defaultChecked={checkedItems.find(value => value.id === row.objectID) ? true : false} onChange={(event) => handleCheckboxChange({id: row.objectID, type: row.type}, event.currentTarget.checked)} />
                            <RowIconContainer>
                                {handleRowIconType(row)}
                            </RowIconContainer>
                        </div>,
                        <Text key={'foldersTableName' + row.objectID} size={14} weight='reg' color='gray-3'>{row.title}</Text>,
                        <Text key={'foldersTableDuration' + row.objectID} size={14} weight='reg' color='gray-3'>{row.duration ? row.duration : '-'}</Text>,
                        <Text key={'foldersTableCreated' + row.objectID} size={14} weight='reg' color='gray-3'>{tsToLocaleDate(row.createdAt, DateTime.DATETIME_SHORT)}</Text>,
                        row.status ? <Label key={'foldersTableStatus' + row.objectID} label={row.status.charAt(0).toUpperCase() + row.status.substr(1)} size={14} weight='reg' color={row.status === 'online' ? 'green' : 'red'} backgroundColor={row.status === 'online' ? 'green20' : 'red20'} /> : <span key={'foldersTableNoStatus' + row.objectID}></span>,
                        <div className='flex' key={'foldersTableFeatures' + row.objectID}>{handleFeatures(row, row.objectID)}</div>,
                        <div key={'foldersTableMoreActionButton' + row.objectID} className='right mr2'>
                            <DropdownCustom 
                                backgroundColor="transparent" 
                                id={'foldersTableMoreActionDropdown' + row.objectID} 
                                list={handleMoreActions(row)} callback={(value: string) => handleAssetDropdownOptions(value, {id:row.objectID, type:row.type}, row.type == 'folder' ? {    isExpanded: true,
                                    name: row.title,
                                    id: row.objectID,
                                    path: row.path,
                                    hasChild: false,
                                    subfolders: 0,
                                    nbChildren: 0,
                                    fullPath: row.path + row.title,
                                    loadingStatus: 'not-loaded',
                                    children: {}} : null)}
                            >
                                <IconGreyActionsContainer >
                                    <IconStyle>more_vert</IconStyle>
                                </IconGreyActionsContainer>
                            </DropdownCustom>
                        </div>
                    ], callback: (row: FolderAsset) => { handleCheckboxChange({id: row.objectID, type: row.type}, checkedItems.find(value => value.id === row.objectID) ? true : false) }
                    , callbackData: row
                }
            })
        }

    }

    const renderNode = (node: FolderTreeNode) => {
        let depth = node.fullPath.split('/').length - 1
        return (
            <div key={node.id}>
                {
                    node.id && 
                    <FolderRow isSelected={node.id === selectedFolder} style={{ paddingLeft: depth * 10 }} className='p1 flex items-center' onClick={() => {foldersTree.navigateToFolder(node)}}>
                        { node.subfolders > 0 && <IconStyle coloricon={"gray-7"} className={node.fullPath !== '/' ? '' : 'hide'}>{node.isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</IconStyle> }
                        <Text size={14} weight='reg' color={node.id === selectedFolder ? 'dark-violet' : 'gray-1'}>{node.name}</Text>
                    </FolderRow>
                }

                <div>
                    { node.isExpanded && node.children !== null && Object.values(node.children).map((childNode) => renderNode(childNode))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='mb2 col col-12 flex items-center sm-show'>
                <div className='col col-9 flex items-center'>
                    <div className={'flex items-center'}>
                        <IconStyle onClick={() => setFoldersTreeHidden(!foldersTreeHidden)}>{foldersTreeHidden ? 'arrow_forward' : 'arrow_back'}</IconStyle>
                        <Button className='ml2' onClick={() => {setNewFolderModalOpened(true);setNewFolderModalAction('New Folder')}} sizeButton='small' typeButton='secondary' buttonColor='gray'>
                            New Folder
                        </Button>
                    </div>
                    <div className={(foldersTreeHidden ? '' : 'pl3 ') + 'col col-6 flex-auto items-center'}>
                        <div className='col col-12 pl2 flex flex-auto items-center '>
                            <BreadcrumbDropdown
                                options={FIXED_FOLDERS.indexOf(selectedFolder) === -1 ?currentFolder.fullPath : selectedFolder}
                                callback={(value: string) => foldersTree.goToNode(value).then((response) => setCurrentFolder(response))}
                                dropdownOptions={['Rename', 'Move', 'New Folder', 'Delete']}
                                dropdownCallback={(value: string) => { handleFolderDropdownOptions(value) }}
                            />
                            <SeparatorHeader className={(currentFolder.fullPath.split('/').length > 1 ? ' ' : 'hide ') + "mx2 sm-show inline-block"} />
                            <IconStyle coloricon='gray-3'>search</IconStyle>
                            <InputTags oneTag noBorder={true} placeholder="Search by Name..." style={{ display: "inline-block" }} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => {setSearchString(value[0])}} />
                        </div>
                    </div>

                </div>
                <div className="relative flex justify-end items-center col col-3">
                    {
                        selectedFolder !== 'Trash' &&
                            <>
                                {checkedItems.length > 0 &&
                                    <Text className=" ml2" color="gray-3" weight="med" size={12} >{checkedItems.length} items</Text>
                                }
                                <div>
                                    <Button onClick={() => { setBulkActionsDropdownIsOpened(true) }} disabled={checkedItems.length === 0} buttonColor="gray" className="relative  ml2" sizeButton="small" typeButton="secondary" >{smallScreen ? "Actions" : "Bulk Actions"}</Button>

                                    <DropdownList  hasSearch={false} ref={bulkActionsDropdownListRef} style={{}} isSingle isInModal={false} isNavigation={false} displayDropdown={bulkActionsDropdownIsOpened} >
                                        {renderList()}
                                    </DropdownList>
                                </div>

                                <SeparatorHeader className="mx2 inline-block" />
                            </>
                    }
                    <FoldersFiltering className="right relative" setSelectedFilter={setSelectedFilter} />
                    {selectedFolder === 'Trash' &&
                        <Button className='ml2' onClick={() => setEmptyTrashModalOpened(true)} sizeButton='small' typeButton='primary' buttonColor='blue'>Empty Trash</Button>
                    }
                </div>
            </div>
            <div className='mb2 col col-12 clearfix xs-show'>
                <div className='col flex items-center mb2 col-12'>
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag noBorder={true} placeholder="Search by Title..." style={{ display: "inline-block" }} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => {setSearchString(value[0])}}  />
                </div>
                <div className='col-12 col mb2 clearfix'>
                    <div className='col-3 col pr1'>
                        <Button className="col-12" onClick={() => setFoldersTreeHidden(false)} sizeButton='small' typeButton='secondary' buttonColor='blue'>
                            Folders
                        </Button>
                    </div>
                    <div className="col-3 col pr1 ">
                        <Button className="col-12" onClick={() => { setBulkActionsDropdownIsOpened(!bulkActionsDropdownIsOpened) }} disabled={checkedItems.length === 0} buttonColor="blue" sizeButton="small" typeButton="secondary" >
                            Actions
                        </Button>
                        <DropdownList hasSearch={false} ref={bulkActionsDropdownListRef} isSingle isInModal={false} isNavigation={false} displayDropdown={bulkActionsDropdownIsOpened} >
                            {renderList()}
                        </DropdownList>
                    </div>
                    <div className='col-3 col pr1'>
                        <FoldersFiltering className="col-12" setSelectedFilter={setSelectedFilter} />
                    </div>
                    <div className='col-3 col '>
                        <Button className="col-12" onClick={() => setNewFolderModalOpened(true)} sizeButton='small' typeButton='primary' buttonColor='blue'>
                            Create
                        </Button>
                    </div>
                </div>
                <div className='col-12 col clearfix'>
                    <BreadcrumbDropdown
                        options={FIXED_FOLDERS.indexOf(selectedFolder) === -1 ? currentFolder.fullPath :''}
                        callback={(value: string) => setSelectedFolder(value)}
                        dropdownOptions={['Rename', 'Move', 'New Folder', 'Delete']}
                        dropdownCallback={(value: string) => { handleFolderDropdownOptions(value) }}
                    />
                </div>
            </div>
            <ContentSection>
                <FoldersTreeSection foldersTreeHidden={foldersTreeHidden} smallScreen={smallScreen} className={!smallScreen ? 'col col-2 mr2' : 'absolute'}>
                    <IconStyle onClick={() => setFoldersTreeHidden(true)} coloricon="gray-1" className="right xs-show ml1 mb1" >close</IconStyle>
                    <FolderRow isSelected={selectedFolder === 'Library'} className='p1 flex items-center' onClick={() => setSelectedFolder("Library")}>
                        <Text size={14} weight='reg' color={selectedFolder === 'Library' ? 'dark-violet' : 'gray-1'}>Library</Text>
                    </FolderRow>
                    <FolderRow isSelected={selectedFolder === 'Unsorted'} className='p1 flex items-center' onClick={() => setSelectedFolder("Unsorted")}>
                        <Text className='flex-auto' size={14} weight='reg' color={selectedFolder === 'Unsorted' ? 'dark-violet' : 'gray-1'}>Unsorted</Text>
                    </FolderRow>
                    <FolderRow isSelected={selectedFolder === 'Trash'} className='p1 flex items-center' onClick={() => setSelectedFolder("Trash")}>
                        <Text className='flex-auto' size={14} weight='reg' color={selectedFolder === 'Trash' ? 'dark-violet' : 'gray-1'}>Trash</Text>
                    </FolderRow>
                    {renderNode(folderTree)}
                </FoldersTreeSection>
                <div className={(foldersTreeHidden ? 'col col-12 ' : 'col col-10 ') + 'flex flex-column right'}>
                    <Table className='col col-12' id='folderContentTable' headerBackgroundColor="white" header={props.folderData.requestedContent !== null ? foldersContentTableHeader() : emptyContentListHeader()} body={props.folderData.requestedContent !== null ? foldersContentTableBody() : emptyContentListBody('No items matched your search')} hasContainer />
                    <Pagination totalResults={props.folderData.requestedContent ? props.folderData.requestedContent.totalResults : 0} displayedItemsOptions={[10, 20, 100]} callback={(page: number, nbResults: number) => {setPaginationInfo({page:page,nbResults:nbResults})}} />
                </div>
            </ContentSection>
            <Modal style={{ zIndex: 100000 }} overlayIndex={10000} hasClose={false} size='small' modalTitle={newFolderModalAction} toggle={() => setNewFolderModalOpened(!newFolderModalOpened)} opened={newFolderModalOpened} >
                {
                    newFolderModalOpened && <NewFolderModal buttonLabel={newFolderModalAction === 'New Folder' ? 'Create' : 'Rename'} folderPath={currentFolder.fullPath} submit={newFolderModalAction === 'New Folder' ? foldersTree.addFolder : foldersTree.renameFolder} toggle={setNewFolderModalOpened} showToast={props.showToast} />
                }
            </Modal>
            <Modal hasClose={false} modalTitle={checkedItems.length === 1 ? 'Move 1 item to...' : 'Move ' + checkedItems.length + ' items to...'} toggle={() => setMoveItemsModalOpened(!moveItemsModalOpened)} opened={moveItemsModalOpened}>
                {
                    moveItemsModalOpened && 
                    <MoveItemModal submit={async (folderIds: string[]) => {await foldersTree.moveToFolder(folderIds, checkedItems, FIXED_FOLDERS.indexOf(selectedFolder) === -1 ? currentFolder.id : null)}} initialSelectedFolder={selectedFolder === 'Library' || selectedFolder === 'Unsorted' ? '/' : currentFolder.fullPath} goToNode={foldersTree.goToNode} toggle={setMoveItemsModalOpened} newFolderModalToggle={setNewFolderModalOpened} />
                }
            </Modal>
            <Modal icon={{ name: 'warning', color: 'red' }} hasClose={false} size='small' modalTitle='Empty Trash?' toggle={() => setEmptyTrashModalOpened(!emptyTrashModalOpened)} opened={emptyTrashModalOpened} >
                <EmptyTrashModal toggle={setEmptyTrashModalOpened} />
            </Modal>
            <OnlineBulkForm actionFunction={handleBulkAction} items={checkedItems} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
            <DeleteBulkForm actionFunction={handleBulkAction} items={checkedItems} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
            <PaywallBulkForm actionFunction={handleBulkAction} items={checkedItems} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
            <ThemeBulkForm actionFunction={handleBulkAction} themes={props.themesList ? props.themesList.themes : []} items={checkedItems} open={bulkThemeOpen} toggle={setBulkThemeOpen} />
        </div>
    )
}