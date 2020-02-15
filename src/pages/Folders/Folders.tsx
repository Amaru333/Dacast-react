import React from 'react';
import { FoldersTreeSection, ContentSection, IconStyle, FolderRow, SeparatorHeader, IconGreyContainer } from './FoldersStyle';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Text } from '../../components/Typography/Text';
import { InputCheckbox } from '../../components/FormsComponents/Input/InputCheckbox';
import { Icon } from '@material-ui/core';
import { Label } from '../../components/FormsComponents/Label/Label';
import { Table } from '../../components/Table/Table';
import { Pagination } from '../../components/Pagination/Pagination';
import { FoldersFiltering } from './FoldersFiltering';
import { Modal } from '../../components/Modal/Modal';
import { NewFolderModal } from './NewFolderModal';
import { MoveItemModal } from './MoveItemsModal';
import { getNameFromFullPath } from '../../utils/utils';
import { FolderTreeNode, FolderAsset } from '../../redux-flow/store/Folders/types';
import { BreadcrumbDropdown } from './BreadcrumbDropdown';
import { FoldersComponentProps } from '../../containers/Folders/Folders';
import { InputTags } from '../../components/FormsComponents/Input/InputTags';
import { DropdownItem, DropdownItemText, DropdownList } from '../../components/FormsComponents/Dropdown/DropdownStyle';
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm, ThemeBulkForm } from '../Playlist/List/BulkModals';
import { EmptyTrashModal } from './EmptyTrashModal';

const folderTreeConst = [
    'folder1',
    'folder2',
    'folder3'
]

