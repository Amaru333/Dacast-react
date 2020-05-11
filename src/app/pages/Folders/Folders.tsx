import React from 'react';
import { FoldersTreeSection, ContentSection, FolderRow, SeparatorHeader, RowIconContainer } from './FoldersStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { IconStyle, IconGreyActionsContainer } from '../../../shared/Common/Icon';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { Table } from '../../../components/Table/Table';
import { Pagination } from '../../../components/Pagination/Pagination';
import { FoldersFiltering } from './FoldersFiltering';
import { Modal } from '../../../components/Modal/Modal';
import { NewFolderModal } from './NewFolderModal';
import { MoveItemModal } from './MoveItemsModal';
import { getNameFromFullPath, useOutsideAlerter, tsToLocaleDate, useMedia } from '../../../utils/utils';
import { FolderTreeNode, FolderAsset } from '../../redux-flow/store/Folders/types';
import { BreadcrumbDropdown } from './BreadcrumbDropdown';
import { FoldersComponentProps } from '../../containers/Folders/Folders';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm, ThemeBulkForm } from '../Playlist/List/BulkModals';
import { EmptyTrashModal } from './EmptyTrashModal';
import { DropdownCustom } from '../../../components/FormsComponents/Dropdown/DropdownCustom';
import { Badge } from '../../../components/Badge/Badge';
import { handleFeatures } from '../../shared/Common/Features';
import { DateTime } from 'luxon';

const folderTreeConst = [
    'folder1',
    'folder2',
    'folder3'
]

