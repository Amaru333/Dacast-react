import * as React from 'react';
import styled, { css } from 'styled-components';
import { IconStyle, IconGreyActionsContainer } from '../../shared/Common/Icon';
import { InputTags } from '../FormsComponents/Input/InputTags';
import { Tooltip } from '../Tooltip/Tooltip';
import { Button } from '../FormsComponents/Button/Button';
import { ContainerHalfSelector, TabSetupContainer, TabSetupStyle, ItemSetupRow, HeaderBorder } from './ContentSelectorStyle';
import { Text } from '../Typography/Text';
import { Badge } from '../Badge/Badge';
import { FolderTreeNode, FoldersInfos, FolderAsset, SearchResult } from '../../app/redux-flow/store/Folders/types';
import { InputCheckbox } from '../FormsComponents/Input/InputCheckbox';
import { DropdownList, DropdownItem, DropdownItemText } from '../FormsComponents/Dropdown/DropdownStyle';
import { compareValues, useOutsideAlerter } from '../../utils/utils';
import { Breadcrumb } from '../../app/pages/Folders/Breadcrumb';
import { SwitchTabConfirmation } from '../../app/pages/Playlist/Setup/SetupModals';
import { handleRowIconType } from '../../app/pages/Analytics/AnalyticsCommun';
import { rootNode, FolderTree } from '../../app/utils/services/folder/folderService';

export interface ContentSelectorComponentProps {
    folderData: FoldersInfos;
    type: "folder" | "content";
    selectedItems: (FolderAsset | FolderTreeNode)[];
    getFolderContent: (qs: string, callback?: (data: SearchResult) => void ) => Promise<void> ;
    title: string;
    loading?: boolean;
    callback: (selectedItems: (FolderAsset | FolderTreeNode)[], selectedTab: "folder" | "content", selectedFolderId?: string | null, sortSettings?: SortSettingsContentSelector ) => void;
    folderId?: string;
    playlist?: { setPreviewModalOpen: (enable: boolean) => void };
    showSort?: boolean;
    showFolders?: boolean;
    openSettings?: Function;
}

export interface SortSettingsContentSelector { name: string; value: "custom" | "A-to-Z" | "Z-to-A" | "date-desc" | "date-asc" | 'none' }

