import React from 'react';
import { Table } from '../../../../components/Table/Table';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../../components/Typography/Text';
import { tsToLocaleDate } from '../../../../utils/utils';
import { IconStyle, ActionIcon } from '../../../../shared/Common/Icon';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import styled from 'styled-components';
import { Pagination } from '../../../../components/Pagination/Pagination'
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownList, DropdownItem, DropdownItemText } from '../../../../components/FormsComponents/Dropdown/DropdownStyle';
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm, ThemeBulkForm } from './BulkModals';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { handleFeatures } from '../../../shared/Common/Features';
import { PlaylistFiltering, FilteringPlaylistState } from './PlaylistFilter';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router';
import { PlaylistListComponentProps } from '../../../containers/Playlists/List';
import { AddPlaylistModal } from '../../../containers/Navigation/AddPlaylistModal';
import { FolderTree, rootNode } from '../../../utils/folderService';
import { FolderTreeNode, ContentType } from '../../../redux-flow/store/Folders/types';
import { Modal } from '../../../../components/Modal/Modal';
import { MoveItemModal } from '../../Folders/MoveItemsModal';
import { NewFolderModal } from '../../Folders/NewFolderModal';
import { bulkActionsService } from '../../../redux-flow/store/Common/bulkService';
import { emptyContentListHeader, emptyContentListBody } from '../../../shared/List/emptyContentListState';
import { DeleteContentModal } from '../../../shared/List/DeleteContentModal';

