import React from 'react';
import { FolderTreeNode, FoldersInfos, FolderAsset } from '../../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { Breadcrumb } from '../../Folders/Breadcrumb';
import { IconStyle } from '../../Folders/FoldersStyle';
import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';
import { IconSearch } from '../List/PlaylistList';
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { SwitchTabConfirmation, PlaylistSettings } from './SetupModals';

export interface SetupComponentProps {
    folderData: FoldersInfos;
    getFolders: Function;
    getFolderContent: Function;
    restoreContent: Function;
}

export const SetupPage = (props: SetupComponentProps) => {

    const [currentNode, setCurrentNode] = React.useState<FolderTreeNode>(null);
    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);

    const [selectedTab, setSelectedTab] = React.useState<"folders" | "content">("folders");
    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');

    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);

    const [checkedFolders, setCheckedFolders] = React.useState<FolderAsset[]>([]);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);

    const [switchTabOpen, setSwitchTabOpen] = React.useState<boolean>(false);
    const [playlistSettingsOpen, setPlaylistSettingsOpen] = React.useState<boolean>(false);

    const [sortSettings, setSortSetttings] = React.useState<string>("Sort");

    React.useEffect(() => {
        if(!selectedFolder) {
            setSelectedFolder('/');
            return;
        } else {
            props.getFolderContent(selectedFolder)
        }
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
            setCheckedFolders([checkedOption]);
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
        { name: 'Name (A-Z)', function: () => setSortSetttings('Name (A-Z)') },
        { name: 'Name (Z-A)', function: () => setSortSetttings('Name (Z-A)') },
        { name: 'Date Created (Newest First)', function: () => setSortSetttings('Date Created (Newest First)') },
        { name: 'Date Created (Oldest First)', function: () => setSortSetttings('Date Created (Oldest First)') },
        { name: 'Custom', function: () => setSortSetttings('Custom') },
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
            <SwitchTabConfirmation open={switchTabOpen} toggle={setSwitchTabOpen} tab={selectedTab === "content" ? 'folders' : 'content'} callBackSuccess={() => {setSelectedTab(selectedTab === "content" ? 'folders' : 'content');setSelectedItems([]); }} />
            <PlaylistSettings open={playlistSettingsOpen} toggle={setPlaylistSettingsOpen} callBackSuccess={() =>setPlaylistSettingsOpen(false)} />
            <div className="flex itemns-center">
                <div className="inline-flex items-center flex col-7 mb2">
                    <IconSearch>search</IconSearch>
                    <InputTags  noBorder={true} placeholder="Search..." style={{display: "inline-block"}} defaultTags={[]}   />
                </div>
                <div className="inline-flex items-center flex col-5 justify-end mb2">
                    <div className="relative">
                        <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >{sortSettings}</Button>
                        <DropdownList style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                            {renderList()}
                        </DropdownList>
                    </div>  
                    <Button onClick={() => setPlaylistSettingsOpen(true)}  buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Settings</Button>
                    <Button  buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Preview</Button>
                </div>
            </div>
            <ContainerHalfSelector className="col col-5" >
                <TabSetupContainer className="clearfix">
                    <TabSetupStyle className="pointer" selected={selectedTab === "folders"} onClick={() => {setSwitchTabOpen(true)} }>
                        <Text color={selectedTab === "folders" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Folders</Text>
                    </TabSetupStyle>
                    <TabSetupStyle className="pointer" selected={selectedTab === "content"} onClick={() => {setSwitchTabOpen(true)} }>
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
                <Button disabled={selectedTab === 'folders' && selectedItems.length !== 0} onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><Icon>chevron_right</Icon></Button>
                <Button onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><Icon>chevron_left</Icon></Button>
            </div>
            <ContainerHalfSelector className="col col-5" >
                <HeaderBorder className="p2">
                    <Text color={"gray-1"} size={14} weight='med'>[Playlist name]</Text>
                </HeaderBorder>
                {renderSelectedItems()}
            </ContainerHalfSelector>
            <Button onClick={() => {} }  buttonColor="blue" className="relative mt2 mr1 right" sizeButton="small" typeButton="primary" >Save</Button>
            <Button onClick={() => {} }  buttonColor="blue" className="relative mt2 right" sizeButton="small" typeButton="tertiary" >Discard</Button>
        </>
    )
}

export const ContainerHalfSelector = styled.div<{}>`
    background-color: white;
    border: 1px solid ${props => props.theme.colors["gray-7"]};;
    height: 550px; 
    overflow-x: scroll;
`

export const HeaderBorder = styled.div<{}>`
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
export const TabSetupStyles = styled.div<{selected: boolean}>`
    box-sizing: border-box;
    margin-bottom: 16px;
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
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
`

export const ItemSetupRow = styled.div<{selected: boolean}>`
    border-top: 1px solid ${props => props.theme.colors['gray-7']};
    height: 64px;
    ${props => props.selected && css`
        background-color: ${props.theme.colors['violet10']};
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