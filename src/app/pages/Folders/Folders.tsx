import React from 'react'
import { FoldersTreeSection, ContentSection, FolderRow, SeparatorHeader, RowIconContainer, TitleContainer, ListContentTitle } from './FoldersStyle'
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
import { useMedia, useOutsideAlerter } from '../../../utils/utils'
import { tsToLocaleDate } from '../../../utils/formatUtils'
import { FolderTreeNode, FolderAsset, ContentType, SearchResult } from '../../redux-flow/store/Folders/types'
import { BreadcrumbDropdown } from './BreadcrumbDropdown'
import { FoldersComponentProps } from '../../containers/Folders/Folders'
import { InputTags } from '../../../components/FormsComponents/Input/InputTags'
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle'
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm, ThemeBulkForm } from '../../shared/List/BulkModals'
import { EmptyTrashModal } from './EmptyTrashModal'
import { DropdownCustom } from '../../../components/FormsComponents/Dropdown/DropdownCustom'
import { handleFeatures } from '../../shared/Common/Features'
import { FolderTree, rootNode } from '../../utils/services/folder/folderService'
import { useHistory } from 'react-router'
import { emptyContentListHeader, emptyContentListBody } from '../../shared/List/emptyContentListState';
import { DeleteFolderModal } from './DeleteFolderModal'
import { DeleteContentModal } from '../../shared/List/DeleteContentModal'
import { handleRowIconType } from '../../utils/utils'
import { Divider } from '../../../shared/MiscStyles'
import { ContentStatus } from '../../redux-flow/store/Common/types'
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes'
import { InputSearch } from '../../../components/FormsComponents/Input/InputSearch'
import { InputSearchStyle } from '../../shared/General/GeneralStyle'

