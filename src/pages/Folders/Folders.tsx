import React from 'react';
import { FoldersTreeSection, HeadingSection, ContentSection, FolderLink, FolderElements, IconStyle, SubfolderElements } from './FoldersStyle';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Text } from '../../components/Typography/Text';
import { InputCheckbox } from '../../components/FormsComponents/Input/InputCheckbox';
import { Icon } from '@material-ui/core';
import { Label } from '../../components/FormsComponents/Label/Label';
import { Table } from '../../components/Table/Table';
import { Pagination } from '../../components/Pagination/Pagination';
import { FoldersFiltering } from './FoldersFiltering';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface FolderAsset {
    id: string;
    name: string;
    contentType: 'playlist' | 'vod';
    created: string;
    duration: string;
    features: string[];
    status: 'deleted' | 'offline' | 'online';

}

interface FolderTreeNode {
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
        id: '11',
        name: 'Video 1',
        duration: '03:12:12',
        created: 'Dec 02, 19',
        status: 'offline',
        features: null,
        contentType: 'playlist'
    },    
    {
        id: '11',
        name: 'Playlist 2',
        duration: '03:12:12',
        created: 'Nov 05, 19',
        status: 'online',
        features: null,
        contentType: 'playlist'
    },
    {
        id: '11',
        name: 'Folder 1',
        duration: null,
        created: 'Dec 22, 19',
        status: null,
        features: null,
        contentType: 'playlist'
    },
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
        id: '11',
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
                <InputCheckbox id={row.name + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.name} />,
                <Icon key={'foldersTableIcon' + row.name}>folder_open</Icon>,
                <Text key={'foldersTableName' + row.name} size={14} weight='reg' color='gray-3'>{row.name}</Text>,
                <Text key={'foldersTableDuration' + row.name} size={14} weight='reg' color='gray-3'>{row.duration ? row.duration : '-'}</Text>,
                <Text key={'foldersTableCreated' + row.name} size={14} weight='reg' color='gray-3'>{row.created}</Text>,
                <Label key={'foldersTableStatus' + row.name} label={row.status} size={14} weight='reg' color={row.status === 'online' ? 'green' : 'red'} backgroundColor={row.status === 'online' ? 'green20' : 'red20'}/>,
                <span></span>,
                <Icon className='right mr2' key={'foldersTableActionButton' + row.name}>more_vert</Icon>

            ]
        })
    }

    const getNameFromFullPath = (fullPath: string): string => {
        let split = fullPath.split('/').filter(t => t)
        return split[split.length-1]
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

    
    /*
<div key={key}>
    <div onClick={() => {
        // if(!isLoadingChildren && !folder.isExpanded && foldersTree.length === 0) {
        //     loadChildren(folder.name)
        //     return
        // }
        // if(isLoadingChildren) {
        //     console.log('blocked double loading')
        //     return
        // }
        // setFoldersTree(foldersTree.map((f, i) => {
        //     if(i === key) {
        //         return {
        //             ...f,
        //             isExpanded: true
        //         }
        //     }
        //     return f
        // }))
    }}>{folder.name}</div>
    {folder.isExpanded ? renderFoldersTree(folder.name) : null}
</div>`

    */

    // const updateNode(root: FolderTreeNode, node: FolderTreeNode): FolderTreeNode {
    //     // fullPath = /abc/def/hij
    //     // [abc, def, hij]
    //     let pathElements = node.fullPath.split('/').filter(f => f)
    //     let parent = root
    //     while(pathElements.length !== 0) {
    //         let pathElement = pathElements.shift()
    //         let child = parent.children[pathElement]
    //         if(!child){
    //             throw new Error('child ' + pathElement + ' doesnt exist on node at ' + parent.fullPath)
    //         }
    //         if(pathElements.length === 0) {
    //             console.log('parent: ', pare)
    //         }
    //         parent = child
    //     }
    // }

    const wait = async () => {
        return new Promise((resolve) => setTimeout(resolve, 3000))
    }

    const makeNode = (parent: FolderTreeNode, name: string): FolderTreeNode => {
        return {
            children: {},
            fullPath: parent.fullPath + '/' + name + '/',
            isExpanded: false,
            loadingStatus: 'not-loaded'
        }
    }


    const [foldersTree, setFoldersTree] = React.useState<FolderTreeNode>(rootNode)

    React.useEffect(() => {
        console.log(foldersTree)
    }, [foldersTree])

    const loadChildren = async (node: FolderTreeNode) => {
        node.loadingStatus = 'loading'
        setFoldersTree({
            ...foldersTree
        })
        // setIsLoadingChildren(true)
        //call http
        console.log('loading children of ', node.fullPath)
        await wait()
        let name1 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let name2 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        node.children = {
            [name1]: makeNode(node, name1),
            [name2]: makeNode(node, name2)
        }
        node.isExpanded = true
        node.loadingStatus = 'loaded'
        setFoldersTree({
            ...foldersTree
        })
        console.log('loaded children of ', node.fullPath, name1, name2)
    }
    // wait().then(() => {
    //     console.log('setting folder tree')
    //     foldersTree.children.folder1.isExpanded = true
    //     setFoldersTree({
    //         ...foldersTree
    //     })
    // })

    const renderNode = (node: FolderTreeNode) => {
        let depth = node.fullPath.split('/').length-1
        return (
            <>
            <div style={{paddingLeft: depth*10}} onClick={() => {
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
                {getNameFromFullPath(node.fullPath)}
                {node.loadingStatus === 'loading' ? <LoadingSpinner size='small' color='red'/> : null}
            </div>
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
            <div className='mb2'>
                <Button sizeButton='small' typeButton='secondary' buttonColor='blue'>
                    New Folder
                </Button>
                
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
            </ContentSection> 
       
        </div>
    )
}