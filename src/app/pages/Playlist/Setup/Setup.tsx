import React from 'react';
import { FolderTreeNode, FoldersInfos, FolderAsset } from '../../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { Breadcrumb } from '../../Folders/Breadcrumb';
import styled, { css } from 'styled-components';
import { IconStyle, IconGreyActionsContainer } from '../../../../shared/Common/Icon';
import { DropdownItem, DropdownItemText, DropdownList } from '../../../../components/FormsComponents/Dropdown/DropdownStyle';
import { SwitchTabConfirmation, PlaylistSettings } from './SetupModals';
import { useOutsideAlerter, compareValues } from '../../../../utils/utils';
import { SetupComponentProps } from '../../../containers/Playlists/Setup';
import { FolderTree, rootNode } from '../../../utils/folderService';
import { Badge } from '../../../../components/Badge/Badge';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { PreviewModal } from '../../../shared/Common/PreviewModal';
import { userToken } from '../../../utils/token';
import { ContentSetupObject, Content } from '../../../redux-flow/store/Content/Setup/types';


export const SetupPage = (props: SetupComponentProps & {contentId: string; contentType: string}) => {

    const userId = userToken.getUserInfoItem('custom:dacast_user_id')

    const formateData: FolderAsset[] = props.contentData.contentList ? props.contentData.contentList.map(item =>{
        return {
            ownerID: "",
            objectID: item['live-channel-id'] ? item['live-channel-id'] : item['vod-id'],
            title: item.title,
            thumbnail: item.thumbnailURL,
            type: item["content-type"],
            createdAt: 0,
            duration: '',
            featuresList: {},
            status: 'online'
        }
    }) : [];
    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);

    const [selectedTab, setSelectedTab] = React.useState<"folder" | "content">(props.contentData.playlistType);
    const [selectedFolder, setSelectedFolder] = React.useState<string>(rootNode.fullPath);

    const [selectedItems, setSelectedItems] = React.useState<(FolderAsset | FolderTreeNode)[]>(formateData);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<(FolderAsset | FolderTreeNode)[]>([]);
    const [selectedFolderId, setSelectedFolderId] = React.useState<string | null>(props.contentData.folderId ? props.contentData.folderId : null);

    const [checkedFolders, setCheckedFolders] = React.useState<FolderTreeNode[]>([]);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);

    const [switchTabOpen, setSwitchTabOpen] = React.useState<boolean>(false);
    const [playlistSettingsOpen, setPlaylistSettingsOpen] = React.useState<boolean>(false);

    const [sortSettings, setSortSettings] = React.useState<{name: string; value: "custom" | "A-to-Z" | "Z-to-A" | "date-desc" | "date-asc" | 'none'}>({name: 'Sort', value: 'none'});
    const sortDropdownRef = React.useRef<HTMLUListElement>(null);
    const [maxNumberItems, setMaxNumberItems] = React.useState<number>(NaN);

    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)

    const [saveLoading, setSaveLoading] = React.useState<boolean>(false);

    const [searchString, setSearchString] = React.useState<string>(null)

    useOutsideAlerter(sortDropdownRef, () => {
        setDropdownIsOpened(!dropdownIsOpened)
    })

    const parseFiltersToQueryString = () => {
        let returnedString= `page=1&per-page=200&content-types=channel,vod&`
        if(searchString) {
            returnedString += `keyword=${searchString}&`
        }
        if(returnedString.indexOf('status') === -1) {
            returnedString += 'status=online,offline,processing'
        }
        return returnedString

    }

    React.useEffect(() => { 
        setDropdownIsOpened(false); 
        props.getFolderContent(parseFiltersToQueryString())
    }, [sortSettings, searchString])

    React.useEffect(() => {
        if (!selectedFolder && selectedTab === 'folder') {
            setSelectedFolder('/');
        } 
    }, [selectedFolder])

    const handleRowIconType = (item: FolderAsset) => {
        switch (item.type) {
            case 'playlist':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>playlist_play</IconStyle>
            case 'folder':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>folder_open</IconStyle>
            case 'channel':
            case 'live':
            case 'vod':
                return item.thumbnail ? 
                    <img key={"thumbnail" + item.objectID} width="auto" height={42} src={item.thumbnail} ></img>
                    :                                  
                        <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                            <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                        </div>
            default:
                return (                                    
                    <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                    </div>
                )
        }
    }

    const handleNavigateToFolder = (folderName: string) => {
        setSelectedFolder(selectedFolder + folderName + '/');
        setCheckedFolders([]);
        setCheckedContents([]);
    }

    const handleMoveFoldersToSelected = () => {
        if(checkedFolders.length < 1 ) return;
        const wait = async () => {
            await props.getFolderContent("status=online,offline,processing&page=1&per-page=100&content-types=channel,vod&folders="+checkedFolders[0].id)
            .then((response: any) => {
                setSelectedItems(props.folderData.requestedContent.results);
                setSelectedFolderId(checkedFolders[0].id)
            })
        }
        wait();
        //setSelectedItems([...checkedFolders]);
        setCheckedFolders([]);
    }

    const handleMoveContentsToSelected = () => {
        setSelectedItems([...selectedItems, ...checkedContents]);
        setCheckedContents([]);
    }

    const handleMoveToSelected = () => {
        if (selectedTab === 'content') {
            handleMoveContentsToSelected();
        }
        if (selectedTab === 'folder') {
            handleMoveFoldersToSelected();
        }
    }

    const handleClickFolder = (checkedOption: FolderTreeNode) => {
        if (checkedFolders.includes(checkedOption)) {
            setCheckedFolders(checkedFolders.filter(option => option !== checkedOption));
        } else {
            setCheckedFolders([checkedOption]);
        }
    }

    const handleCheckboxContents = (checkedOption: FolderAsset) => {
        if (checkedContents.includes(checkedOption)) {
            setCheckedContents(checkedContents.filter(option => option !== checkedOption));
        } else {
            setCheckedContents([...checkedContents, checkedOption]);
        }
    }

    const handleCheckboxSelected = (checkedOption: FolderAsset | FolderTreeNode) => {
        if (checkedSelectedItems.includes(checkedOption)) {
            setCheckedSelectedItems(checkedSelectedItems.filter(option => option !== checkedOption));
        } else {
            setCheckedSelectedItems([...checkedSelectedItems, checkedOption]);
        }
    }

    const handleRemoveFromSelected = () => {
        if(selectedTab === 'folder') {
            setCheckedSelectedItems([]);
            setSelectedItems([]);
        } else {
            var newSelectedItems = selectedItems.filter(el => {
                return !checkedSelectedItems.find(elChecked => {
                    if( (el as FolderAsset).type) {
                        return (el as FolderAsset).objectID === (elChecked as FolderAsset).objectID
                    } 
                    return true
                })
            });
            setSelectedItems(newSelectedItems);
            setCheckedSelectedItems([]);
        }   
    }

    /** LOADING FOLDERS USING FOLDER SERVICE */
    const [currentNode, setCurrentNode] = React.useState<FolderTreeNode>(rootNode);


    let foldersTree = new FolderTree(() => {}, setCurrentNode)

    React.useEffect(() => {
        const wait = async () => {
            await foldersTree.initTree()
        }
        wait()
    }, [])

    React.useEffect(() => {
        setCurrentNode({
            ...currentNode,
            loadingStatus: 'loading',
            children: {}
        });
        foldersTree.goToNode(selectedFolder)
            .then((node) => {
                setCurrentNode(node);
            }).catch((error) => {
                throw Error(error)
            })
    }, [selectedFolder])

    const renderFoldersList = () => {
        return currentNode ? Object.values(currentNode.children).map((row) => {
          
            return (
                <ItemSetupRow  className='col col-12 flex items-center p2 pointer'
                    onClick={() => {handleClickFolder(row)}}
                    selected={checkedFolders.includes(row)}>
                    <IconStyle coloricon={"gray-5"}>folder_open</IconStyle>
                    <ItemNameContainer>
                        <Text className="pl2" key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-1'>{row.name}</Text>
                    </ItemNameContainer>
                    
                    {row.hasChild && <div className="flex justify-between  items-center" style={{flexGrow: 1}} >
                        <Badge color="gray-5" className='ml2' number={row.nbChildren} />
                        <IconGreyActionsContainer id={"iconGoTo"+row.id} >
                            <IconStyle  onClick={(e) => { setSelectedFolder(row.fullPath); e.stopPropagation() } } coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                        </IconGreyActionsContainer>
                        <Tooltip target={"iconGoTo"+row.id}> Go to folder</Tooltip>
                    </div>}
                </ItemSetupRow>
            )
        })
            : null
    }

    /** END OF FOLDER SERVICE STUFF */

    const renderContentsList = () => {
        return props.folderData.requestedContent && selectedTab === 'content' ? props.folderData.requestedContent.results.map((row) => {
            if (row.type === "playlist" || selectedItems.includes(row)) {
                return;
            }
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer'
                    selected={checkedContents.some(item => item.objectID ===row.objectID)}
                    onDoubleClick={() => { row.type === "folder" ? handleNavigateToFolder(row.title) : null }}
                >
                    {row.type !== "folder" &&
                        <InputCheckbox className='mr2' id={row.objectID + row.type + 'InputCheckboxTab'} key={'foldersTableInputCheckbox' + row.objectID}
                            onChange={() => handleCheckboxContents(row)}
                            checked={checkedContents.some(item => item.objectID ===row.objectID)}
                            defaultChecked={checkedContents.some(item => item.objectID ===row.objectID)}

                        />
                    }
                    {handleRowIconType(row)}
                    <ItemNameContainer>
                        <Text className="pl2" key={'foldersTableName' + row.objectID} size={14} weight='reg' color='gray-1'>{row.title}</Text>
                    </ItemNameContainer>
                    {
                        row.type === "folder" &&
                            <div className="flex-auto justify-end">
                                <IconStyle className="right" onClick={() => handleNavigateToFolder(row.title)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                            </div>
                    }
                </ItemSetupRow>
            )
        })
            : null
    }

    const handleDecreaseOrder = (element: FolderAsset | FolderTreeNode) => {
        var currentIndex = selectedItems.findIndex(el => el === element);
        var newArray = [...selectedItems];
        newArray.splice(currentIndex, 1);
        newArray.splice(currentIndex + 1, 0, element);
        setSelectedItems(newArray);
    }

    const handleIncreaseOrder = (element: FolderAsset | FolderTreeNode) => {
        var currentIndex = selectedItems.findIndex(el => el === element);
        var newArray = [...selectedItems];
        newArray.splice(currentIndex, 1);
        newArray.splice(currentIndex - 1, 0, element);
        setSelectedItems(newArray);
    }

    const renderSelectedItems = () => {
        return selectedItems.map((element: FolderAsset, i) => {
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer' selected={checkedSelectedItems.includes(element)} >
                    {
                        selectedTab !== 'folder' && 
                        <InputCheckbox className='mr2' id={(element.objectID) + element.type + 'InputCheckbox'} key={'foldersTableInputCheckbox' + (element.objectID)}
                            defaultChecked={checkedSelectedItems.includes(element)}
                            onChange={() => handleCheckboxSelected(element)}
                        />
                    }
                    
                    {handleRowIconType(element)}
                    <Text className='pl2' size={14} weight='reg'>{element.title ? element.title : element.name}</Text>
                    {
                        sortSettings.value === "custom" &&  
                            <div className="iconAction flex-auto justify-end">
                                <IconStyle className="right mr1" coloricon='gray-1' onClick={() => handleDecreaseOrder(element)}  >arrow_downward</IconStyle>
                                <IconStyle className="right" coloricon='gray-1' onClick={() => handleIncreaseOrder(element)} >arrow_upward</IconStyle>
                            </div>
                    }
                </ItemSetupRow>
            )
        })
    }

    const removePrefix = (objectId: string) => {
        return objectId.replace(/channel_|live_|vod_/, '');
    }

    const handleSave = () => {
        setSaveLoading(true);
        let newContent = selectedItems.map((item: FolderAsset): Content => {
            return {
                'content-type': item.type === 'channel' ? 'live' : 'vod',
                title: item.title,
                thumbnailURL: item.thumbnail,
                'vod-id': item.type === 'vod'? removePrefix(item.objectID) : null ,
                'live-channel-id': item.type === 'channel'? removePrefix(item.objectID): null ,
            }
        })
        let newData: ContentSetupObject = {...props.contentData};
        newData.contentList = newContent;
        newData.folderId = selectedFolderId;
        newData.maxItems = maxNumberItems;
        newData.playlistType = selectedTab;
        newData.sortType = sortSettings.value !== 'none' ? sortSettings.value : 'custom'
        props.saveContentSetup(newData, props.contentData.id, props.contentType)
        .then(() => setSaveLoading(false))
        .catch(() => setSaveLoading(false))
    }

    const switchTabSuccess = () => {
        setSelectedFolderId(null); 
        setSelectedTab(selectedTab === "content" ? 'folder' : 'content');
        props.getFolderContent(null) 
        setSelectedItems([]);
        setSearchString(null)
    }

    const bulkActions = [
        { name: 'Name (A-Z)', value: 'A-to-Z', callback: () => { setSelectedItems( [...selectedItems].sort(compareValues('title', 'asc')))  } },
        { name: 'Name (Z-A)', value: 'Z-to-A', callback: () => {  setSelectedItems( [...selectedItems].sort(compareValues('title', 'desc'))) } },
        { name: 'Date Created (Newest First)', value: 'date-asc', callback: () => { setSelectedItems( [...selectedItems].sort(compareValues('createdAt', 'asc'))) } },
        { name: 'Date Created (Oldest First)', value: 'date-desc', callback: () => { setSelectedItems( [...selectedItems].sort(compareValues('createdAt', 'desc'))) } },
        { name: 'Custom', value: 'custom', callback: () => {  } },

    ]

    const renderList = () => {
        return bulkActions.map((item, key) => {

            return (
                <DropdownItem
                    isSingle
                    key={item.name}
                    id={item.name}
                    className={key === 1 ? 'mt1' : ''}
                    isSelected={sortSettings.name === item.name}
                    onClick={() => { setSortSettings(item); item.callback() } }>
                    <DropdownItemText size={14} weight='reg' color={'gray-1'}>{item.name}</DropdownItemText>
                </DropdownItem>
            )
        })
    }

    return (
        <>
            <SwitchTabConfirmation open={switchTabOpen} toggle={setSwitchTabOpen} tab={selectedTab === "content" ? 'folder' : 'content'} callBackSuccess={() => { switchTabSuccess(); }} />
            <PlaylistSettings open={playlistSettingsOpen} toggle={setPlaylistSettingsOpen} callBackSuccess={(data: number) => { setMaxNumberItems(data); setPlaylistSettingsOpen(false)} }/>
            <div className="flex items-center">             
                    <div className="inline-flex items-center flex col-7 mb1">
                        { 
                            selectedTab === 'content' &&   
                            <> 
                                <IconStyle coloricon='gray-3'>search</IconStyle>
                                <InputTags oneTag noBorder={true} placeholder="Search..." style={{ display: "inline-block" }} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => {setSearchString(value[0])}} />
                            </>
                        }
                    </div>
                <div className="inline-flex items-center flex col-5 justify-end mb2">
                    <div>
                        <IconStyle id="playlistSetupTooltip">info_outlined</IconStyle>
                        <Tooltip target="playlistSetupTooltip">Either select content dynamically from a Folder or statically from specific pieces of content</Tooltip>
                    </div>
                
                    <div className="relative">
                        <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >{sortSettings.name !== "Sort" ? "Sort: "+sortSettings.name : 'Sort'}</Button>
                        <DropdownList style={{ width: 208, left: 16, top: 36  }} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} ref={sortDropdownRef} >
                            {renderList()}
                        </DropdownList>
                    </div>
                    <Button onClick={() => setPlaylistSettingsOpen(true)} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Settings</Button>
                    <Button onClick={() => setPreviewModalOpen(true)} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Preview</Button>
                </div>
            </div>
            <div className="clearfix">
                <ContainerHalfSelector className="col sm-col-5 col-12" >
                    <TabSetupContainer className="clearfix">
                        <TabSetupStyle className="pointer" selected={selectedTab === "folder"} onClick={() => { selectedTab === 'content' && (selectedItems.length > 0 ? setSwitchTabOpen(true) : switchTabSuccess()) }}>
                            <Text color={selectedTab === "folder" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Folders</Text>
                        </TabSetupStyle>
                        <TabSetupStyle className="pointer" selected={selectedTab === "content"} onClick={() => { selectedTab === 'folder' && (selectedItems.length > 0 ? setSwitchTabOpen(true) : switchTabSuccess()) }}>
                            <Text color={selectedTab === "content" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Content</Text>
                        </TabSetupStyle>
                    </TabSetupContainer>
                    <div hidden={selectedTab === 'content'} className="pl1 pr1">
                        <Breadcrumb options={selectedFolder} callback={(value: string) => { setSelectedFolder(value) } } />
                    </div>
                    <div hidden={selectedTab !== "folder"} >
                        {renderFoldersList()}
                    </div>
                    <div hidden={selectedTab !== "content"} >
                        {renderContentsList()}
                    </div>
                </ContainerHalfSelector>
                <div className="col sm-show sm-col-2 col-12" style={{ marginTop: 180 }}>
                    <Button disabled={selectedTab === 'folder' && selectedItems.length !== 0} onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_right</IconStyle></Button>
                    <Button onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_left</IconStyle></Button>
                </div>
                <Button  disabled={selectedTab === 'folder' && selectedItems.length !== 0} onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2 col-12 mb2 mt2 xs-show' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Add</Button>
                <ContainerHalfSelector className="col sm-col-5 col-12" >
                    <HeaderBorder className="p2">
                        <ItemNameContainer>
                            <Text color={"gray-1"} size={14} weight='med'>{props.contentData.title}</Text>
                        </ItemNameContainer>
                    </HeaderBorder>
                    {renderSelectedItems()}
                </ContainerHalfSelector>
                <Button disabled={!selectedItems.length} onClick={() => handleRemoveFromSelected()} className='xs-show col-12  mt2 mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Remove</Button>
            </div>
            <div>
                {/**<Button onClick={() => { }} buttonColor="blue" className=" mt25 col-3 sm-col-2 right" sizeButton="large" typeButton="tertiary" >Discard</Button>**/}
                <Button onClick={() => { handleSave()}} isLoading={saveLoading} buttonColor="blue" className="mt25 mr1 left" sizeButton="large" typeButton="primary" >Save</Button>
            </div>
            {
                previewModalOpen && <PreviewModal contentId={userId + '-playlist-' + props.contentData.id} toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
            }
        </>
    )

    
}

export const ContainerHalfSelector = styled.div<{}>`
    background-color: white;
    border: 1px solid ${props => props.theme.colors["gray-7"]};;
    height: 550px; 
    overflow-x: auto;
`

export const HeaderBorder = styled.div<{}>`
    height:52px;
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    box-sizing: border-box;
`

export const TabSetupStyle = styled.div<{ selected: boolean }>`
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
export const TabSetupStyles = styled.div<{ selected: boolean }>`
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
export const TabSetupContainer = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
`

export const ItemSetupRow = styled.div<{ selected: boolean }>`
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

export const ItemNameContainer = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`