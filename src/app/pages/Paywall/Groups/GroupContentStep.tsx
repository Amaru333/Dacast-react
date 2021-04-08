import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../../shared/Common/Icon';
import { FolderAsset } from '../../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../../components/Typography/Text';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { Breadcrumb } from '../../Folders/Breadcrumb';
import { ItemSetupRow, ContainerHalfSelector, HeaderBorder } from './GroupsStyle';
import { GroupStepperData } from './Groups';
import { ArrowButton } from '../../../shared/Common/MiscStyle';
import { userToken } from '../../../utils/services/token/tokenService';
import { handleRowIconType } from '../../../shared/Analytics/AnalyticsCommun';
import { axiosClient, dacastSdk } from '../../../utils/services/axios/axiosClient';
import { formatGetFolderContentOutput } from '../../../redux-flow/store/Folders/viewModel';

export const GroupContentStep = (props: { stepperData: GroupStepperData; updateStepperData: React.Dispatch<React.SetStateAction<GroupStepperData>>; setStepValidated: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [selectedFolder, setSelectedFolder] = React.useState<string>(null)
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([])
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([])
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([])
    const [searchString, setSearchString] = React.useState<string>(null)
    const [folderData, setFolderData] = React.useState<FolderAsset[]>([])
    const [groupContents, setGroupContents] = React.useState<string[]>(props.stepperData.firststep.contents)

    React.useEffect(() => {
        props.setStepValidated(selectedItems.length > 0)
    }, [selectedItems])

    let userId = userToken.getUserInfoItem('custom:dacast_user_id')

    const fetchFolderData = async (tempArray: FolderAsset[]) => {

        for(let page = 1; page <= 3; page++) {
            const DEFAULT_QS = `status=online&page=${page}&per-page=200&content-types=channel,vod,folder,playlist`

            await dacastSdk.getFolderContentList(DEFAULT_QS + (searchString ? `&keyword=${searchString}` : ''))
            .then((response) => {
                let editedResults = formatGetFolderContentOutput(response)
                editedResults && tempArray.push(...editedResults.results)
            })
        }
    }

    const fetchGroupContents = async (tempArray: string[]) => {
        for(let page = 2; page <= props.stepperData.firststep.pages; page++)
         await axiosClient.get(`/paywall/prices/groups/${props.stepperData.firststep.id}?page=${page}`).then((response)=> {
            response.data.data.contents && tempArray.push(...response.data.data.contents)
        })

    }
        
    React.useEffect(() => {

        const tempArray: FolderAsset[] = []
        
        fetchFolderData(tempArray).then(() => {
            setFolderData(tempArray)
        })

    }, [selectedFolder, searchString])

    React.useEffect(() => {
        const tempArray: string[] = groupContents

        fetchGroupContents(tempArray).then(() => {
            setGroupContents(tempArray)
        })
    }, [])

    React.useEffect(() => {
        if(folderData && !selectedFolder && !searchString) {
            setSelectedItems(folderData.filter((content) => {
                return groupContents.includes(userId + '-' + content.type + '-' + content.objectID)
            }))
        }
    }, [folderData, groupContents])

    React.useEffect(() => {
        if(selectedItems && selectedItems.length > 0) {
            
            props.updateStepperData({...props.stepperData, firststep: {...props.stepperData.firststep, contents: selectedItems}})
        }
    }, [selectedItems])

    const handleNavigateToFolder = (folderName: string) => {
        setSelectedFolder(selectedFolder + folderName + '/');
        setCheckedContents([]);
    }

    const handleMoveContentsToSelected = () => {
        setSelectedItems([...selectedItems, ...checkedContents]);
        setCheckedContents([]);
    }

    const handleCheckboxContents = (checkedOption: FolderAsset) => {
        if (checkedContents.includes(checkedOption)) {
            setCheckedContents(checkedContents.filter(option => option !== checkedOption));
        } else {
            setCheckedContents([...checkedContents, checkedOption]);
        }
    }

    const handleCheckboxSelected = (checkedOption: FolderAsset) => {
        if (checkedSelectedItems.includes(checkedOption)) {
            setCheckedSelectedItems(checkedSelectedItems.filter(option => option !== checkedOption));
        } else {
            setCheckedSelectedItems([...checkedSelectedItems, checkedOption]);
        }
    }

    const handleRemoveFromSelected = () => {
        var newSelectedItems = selectedItems.filter(el => {
            return !checkedSelectedItems.find(elChecked => {
                return el.objectID === elChecked.objectID;
            })
        });
        if(newSelectedItems.length === 0) {
            props.updateStepperData({...props.stepperData, firststep: {...props.stepperData.firststep, contents: newSelectedItems}})
        }
        setSelectedItems(newSelectedItems);
        setCheckedSelectedItems([]);
    }

    const renderContentsList = () => {
        if(folderData) {
            return folderData.map((row) => {
                if (row.type === "playlist" || selectedItems.includes(row)) {
                    return;
                }
                return (
                    <ItemSetupRow className='col col-12 flex items-center p2 pointer'
                        selected={checkedContents.includes(row)}
                        onDoubleClick={() => { !row.type ? handleNavigateToFolder(row.title) : null }}
                    >
                        {row.type !== "folder" &&
                            <InputCheckbox className='mr2' id={row.objectID + row.type + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.objectID}
                                onChange={() => handleCheckboxContents(row)}
                                defaultChecked={checkedContents.includes(row)}
    
                            />
                        }
                        {handleRowIconType(row)}
                        <Text className="pl2" key={'foldersTableName' + row.objectID} size={14} weight='reg' color='gray-1'>{row.type ? row.title : row.title}</Text>
                        {
                            row.type === "folder" &&
                                <div className="flex-auto justify-end">
                                    <IconStyle className="right" onClick={() => handleNavigateToFolder(row.title)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                                </div>
                        }
                    </ItemSetupRow>
                )
            })
        } else {
            return null
        }

    }

    const renderSelectedItems = () => {
        return selectedItems ? selectedItems.map((element, i) => {
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer' selected={checkedSelectedItems.includes(element)} >
                    <InputCheckbox className='mr2' id={element.objectID + element.type + 'InputCheckbox'} key={'foldersTableInputCheckbox' + element.objectID}
                        defaultChecked={checkedSelectedItems.includes(element)}
                        onChange={() => handleCheckboxSelected(element)}
                    />
                    {handleRowIconType(element)}
                    <Text className='pl2' size={14} weight='reg'>{element.title}</Text>
                </ItemSetupRow>
            )
        })
        : null
    }

    return (
        <React.Fragment>
            <div className="inline-flex items-center flex col-12 mb2">
                <IconStyle>search</IconStyle>
                <InputTags oneTag noBorder={true} placeholder="Search..." style={{ display: "inline-block", backgroundColor: 'white' }} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => {setSearchString(value[0])}} />
            </div>
            <ContainerHalfSelector className="col sm-col-5 col-12" >
                <div className="pl1 pr1">
                    <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                </div>
                {renderContentsList()}
            </ContainerHalfSelector>
            <div className="col sm-show sm-col-2 col-12" style={{ marginTop: 180 }}>
                <ArrowButton onClick={(event) => {event.preventDefault();handleMoveContentsToSelected()}} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle style={{paddingTop:'2px'}} coloricon="dark-violet" fontSize="small">chevron_right</IconStyle></ArrowButton>
                <ArrowButton onClick={(event) => {event.preventDefault();handleRemoveFromSelected()}} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle style={{paddingTop:'2px'}} coloricon="dark-violet" fontSize="small">chevron_left</IconStyle></ArrowButton>
            </div>
            <Button disabled={!selectedItems || selectedItems.length !== 0} onClick={() => handleMoveContentsToSelected()} className='block ml-auto mr-auto mb2 col-12 mt2 xs-show' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Add</Button>
            <ContainerHalfSelector className="col sm-col-5 col-12" >
                <HeaderBorder className="p2">
                    <Text color={"gray-1"} size={14} weight='med'>Selected Content</Text>
                </HeaderBorder>
                {renderSelectedItems()}
            </ContainerHalfSelector>
            <Button disabled={!selectedItems || selectedItems.length === 0} onClick={() => handleRemoveFromSelected()} className='xs-show col-12  mt2 mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Remove</Button>
        </React.Fragment>
    )
}