export const PlaylistListPage = (props: PlaylistListComponentProps) => {

    const [selectedPlaylist, setSelectedPlaylist] = React.useState<string[]>([]);
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [selectedFilters, setSelectedFilter] = React.useState<FilteringPlaylistState>(null)
    const [paginationInfo, setPaginationInfo] = React.useState<{ page: number; nbResults: number }>({ page: 1, nbResults: 10 })
    const [searchString, setSearchString] = React.useState<string>(null)
    const [sort, setSort] = React.useState<string>(null)
    const [addPlaylistModalOpen, setAddPlaylistModalOpen] = React.useState<boolean>(false)
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false);
    const [currentFolder, setCurrentFolder] = React.useState<FolderTreeNode>(rootNode)
    const [newFolderModalOpened, setNewFolderModalOpened] = React.useState<boolean>(false);
    const [deleteContentModalOpened, setDeleteContentModalOpened] = React.useState<boolean>(false)
    const [contentToDelete, setContentToDelete] = React.useState<{id: string; title: string}>({id: null, title: null})

    let foldersTree = new FolderTree(() => { }, setCurrentFolder)

    React.useEffect(() => {
        foldersTree.initTree()
    }, [])


    let history = useHistory()

    const parseFiltersToQueryString = (filters: FilteringPlaylistState) => {
        let returnedString = `page=${paginationInfo.page}&per-page=${paginationInfo.nbResults}&`
        if (filters) {

            Object.keys(filters).map((filter) => {
                if (filter.toLowerCase().indexOf('date') === -1 && filter.toLowerCase().indexOf('size') === -1 && Object.values(filters[filter]).some(v => v)) {
                    returnedString += filter + '='
                    Object.keys(filters[filter]).map((subfilter, i) => {
                        if (filters[filter][subfilter]) {
                            returnedString += subfilter + ','
                        }
                    })
                    returnedString += '&'
                    returnedString = returnedString.replace(',&', '&')
                }
            })

            if (filters.afterDate || filters.beforedate) {
                returnedString += `created-at=${filters.afterDate ? filters.afterDate : ''},${filters.beforedate ? filters.beforedate : ''}&`
            }
        }
        if (searchString) {
            returnedString += `keyword=${searchString}&`
        }
        if (sort) {
            returnedString += `sort-by=${sort}&`
        }
        if (returnedString.indexOf('status') === -1) {
            returnedString += 'status=online,offline,processing'
        }
        return returnedString

    }

    React.useEffect(() => {
        if(!deleteContentModalOpened && !bulkOnlineOpen && !bulkDeleteOpen && !bulkPaywallOpen) {
            props.getPlaylistList(parseFiltersToQueryString(selectedFilters)) 
        }
    }, [selectedFilters, searchString, paginationInfo, sort, deleteContentModalOpened, bulkOnlineOpen, bulkDeleteOpen, bulkPaywallOpen])

    const liveListHeaderElement = () => {
        return {
            data: [
                {
                    cell:
                        <InputCheckbox
                            className="inline-flex"
                            key="checkboxLiveListBulkAction"
                            indeterminate={selectedPlaylist.length >= 1 && selectedPlaylist.length < props.playlistList.results.length}
                            defaultChecked={selectedPlaylist.length === props.playlistList.results.length}
                            id="globalCheckboxPlaylistList"
                            onChange={(event) => {
                                if (event.currentTarget.checked) {
                                    const editedselectedLive = props.playlistList.results.map(item => { return item.objectID })
                                    setSelectedPlaylist(editedselectedLive);
                                } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                                    setSelectedPlaylist([])
                                }
                            }}
                        />
                },
                // {cell: <></>},
                { cell: <Text key="namePlaylistList" size={14} weight="med" color="gray-1">Title</Text>, sort: 'title' },
                { cell: <Text key="viewsPlaylistList" size={14} weight="med" color="gray-1">Created Date</Text>, sort: 'created-at' },
                { cell: <Text key="statusPlaylistList" size={14} weight="med" color="gray-1">Status</Text> },
                { cell: <Text key="featuresPlaylistList" size={14} weight="med" color="gray-1">Features</Text> },
                { cell: <div style={{ width: "80px" }} ></div> },
            ], defaultSort: 'created-at',
            sortCallback: (value: string) => setSort(value)
        }
    }

    const liveListBodyElement = () => {
        if (props.playlistList.results) {
            return props.playlistList.results.map((value, key) => {
                return {
                    data: [
                        <div key={"checkbox" + value.objectID} style={ {paddingTop:8 , paddingBottom: 8 } } className='flex items-center'>
                            <InputCheckbox className="inline-flex pr2" label="" defaultChecked={selectedPlaylist.includes(value.objectID)} id={"checkbox" + value.objectID} onChange={(event) => {
                                if (event.currentTarget.checked && selectedPlaylist.length < props.playlistList.results.length) {
                                    setSelectedPlaylist([...selectedPlaylist, value.objectID])
                                } else {
                                    const editedselectedLive = selectedPlaylist.filter(item => item !== value.objectID)
                                    setSelectedPlaylist(editedselectedLive);
                                }
                            }
                            } />
                            {
                                value.thumbnail ?
                                    <img className="mr1" key={"thumbnail" + value.objectID} width={94} height={54} src={value.thumbnail} />
                                    :
                                    <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                                    </div>
                            }
                        </div>
                        ,
                        <Text key={"title" + value.objectID} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                        <Text key={"created" + value.objectID} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.createdAt, DateTime.DATETIME_SHORT)}</Text>,
                        <Text key={"status" + value.objectID} size={14} weight="reg" color="gray-1">{value.status === 'online' ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                        <div className='flex'>{handleFeatures(value, value.objectID)}</div>,
                        <div key={"more" + value.objectID} className="iconAction right mr2" >
                            <ActionIcon id={"editTooltip" + value.objectID}>
                                <IconStyle onClick={() => { history.push('/playlists/' + value.objectID + '/general') }} className="right mr1" >edit</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"editTooltip" + value.objectID}>Edit</Tooltip>
                            <ActionIcon id={"deleteTooltip" + value.objectID}>
                                <IconStyle onClick={() => { setContentToDelete({id: value.objectID, title: value.title});setDeleteContentModalOpened(true) }} className="right mr1" >delete</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"deleteTooltip" + value.objectID}>Delete</Tooltip>
                        </div>,
                    ]
                }
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
        { name: 'Move To', function: setMoveItemsModalOpened },
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

    const handleBulkAction = (contentList: ContentType[], action: string, targetValue?: string | boolean) => {
        bulkActionsService(contentList, action, targetValue).then((response) => {
            switch (action) {
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

    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);

    return (
        <>
            <HeaderPlaylistList className="mb2 flex" >
                <div className="flex-auto items-center flex">
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags noBorder={true} placeholder="Search by Title..." style={{ display: "inline-block" }} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => { setSearchString(value[0]) }} />
                </div>
                <div className="flex items-center" >
                    {selectedPlaylist.length > 0 ?
                        <Text className=" ml2" color="gray-3" weight="med" size={12} >{selectedPlaylist.length} items</Text>
                        : null
                    }
                    <div className="relative">
                        <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} disabled={selectedPlaylist.length === 0} buttonColor="gray" className="relative  ml2" sizeButton="small" typeButton="secondary" >Bulk Actions</Button>
                        <DropdownList hasSearch={false} style={{ width: 167, left: 16 }} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                            {renderList()}
                        </DropdownList>
                    </div>
                    <SeparatorHeader className="mx2 inline-block" />
                    <PlaylistFiltering setSelectedFilter={setSelectedFilter} />
                    <Button isLoading={buttonLoading} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" onClick={() => setAddPlaylistModalOpen(true)} >Create Playlist</Button>
                </div>
            </HeaderPlaylistList>
            <Table className="col-12" id="playlistListTable" headerBackgroundColor="white" header={props.playlistList.results.length > 0 ? liveListHeaderElement() : emptyContentListHeader()} body={props.playlistList.results.length > 0 ? liveListBodyElement() : emptyContentListBody('No items matched your search')} hasContainer />
            <Pagination totalResults={props.playlistList.totalResults} displayedItemsOptions={[10, 20, 100]} callback={(page: number, nbResults: number) => { setPaginationInfo({ page: page, nbResults: nbResults }) }} />
            <OnlineBulkForm actionFunction={handleBulkAction} items={selectedPlaylist.map((playlist) => { return { id: playlist, type: 'playlist' } })} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
            <DeleteBulkForm actionFunction={handleBulkAction} items={selectedPlaylist.map((playlist) => { return { id: playlist, type: 'playlist' } })} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
            <PaywallBulkForm actionFunction={handleBulkAction} items={selectedPlaylist.map((playlist) => { return { id: playlist, type: 'playlist' } })} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />  
            {
                bulkThemeOpen &&
                <ThemeBulkForm getThemesList={() => props.getThemingList()} actionFunction={handleBulkAction} themes={props.themeList.themes} items={selectedPlaylist.map((playlist) => { return { id: playlist, type: 'playlist' } })} open={bulkThemeOpen} toggle={setBulkThemeOpen} />
            }
            <AddPlaylistModal toggle={() => setAddPlaylistModalOpen(false)} opened={addPlaylistModalOpen === true} />
            <Modal hasClose={false} modalTitle={selectedPlaylist.length === 1 ? 'Move 1 item to...' : 'Move ' + selectedPlaylist.length + ' items to...'} toggle={() => setMoveItemsModalOpened(!moveItemsModalOpened)} opened={moveItemsModalOpened}>
                {
                    moveItemsModalOpened &&
                    <MoveItemModal showToast={props.showToast} setMoveModalSelectedFolder={(s: string) => {}} submit={async (folderIds: string[]) => { await foldersTree.moveToFolder(folderIds, selectedPlaylist.map(vodId => { return { id: vodId, type: 'playlist' } })) }} initialSelectedFolder={currentFolder.fullPath} goToNode={foldersTree.goToNode} toggle={setMoveItemsModalOpened} newFolderModalToggle={setNewFolderModalOpened} />
                }
            </Modal>
            <Modal style={{ zIndex: 100000 }} overlayIndex={10000} hasClose={false} size='small' modalTitle='Create Folder' toggle={() => setNewFolderModalOpened(!newFolderModalOpened)} opened={newFolderModalOpened} >
                {
                    newFolderModalOpened && <NewFolderModal buttonLabel={'Create'} folderPath={currentFolder.fullPath} submit={foldersTree.addFolder} toggle={setNewFolderModalOpened} showToast={() => { }} />
                }
            </Modal>
            <Modal icon={{ name: 'warning', color: 'red' }} hasClose={false} size='small' modalTitle='Delete Folder?' toggle={() => setDeleteContentModalOpened(!deleteContentModalOpened)} opened={deleteContentModalOpened} >
                {
                    deleteContentModalOpened &&
                    <DeleteContentModal showToast={props.showToast} toggle={setDeleteContentModalOpened} contentName={contentToDelete.title} deleteContent={async () => {await props.deletePlaylist(contentToDelete.id, contentToDelete.title)}} />
                }
            </Modal>

        </>
    )
}
const HeaderPlaylistList = styled.div<{}>`
    position:relative;
    width: 100%;
`

const SeparatorHeader = styled.div<{}>`
    width:1px;
    height: 33px;
    background-color: ${props => props.theme.colors["gray-7"]} ;
`

const invisibleInput = styled.input<{}>`

`