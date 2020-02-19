import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePicker } from '../../../components/FormsComponents/Datepicker/DateSinglePicker';
import { FolderAsset } from '../../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../components/Typography/Text';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { Breadcrumb } from '../../Folders/Breadcrumb';
import { IconStyle } from '../../Folders/FoldersStyle';
import { ItemSetupRow, ContainerHalfSelector, HeaderBorder } from './GroupsStyle';
import { GroupStepperData } from './Groups';

var moment = require('moment-timezone');

export const GroupPriceStepperFirstStep = (stepperData: GroupStepperData, updateStepperData: Function) => {


    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);
    // const [checkedFolders, setCheckedFolders] = React.useState<FolderAsset[]>([]);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);


    React.useEffect(() => {}, [stepperData])

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = stepperData.firststep.price;
        if(inputChange === 'amount') {
            tempPrices[key].amount = parseInt(value);
        }
        else {
            tempPrices[key].currency = value;
        }
        updateStepperData({...stepperData, firststep: {...stepperData.firststep, price: tempPrices}});
    }   

    const renderPrices = () => {
        return stepperData.firststep.price.map((price, key) => {
            return( 
                <div key={'groupPriceSection' + key} className='col col-9 py1 flex items-center'>
                    <Input className='col col-4 pr1' defaultValue={price.amount.toString()} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')}label={key === 0 ? 'Price' : ''} /> 
                    <DropdownSingle className={key === 0 ? 'col col-4 pl1 mt3' : 'col col-4 pl1'} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'groupPriceCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={{'USD': false, 'AUD': false, 'GBP': false}} />
                    {
                        key === stepperData.firststep.price.length - 1 ? 
                            <Button onClick={() => updateStepperData({...stepperData, firststep: {...stepperData.firststep, price: [...stepperData.firststep.price, {amount: 90, currency: 'USD'}]}})} className='mx2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>+</Button> 
                            : <Icon onClick={() => updateStepperData({...stepperData, firststep: {...stepperData.firststep, price: stepperData.firststep.price.filter((item, index) => {return index !== key})}})} className={key === 0 ? 'px2 pt3' : 'px2'}>close</Icon>
                    }
                </div>
            )
        })
    }

    return (
        <div>
            <div className='col col-12 py2'>
                <Input className='col col-6 pr1' label='Price Group Name' defaultValue={stepperData.firststep.name} onChange={(event) => updateStepperData({...stepperData, firststep: {...stepperData.firststep, name: event.currentTarget.value}})} />
                <DropdownSingle id='groupPriceTypeDropdown' className='col col-6 pl1 mt1' dropdownTitle='Preset Type' dropdownDefaultSelect={stepperData.firststep.type} callback={(value: string) => updateStepperData({...stepperData, firstStep: {...stepperData.firststep, type: value}})} list={{'Subscription': false, 'Pay Per View': false}} />
            </div>
            {renderPrices()}
            <div className='col col-6 py2'>
                {
                    stepperData.firststep.type === 'Subscription' ?
                        <DropdownSingle id='groupPriceRecurrenceDropdown' dropdownDefaultSelect={stepperData.firststep.recurrence} dropdownTitle='Recurrence' list={{'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false}} />
                        :
                        <>
                            <Input className='col col-6 pr1' label='Duration' defaultValue={stepperData.firststep.duration.amount.toString()} onChange={(event) => updateStepperData({...stepperData, firststep: {...stepperData.firststep, duration: {...stepperData.firststep.duration, amount: parseInt(event.currentTarget.value)}}})} />
                            <DropdownSingle id='groupPriceDurationDropdown' className='col col-6 pl1 mt3' dropdownDefaultSelect={stepperData.firststep.duration.type} callback={(value: string) => updateStepperData({...stepperData, firststep: {...stepperData.firststep, duration: {...stepperData.firststep.duration, type: value}}})} dropdownTitle='' list={{'Hours': false, 'Days': false, 'Weeks': false, 'Month': false}} />
                        </>
                }

            </div>
            <div className='col col-12 py2'>
                <DropdownSingle id='groupPriceStartMethodDropdown' dropdownDefaultSelect={stepperData.firststep.startMethod} className='col col-6 pr1' callback={(value: string) => updateStepperData({...stepperData, firststep: {...stepperData.firststep, startMethod: value}})} list={{'Upon Purchase': false, 'Schedule': false}} dropdownTitle='Start Method' />
                {
                    stepperData.firststep.startMethod === 'Schedule' && stepperData.firststep.type === 'Pay Per View' ?
                        <DropdownSingle hasSearch id='groupPriceTimezoneDropdown' className='col col-6 pl1' dropdownTitle='Timezone' list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} />
                        : null
                }
            </div>
            {  
                stepperData.firststep.startMethod === 'Schedule' && stepperData.firststep.type === 'Pay Per View' ?  
                    <div className='col col-12 py2'>
                        <DateSinglePicker className='col col-6 pr1' DatepickerTitle='Start Date' />
                        <Input className='col col-3 pl1' type='time' label='Start Time' />
                    </div>
                    : null
            }
        </div>
    )
}

