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

export interface FolderAsset {
    id: string;
    name: string;
    contentType: 'playlist' | 'vod';
    created: string;
    duration: string;
    features: string[];
    status: 'deleted' | 'offline' | 'online';

}

export interface FolderTreeNode {
    fullPath: string;
    loadingStatus: 'not-loaded' | 'loading' | 'loaded';
    children: {
        [childPath: string]: FolderTreeNode;
    };
    isExpanded: boolean;
}

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

export const FoldersPage = () => {

    const [newFolderModalOpened, setNewFolderModalOpened] = React.useState<boolean>(false);
    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');
    const [foundFolder, setFoundFolder] = React.useState<FolderTreeNode>(null);
    const [moveItemsModalOpened, setMoveItemsModalOpened] = React.useState<boolean>(false);

    React.useEffect(() => {console.log(selectedFolder)}, [selectedFolder])

    const foldersContentTableHeader = () => {
        return [
            <InputCheckbox key='tableHeaderCheckboxCell' id='tableHeaderCheckbox' />,
            <span></span>,
            <Text size={14} weight='med'>Name</Text>,
            <Text size={14} weight='med'>Duration</Text>,
            <Text size={14} weight='med'>Created</Text>,
            <Text size={14} weight='med'>Status</Text>,
            <Text size={14} weight='med'>Features</Text>,
            <span></span>
        ]
    }

    const foldersContentTableBody = () => {

        return TableData.map((row) => {
            return [
                <InputCheckbox id={row.id + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.id} />,
                <IconStyle coloricon={"gray-7"} key={'foldersTableIcon' + row.id}>folder_open</IconStyle>,
                <Text key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-3'>{row.name}</Text>,
                <Text key={'foldersTableDuration' + row.id} size={14} weight='reg' color='gray-3'>{row.duration ? row.duration : '-'}</Text>,
                <Text key={'foldersTableCreated' + row.id} size={14} weight='reg' color='gray-3'>{row.created}</Text>,
                <Label key={'foldersTableStatus' + row.id} label={row.status} size={14} weight='reg' color={row.status === 'online' ? 'green' : 'red'} backgroundColor={row.status === 'online' ? 'green20' : 'red20'}/>,
                <span></span>,
                <Icon className='right mr2' key={'foldersTableActionButton' + row.name}>more_vert</Icon>

            ]
        })
    }

    let children = folderTreeConst.map(path => ({
        isExpanded: false,
        fullPath: '/' + path + '/',
        loadingStatus: 'not-loaded',
        children: {}
    }))
    .reduce((acc, next) => ({...acc, [getNameFromFullPath(next.fullPath)]: next}), {})

    let rootNode: FolderTreeNode = {
        isExpanded: true,
        fullPath: '/',
        loadingStatus: 'loaded',
        children
    }

    const wait = async () => {
        return new Promise((resolve) => setTimeout(resolve, 3000))
    }

    const makeNode = (parent: FolderTreeNode, name: string): FolderTreeNode => {
        return {
            children: {},
            fullPath: parent.fullPath + name + '/',
            isExpanded: false,
            loadingStatus: 'not-loaded'
        }
    }


    const [foldersTree, setFoldersTree] = React.useState<FolderTreeNode>(rootNode)

    React.useEffect(() => {
        console.log(foldersTree)
    }, [foldersTree])

    const getChild = async (node: FolderTreeNode) => {
        await wait();
        let name1 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let name2 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        node.children = {
            [name1]: makeNode(node, name1),
            [name2]: makeNode(node, name2)
        }
        console.log('fetched new child', node.children)
        return node.children;
    }

    const findNodeTest = (searchedFolder: string) => {
        findNode(foldersTree, searchedFolder);
        return foundFolder;
    }

    const findNode = async (node: FolderTreeNode, searchedFolder: string) => {
        if(node !== null) {
            console.log('Trying to find node' , searchedFolder)
            if(node.fullPath === searchedFolder) {
                console.log('returning node ', node)
                setFoundFolder(node);
                return node;
                
            }
            else {
                console.log('Trying to find child node', node)
               let splitNodePath = node.fullPath.split('/');
               if(!searchedFolder)  {searchedFolder = '/';}
               const splitSelectedPath =  searchedFolder.split('/');
               console.log('desired node path', splitSelectedPath)
               if(splitNodePath[splitNodePath.length - 1] === "") {splitNodePath.pop()}
               console.log('current node path', splitNodePath)
               console.log(splitNodePath.every((name, index) => name === splitSelectedPath[index]))
               if(splitNodePath.every((name, index) => name === splitSelectedPath[index])) {

                   if(Object.entries(node.children).length !== 0) {
                    Object.values(node.children).map((childNode) => findNode(childNode, searchedFolder))
                   }
                   else {
                       console.log('need to fetch child');
                       node.children = await getChild(node);
                       setFoldersTree({...foldersTree})
                       setFoundFolder(node);
                       return node;
                   }
               }
               else {
                   if(node.fullPath === '/') {
                    Object.values(node.children).map((childNode) => findNode(childNode, searchedFolder))
                   }
                   else {
                        return
                   }

               }
            }
        }

    }

    const loadChildren = async (node: FolderTreeNode) => {
        node.loadingStatus = 'loading'
        setFoldersTree({
            ...foldersTree
        })
        // setIsLoadingChildren(true)
        //call http
        console.log('loading children of ', node.fullPath)
        node.children = await getChild(node);
        node.isExpanded = true
        node.loadingStatus = 'loaded'
        setFoldersTree({
            ...foldersTree
        })
        //console.log('loaded children of ', node.fullPath, name1, name2)
    }

    const renderNode = (node: FolderTreeNode) => {
        let depth = node.fullPath.split('/').length-1
        return (
            <>
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
                setFoldersTree({
                    ...foldersTree
                })
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
            </>
        )     
    }


    return (
        <div>
            <div className='mb2 col col-12'>
                <div className='col col-1'>
                    <Button  onClick={() => setNewFolderModalOpened(true)} sizeButton='small' typeButton='secondary' buttonColor='blue'>
                        New Folder
                    </Button>
                </div>

                
                <FoldersFiltering />
            </div>
            <ContentSection>
                <FoldersTreeSection className='col col-2'>
                    {renderNode(foldersTree)}
                </FoldersTreeSection>
                <div className='col col-10 flex flex-column right'>
                    <Table className='col col-12' id='folderContentTable' header={foldersContentTableHeader()} body={foldersContentTableBody()} />
                    <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />
                </div>
                <Button onClick={() => {setMoveItemsModalOpened(true)}} sizeButton='large' typeButton='primary' buttonColor='blue'>Move</Button>
            </ContentSection> 
            <Modal hasClose={false} size='small' title='New Folder' toggle={() => setNewFolderModalOpened(!newFolderModalOpened)} opened={newFolderModalOpened} >
                <NewFolderModal toggle={setNewFolderModalOpened} />
            </Modal>
            <Modal hasClose={false} title={'Move items to...'} toggle={() => setMoveItemsModalOpened(!moveItemsModalOpened)} opened={moveItemsModalOpened}>
                {
                    moveItemsModalOpened ?
                        <MoveItemModal initialSelectedFolder={selectedFolder} findNode={findNodeTest} toggle={setMoveItemsModalOpened}  />
                        : null
                }
            </Modal>
        </div>
    )
}