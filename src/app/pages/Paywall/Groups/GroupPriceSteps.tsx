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
import { SpinnerContainer } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

var moment = require('moment-timezone');

export const GroupPriceStepperFirstStep = (props: { stepperData: GroupStepperData; updateStepperData: Function }) => {

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = props.stepperData.firststep.prices;
        if (inputChange === 'amount') {
            tempPrices[key].value = parseInt(value);
        }
        else {
            tempPrices[key].currency = value;
        }
        props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, price: tempPrices } });
    }

    const renderPrices = () => {
        return props.stepperData.firststep.prices.map((price, key) => {
            return (
                <div key={'groupPriceSection' + key} className={'col col-12 flex items-center ' + (key === props.stepperData.firststep.prices.length - 1 ? '' : 'mb2')}>
                    <div className='col sm-col-6 col-12 clearfix mxn1 flex'>
                        <Input className={"col sm-col-6 col-5 px1"} value={price.value > 0 ? price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? 'Price' : ''} />
                        <DropdownSingle className={'col sm-col-6 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'groupPriceCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={{ 'USD': false, 'AUD': false, 'GBP': false }} />
                    </div>
                    {
                        key === props.stepperData.firststep.prices.length - 1 ?
                            <div onClick={() => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, price: [...props.stepperData.firststep.prices, { value: "", currency: 'USD' }] } })} className={'pointer sm-ml2 col col-2 sm-col-6 px1 flex ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')}><IconStyle style={{ borderRadius: 4, backgroundColor: '#284CEB' }} coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div>

                            : <div className={'pointer sm-ml2 col col-2 sm-col-6 px1 ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')} ><IconStyle onClick={() =>   {var newList = props.stepperData.firststep.prices.filter((item, index) => { return index !== key }); console.log(newList); props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, prices: newList} }) }}  >close</IconStyle></div>
                    }
                </div>
            )
        })
    }

    return (
        <div>
            <div className='col col-12'>
                <Input className={ ClassHalfXsFullMd+'pr1 mb2'} label='Price Group Name' defaultValue={props.stepperData.firststep.name} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, name: event.currentTarget.value } })} />
                <DropdownSingle id='groupPriceTypeDropdown' className={ClassHalfXsFullMd+'pl1 mb2'} dropdownTitle='Preset Type' dropdownDefaultSelect={props.stepperData.firststep.type} callback={(value: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, type: value, startMethod: value === 'Subscription' ? 'Upon Purchase' : props.stepperData.firststep.settings.startMethod } })} list={{ 'Subscription': false, 'Pay Per View': false }} />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    props.stepperData.firststep.type === 'Subscription' ?
                        <DropdownSingle id='groupPriceRecurrenceDropdown' className="col col-6" dropdownDefaultSelect={props.stepperData.firststep.settings.recurrence.recurrence} dropdownTitle='Recurrence' list={{ 'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false }} />
                        :
                        <>
                            <Input className='col col-6 pr2' label='Duration' defaultValue={props.stepperData.firststep.settings.duration.value > 0 ? props.stepperData.firststep.settings.duration.value.toString() : ''} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, settings: {...props.stepperData.firststep.settings, duration: { ...props.stepperData.firststep.settings.duration, value: parseInt(event.currentTarget.value) } }} })} />
                            <DropdownSingle id='groupPriceDurationDropdown' className='col col-6 pr1 mt-auto' dropdownDefaultSelect={props.stepperData.firststep.settings.duration.unit} callback={(value: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, settings: {...props.stepperData.firststep.settings, duration: { ...props.stepperData.firststep.settings.duration, unit: value } } }})} dropdownTitle='' list={{ 'Hours': false, 'Days': false, 'Weeks': false, 'Month': false }} />
                        </>
                }

            </div>
            <div className='col col-12 mb2'>
                <DropdownSingle id='groupPriceStartMethodDropdown' dropdownDefaultSelect={props.stepperData.firststep.settings.startMethod} className={ClassHalfXsFullMd + ' pr1'} callback={(value: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, settings: {...props.stepperData.firststep.settings, startMethod: value }} })} list={{ 'Upon Purchase': false, 'Schedule': false }} dropdownTitle='Start Method' disabled={props.stepperData.firststep.type === 'Subscription'} />
                {
                    props.stepperData.firststep.settings.startMethod === 'Schedule' && props.stepperData.firststep.type === 'Pay Per View' ?
                        <DropdownSingle hasSearch id='groupPriceTimezoneDropdown' className='col col-6 pl1 mt-auto' dropdownTitle='Timezone' list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => { return { ...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false } }, {})} />
                        : null
                }
            </div>
            {
                props.stepperData.firststep.settings.startMethod === 'Schedule' && props.stepperData.firststep.type === 'Pay Per View' ?
                    <div className='col col-12 mb2'>
                        <DateSinglePickerWrapper date={moment()} openDirection="up" className='col col-6 pr1' datepickerTitle='Start Date' />
                        <Input defaultValue={props.stepperData.firststep.settings.startTime} className='col col-3 pl1' type='time' label='Start Time' />
                    </div>
                    : null
            }
        </div>
    )
}

