import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../../shared/Common/Icon';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { FolderAsset } from '../../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../../components/Typography/Text';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { Breadcrumb } from '../../Folders/Breadcrumb';
import { ItemSetupRow, ContainerHalfSelector, HeaderBorder } from './GroupsStyle';
import { GroupStepperData } from './Groups';
import { ArrowButton } from '../../../shared/Common/arrowButtonStyle';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';

var moment = require('moment-timezone');

export const GroupPriceStepperFirstStep = (props: { stepperData: GroupStepperData; updateStepperData: Function }) => {

    React.useEffect(() => { }, [props.stepperData])

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = props.stepperData.firststep.price;
        if (inputChange === 'amount') {
            tempPrices[key].amount = parseInt(value);
        }
        else {
            tempPrices[key].currency = value;
        }
        props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, price: tempPrices } });
    }

    const renderPrices = () => {
        return props.stepperData.firststep.price.map((price, key) => {
            return (
                <div key={'groupPriceSection' + key} className={'col col-12 flex items-center ' + (key === props.stepperData.firststep.price.length - 1 ? '' : 'mb2')}>
                    <div className='col sm-col-6 col-12 clearfix mxn1 flex'>
                        <Input className={"col sm-col-6 col-5 px1"} defaultValue={price.amount.toString()} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? 'Price' : ''} />
                        <DropdownSingle className={'col sm-col-6 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'groupPriceCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={{ 'USD': false, 'AUD': false, 'GBP': false }} />
                    </div>
                    {
                        key === props.stepperData.firststep.price.length - 1 ?
                            <div onClick={() => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, price: [...props.stepperData.firststep.price, { amount: "", currency: 'USD' }] } })} className={'pointer sm-ml2 col col-2 sm-col-6 px1 flex ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')}><IconStyle style={{ borderRadius: 4, backgroundColor: '#284CEB' }} coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div>

                            : <div className={'pointer sm-ml2 col col-2 sm-col-6 px1 ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')} ><IconStyle onClick={() => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, price: props.stepperData.firststep.price.filter((item, index) => { return index !== key }) } })} >close</IconStyle></div>
                    }
                </div>
            )
        })
    }

    return (
        <div>
            <div className='col col-12'>
                <Input className={ ClassHalfXsFullMd+'pr1 mb2'} label='Price Group Name' defaultValue={props.stepperData.firststep.name} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, name: event.currentTarget.value } })} />
                <DropdownSingle id='groupPriceTypeDropdown' className={ClassHalfXsFullMd+'pl1 mb2'} dropdownTitle='Preset Type' dropdownDefaultSelect={props.stepperData.firststep.type} callback={(value: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, type: value, startMethod: value === 'Subscription' ? 'Upon Purchase' : props.stepperData.firststep.startMethod } })} list={{ 'Subscription': false, 'Pay Per View': false }} />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    props.stepperData.firststep.type === 'Subscription' ?
                        <DropdownSingle id='groupPriceRecurrenceDropdown' className="col col-6" dropdownDefaultSelect={props.stepperData.firststep.recurrence} dropdownTitle='Recurrence' list={{ 'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false }} />
                        :
                        <>
                            <Input className='col col-6 pr1' label='Duration' defaultValue={props.stepperData.firststep.duration.amount.toString()} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, duration: { ...props.stepperData.firststep.duration, amount: parseInt(event.currentTarget.value) } } })} />
                            <DropdownSingle id='groupPriceDurationDropdown' className='col col-6 pl1 mt-auto' dropdownDefaultSelect={props.stepperData.firststep.duration.type} callback={(value: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, duration: { ...props.stepperData.firststep.duration, type: value } } })} dropdownTitle='' list={{ 'Hours': false, 'Days': false, 'Weeks': false, 'Month': false }} />
                        </>
                }

            </div>
            <div className='col col-12 mb2'>
                <DropdownSingle id='groupPriceStartMethodDropdown' dropdownDefaultSelect={props.stepperData.firststep.startMethod} className={ClassHalfXsFullMd + ' pr1'} callback={(value: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, startMethod: value } })} list={{ 'Upon Purchase': false, 'Schedule': false }} dropdownTitle='Start Method' disabled={props.stepperData.firststep.type === 'Subscription'} />
                {
                    props.stepperData.firststep.startMethod === 'Schedule' && props.stepperData.firststep.type === 'Pay Per View' ?
                        <DropdownSingle hasSearch id='groupPriceTimezoneDropdown' className='col col-6 pl1 mt-auto' dropdownTitle='Timezone' list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => { return { ...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false } }, {})} />
                        : null
                }
            </div>
            {
                props.stepperData.firststep.startMethod === 'Schedule' && props.stepperData.firststep.type === 'Pay Per View' ?
                    <div className='col col-12 mb2'>
                        <DateSinglePickerWrapper date={moment()} openDirection="up" className='col col-8 pr1' datepickerTitle='Start Date' />
                        <Input className='col col-4 pl1' type='time' label='Start Time' />
                    </div>
                    : null
            }
        </div>
    )
}

