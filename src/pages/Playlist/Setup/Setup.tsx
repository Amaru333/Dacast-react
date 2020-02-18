import React from 'react';
import { FolderTreeNode, FoldersInfos, FolderAsset } from '../../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { getNameFromFullPath } from '../../../utils/utils';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { Breadcrumb } from '../../Folders/Breadcrumb';
import { IconStyle } from '../../Folders/FoldersStyle';
import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';
import { IconSearch } from '../List/PlaylistList';
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';

export interface SetupComponentProps {
    folderData: FoldersInfos;
    getFolders: Function;
    getFolderContent: Function;
    restoreContent: Function;
}

const folderTreeConst = [
    'folder1',
    'folder2',
    'folder3'
]

export const SetupPage = (props: SetupComponentProps) => {

    const [currentNode, setCurrentNode] = React.useState<FolderTreeNode>(null);
    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);

    const [selectedTab, setSelectedTab] = React.useState<"folders" | "content">("folders");
    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');

    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);

    const [checkedFolders, setCheckedFolders] = React.useState<FolderAsset[]>([]);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);


    /** START IDK WHAT IT IS */

    let children = folderTreeConst.map(path => ({
        isExpanded: false,
        subfolders: 2,
        nbChildren: 64,
        fullPath: '/' + path + '/',
        loadingStatus: 'not-loaded',
        children: {}
    })).reduce((acc, next) => ({...acc, [getNameFromFullPath(next.fullPath)]: next}), {})

    let rootNode: FolderTreeNode = {
        isExpanded: true,
        subfolders: 2,
        nbChildren: 2,
        fullPath: '/',
        loadingStatus: 'loaded',
        children
    }
    
    const [foldersTree, setFoldersTree] = React.useState<FolderTreeNode>(rootNode)

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

    const getChild = async (node: FolderTreeNode) => {        
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
            await loadChildren(currentNode)
        }
        return currentNode
    }

    const goToNode = async (searchedFolder: string) => {
        return await getNode(foldersTree, searchedFolder);
    }


    /** END IDK WHAT IT IS */

    React.useEffect(() => {
        if(!selectedFolder) {
            setSelectedFolder('/');
            return;
        } else {
            props.getFolderContent(selectedFolder)
        }
        // goToNode(selectedFolder)
        //     .then((node) => {
        //         setCurrentNode(node);
        //     })
    }, [selectedFolder])

    const handleRowIconType = (item: FolderAsset) => {
        switch(item.contentType) {
            case 'playlist':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>playlist_play</IconStyle>
            case 'folder': 
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>folder_open</IconStyle>
            case 'live':
            case 'vod': 
                return <img key={"thumbnail" + item.id} width="auto" height={42} src={item.thumbnail} ></img>
            default:
                return;
        }
    }

    const handleNavigateToFolder = (folderName: string) => {
        setSelectedFolder(selectedFolder+folderName+'/');
        setCheckedFolders([]);
        setCheckedContents([]);
    }

    const handleMoveFoldersToSelected = () => {
        setSelectedItems( [...selectedItems, ...checkedFolders] );
        setCheckedFolders([]);
    }

    const handleMoveContentsToSelected = () => {
        setSelectedItems( [...selectedItems, ...checkedContents] );
        setCheckedContents([]);
    }

    const handleMoveToSelected = () => {
        if(selectedTab === 'content') {
            handleMoveContentsToSelected();
        }
        if(selectedTab === 'folders') {
            handleMoveFoldersToSelected();
        }
    }

    const handleCheckboxFolder = (checkedOption: FolderAsset) => {
        if(checkedFolders.includes(checkedOption)) {
            setCheckedFolders(checkedFolders.filter(option => option !== checkedOption));
        } else {
            setCheckedFolders([...checkedFolders, checkedOption]);
        }
    }

    const handleCheckboxContents = (checkedOption: FolderAsset) => {
        if(checkedContents.includes(checkedOption)) {
            setCheckedContents(checkedContents.filter(option => option !== checkedOption));
        } else {
            setCheckedContents([...checkedContents, checkedOption]);
        }
    }

    const handleCheckboxSelected = (checkedOption: FolderAsset) => {
        if(checkedSelectedItems.includes(checkedOption)) {
            setCheckedSelectedItems(checkedSelectedItems.filter(option => option !== checkedOption));
        } else {
            setCheckedSelectedItems([...checkedSelectedItems, checkedOption]);
        }
    }

    const handleRemoveFromSelected = () => {
        var newSelectedItems = selectedItems.filter( el => {
            return !checkedSelectedItems.find(elChecked => {
                return el.id === elChecked.id;
            })
        });
        setSelectedItems(newSelectedItems);
        setCheckedSelectedItems([]);
    }

    const renderFoldersList = () => {
        return props.folderData.requestedContent.map((row) => {
            if(row.contentType === "folder" && !selectedItems.includes(row)) {
                return (
                    <ItemSetupRow className='col col-12 flex items-center p2 pointer' 
                        onClick={() => handleCheckboxFolder(row) } 
                        onDoubleClick={() => handleNavigateToFolder(row.name)}
                        selected={checkedFolders.includes(row)}>
                        <IconStyle coloricon={"gray-5"}>folder_open</IconStyle>
                        <Text className="pl2" key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-1'>{row.name}</Text>
                        <div className="flex-auto justify-end">
                            <IconStyle className="right" onClick={() => handleNavigateToFolder(row.name)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                        </div>
                    </ItemSetupRow>
                )
            } else {
                return;
            }
        })
    }

    const renderContentsList = () => {
        return props.folderData.requestedContent.map((row) => {
            if(row.contentType === "playlist" || selectedItems.includes(row)) {
                return;
            }
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer' 
                    selected={checkedContents.includes(row)}
                    onDoubleClick={ () =>  { row.contentType === "folder" ? handleNavigateToFolder(row.name) : null } }
                >
                    { row.contentType !== "folder" ? 
                        <InputCheckbox className='mr2' id={row.id + row.contentType + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.id}
                            onChange={() => handleCheckboxContents(row)} 
                            defaultChecked={checkedContents.includes(row)}
                            
                        /> 
                        : null }
                    {handleRowIconType(row)}
                    <Text className="pl2" key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-1'>{row.name}</Text>
                    {
                        row.contentType === "folder" ? 
                            <div className="flex-auto justify-end">
                                <IconStyle className="right" onClick={() => handleNavigateToFolder(row.name)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                            </div>
                            :null
                    }
                </ItemSetupRow>
            )
        })
    }

    const handleDecreaseOrder = (element: FolderAsset) => {
        var currentIndex = selectedItems.findIndex(el => el === element);
        var newArray = [...selectedItems];
        newArray.splice(currentIndex, 1);
        newArray.splice(currentIndex+1, 0, element);
        setSelectedItems(newArray);
    }

    const handleIncreaseOrder = (element: FolderAsset) => {
        var currentIndex = selectedItems.findIndex(el => el === element);
        var newArray = [...selectedItems];
        newArray.splice(currentIndex, 1);
        newArray.splice(currentIndex-1, 0, element);
        setSelectedItems(newArray);
    }
   
    const renderSelectedItems = () => {
        return selectedItems.map( (element, i) => {
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer' selected={checkedSelectedItems.includes(element)} >
                    <InputCheckbox className='mr2' id={element.id + element.contentType + 'InputCheckbox'} key={'foldersTableInputCheckbox' + element.id} 
                        defaultChecked={checkedSelectedItems.includes(element)}
                        onChange={() => handleCheckboxSelected(element) }
                    />
                    {handleRowIconType(element)}
                    <Text className='pl2' size={14} weight='reg'>{element.name}</Text>
                    <div className="iconAction flex-auto justify-end">
                        <IconStyle className="right mr1" coloricon='gray-1' onClick={() => handleDecreaseOrder(element)}  >arrow_downward</IconStyle>
                        <IconStyle className="right" coloricon='gray-1' onClick={() => handleIncreaseOrder(element)} >arrow_upward</IconStyle>
                    </div>
                </ItemSetupRow>
            )
        })
    }

    const bulkActions = [
        { name: 'Name (A-Z)', function: () => console.log("wtv") },
        { name: 'Name (Z-A)', function: () => console.log("wtv") },
        { name: 'Date Created (Newest First)', function: () => console.log("wtv") },
        { name: 'Date Created (Oldest First)', function: () => console.log("wtv") },
        { name: 'Custom', function: () => console.log("wtv") },
    ]

    const renderList = () => {
        return bulkActions.map((item, key) => {
            return (
                <DropdownItem
                    isSingle
                    key={item.name}
                    className={key === 1 ? 'mt1' : ''}
                    isSelected={false}
                    onClick={() => item.function()}>
                    <DropdownItemText size={14} weight='reg' color={'gray-1'}>{item.name}</DropdownItemText>
                </DropdownItem>
            )
        })
    }

    return (
        <>
            <div className="inline-flex items-center flex col-7 mb2">
                <IconSearch>search</IconSearch>
                <InputTags  noBorder={true} placeholder="Search..." style={{display: "inline-block"}} defaultTags={[]}   />
            </div>
            <div className="inline-flex items-center flex col-5 justify-end mb2">
                <div className="relative">
                    <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Sort</Button>
                    <DropdownList style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                        {renderList()}
                    </DropdownList>
                </div>
                <Button  buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Settings</Button>
                <Button  buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Preview</Button>
            </div>
            <ContainerHalfSelector className="col col-5" >
                <TabSetupContainer className="clearfix">
                    <TabSetupStyle className="pointer" selected={selectedTab === "folders"} onClick={() => {setSelectedTab('folders'); setSelectedItems([]); } }>
                        <Text color={selectedTab === "folders" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Folders</Text>
                    </TabSetupStyle>
                    <TabSetupStyle className="pointer" selected={selectedTab === "content"} onClick={() => {setSelectedTab('content'); setSelectedItems([]); } }>
                        <Text color={selectedTab === "content" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Content</Text>
                    </TabSetupStyle>
                </TabSetupContainer>
                <div hidden={selectedTab !== "folders"} >
                    <div className="pl1 pr1">
                        <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                    </div>
                    {renderFoldersList()} 
                </div>
                <div hidden={selectedTab !== "content"} >
                    <div className="pl1 pr1">
                        <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                    </div>
                    {renderContentsList()} 
                </div>
            </ContainerHalfSelector>
            <div className="col col-2" style={{marginTop: 180}}>
                <Button onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><Icon>chevron_right</Icon></Button>
                <Button onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><Icon>chevron_left</Icon></Button>
            </div>
            <ContainerHalfSelector className="col col-5" >
                <HeaderBorder className="p2">
                    <Text color={"gray-1"} size={14} weight='med'>[Account Name]'s Playlist</Text>
                </HeaderBorder>
                {renderSelectedItems()}
            </ContainerHalfSelector>
        </>
    )
}

export const ContainerHalfSelector = styled.div<{}>`
    background-color: white;
    border: 1px solid ${props => props.theme.colors["gray-7"]};;
    height: 550px; 
    overflow-x: scroll;
`

const HeaderBorder = styled.div<{}>`
    height:52px;
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    box-sizing: border-box;
`

export const TabSetupStyle = styled.div<{selected: boolean}>`
    width:50%;
    box-sizing: border-box;
    float:left;
    text-align:center;
    height: 38px;
    padding: 7px 0;
    ${props => props.selected && css`
        background-color: ${props.theme.colors["violet20"]} !important;
        color: ${props.theme.colors["dark-violet"]};
    `}
`

export const TabSetupContainer= styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};;
`

export const ItemSetupRow = styled.div<{selected: boolean}>`
    border-top: 1px solid ${props => props.theme.colors['gray-7']};
    height: 64px;
    ${props => props.selected && css`
    `}
    &:last-child {
        border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    }
    &:hover {
        .iconAction {
            visibility: visible;
        }
        background-color: ${props => props.theme.colors['violet10']};
    }
`