export const FoldersPage = (props: FoldersComponentProps) => {

    let children = folderTreeConst.map(path => ({
        isExpanded: false,
        subfolders: 2,
        nbChildren: 64,
        fullPath: '/' + path + '/',
        loadingStatus: 'not-loaded',
        children: {}
    })).reduce((acc, next) => ({ ...acc, [getNameFromFullPath(next.fullPath)]: next }), {})

    let rootNode: FolderTreeNode = {
        isExpanded: true,
        subfolders: 2,
        nbChildren: 2,
        fullPath: '/',
        loadingStatus: 'loaded',
        children
    }
    let smallScreen = useMedia('(max-width: 40em)')


    const [foldersTree, setFoldersTree] = React.useState<FolderTreeNode>(rootNode)
    const [newFolderModalOpened, setNewFolderModalOpened] = React.useState<boolean>(false);
    const [selectedFolder, setSelectedFolder] = React.useState<string>('Library');
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false);
    const [checkedItems, setCheckedItems] = React.useState<string[]>([])
    const [foldersTreeHidden, setFoldersTreeHidden] = React.useState<boolean>(smallScreen);
    const [newFolderModalAction, setNewFolderModalAction] = React.useState<'Rename Folder' | 'New Folder'>('New Folder');
    const [emptyTrashModalOpened, setEmptyTrashModalOpened] = React.useState<boolean>(false);
    const [bulkOnlineOpen, setBulkOnlineOpen] = React.useState<boolean>(false);
    const [bulkPaywallOpen, setBulkPaywallOpen] = React.useState<boolean>(false);
    const [bulkThemeOpen, setBulkThemeOpen] = React.useState<boolean>(false);
    const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState<boolean>(false);
    const [bulkActionsDropdownIsOpened, setBulkActionsDropdownIsOpened] = React.useState<boolean>(false);
    const [folderAssetSelected, setFolderAssetSelected] = React.useState<number>(0);

    const bulkActionsDropdownListRef = React.useRef<HTMLUListElement>(null);


    useOutsideAlerter(bulkActionsDropdownListRef, () => {
        setBulkActionsDropdownIsOpened(!bulkActionsDropdownIsOpened)
    });

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
                    onClick={() => item.function(true)}>
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
                        indeterminate={checkedItems.length >= 1 && checkedItems.length < props.folderData.requestedContent.length}
                        defaultChecked={checkedItems.length === props.folderData.requestedContent.length}
                        onChange={(event) => {
                            if (event.currentTarget.checked) {
                                let folderCounter = 0
                                const editedItem = props.folderData.requestedContent.map(item => {
                                    if (item.contentType === 'folder') {
                                        folderCounter += 1
                                    }
                                    return item.id + item.contentType
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
                // {cell: <span key='tableHeaderEmptyCell1'></span>},
                { cell: <Text key='tableHeaderNameCell' size={14} weight='med'>Name</Text>, sort: 'Name' },
                { cell: <Text key='tableHeaderDurationCell' size={14} weight='med'>Duration</Text> },
                { cell: <Text key='tableHeaderCreatedCell' size={14} weight='med'>Created Date</Text>, sort: 'Created Date' },
                { cell: <Text key='tableHeaderStatusCell' size={14} weight='med'>Status</Text> },
                { cell: <Text key='tableHeaderFeaturesCell' size={14} weight='med'>Features</Text> },
                { cell: <span key='tableHeaderEmptyCell2'></span> }
            ], defaultSort: 'Created Date'
        }
    }

    const handleCheckboxChange = (item: string, isChecked: boolean) => {
        if (checkedItems.includes(item)) {
            setCheckedItems(checkedItems.filter(option => { return option !== item }));
        } else {
            setCheckedItems([...checkedItems, item]);
        }
        if (isChecked && item.includes('folder')) {
            setFolderAssetSelected(folderAssetSelected + 1)
        } else if (!isChecked && item.includes('folder')) {
            setFolderAssetSelected(folderAssetSelected > 0 ? folderAssetSelected - 1 : 0)
        }
    }

    const handleRowIconType = (item: FolderAsset) => {
        switch (item.contentType) {
            case 'playlist':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id} fontSize="large">playlist_play</IconStyle>
            case 'folder':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id} fontSize="large">folder_open</IconStyle>
            case 'live':
            case 'vod':
                return <img key={"thumbnail" + item.id} width={50} height={42} src={item.thumbnail} ></img>
            default:
                return
        }
    }

    const handleMoreActions = (item: FolderAsset): string[] => {
        if (item.status === 'Deleted') {
            return ['Restore']
        }
        if (item.contentType === 'folder') {
            return ['Rename', 'Move', 'Delete']
        }
        return ['Edit', 'Move', 'Delete']
    }

    const handleAssetDropdownOptions = (option: string, assetName: string) => {
        switch (option) {
            case 'Rename':
                setNewFolderModalAction('Rename Folder');
                setNewFolderModalOpened(true);
                break;
            case 'Move':
                setCheckedItems([assetName])
                setMoveItemsModalOpened(true);
                break;
            case 'New Folder':
                setNewFolderModalAction('New Folder');
                setNewFolderModalOpened(true);
                break;
            case 'Delete':
                break;
            default:
                break;
        }
    }

    const foldersContentTableBody = () => {
        if (props.folderData.requestedContent) {
            return props.folderData.requestedContent.map((row) => {
                return {
                    data: [
                        <div key={'foldersTableInputCheckbox' + row.id} className='flex items-center'>
                            <InputCheckbox id={row.id + row.contentType + 'InputCheckbox'} defaultChecked={checkedItems.includes(row.id + row.contentType)} onChange={(event) => handleCheckboxChange(row.id + row.contentType, event.currentTarget.checked)} />
                            <RowIconContainer>
                                {handleRowIconType(row)}
                            </RowIconContainer>
                        </div>,
                        <Text key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-3'>{row.name}</Text>,
                        <Text key={'foldersTableDuration' + row.id} size={14} weight='reg' color='gray-3'>{row.duration ? row.duration : '-'}</Text>,
                        <Text key={'foldersTableCreated' + row.id} size={14} weight='reg' color='gray-3'>{tsToLocaleDate(row.created, DateTime.DATETIME_SHORT)}</Text>,
                        row.status ? <Label key={'foldersTableStatus' + row.id} label={row.status} size={14} weight='reg' color={row.status === 'Online' ? 'green' : 'red'} backgroundColor={row.status === 'Online' ? 'green20' : 'red20'} /> : <span key={'foldersTableNoStatus' + row.id}></span>,
                        <div className='flex' key={'foldersTableFeatures' + row.id}>{handleFeatures(row, row.id)}</div>,
                        <div key={'foldersTableMoreActionButton' + row.id} className='right mr2'>
                            <DropdownCustom backgroundColor="transparent" id={'foldersTableMoreActionDropdown' + row.id} list={handleMoreActions(row)} callback={(value: string) => handleAssetDropdownOptions(value, row.name)}>
                                <IconGreyActionsContainer >
                                    <IconStyle>more_vert</IconStyle>
                                </IconGreyActionsContainer>
                            </DropdownCustom>
                        </div>
                    ], callback: (row: FolderAsset) => { handleCheckboxChange(row.id + row.contentType, checkedItems.includes(row.id + row.contentType)) }
                    , callbackData: row
                }
            })
        }

    }



    const wait = async () => {
        return new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const makeNode = (parent: FolderTreeNode, name: string, subfolders: number): FolderTreeNode => {
        return {
            children: {},
            nbChildren: 10,
            subfolders: subfolders,
            fullPath: parent.fullPath + name + '/',
            isExpanded: false,
            loadingStatus: 'not-loaded'
        }
    }



    React.useEffect(() => { }, [foldersTree])

    const getChild = async (node: FolderTreeNode) => {
        await wait();
        let name1 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let name2 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        node.children = {
            [name1]: makeNode(node, name1, 10),
            [name2]: makeNode(node, name2, 0)
        }
        return node.children;
    }

    const loadChildren = async (node: FolderTreeNode) => {
        node.loadingStatus = 'loading'
        setFoldersTree({ ...foldersTree })
        node.children = await getChild(node);
        node.isExpanded = true
        node.loadingStatus = 'loaded'
        setFoldersTree({ ...foldersTree })
    }

    const getNode = async (root: FolderTreeNode, searchedFolder: string): Promise<FolderTreeNode> => {
        let pathElements = searchedFolder.split('/').filter(f => f)

        if (pathElements.length === 0) {
            return root
        }
        let currentNode = root
        while (currentNode.fullPath !== searchedFolder) {

            if (Object.keys(currentNode.children).length === 0 && currentNode.subfolders !== 0) {
                await loadChildren(currentNode)
            }

            let pathElement = pathElements.shift()
            let foundChild = currentNode.children[pathElement]
            if (!foundChild) {
                throw new Error('path doesnt exist: ' + pathElement + ' (of ' + searchedFolder + ')')
            }
            currentNode = foundChild
        }
        if (Object.keys(currentNode.children).length === 0 && currentNode.subfolders !== 0) {
            console.log('node has no children, fecthing')
            await loadChildren(currentNode)
        }
        return currentNode
    }

    // const findNode3 = async (node: FolderTreeNode, searchedFolder: string): Promise<FolderTreeNode> => {
    //     if(node.fullPath === searchedFolder) {
    //         if(Object.keys(node.children).length === 0 && node.subfolders !== 0) {
    //             console.log('node has no children, fecthing')
    //             await loadChildren(node)
    //         }
    //         return node
    //     }
    //     if(!searchedFolder.startsWith(node.fullPath)) {
    //         throw new Error('searching for a folder with a node of a different branch of the folder structure')
    //     }

    //     if(Object.keys(node.children).length === 0 && node.subfolders !== 0) {
    //         console.log('node has no children, fecthing')
    //         await loadChildren(node)
    //     }

    //     let leftoverSearch = searchedFolder.substr(node.fullPath.length)
    //     let pathElement = leftoverSearch.split('/').filter(f => f)[0]
    //     let foundChild = node.children[pathElement]
    //     if(!foundChild) {
    //         throw new Error('path doesnt exist: ' + pathElement + ' (of ' + searchedFolder + ')')
    //     }
    //     return await findNode3(foundChild, searchedFolder)
    // }

    const goToNode = async (searchedFolder: string) => {
        return await getNode(foldersTree, searchedFolder);
    }

    const renderNode = (node: FolderTreeNode) => {
        let depth = node.fullPath.split('/').length - 1
        return (
            <div key={node.fullPath}>
                <FolderRow isSelected={node.fullPath === selectedFolder} style={{ paddingLeft: depth * 10 }} className='p1 flex items-center' onClick={() => {
                    setSelectedFolder(node.fullPath);
                    if (node.loadingStatus === 'not-loaded' && !node.isExpanded) {
                        loadChildren(node)
                        return
                    }
                    if (node.loadingStatus === 'loading') {
                        console.log('blocked double loading')
                        return
                    }
                    node.isExpanded = !node.isExpanded
                    setFoldersTree({ ...foldersTree })
                }}>
                    {
                        node.subfolders > 0 ?
                            <IconStyle coloricon={"gray-7"} className={node.fullPath !== '/' ? '' : 'hide'}>{node.isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</IconStyle>
                            : null

                    }
                    <Text size={14} weight='reg' color={node.fullPath === selectedFolder ? 'dark-violet' : 'gray-1'}>{getNameFromFullPath(node.fullPath)}</Text>
                </FolderRow>
                <div>
                    {
                        node.isExpanded ?
                            Object.values(node.children).map((childNode) => renderNode(childNode))
                            : null
                    }
                </div>
            </div>
        )
    }



    return (
        <div>
            <div className='mb2 col col-12 flex items-center sm-show'>
                <div className='col col-9 flex items-center'>
                    <div className={(foldersTreeHidden ? '' : 'col col-2 mr3 ') + 'flex items-center'}>
                        <IconStyle onClick={() => setFoldersTreeHidden(!foldersTreeHidden)}>{foldersTreeHidden ? 'arrow_forward' : 'arrow_back'}</IconStyle>
                        <Button className='ml2' onClick={() => setNewFolderModalOpened(true)} sizeButton='small' typeButton='secondary' buttonColor='blue'>
                            New Folder
                        </Button>
                    </div>
                    <div className={(foldersTreeHidden ? '' : 'pl3 ') + 'col col-6 flex-auto items-center'}>
                        <div className='col col-12 pl2 flex flex-auto items-center '>
                            <BreadcrumbDropdown
                                options={selectedFolder}
                                callback={(value: string) => setSelectedFolder(value)}
                                dropdownOptions={['Rename', 'Move', 'New Folder', 'Delete']}
                                dropdownCallback={(value: string) => { handleAssetDropdownOptions(value, selectedFolder) }}
                            />
                            <SeparatorHeader className={(selectedFolder.split('/').length > 1 ? ' ' : 'hide ') + "mx2 sm-show inline-block"} />
                            <IconStyle coloricon='gray-3'>search</IconStyle>
                            <InputTags oneTag noBorder={true} placeholder="Search..." style={{ display: "inline-block" }} defaultTags={[]} />
                        </div>
                    </div>

                </div>
                <div className="relative flex justify-end items-center col col-3">
                    {
                        selectedFolder !== 'Trash' ?
                            <>
                                {checkedItems.length > 0 ?
                                    <Text className=" ml2" color="gray-3" weight="med" size={12} >{checkedItems.length} items</Text>
                                    : null
                                }
                                <div>
                                    <Button onClick={() => { setBulkActionsDropdownIsOpened(!bulkActionsDropdownIsOpened) }} disabled={checkedItems.length === 0} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >{smallScreen ? "Actions" : "Bulk Actions"}</Button>

                                    <DropdownList hasSearch={false} ref={bulkActionsDropdownListRef} style={{}} isSingle isInModal={false} isNavigation={false} displayDropdown={bulkActionsDropdownIsOpened} >
                                        {renderList()}
                                    </DropdownList>
                                </div>

                                <SeparatorHeader className="mx2 inline-block" />
                            </>
                            : null
                    }
                    <FoldersFiltering className="right relative" setCheckedItems={setCheckedItems} />
                    {selectedFolder === 'Trash' ?
                        <Button className='ml2' onClick={() => setEmptyTrashModalOpened(true)} sizeButton='small' typeButton='primary' buttonColor='blue'>Empty Trash</Button>
                        : null
                    }
                </div>
            </div>
            <div className='mb2 col col-12 clearfix xs-show'>
                <div className='col flex items-center mb2 col-12'>
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag noBorder={true} placeholder="Search..." style={{ display: "inline-block" }} defaultTags={[]} />
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
                        <FoldersFiltering className="col-12" setCheckedItems={setCheckedItems} />
                    </div>
                    <div className='col-3 col '>
                        <Button className="col-12" onClick={() => setNewFolderModalOpened(true)} sizeButton='small' typeButton='primary' buttonColor='blue'>
                            Create
                        </Button>
                    </div>
                </div>
                <div className='col-12 col clearfix'>
                    <BreadcrumbDropdown
                        options={selectedFolder}
                        callback={(value: string) => setSelectedFolder(value)}
                        dropdownOptions={['Rename', 'Move', 'New Folder', 'Delete']}
                        dropdownCallback={(value: string) => { handleAssetDropdownOptions(value, selectedFolder) }}
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
                        <Badge number={foldersTree.children['Unsorted'] ? foldersTree.children['Unsorted'].nbChildren : 6} color='gray-5' />
                    </FolderRow>
                    <FolderRow isSelected={selectedFolder === 'Trash'} className='p1 flex items-center' onClick={() => setSelectedFolder("Trash")}>
                        <Text className='flex-auto' size={14} weight='reg' color={selectedFolder === 'Trash' ? 'dark-violet' : 'gray-1'}>Trash</Text>
                        <Badge number={foldersTree.children['Trash'] ? foldersTree.children['Trash'].nbChildren : 54} color='gray-5' />
                    </FolderRow>
                    {renderNode(foldersTree)}
                </FoldersTreeSection>
                <div className={(foldersTreeHidden ? 'col col-12 ' : 'col col-10 ') + 'flex flex-column right'}>
                    <Table className='col col-12' id='folderContentTable' headerBackgroundColor="white" header={foldersContentTableHeader()} body={foldersContentTableBody()} hasContainer />
                    <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => { }} />
                </div>
            </ContentSection>
            <Modal style={{ zIndex: 10000 }} hasClose={false} size='small' modalTitle={newFolderModalAction} toggle={() => setNewFolderModalOpened(!newFolderModalOpened)} opened={newFolderModalOpened} >
                <NewFolderModal toggle={setNewFolderModalOpened} />
            </Modal>
            <Modal hasClose={false} modalTitle={checkedItems.length === 1 ? 'Move 1 item to...' : 'Move ' + checkedItems.length + ' items to...'} toggle={() => setMoveItemsModalOpened(!moveItemsModalOpened)} opened={moveItemsModalOpened}>
                {
                    moveItemsModalOpened ?
                        <MoveItemModal initialSelectedFolder={selectedFolder === 'Library' || selectedFolder === 'Unsorted' ? '/' : selectedFolder} goToNode={goToNode} toggle={setMoveItemsModalOpened} newFolderModalToggle={setNewFolderModalOpened} />
                        : null
                }
            </Modal>
            <Modal icon={{ name: 'warning', color: 'red' }} hasClose={false} size='small' modalTitle='Empty Trash?' toggle={() => setEmptyTrashModalOpened(!emptyTrashModalOpened)} opened={emptyTrashModalOpened} >
                <EmptyTrashModal toggle={setEmptyTrashModalOpened} />
            </Modal>
            <OnlineBulkForm items={checkedItems} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
            <DeleteBulkForm items={checkedItems} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
            <PaywallBulkForm items={checkedItems} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
            <ThemeBulkForm themes={[]} items={checkedItems} open={bulkThemeOpen} toggle={setBulkThemeOpen} />
        </div>
    )
}