export const FoldersPage = (props: FoldersComponentProps) => {


    let children = folderTreeConst.map(path => ({
        isExpanded: false,
        subfolders: 2,
        nbChildren: 2,
        fullPath: '/' + path + '/',
        loadingStatus: 'not-loaded',
        children: {}
    }))
        .reduce((acc, next) => ({...acc, [getNameFromFullPath(next.fullPath)]: next}), {})

    let rootNode: FolderTreeNode = {
        isExpanded: true,
        subfolders: 2,
        nbChildren: 2,
        fullPath: '/',
        loadingStatus: 'loaded',
        children
    }

    const [foldersTree, setFoldersTree] = React.useState<FolderTreeNode>(rootNode)
    const [newFolderModalOpened, setNewFolderModalOpened] = React.useState<boolean>(false);
    const [selectedFolder, setSelectedFolder] = React.useState<string>('Library');
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false);
    const [checkedItems, setCheckedItems] = React.useState<string[]>([])
    const [foldersTreeHidden, setFoldersTreeHidden] = React.useState<boolean>(false);
    const [newFolderModalAction, setNewFolderModalAction] = React.useState<'Rename' | 'New Folder'>('New Folder');
    const [emptyTrashModalOpened, setEmptyTrashModalOpened] = React.useState<boolean>(false);
    const [bulkOnlineOpen, setBulkOnlineOpen] = React.useState<boolean>(false);
    const [bulkPaywallOpen, setBulkPaywallOpen] = React.useState<boolean>(false);
    const [bulkThemeOpen, setBulkThemeOpen] = React.useState<boolean>(false);
    const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState<boolean>(false);
    const [bulkActionsDropdownIsOpened, setBulkActionsDropdownIsOpened] = React.useState<boolean>(false);

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

    React.useEffect(() => {}, [selectedFolder])

    const foldersContentTableHeader = () => {
        return [
            <InputCheckbox key='tableHeaderCheckboxCell' id='tableHeaderCheckbox' 
                indeterminate={checkedItems.length >= 1 && checkedItems.length < props.folderData.requestedContent.length}
                defaultChecked={checkedItems.length === props.folderData.requestedContent.length}
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedItem = props.folderData.requestedContent.map(item => { return item.id + item.contentType })
                        setCheckedItems(editedItem);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setCheckedItems([])
                    }
                }
                } 
            />,
            <span key='tableHeaderEmptyCell1'></span>,
            <Text key='tableHeaderNameCell' size={14} weight='med'>Name</Text>,
            <Text key='tableHeaderDurationCell' size={14} weight='med'>Duration</Text>,
            <Text key='tableHeaderCreatedCell' size={14} weight='med'>Created</Text>,
            <Text key='tableHeaderStatusCell' size={14} weight='med'>Status</Text>,
            <Text key='tableHeaderFeaturesCell' size={14} weight='med'>Features</Text>,
            <span key='tableHeaderEmptyCell2'></span>
        ]
    }

    const handleCheckboxChange = (item: string) => {
        if(checkedItems.includes(item)) {
            setCheckedItems(checkedItems.filter(option => {return option !== item}));
        } else {
            setCheckedItems([...checkedItems, item]);
        }
    }

    const handleRowIconType = (item: FolderAsset) => {
        switch(item.contentType) {
            case 'playlist':
                return <IconStyle coloricon={"gray-7"} key={'foldersTableIcon' + item.id}>playlist_play</IconStyle>
            case 'folder': 
                return <IconStyle coloricon={"gray-7"} key={'foldersTableIcon' + item.id}>folder_open</IconStyle>
            case 'live':
            case 'vod': 
                return <img key={"thumbnail" + item.id} width={70} height={42} src={item.thumbnail} ></img>
            default:
                return
        }
    }

    const handleFeatures = (item: FolderAsset) => {
        var folderElement = []
        if (item.features.paywall) {
            folderElement.push(<IconGreyContainer className="mr1" ><IconStyle coloricon='gray-3'>attach_money</IconStyle></IconGreyContainer>)
        }
        if (item.features.recording) {
            folderElement.push(<IconGreyContainer className="mr1" ><IconStyle coloricon='gray-3'>videocam</IconStyle></IconGreyContainer>)
        }
        if (item.features.playlist) {
            folderElement.push(<IconGreyContainer className="mr1" ><IconStyle coloricon='gray-3'>video_library</IconStyle></IconGreyContainer>)
        }
        if (item.features.rewind) {
            folderElement.push(<IconGreyContainer className="mr1" ><IconStyle coloricon='gray-3'>replay_30</IconStyle></IconGreyContainer>)
        }
        if (item.features.advertising) {
            folderElement.push(<IconGreyContainer className="mr1" ><IconStyle coloricon='gray-3'>font_download</IconStyle></IconGreyContainer>)
        }
        return folderElement;
    }

    const foldersContentTableBody = () => {
        if(props.folderData.requestedContent) {
            return props.folderData.requestedContent.map((row) => {
                return [
                    <InputCheckbox id={row.id + row.contentType + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.id} defaultChecked={checkedItems.includes(row.id + row.contentType)} onChange={() => handleCheckboxChange(row.id + row.contentType )} />,
                    handleRowIconType(row),
                    <Text key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-3'>{row.name}</Text>,
                    <Text key={'foldersTableDuration' + row.id} size={14} weight='reg' color='gray-3'>{row.duration ? row.duration : '-'}</Text>,
                    <Text key={'foldersTableCreated' + row.id} size={14} weight='reg' color='gray-3'>{row.created}</Text>,
                    row.status ? <Label key={'foldersTableStatus' + row.id} label={row.status} size={14} weight='reg' color={row.status === 'online' ? 'green' : 'red'} backgroundColor={row.status === 'online' ? 'green20' : 'red20'}/> : <span key={'foldersTableStatus' + row.id}></span>,
                    <div className='flex' key={'foldersTableFeatures'  + row.id}>{handleFeatures(row)}</div>,
                    <Icon className='right mr2' key={'foldersTableActionButton' + row.name}>more_vert</Icon>
                ]
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



    React.useEffect(() => {}, [foldersTree])

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
        setFoldersTree({...foldersTree})
        node.children = await getChild(node);
        node.isExpanded = true
        node.loadingStatus = 'loaded'
        setFoldersTree({...foldersTree})
    }

    const getNode = async (root: FolderTreeNode, searchedFolder: string): Promise<FolderTreeNode> => {
        let pathElements = searchedFolder.split('/').filter(f => f)

        if(pathElements.length === 0) {
            return root
        }
        let currentNode = root
        while(currentNode.fullPath !== searchedFolder) {

            if(Object.keys(currentNode.children).length === 0 && currentNode.subfolders !== 0) {
                await loadChildren(currentNode)
            }

            let pathElement = pathElements.shift()
            let foundChild = currentNode.children[pathElement]
            if(!foundChild) {
                throw new Error('path doesnt exist: ' + pathElement + ' (of ' + searchedFolder + ')')
            }
            currentNode = foundChild
        }
        if(Object.keys(currentNode.children).length === 0 && currentNode.subfolders !== 0) {
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
        let depth = node.fullPath.split('/').length-1
        return (
            <div key={node.fullPath}>
                <FolderRow isSelected={node.fullPath === selectedFolder} style={{paddingLeft: depth*10}} className='p1 flex items-center' onClick={() => {
                    setSelectedFolder(node.fullPath);
                    if(node.loadingStatus === 'not-loaded' && !node.isExpanded) {
                        loadChildren(node)
                        return
                    }
                    if(node.loadingStatus === 'loading') {
                        console.log('blocked double loading')
                        return
                    }
                    node.isExpanded = !node.isExpanded
                    setFoldersTree({...foldersTree})
                }}>
                    {
                        node.subfolders > 0 ? 
                            <IconStyle coloricon={"gray-7"} className={node.fullPath !== '/' ? '' : 'hide'}>{node.isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</IconStyle>
                            : null

                    }
                    {getNameFromFullPath(node.fullPath)}
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

    const handleBreadcrumbDropdownOptions = (option: string) => {
        switch(option) {
            case 'Rename':
                setNewFolderModalAction('Rename');
                setNewFolderModalOpened(true);
                break;
            case 'Move':
                
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

    return (
        <div>
            <div className='mb2 col col-12 flex items-center'>
                <div className='col col-10 flex items-center'>
                    <div className={(foldersTreeHidden ? '' : 'col col-2 mr3 ') + 'flex items-center'}>
                        <Icon onClick={() => setFoldersTreeHidden(!foldersTreeHidden)}>{foldersTreeHidden ? 'arrow_forward' : 'arrow_back'}</Icon>
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
                                dropdownCallback={(value: string) => {handleBreadcrumbDropdownOptions(value)}} 
                            />
                            <SeparatorHeader className={(selectedFolder.split('/').length > 1 ? '' : 'hide ') + "mx2 inline-block"} />         
                            <IconStyle coloricon='gray-3'>search</IconStyle>
                            <InputTags oneTag noBorder={true} placeholder="Search..." style={{display: "inline-block"}} defaultTags={[]}   />
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
                            <Button onClick={() => { setBulkActionsDropdownIsOpened(!bulkActionsDropdownIsOpened) }} disabled={checkedItems.length === 0} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Bulk Actions</Button>
                            <DropdownList style={{width: 167, left: 16, top: 37}} isSingle isInModal={false} isNavigation={false} displayDropdown={bulkActionsDropdownIsOpened} >
                                {renderList()}
                            </DropdownList>

                            <SeparatorHeader className="mx2 inline-block" /> 
                        </>
                        : null 
                    }                     
       
                    <FoldersFiltering />
                    {
                        selectedFolder === 'Trash' ?
                            <Button className='ml2' onClick={() => setEmptyTrashModalOpened(true)} sizeButton='small' typeButton='primary' buttonColor='blue'>Empty Trash</Button>
                            : null
                    }
                </div>
            </div>
            <ContentSection>
                <FoldersTreeSection className={foldersTreeHidden ? 'hide' : 'col col-2 mr2'}>
                    <FolderRow isSelected={selectedFolder === 'Library'} className='p1 flex items-center' onClick={() => setSelectedFolder("Library")}>
                        Library
                    </FolderRow>
                    <FolderRow isSelected={selectedFolder === 'Unsorted'} className='p1 flex items-center' onClick={() => setSelectedFolder("Unsorted")}>
                        Unsorted
                    </FolderRow>
                    <FolderRow isSelected={selectedFolder === 'Trash'} className='p1 flex items-center' onClick={() => setSelectedFolder("Trash")}>
                        Trash
                    </FolderRow>
                    {renderNode(foldersTree)}
                </FoldersTreeSection>
                <div className={(foldersTreeHidden ? 'col col-12 ' : 'col col-10 ') + 'flex flex-column right'}>
                    <Table className='col col-12' id='folderContentTable' header={foldersContentTableHeader()} body={foldersContentTableBody()} />
                    <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />
                </div>
            </ContentSection> 
            <Modal hasClose={false} size='small' title={newFolderModalAction === 'New Folder' ? newFolderModalAction : newFolderModalAction + getNameFromFullPath(selectedFolder)} toggle={() => setNewFolderModalOpened(!newFolderModalOpened)} opened={newFolderModalOpened} >
                <NewFolderModal toggle={setNewFolderModalOpened} />
            </Modal>
            <Modal hasClose={false} title={checkedItems.length === 1 ? 'Move 1 item to...' : 'Move ' + checkedItems.length + ' items to...'} toggle={() => setMoveItemsModalOpened(!moveItemsModalOpened)} opened={moveItemsModalOpened}>
                {
                    moveItemsModalOpened ?
                        <MoveItemModal initialSelectedFolder={selectedFolder} goToNode={goToNode} toggle={setMoveItemsModalOpened} newFolderModalToggle={setNewFolderModalOpened}  />
                        : null
                }
            </Modal>
            <Modal icon={{name: 'warning', color: 'red'}} hasClose={false} size='small' title='Empty Trash?' toggle={() => setEmptyTrashModalOpened(!emptyTrashModalOpened)} opened={emptyTrashModalOpened} >
                <EmptyTrashModal toggle={setEmptyTrashModalOpened} />
            </Modal>
            <OnlineBulkForm items={checkedItems} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
            <DeleteBulkForm items={checkedItems} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
            <PaywallBulkForm items={checkedItems} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
            <ThemeBulkForm themes={[]} items={checkedItems} open={bulkThemeOpen} toggle={setBulkThemeOpen} />
        </div>
    )
}