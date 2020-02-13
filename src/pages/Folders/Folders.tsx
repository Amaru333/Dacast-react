import React from 'react';
import { FoldersTreeSection, ContentSection, IconStyle, FolderRow } from './FoldersStyle';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Text } from '../../components/Typography/Text';
import { InputCheckbox } from '../../components/FormsComponents/Input/InputCheckbox';
import { Icon } from '@material-ui/core';
import { Label } from '../../components/FormsComponents/Label/Label';
import { Table } from '../../components/Table/Table';
import { Pagination } from '../../components/Pagination/Pagination';
import { FoldersFiltering } from './FoldersFiltering';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Modal } from '../../components/Modal/Modal';
import { NewFolderModal } from './NewFolderModal';
import { MoveItemModal } from './MoveItemsModal';
import { getNameFromFullPath } from '../../utils/utils';
import { FolderTreeNode, FolderAsset } from '../../redux-flow/store/Folders/types';
import { BreadcrumbDropdown } from './BreadcrumbDropdown';
import { FoldersComponentProps } from '../../containers/Folders/Folders';

const TableData: FolderAsset[] = [
    {
        id: '11',
        name: 'Bibendum',
        duration: '03:12:12',
        created: 'Nov 02, 19',
        status: 'deleted',
        features: null,
        contentType: 'playlist'
    },
    {
        id: '12',
        name: 'Video 1',
        duration: '03:12:12',
        created: 'Dec 02, 19',
        status: 'offline',
        features: null,
        contentType: 'playlist'
    },    
    {
        id: '13',
        name: 'Playlist 2',
        duration: '03:12:12',
        created: 'Nov 05, 19',
        status: 'online',
        features: null,
        contentType: 'playlist'
    },
    {
        id: '14',
        name: 'Folder 1',
        duration: null,
        created: 'Dec 22, 19',
        status: null,
        features: null,
        contentType: 'playlist'
    },
    {
        id: '15',
        name: 'Bibendum',
        duration: '03:12:12',
        created: 'Nov 02, 19',
        status: 'deleted',
        features: null,
        contentType: 'playlist'
    },
    {
        id: '16',
        name: 'Bibendum',
        duration: '03:12:12',
        created: 'Nov 02, 19',
        status: 'online',
        features: null,
        contentType: 'playlist'
    }
]

const folderTreeConst = [
    'folder1',
    'folder2',
    'folder3'
]