export const FoldersPage = (props: FoldersComponentProps) => {

    let smallScreen = useMedia('(max-width: 40em)')
    let history = useHistory()
    const FIXED_FOLDERS = ['Library', 'Unsorted', 'Trash']

    const [folderTree, setFoldersTree] = React.useState<FolderTreeNode>(rootNode)
    const [newFolderModalOpened, setNewFolderModalOpened] = React.useState<boolean>(false)
    const [currentFolder, setCurrentFolder] = React.useState<FolderTreeNode>(null)
    const [selectedFolder, setSelectedFolder] = React.useState<string>('Library')
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false)
    const [checkedItems, setCheckedItems] = React.useState<ContentType[]>([])
    const [foldersTreeHidden, setFoldersTreeHidden] = React.useState<boolean>(smallScreen)
    const [newFolderModalAction, setNewFolderModalAction] = React.useState<'Rename Folder' | 'New Folder'>('New Folder')
    const [emptyTrashModalOpened, setEmptyTrashModalOpened] = React.useState<boolean>(false)
    const [deleteFolderModalOpened, setDeleteFolderModalOpened] = React.useState<boolean>(false)
    const [deleteContentModalOpened, setDeleteContentModalOpened] = React.useState<boolean>(false)
    const [bulkOnlineOpen, setBulkOnlineOpen] = React.useState<boolean>(false)
    const [bulkPaywallOpen, setBulkPaywallOpen] = React.useState<boolean>(false)
    const [bulkThemeOpen, setBulkThemeOpen] = React.useState<boolean>(false)
    const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState<boolean>(false)
    const [bulkActionsDropdownIsOpened, setBulkActionsDropdownIsOpened] = React.useState<boolean>(false)
    const [folderAssetSelected, setFolderAssetSelected] = React.useState<number>(0)
    const [moveModalSelectedFolder, setMoveModalSelectedFolder] = React.useState<string>(null)
    const [selectedFilters, setSelectedFilter] = React.useState<FoldersFilteringState>(null)
    const [paginationInfo, setPaginationInfo] = React.useState<{page: number; nbResults: number}>({page:1,nbResults:10})
    const [searchString, setSearchString] = React.useState<string>(null)
    const [sort, setSort] = React.useState<string>('created-at-desc')
    const [assetToDelete, setAssetToDelete] = React.useState<ContentType>(null)
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const [fetchContent, setFetchContent] = React.useState<boolean>(false)
    const [updateList, setListUpdate] = React.useState<ContentStatus | 'Restored' | 'paywall'>('Online')
    const [contentList, setContentList] = React.useState<SearchResult>(props.folderData.requestedContent)
    const bulkActionsDropdownListRef = React.useRef<HTMLUListElement>(null);

    let foldersTree = new FolderTree(setFoldersTree, setCurrentFolder)


    useOutsideAlerter(bulkActionsDropdownListRef, () => {
        setBulkActionsDropdownIsOpened(!bulkActionsDropdownIsOpened)
    });

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
                returnedString+= `created-at=${filters.afterDate ? filters.afterDate : ''},${filters.beforedate ? filters.beforedate : ''}&`
            }
        }

        if(returnedString.indexOf('status') ===- 1) {
            returnedString += `status=${selectedFolder === 'Trash' ? 'deleted&' : 'online,offline,processing&'}`
        }

        if(returnedString.indexOf('content-types') ===- 1) {
            returnedString += `content-types=channel,vod,playlist${FIXED_FOLDERS.indexOf(selectedFolder) > -1 ? '&' : ',folder&'}`
        }

        if(searchString) {
            returnedString += `keyword=${searchString}&`
        }
        if(sort) {
            returnedString += `sort-by=${sort}&`
        }

        if(FIXED_FOLDERS.indexOf(selectedFolder) === -1 && currentFolder) {
            returnedString += `folders=${currentFolder.id}&`
        }

        if(selectedFolder === 'Unsorted') {
            returnedString += 'tags=no_folder&'
        }
        if(!fetchContent) {
            setFetchContent(true)
        }
        return returnedString.charAt(returnedString.length - 1) === '&' ? returnedString.slice(0, returnedString.length - 1) : returnedString

    }

    React.useEffect(() => {
        if(fetchContent) {
            setContentLoading(true)
            props.getFolderContent(parseFiltersToQueryString(selectedFilters)).then(() => {
                setContentLoading(false)
                setFetchContent(false)
            }).catch(() => {
                setContentLoading(false)
                setFetchContent(false)
            })
        }

    }, [fetchContent])

    React.useEffect(() => {
        if (checkedItems.length > 0) {
            setContentList({
                ...contentList,
                results: contentList.results.map((item) => {
                    if (checkedItems.some(checkedItem => checkedItem.id === item.objectID)) {
                        return {
                            ...item,
                            status: updateList !== 'paywall' ? updateList : item.status,
                            featuresList: updateList === 'paywall' && item.featuresList.paywall ? { ...item.featuresList, paywall: false } : item.featuresList
                        }
                    }
                    return {
                        ...item
                    }

                })
            })
        }
        setCheckedItems([])
    }, [updateList])

    React.useEffect(() => {
        setFetchContent(true)
    }, [selectedFilters])

    React.useEffect(() => {
        const wait = async () => {
            await foldersTree.initTree()
        }
        wait()
    }, [])

    React.useEffect(() => {
        if(currentFolder) {
            setSelectedFolder(currentFolder.id)
        }
    }, [currentFolder])

    React.useEffect(() => {
        setCheckedItems([])
        setContentLoading(true)
        setFetchContent(true)
        props.getFolderContent(parseFiltersToQueryString(selectedFilters)).then(() => {
            setContentLoading(false)
            setFetchContent(false)
        }).catch(() => {
            setContentLoading(false)
            setFetchContent(false)
        })
    }, [selectedFolder])

    React.useEffect(() => {
        setContentList(props.folderData.requestedContent)
    }, [props.folderData.requestedContent])

    const bulkActions = [
        { name: 'Online/Offline', function: setBulkOnlineOpen },
        { name: 'Paywall Off', function: setBulkPaywallOpen },
        { name: 'Change Theme', function: setBulkThemeOpen },
        { name: 'Move', function: setMoveItemsModalOpened },
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
                        indeterminate={checkedItems.length >= 1 && checkedItems.length < contentList.results.length}
                        defaultChecked={checkedItems.length === contentList.results.length}
                        onChange={(event) => {
                            if (event.currentTarget.checked) {
                                let folderCounter = 0
                                const editedItem: ContentType[] = contentList.results.map(item => {
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
            sortCallback: (value: string) => {setSort(value);if(!fetchContent) { setFetchContent(true)}}
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

    const handleMoreActions = (item: FolderAsset): DropdownSingleListItem[] => {
        if (item.status === 'deleted') {
            return [{title: 'Restore'}]
        }
        if (item.type === 'folder') {
            return [ {title: 'View'}, {title: 'Rename'}, {title: 'Move'}, {title: 'Delete'}]
        }
        return [{title: 'Edit'}, {title: 'Move'}, {title: 'Delete'}]
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
                    setAssetToDelete(asset)
                    setDeleteContentModalOpened(true)
                } else {
                    setAssetToDelete({id: folderNode.id, type: 'folder', fullPath: folderNode.fullPath + '/', name: folderNode.name})
                    setDeleteFolderModalOpened(true)
                }
                break
            case 'View' :
                foldersTree.navigateToFolder(folderNode)
                break
            case 'Restore':
                setCheckedItems([asset])
                props.restoreContent([asset]).then(() => {
                    setListUpdate('Restored')
                })
                break
            case 'Rename':
                setNewFolderModalAction('Rename Folder')
                setNewFolderModalOpened(true)
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
                setAssetToDelete({id: currentFolder.id, type: 'folder', fullPath: currentFolder.fullPath, name: currentFolder.name})
                setDeleteFolderModalOpened(true)
                break
            case 'New Folder':
                setNewFolderModalAction('New Folder')
                setNewFolderModalOpened(true)
                break
            default:
                break
        }
    }

    const foldersContentTableBody = () => {
        if (contentList) {
            return contentList.results.map((row) => {
                return {
                    data: [
                        <div key={'foldersTableInputCheckbox' + row.objectID} style={ {paddingTop:8 , paddingBottom: 8 } } className='flex items-center'>
                            <InputCheckbox className="pr2" id={row.objectID + row.type + 'InputCheckbox'} defaultChecked={checkedItems.find(value => value.id === row.objectID) ? true : false} onChange={(event) => handleCheckboxChange({id: row.objectID, type: row.type}, event.currentTarget.checked)} />
                            <RowIconContainer>
                                {handleRowIconType(row)}
                            </RowIconContainer>
                        </div>,
                        <TitleContainer>
                            <ListContentTitle key={'foldersTableName' + row.objectID} size={14} weight='reg' color='gray-3'>{row.title}</ListContentTitle>
                        </TitleContainer>
                        ,
                        <Text key={'foldersTableDuration' + row.objectID} size={14} weight='reg' color='gray-3'>{row.duration ? row.duration : '-'}</Text>,
                        <Text key={'foldersTableCreated' + row.objectID} size={14} weight='reg' color='gray-3'>{tsToLocaleDate(row.createdAt, {year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"})}</Text>,
                        row.status ? <Label key={'foldersTableStatus' + row.objectID} label={row.status.charAt(0).toUpperCase() + row.status.substr(1)} size={14} weight='reg' color={row.status === 'online' || row.status === 'restored' ? 'green' : 'red'} backgroundColor={row.status === 'online' || row.status === 'restored' ? 'green20' : 'red20'} /> : <span key={'foldersTableNoStatus' + row.objectID}></span>,
                        <div className='flex' key={'foldersTableFeatures' + row.objectID}>{handleFeatures(row, row.objectID)}</div>,
                        <div key={'foldersTableMoreActionButton' + row.objectID} className='right mr2'>
                            <DropdownCustom
                                backgroundColor="transparent"
                                id={'foldersTableMoreActionDropdown' + row.objectID}
                                list={handleMoreActions(row)} callback={(value: DropdownSingleListItem) => handleAssetDropdownOptions(value.title, {id:row.objectID, type:row.type, name: row.title}, row.type == 'folder' && {
                                    isExpanded: true,
                                    name: row.title,
                                    id: row.objectID,
                                    path: row.path,
                                    hasChild: false,
                                    subfolders: 0,
                                    nbChildren: 0,
                                    fullPath: row.path + row.title,
                                    loadingStatus: 'not-loaded',
                                    children: {}
                                })}
                            >
                                <IconGreyActionsContainer >
                                    <IconStyle>more_vert</IconStyle>
                                </IconGreyActionsContainer>
                            </DropdownCustom>
                        </div>
                    ], callback: (row: FolderAsset) => { handleCheckboxChange({id: row.objectID, type: row.type}, checkedItems.find(value => value.id === row.objectID) ? true : false) }
                    , callbackData: row,
                    isDisabled: (row.status === 'deleted' && selectedFolder !== 'Trash') || row.status === 'restored',
                }
            })
        }

    }

    const renderNode = (node: FolderTreeNode) => {
        let depth = node.fullPath.split('/').length - 3
        let singleFolder = node.fullPath.split('/').length === 3
        return (
            <div key={node.id}>
                {
                    node.id &&
                    <FolderRow isSelected={node.id === selectedFolder} style={{marginLeft: node.subfolders === 0 && singleFolder ? 24 : depth * 24 }} className={'py1 pr1 flex items-center'} onClick={() => { foldersTree.navigateToFolder(node)}}>
                        { node.subfolders > 0 && <IconStyle onClick={() => foldersTree.expandFolder(node)} coloricon={"gray-7"} className={node.fullPath !== '/' ? '' : 'hide'}>{node.isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</IconStyle> }
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
            {
                !smallScreen ?
                    <div style={{height:55}} className='mb2 col col-12 items-center flex'>
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
                                        options={FIXED_FOLDERS.indexOf(selectedFolder) === -1 && currentFolder ?currentFolder.fullPath : selectedFolder}
                                        callback={(value: string) => foldersTree.goToNode(value).then((response) => setCurrentFolder(response))}
                                        dropdownOptions={['Rename', 'Move', 'New Folder', 'Delete']}
                                        dropdownCallback={(value: string) => { handleFolderDropdownOptions(value) }}
                                    />
                                    <SeparatorHeader className={(currentFolder && currentFolder.fullPath.split('/').length > 1 ? ' ' : 'hide ') + "mx2 sm-show inline-block"} />
                                    <InputSearchStyle 
                                        placeholder="Search by Title..." 
                                        callback={(value: string) => {setSearchString(value); if(!fetchContent) { setFetchContent(true)}}}
                                        isSearching={searchString !== null && searchString !== ''}
                                        value={searchString}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="relative flex justify-end items-center col col-3">
                            {
                                selectedFolder !== 'Trash' &&
                                    <>
                                        {checkedItems.length > 0 &&
                                            <Text className=" ml2" color="gray-3" weight="med" size={12} >{checkedItems.length} {checkedItems.length === 1 ? "Item" : "Items"}</Text>
                                        }
                                        <div className='relative'>
                                            <Button onClick={() => { setBulkActionsDropdownIsOpened(!bulkActionsDropdownIsOpened) }} disabled={checkedItems.length === 0} buttonColor="gray" className="relative  ml2" sizeButton="small" typeButton="secondary" >{smallScreen ? "Actions" : "Bulk Actions"}</Button>

                                            <DropdownList  hasSearch={false} style={{width: 167, left: 16}} ref={bulkActionsDropdownListRef} isSingle isInModal={false} isNavigation={false} displayDropdown={bulkActionsDropdownIsOpened} >
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
                    :
                    <div className='mb2 col col-12 clearfix xs-show'>
                        <div className='col flex items-center mb2 col-12'>
                            <IconStyle coloricon='gray-3'>search</IconStyle>
                            <InputTags oneTag noBorder={true} placeholder="Search by Title..." style={{ display: "inline-block" }} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => {setSearchString(value[0]); if(!fetchContent) { setFetchContent(true)}}}  />
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
                                <DropdownList hasSearch={false} style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={bulkActionsDropdownIsOpened} >
                                    {renderList()}
                                </DropdownList>
                            </div>
                            <div className='col-3 col pr1'>
                                <FoldersFiltering className="col-12" setSelectedFilter={(filters: FoldersFilteringState) => {setSelectedFilter(filters);setFetchContent(true)}} />
                            </div>
                            <div className='col-3 col '>
                                <Button className="col-12" onClick={() => setNewFolderModalOpened(true)} sizeButton='small' typeButton='primary' buttonColor='blue'>
                                    Create
                                </Button>
                            </div>
                        </div>
                        <div className='col-12 col clearfix'>
                            <BreadcrumbDropdown
                                options={FIXED_FOLDERS.indexOf(selectedFolder) === -1 && currentFolder ? currentFolder.fullPath :''}
                                callback={(value: string) => setSelectedFolder(value)}
                                dropdownOptions={['Rename', 'Move', 'New Folder', 'Delete']}
                                dropdownCallback={(value: string) => { handleFolderDropdownOptions(value) }}
                            />
                        </div>
                    </div>
            }

            <ContentSection>
                <FoldersTreeSection foldersTreeHidden={foldersTreeHidden} smallScreen={smallScreen} className={!smallScreen ? 'col col-2 mr2' : 'absolute'}>
                    <IconStyle onClick={() => setFoldersTreeHidden(true)} coloricon="gray-1" className="right xs-show ml1 mb1" >close</IconStyle>
                    <FolderRow isSelected={selectedFolder === 'Library'} className='ml2 p1 flex items-center' onClick={() => {setSelectedFolder("Library");setCurrentFolder(null)}}>
                        <Text size={14} weight='reg' color={selectedFolder === 'Library' ? 'dark-violet' : 'gray-1'}>Library</Text>
                    </FolderRow>
                    <FolderRow isSelected={selectedFolder === 'Unsorted'} className=' ml2 p1 flex items-center' onClick={() => {setSelectedFolder("Unsorted");setCurrentFolder(null)}}>
                        <Text className='flex-auto' size={14} weight='reg' color={selectedFolder === 'Unsorted' ? 'dark-violet' : 'gray-1'}>Unsorted</Text>
                    </FolderRow>
                    <FolderRow isSelected={selectedFolder === 'Trash'} className='ml2 p1 flex items-center' onClick={() => {setSelectedFolder("Trash");setCurrentFolder(null)}}>
                        <Text className='flex-auto' size={14} weight='reg' color={selectedFolder === 'Trash' ? 'dark-violet' : 'gray-1'}>Trash</Text>
                    </FolderRow>
                    <Divider />
                    {renderNode(folderTree)}
                </FoldersTreeSection>
                <div className={(foldersTreeHidden ? 'col col-12 ' : 'col col-10 ') + 'flex flex-column right'}>
                    <Table contentLoading={contentLoading} className='col col-12 tableOverflow' customClassName=" tableOverflow" id='folderContentTable' headerBackgroundColor="white" header={contentList && contentList.results.length > 0 ? foldersContentTableHeader() : emptyContentListHeader()} body={contentList && contentList.results.length > 0 ? foldersContentTableBody() : emptyContentListBody('No items matched your search')} hasContainer noScrollY/>
                    <Pagination className='mb3' totalResults={contentList ? contentList.totalResults : 0} displayedItemsOptions={[10, 20, 100]} callback={(page: number, nbResults: number) => {setPaginationInfo({page:page,nbResults:nbResults}); if(!fetchContent) { setFetchContent(true)}}} />
                </div>
            </ContentSection>
            <Modal style={{ zIndex: 100000 }} overlayIndex={10000} hasClose={false} size='small' modalTitle={newFolderModalAction} toggle={() => setNewFolderModalOpened(!newFolderModalOpened)} opened={newFolderModalOpened} >
                {
                    newFolderModalOpened &&
                    <NewFolderModal buttonLabel={newFolderModalAction === 'New Folder' ? 'Create' : 'Rename'} folderPath={moveModalSelectedFolder ? moveModalSelectedFolder : FIXED_FOLDERS.indexOf(selectedFolder) === -1 ? currentFolder.fullPath : '/'} submit={newFolderModalAction === 'New Folder' ? foldersTree.addFolder : foldersTree.renameFolder} toggle={setNewFolderModalOpened} showToast={props.showToast} loadContent={() => {props.getFolderContent(parseFiltersToQueryString(selectedFilters))}} />
                }
            </Modal>
            <Modal hasClose={false} modalTitle={checkedItems.length === 1 ? 'Move 1 item to...' : 'Move ' + checkedItems.length + ' items to...'} toggle={() => setMoveItemsModalOpened(!moveItemsModalOpened)} opened={moveItemsModalOpened}>
                {
                    moveItemsModalOpened &&
                    <MoveItemModal movedContent={checkedItems} oldFolderId={FIXED_FOLDERS.indexOf(selectedFolder) === -1 ? currentFolder.id : null} showToast={props.showToast} setMoveModalSelectedFolder={setMoveModalSelectedFolder}  callback={() => {if(!fetchContent) { setFetchContent(true)}}} initialSelectedFolder={selectedFolder === 'Library' || selectedFolder === 'Unsorted' ? '/' : currentFolder.fullPath} toggle={setMoveItemsModalOpened} newFolderModalToggle={setNewFolderModalOpened} />
                }
            </Modal>
            <Modal icon={{ name: 'warning', color: 'red' }} hasClose={false} size='small' modalTitle='Empty Trash?' toggle={() => setEmptyTrashModalOpened(!emptyTrashModalOpened)} opened={emptyTrashModalOpened} >
                <EmptyTrashModal showToast={props.showToast} loadContent={() => {props.getFolderContent(parseFiltersToQueryString(selectedFilters))}} toggle={setEmptyTrashModalOpened} />
            </Modal>
            <Modal icon={{ name: 'warning', color: 'red' }} hasClose={false} size='small' modalTitle='Delete Folder?' toggle={() => setDeleteFolderModalOpened(!deleteFolderModalOpened)} opened={deleteFolderModalOpened} >
                {
                    deleteFolderModalOpened &&
                    <DeleteFolderModal showToast={props.showToast} toggle={setDeleteFolderModalOpened} folderName={assetToDelete.name} deleteFolder={async () => {await foldersTree.deleteFolders([assetToDelete.id], assetToDelete.fullPath).then(() => {setSelectedFolder('Library');setCurrentFolder(null)})}} />
                }
            </Modal>
            <Modal icon={{ name: 'warning', color: 'red' }} hasClose={false} size='small' modalTitle='Move to Trash?' toggle={() => setDeleteContentModalOpened(!deleteContentModalOpened)} opened={deleteContentModalOpened} >
                {
                    deleteContentModalOpened &&
                    <DeleteContentModal contentName={assetToDelete.name} deleteContent={async () => { await foldersTree.moveToFolder([], [assetToDelete], currentFolder.id).then(() => {if(!fetchContent) { setFetchContent(true)}})}} showToast={props.showToast} toggle={setDeleteContentModalOpened}  />
                }
            </Modal>
            <OnlineBulkForm updateList={setListUpdate} showToast={props.showToast} items={checkedItems} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
            <DeleteBulkForm isInFolder={FIXED_FOLDERS.indexOf(selectedFolder) === -1} updateList={setListUpdate} showToast={props.showToast} items={checkedItems} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
            <PaywallBulkForm updateList={setListUpdate} showToast={props.showToast} items={checkedItems} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
            {
                bulkThemeOpen &&
                <ThemeBulkForm updateList={setListUpdate} showToast={props.showToast} getThemesList={() => props.getThemesList()} themes={props.themesList ? props.themesList.themes : []} items={checkedItems} open={bulkThemeOpen} toggle={setBulkThemeOpen} />
            }

        </div>
    )
}