export const GroupPriceStepperSecondStep = (props: { stepperData: GroupStepperData; updateStepperData: Function }) => {

    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);
    // const [checkedFolders, setCheckedFolders] = React.useState<FolderAsset[]>([]);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);

    React.useEffect(() => {
        if (!selectedFolder) {
            setSelectedFolder('/');
            return;
        } else {
            props.stepperData.secondStep.getFolderContent(selectedFolder)
        }
    }, [selectedFolder])

    const handleRowIconType = (item: FolderAsset) => {
        switch (item.contentType) {
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
        setSelectedFolder(selectedFolder + folderName + '/');
        // setCheckedFolders([]);
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
                return el.id === elChecked.id;
            })
        });
        setSelectedItems(newSelectedItems);
        setCheckedSelectedItems([]);
    }

    const renderContentsList = () => {
        return props.stepperData.secondStep.folderData.requestedContent.map((row) => {
            if (row.contentType === "playlist" || selectedItems.includes(row)) {
                return;
            }
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer'
                    selected={checkedContents.includes(row)}
                    onDoubleClick={() => { row.contentType === "folder" ? handleNavigateToFolder(row.name) : null }}
                >
                    {row.contentType !== "folder" ?
                        <InputCheckbox className='mr2' id={row.id + row.contentType + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.id}
                            onChange={() => handleCheckboxContents(row)}
                            defaultChecked={checkedContents.includes(row)}

                        />
                        : null}
                    {handleRowIconType(row)}
                    <Text className="pl2" key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-1'>{row.name}</Text>
                    {
                        row.contentType === "folder" ?
                            <div className="flex-auto justify-end">
                                <IconStyle className="right" onClick={() => handleNavigateToFolder(row.name)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                            </div>
                            : null
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
        return selectedItems.map((element, i) => {
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer' selected={checkedSelectedItems.includes(element)} >
                    <InputCheckbox className='mr2' id={element.id + element.contentType + 'InputCheckbox'} key={'foldersTableInputCheckbox' + element.id}
                        defaultChecked={checkedSelectedItems.includes(element)}
                        onChange={() => handleCheckboxSelected(element)}
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
            <div className="inline-flex items-center flex col-12 mb2">
                <IconStyle>search</IconStyle>
                <InputTags noBorder={true} placeholder="Search..." style={{ display: "inline-block", backgroundColor: 'white' }} defaultTags={[]} />
            </div>
            <ContainerHalfSelector className="col col-5" >
                <div className="pl1 pr1">
                    <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                </div>
                {renderContentsList()}
            </ContainerHalfSelector>
            <div className="col col-2" style={{ marginTop: 180 }}>
                <ArrowButton onClick={() => handleMoveContentsToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle fontSize="small">chevron_right</IconStyle></ArrowButton>
                <ArrowButton onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle fontSize="small">chevron_left</IconStyle></ArrowButton>
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