export const FoldersPage = (props: FoldersComponentProps) => {


    let children = folderTreeConst.map(path => ({
        isExpanded: false,
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
    const [foundFolder, setFoundFolder] = React.useState<FolderTreeNode>(null);
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false);
    const [checkedItems, setCheckedItems] = React.useState<string[]>([])
    const [foldersTreeHidden, setFoldersTreeHidden] = React.useState<boolean>(false);
    const [newFolderModalAction, setNewFolderModalAction] = React.useState<'Rename' | 'New Folder'>('New Folder');

    React.useEffect(() => {}, [selectedFolder])

    const foldersContentTableHeader = () => {
        return [
            <InputCheckbox key='tableHeaderCheckboxCell' id='tableHeaderCheckbox' 
                indeterminate={checkedItems.length >= 1 && checkedItems.length < TableData.length}
                defaultChecked={checkedItems.length === TableData.length}
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedItem = TableData.map(item => { return item.id + item.contentType })
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

    const foldersContentTableBody = () => {
        return TableData.map((row) => {
            return [
                <InputCheckbox id={row.id + row.contentType + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.id} defaultChecked={checkedItems.includes(row.id + row.contentType)} onChange={() => handleCheckboxChange(row.id + row.contentType )} />,
                <IconStyle coloricon={"gray-7"} key={'foldersTableIcon' + row.id}>folder_open</IconStyle>,
                <Text key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-3'>{row.name}</Text>,
                <Text key={'foldersTableDuration' + row.id} size={14} weight='reg' color='gray-3'>{row.duration ? row.duration : '-'}</Text>,
                <Text key={'foldersTableCreated' + row.id} size={14} weight='reg' color='gray-3'>{row.created}</Text>,
                <Label key={'foldersTableStatus' + row.id} label={row.status} size={14} weight='reg' color={row.status === 'online' ? 'green' : 'red'} backgroundColor={row.status === 'online' ? 'green20' : 'red20'}/>,
                <span key={'foldersTableFeatures'  + row.id}></span>,
                <Icon className='right mr2' key={'foldersTableActionButton' + row.name}>more_vert</Icon>
            ]
        })
    }



    const wait = async () => {
        return new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const makeNode = (parent: FolderTreeNode, name: string): FolderTreeNode => {
        return {
            children: {},
            nbChildren: 10,
            subfolders: 10,
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
            [name1]: makeNode(node, name1),
            [name2]: makeNode(node, name2)
        }
        return node.children;
    }

    const findNodeTest = (searchedFolder: string) => {
        findNode(foldersTree, searchedFolder);
        return foundFolder;
    }

    const findNode = async (node: FolderTreeNode, searchedFolder: string) => {
        if(node !== null) {
            if(node.fullPath === searchedFolder) {
                setFoundFolder(node);
                return node;              
            } else {
                let splitNodePath = node.fullPath.split('/');
                if(!searchedFolder)  {searchedFolder = '/';}
                const splitSelectedPath =  searchedFolder.split('/');
                if(splitNodePath[splitNodePath.length - 1] === "") {splitNodePath.pop()}
                if(splitNodePath.every((name, index) => name === splitSelectedPath[index])) {
                   if(Object.entries(node.children).length !== 0) {
                    Object.values(node.children).map((childNode) => findNode(childNode, searchedFolder))
                   } else {
                        node.children = await getChild(node);
                        setFoldersTree({...foldersTree})
                        setFoundFolder(node);
                        return node;
                   }
                } else {
                    if(node.fullPath === '/') {
                        Object.values(node.children).map((childNode) => findNode(childNode, searchedFolder))
                    } else {
                        return
                    }
                }
            }
        }
    }

    const loadChildren = async (node: FolderTreeNode) => {
        node.loadingStatus = 'loading'
        setFoldersTree({...foldersTree})
        node.children = await getChild(node);
        node.isExpanded = true
        node.loadingStatus = 'loaded'
        setFoldersTree({...foldersTree})
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
                    <IconStyle coloricon={"gray-7"} className={node.fullPath !== '/' ? '' : 'hide'}>{node.isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</IconStyle>
                    {getNameFromFullPath(node.fullPath)}
                    {node.loadingStatus === 'loading' ? <LoadingSpinner size='small' color='red'/> : null}
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
                    <div className='col col-2'>
                        <div className='col col-2'>
                            <Icon onClick={() => setFoldersTreeHidden(!foldersTreeHidden)}>{foldersTreeHidden ? 'arrow_forward' : 'arrow_back'}</Icon>
                        </div>
                        <Button className='col col-5' onClick={() => setNewFolderModalOpened(true)} sizeButton='small' typeButton='secondary' buttonColor='blue'>
                            New Folder
                        </Button>
                    </div>
                    <div className='col col-9'>
                        <BreadcrumbDropdown 
                            options={selectedFolder} 
                            callback={(value: string) => setSelectedFolder(value)} 
                            dropdownOptions={['Rename', 'Move', 'New Folder', 'Delete']} 
                            dropdownCallback={(value: string) => {handleBreadcrumbDropdownOptions(value)}} 
                        />
                    </div>
                </div>          
                <FoldersFiltering />
            </div>
            <ContentSection>
                <FoldersTreeSection className={foldersTreeHidden ? 'hide' : 'col col-2'}>
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
                        <MoveItemModal initialSelectedFolder={selectedFolder} findNode={findNodeTest} toggle={setMoveItemsModalOpened}  />
                        : null
                }
            </Modal>
        </div>
    )
}