export const ContentSelector = (props: ContentSelectorComponentProps & React.HTMLAttributes<HTMLDivElement>) => {


    const [selectedTab, setSelectedTab] = React.useState<"folder" | "content">(props.type);
    const [searchString, setSearchString] = React.useState<string>(null)
    const [checkedFolders, setCheckedFolders] = React.useState<FolderTreeNode[]>([]);
    const [currentNode, setCurrentNode] = React.useState<FolderTreeNode>(rootNode);
    const [selectedFolder, setSelectedFolder] = React.useState<string>(rootNode.fullPath);
    const [selectedItems, setSelectedItems] = React.useState<(FolderAsset | FolderTreeNode)[]>(props.selectedItems);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);
    const [switchTabOpen, setSwitchTabOpen] = React.useState<boolean>(false);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<(FolderAsset | FolderTreeNode)[]>([]);
    const [selectedFolderId, setSelectedFolderId] = React.useState<string | null>(props.folderId ? props.folderId : null);
    const [sortSettings, setSortSettings] = React.useState<SortSettingsContentSelector>({ name: 'Sort', value: 'none' });
    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);

    const sortDropdownRef = React.useRef<HTMLUListElement>(null);

    const parseFiltersToQueryString = () => {
        let returnedString = `page=1&per-page=200&content-types=channel,vod&`
        if (searchString) {
            returnedString += `keyword=${searchString}&`
        }
        if (returnedString.indexOf('status') === -1) {
            returnedString += 'status=online,offline,processing'
        }
        return returnedString

    }

    React.useEffect(() => {
        setDropdownIsOpened(false);
        props.getFolderContent(parseFiltersToQueryString())
    }, [sortSettings, searchString])


    useOutsideAlerter(sortDropdownRef, () => {
        setDropdownIsOpened(!dropdownIsOpened)
    })

    const handleSave = () => {
        props.callback(selectedItems, selectedTab, selectedFolderId, sortSettings);
    }

    const switchTabSuccess = () => {
        setSelectedFolderId(null);
        setSelectedTab(selectedTab === "content" ? 'folder' : 'content');
        props.getFolderContent(parseFiltersToQueryString())
        setSelectedItems([]);
        setSearchString(null)
    }

    const handleMoveContentsToSelected = () => {
        setSelectedItems([...selectedItems, ...checkedContents]);
        setCheckedContents([]);
    }

    const handleMoveFoldersToSelected = () => {
        if (checkedFolders.length < 1) return;
        const wait = async () => {
            await props.getFolderContent("status=online,offline,processing&page=1&per-page=100&content-types=channel,vod&folders=" + checkedFolders[0].id, (data) => {
                console.log(data);
                setSelectedItems(data.data.results);
                setSelectedFolderId(checkedFolders[0].id)
            })
        }
        wait();
        setCheckedFolders([]);
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

    const handleMoveToSelected = () => {
        if (selectedTab === 'content') {
            handleMoveContentsToSelected();
        }
        if (selectedTab === 'folder') {
            handleMoveFoldersToSelected();
        }
    }

    const handleNavigateToFolder = (folderName: string) => {
        setSelectedFolder(selectedFolder + folderName + '/');
        setCheckedFolders([]);
        setCheckedContents([]);
    }

    const handleRemoveFromSelected = () => {
        if (selectedTab === 'folder') {
            setCheckedSelectedItems([]);
            setSelectedItems([]);
        } else {
            var newSelectedItems = selectedItems.filter(el => {
                return !checkedSelectedItems.find(elChecked => {
                    if ((el as FolderAsset).type) {
                        return (el as FolderAsset).objectID === (elChecked as FolderAsset).objectID
                    }
                    return true
                })
            });
            setSelectedItems(newSelectedItems);
            setCheckedSelectedItems([]);
        }
    }

    const handleCheckboxContents = (checkedOption: FolderAsset) => {
        if (checkedContents.includes(checkedOption)) {
            setCheckedContents(checkedContents.filter(option => option !== checkedOption));
        } else {
            setCheckedContents([...checkedContents, checkedOption]);
        }
    }

    const handleClickFolder = (checkedOption: FolderTreeNode) => {
        if (checkedFolders.includes(checkedOption)) {
            setCheckedFolders(checkedFolders.filter(option => option !== checkedOption));
        } else {
            setCheckedFolders([checkedOption]);
        }
    }

    const handleCheckboxSelected = (checkedOption: FolderAsset | FolderTreeNode) => {
        if (checkedSelectedItems.includes(checkedOption)) {
            setCheckedSelectedItems(checkedSelectedItems.filter(option => option !== checkedOption));
        } else {
            setCheckedSelectedItems([...checkedSelectedItems, checkedOption]);
        }
    }


    let foldersTree = new FolderTree(() => { }, setCurrentNode)

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
                <ItemSetupRow className='col col-12 flex items-center p2 pointer'
                    onClick={() => { handleClickFolder(row) }}
                    selected={checkedFolders.includes(row)}>
                    <IconStyle coloricon={"gray-5"}>folder_open</IconStyle>
                    <Text className="pl2" key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-1'>{row.name}</Text>

                    {row.hasChild && <div className="flex justify-between  items-center" style={{ flexGrow: 1 }} >
                        <Badge color="gray-5" className='ml2' number={row.nbChildren} />
                        <IconGreyActionsContainer id={"iconGoTo" + row.id} >
                            <IconStyle onClick={(e) => { setSelectedFolder(row.fullPath); e.stopPropagation() }} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                        </IconGreyActionsContainer>
                        <Tooltip target={"iconGoTo" + row.id}> Go to folder</Tooltip>
                    </div>}
                </ItemSetupRow>
            )
        })
            : null
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

    const bulkActions = [
        { name: 'Name (A-Z)', value: 'A-to-Z', callback: () => { setSelectedItems([...selectedItems].sort(compareValues('title', 'asc'))) } },
        { name: 'Name (Z-A)', value: 'Z-to-A', callback: () => { setSelectedItems([...selectedItems].sort(compareValues('title', 'desc'))) } },
        { name: 'Date Created (Newest First)', value: 'date-asc', callback: () => { setSelectedItems([...selectedItems].sort(compareValues('createdAt', 'asc'))) } },
        { name: 'Date Created (Oldest First)', value: 'date-desc', callback: () => { setSelectedItems([...selectedItems].sort(compareValues('createdAt', 'desc'))) } },
        { name: 'Custom', value: 'custom', callback: () => { } },
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
                    onClick={() => { setSortSettings(item); item.callback() }}>
                    <DropdownItemText size={14} weight='reg' color={'gray-1'}>{item.name}</DropdownItemText>
                </DropdownItem>
            )
        })
    }

    const renderContentsList = () => {
        return props.folderData.requestedContent && selectedTab === 'content' ? props.folderData.requestedContent.results.map((row) => {
            if (row.type === "playlist" ||  selectedItems.some( (el: FolderAsset) => el.objectID === row.objectID ) || selectedItems.includes(row)  ) {
                return;
            }
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer'
                    selected={checkedContents.some(item => item.objectID === row.objectID)}
                    onDoubleClick={() => { row.type === "folder" ? handleNavigateToFolder(row.title) : null }}
                >
                    {row.type !== "folder" &&
                        <InputCheckbox className='mr2' id={row.objectID + row.type + 'InputCheckboxTab'} key={'foldersTableInputCheckbox' + row.objectID}
                            onChange={() => handleCheckboxContents(row)}
                            checked={checkedContents.some(item => item.objectID === row.objectID)}
                            defaultChecked={checkedContents.some(item => item.objectID === row.objectID)}

                        />
                    }
                    {handleRowIconType(row)}
                    <Text className="pl2" key={'foldersTableName' + row.objectID} size={14} weight='reg' color='gray-1'>{row.title}</Text>
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

    return (
        <>
            <SwitchTabConfirmation open={switchTabOpen} toggle={setSwitchTabOpen} tab={selectedTab === "content" ? 'folder' : 'content'} callBackSuccess={() => { switchTabSuccess(); }} />
            <div className="flex items-center">
                <div className="inline-flex items-center flex col-7 mb1">
                    {
                        selectedTab === 'content' &&
                        <>
                            <IconStyle coloricon='gray-3'>search</IconStyle>
                            <InputTags oneTag noBorder={true} placeholder="Search..." style={{ display: "inline-block" }} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => { setSearchString(value[0]) }} />
                        </>
                    }
                </div>

                {
                    props.showSort &&
                    <div className="inline-flex items-center flex col-5 justify-end mb2">
                        <div>
                            <IconStyle id="playlistSetupTooltip">info_outlined</IconStyle>
                            <Tooltip target="playlistSetupTooltip">Either select content dynamically from a Folder or statically from specific pieces of content</Tooltip>
                        </div>
                        <div className="relative">
                            <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >{sortSettings.name !== "Sort" ? "Sort: " + sortSettings.name : 'Sort'}</Button>
                            <DropdownList style={{ width: 208, left: -141, top: 36 }} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} ref={sortDropdownRef} >
                                {renderList()}
                            </DropdownList>
                        </div>
                        {
                            props.openSettings && <Button onClick={() => props.openSettings(true)} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Settings</Button>
                        }
                        {
                            props.playlist && <Button onClick={() => props.playlist.setPreviewModalOpen(true)} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Preview</Button>
                        }
                </div>
                }
                


            </div>
            <div className="clearfix">
                <ContainerHalfSelector className="col sm-col-5 col-12" >
                    <TabSetupContainer className="clearfix">
                        {props.showFolders && 
                            <TabSetupStyle className="pointer" selected={selectedTab === "folder"} onClick={() => { selectedTab === 'content' && (selectedItems.length > 0 ? setSwitchTabOpen(true) : switchTabSuccess()) }}>
                                <Text color={selectedTab === "folder" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Folders</Text>
                            </TabSetupStyle>
                        }
                        <TabSetupStyle className="pointer" selected={selectedTab === "content"} onClick={() => { selectedTab === 'folder' && (selectedItems.length > 0 ? setSwitchTabOpen(true) : switchTabSuccess()) }}>
                            <Text color={selectedTab === "content" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Contents</Text>
                        </TabSetupStyle>
                    </TabSetupContainer>
                    {props.showFolders && 
                        <div hidden={selectedTab === 'content'} className="pl1 pr1">
                            <Breadcrumb options={selectedFolder} callback={(value: string) => { setSelectedFolder(value) }} />
                        </div>
                    }
                    {props.showFolders && 
                        <div hidden={selectedTab !== "folder"} >
                            {renderFoldersList()}
                        </div>
                    }
                    <div hidden={selectedTab !== "content"} >
                        {renderContentsList()}
                    </div>
                </ContainerHalfSelector>
                <div className="col sm-show sm-col-2 col-12" style={{ marginTop: 180 }}>
                    <Button disabled={selectedTab === 'folder' && selectedItems.length !== 0} onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_right</IconStyle></Button>
                    <Button onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_left</IconStyle></Button>
                </div>
                <Button disabled={selectedTab === 'folder' && selectedItems.length !== 0} onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2 col-12 mb2 mt2 xs-show' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Add</Button>
                <ContainerHalfSelector className="col sm-col-5 col-12" >
                    <HeaderBorder className="p2">
                        <Text color={"gray-1"} size={14} weight='med'>{props.title}</Text>
                    </HeaderBorder>
                    {renderSelectedItems()}
                </ContainerHalfSelector>
                <Button disabled={!selectedItems.length} onClick={() => handleRemoveFromSelected()} className='xs-show col-12  mt2 mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Remove</Button>
            </div>
            <div>
                <Button onClick={() => { handleSave() }} isLoading={props.loading} buttonColor="blue" className="mt25 mr1 left" sizeButton="large" typeButton="primary" >Save</Button>
            </div>
        </>
    )

}