export const GroupPriceStepperSecondStep = (stepperData: GroupStepperData, updateStepperData: Function) => {

    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);
    // const [checkedFolders, setCheckedFolders] = React.useState<FolderAsset[]>([]);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);

    React.useEffect(() => {
        if(!selectedFolder) {
            setSelectedFolder('/');
            return;
        } else {
            stepperData.secondStep.getFolderContent(selectedFolder)
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
        // setCheckedFolders([]);
        setCheckedContents([]);
    }

    const handleMoveContentsToSelected = () => {
        setSelectedItems( [...selectedItems, ...checkedContents] );
        setCheckedContents([]);
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

    const renderContentsList = () => {
        return stepperData.secondStep.folderData.requestedContent.map((row) => {
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

    // const handleDecreaseOrder = (element: FolderAsset) => {
    //     var currentIndex = selectedItems.findIndex(el => el === element);
    //     var newArray = [...selectedItems];
    //     newArray.splice(currentIndex, 1);
    //     newArray.splice(currentIndex+1, 0, element);
    //     setSelectedItems(newArray);
    // }

    // const handleIncreaseOrder = (element: FolderAsset) => {
    //     var currentIndex = selectedItems.findIndex(el => el === element);
    //     var newArray = [...selectedItems];
    //     newArray.splice(currentIndex, 1);
    //     newArray.splice(currentIndex-1, 0, element);
    //     setSelectedItems(newArray);
    // }

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
                    {/* <div className="iconAction flex-auto justify-end">
                        <IconStyle className="right mr1" coloricon='gray-1' onClick={() => {handleDecreaseOrder(element)}}  >arrow_downward</IconStyle>
                        <IconStyle className="right" coloricon='gray-1' onClick={() => handleIncreaseOrder(element)} >arrow_upward</IconStyle>
                    </div> */}
                </ItemSetupRow>
            )
        })
    }

    return (
        <>
            <div className="inline-flex items-center flex col-7 mb2">
                <Icon>search</Icon>
                <InputTags  noBorder={true} placeholder="Search..." style={{display: "inline-block"}} defaultTags={[]}   />
            </div>
            <ContainerHalfSelector className="col col-5" >
                <div className="pl1 pr1">
                    <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                </div>
                {renderContentsList()} 
            </ContainerHalfSelector>
            <div className="col col-2" style={{marginTop: 180}}>
                <Button onClick={() => handleMoveContentsToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><Icon>chevron_right</Icon></Button>
                <Button onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><Icon>chevron_left</Icon></Button>
            </div>
            <ContainerHalfSelector className="col col-5" >
                <HeaderBorder className="p2">
                    <Text color={"gray-1"} size={14} weight='med'>Selected Content</Text>
                </HeaderBorder>
                {renderSelectedItems()}
            </ContainerHalfSelector>
        </>
    )
}