export const GroupPriceStepperSecondStep = (props: { stepperData: GroupStepperData; updateStepperData: Function }) => {

    const [selectedFolder, setSelectedFolder] = React.useState<string>(null);
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);

    const DEFAULT_QS = 'status=online&page=1&per-page=10&content-types=channel,vod,folder,playlist'

    React.useEffect(() => {
        props.stepperData.secondStep.getFolderContent(DEFAULT_QS + (selectedFolder ? selectedFolder : ''))
    }, [selectedFolder])

    const handleRowIconType = (item: FolderAsset) => {
        switch (item.type) {
            case 'playlist':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>playlist_play</IconStyle>
            case 'folder':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>folder_open</IconStyle>
            case 'live':
            case 'channel':
            case 'vod':
                return item.thumbnail ?
                    <img key={"thumbnail" + item.objectID} width="auto" height={42} src={item.thumbnail} ></img>
                    : 
                        <div className='relative justify-center flex items-center' style={{width: 74, height: 42, backgroundColor: '#AFBACC'}}>
                            <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                        </div>
            default:
                return;
        }
    }

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
        setSelectedItems(newSelectedItems);
        setCheckedSelectedItems([]);
    }

    const renderContentsList = () => {
        if(props.stepperData.secondStep.folderData.requestedContent.results) {
            return props.stepperData.secondStep.folderData.requestedContent.results.map((row) => {
                if (row.type === "playlist" || selectedItems.includes(row)) {
                    return;
                }
                return (
                    <ItemSetupRow className='col col-12 flex items-center p2 pointer'
                        selected={checkedContents.includes(row)}
                        onDoubleClick={() => { row.type === "folder" ? handleNavigateToFolder(row.title) : null }}
                    >
                        {row.type !== "folder" &&
                            <InputCheckbox className='mr2' id={row.objectID + row.type + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.objectID}
                                onChange={() => handleCheckboxContents(row)}
                                defaultChecked={checkedContents.includes(row)}
    
                            />
                        }
                        {handleRowIconType(row)}
                        <Text className="pl2" key={'foldersTableName' + row.objectID} size={14} weight='reg' color='gray-1'>{row.title}</Text>
                        {
                            row.type === "folder" &&
                                <div className="flex-auto justify-end">
                                    <IconStyle className="right" onClick={() => handleNavigateToFolder(row.name)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
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
        return selectedItems.map((element, i) => {
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
    }

    return (
        <>
            <div className="inline-flex items-center flex col-12 mb2">
                <IconStyle>search</IconStyle>
                <InputTags noBorder={true} placeholder="Search..." style={{ display: "inline-block", backgroundColor: 'white' }} defaultTags={[]} />
            </div>
            <ContainerHalfSelector className="col sm-col-5 col-12" >
                <div className="pl1 pr1">
                    <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                </div>
                {renderContentsList()}
            </ContainerHalfSelector>
            <div className="col sm-show sm-col-2 col-12" style={{ marginTop: 180 }}>
                <ArrowButton onClick={() => handleMoveContentsToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle style={{paddingTop:'2px'}} coloricon="dark-violet" fontSize="small">chevron_right</IconStyle></ArrowButton>
                <ArrowButton onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle style={{paddingTop:'2px'}} coloricon="dark-violet" fontSize="small">chevron_left</IconStyle></ArrowButton>
            </div>
            <Button disabled={selectedItems.length !== 0} onClick={() => handleMoveContentsToSelected()} className='block ml-auto mr-auto mb2 col-12 mt2 xs-show' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Add</Button>
            <ContainerHalfSelector className="col sm-col-5 col-12" >
                <HeaderBorder className="p2">
                    <Text color={"gray-1"} size={14} weight='med'>Selected Content</Text>
                </HeaderBorder>
                {renderSelectedItems()}
            </ContainerHalfSelector>
            <Button disabled={!selectedItems.length} onClick={() => handleRemoveFromSelected()} className='xs-show col-12  mt2 mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Remove</Button>
        </>
    )
}