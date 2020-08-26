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
import { ArrowButton } from '../../../shared/Common/MiscStyle';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { CURRENCY } from '../../../constants/Currencies';
import { userToken } from '../../../utils/token';

var moment = require('moment-timezone');


export const GroupPriceStepperFirstStep = (props: { stepperData: GroupStepperData; updateStepperData: Function, setStepValidated: Function }) => {

    React.useEffect(() => {
        props.setStepValidated(props.stepperData.firststep.name && props.stepperData.firststep.groupSettings.duration.value && !props.stepperData.firststep.prices.some(price => !price.price.value))
    }, [props.stepperData])

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = props.stepperData.firststep.prices;
        if (inputChange === 'amount') {
            tempPrices[key].price.value = parseInt(value);
        }
        else {
            tempPrices[key].price.currency = value;
        }
        props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, price: tempPrices } });
    }

    const renderPrices = () => {
        return props.stepperData.firststep.prices.map((price, key) => {
            return (
                <div key={'groupPriceSection' + key} className={'col col-12 flex items-center ' + (key === props.stepperData.firststep.prices.length - 1 ? '' : 'mb2')}>
                    <div className='col sm-col-6 col-12 clearfix mxn1 flex'>
                        <Input className={"col sm-col-6 col-5 px1"} value={price.price.value > 0 ? price.price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? 'Price' : ''} />
                        <DropdownSingle className={'col sm-col-6 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'groupPriceCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.price.currency} list={CURRENCY.reduce((reduced: DropdownListType, item: string)=> {return {...reduced, [item]: false}},{}) } />
                    </div>
                    {
                        key === props.stepperData.firststep.prices.length - 1 ?
                            <div onClick={() => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, prices: [...props.stepperData.firststep.prices, {price: { value: "", currency: 'USD' }}] } })} className={'pointer sm-ml2 col col-2 sm-col-6 px1 flex ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')}><IconStyle style={{ borderRadius: 4, backgroundColor: '#284CEB' }} coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div>

                            : <div className={'pointer sm-ml2 col col-2 sm-col-6 px1 ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')} ><IconStyle onClick={() =>   {var newList = props.stepperData.firststep.prices.filter((item, index) => { return index !== key });props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, prices: newList} }) }}  >close</IconStyle></div>
                    }
                </div>
            )
        })
    }

    const inputTimeToTs = (value: string, timezoneName: string) => {
        let offset = moment.tz(timezoneName).utcOffset()*60
        let splitValue = value.split(':')
        let hours = parseInt(splitValue[0]) * 3600
        if(isNaN(hours)){
            hours = 0
        }
        let min = !splitValue[1] ? 0 : parseInt(splitValue[1]) * 60
        if(isNaN(min)){
            min = 0
        }
        let total = hours + min - offset
        return total
    }

    let startTimestamp = moment.tz((props.stepperData.firststep.groupSettings.startDate && props.stepperData.firststep.groupSettings.startDate > 0 ? props.stepperData.firststep.groupSettings.startDate : Math.floor(Date.now() / 1000))*1000, 'UTC')
    const [startDay, setStartDay] = React.useState<number>(startTimestamp.clone().startOf('day').valueOf()/1000)
    const [startTime, setStartTime] = React.useState<number>(startTimestamp.clone().valueOf()/1000 - startTimestamp.clone().startOf('day').valueOf()/1000)

    React.useEffect(() => {
        props.updateStepperData({...props.stepperData, firststep: {...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, startDate: moment.utc((startDay + startTime)*1000).valueOf()/1000}}})
    }, [startDay, startTime, props.stepperData.firststep.groupSettings.timezone])


    return (
        <div>
            <div className='col col-12'>
                <Input className={ ClassHalfXsFullMd+'pr1 mb2'} label='Price Group Name' defaultValue={props.stepperData.firststep.name} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, name: event.currentTarget.value } })} />
                <DropdownSingle id='groupPriceTypeDropdown' className={ClassHalfXsFullMd+'pl1 mb2'} dropdownTitle='Preset Type' dropdownDefaultSelect={props.stepperData.firststep.groupSettings.type} callback={(value: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings:{ ...props.stepperData.firststep.groupSettings, type: value, startMethod: value === 'Subscription' ? 'Upon Purchase' : props.stepperData.firststep.groupSettings.startMethod }}})} list={{ 'Subscription': false, 'Pay Per View': false }} />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    props.stepperData.firststep.groupSettings.type === 'Subscription' ?
                        <DropdownSingle id='groupPriceRecurrenceDropdown' className="col col-6" dropdownDefaultSelect={props.stepperData.firststep.groupSettings.recurrence.unit} dropdownTitle='Recurrence' list={{ 'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false }} callback={(value: string) => props.updateStepperData({...props.stepperData, firststep:{...props.stepperData.firststep, groupSettings:{ ...props.stepperData.firststep.groupSettings, recurrence: {unit: value}}}})} />
                        :
                        <>
                            <Input className='col col-6 pr2' label='Duration' defaultValue={props.stepperData.firststep.groupSettings.duration.value > 0 ? props.stepperData.firststep.groupSettings.duration.value.toString() : ''} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, duration: { ...props.stepperData.firststep.groupSettings.duration, value: parseInt(event.currentTarget.value) } }} })} />
                            <DropdownSingle id='groupPriceDurationDropdown' className='col col-6 pr1 mt-auto' dropdownDefaultSelect={props.stepperData.firststep.groupSettings.duration.unit} callback={(value: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, duration: { ...props.stepperData.firststep.groupSettings.duration, unit: value } } }})} dropdownTitle='' list={{ 'Hours': false, 'Days': false, 'Weeks': false, 'Months': false }} />
                        </>
                }

            </div>
            <div className='col col-12 mb2'>
                <DropdownSingle id='groupPriceStartMethodDropdown' dropdownDefaultSelect={props.stepperData.firststep.groupSettings.startMethod} className={ClassHalfXsFullMd + ' pr1'} callback={(value: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, startMethod: value, startDate: value === 'Upon Purchase' ? 0 : props.stepperData.firststep.groupSettings.startDate }} })} list={{ 'Upon Purchase': false, 'Schedule': false }} dropdownTitle='Start Method' disabled={props.stepperData.firststep.groupSettings.type === 'Subscription'} />
                {
                    props.stepperData.firststep.groupSettings.startMethod === 'Schedule' && props.stepperData.firststep.groupSettings.type === 'Pay Per View' &&
                        <DropdownSingle 
                            hasSearch 
                            id='groupPriceTimezoneDropdown' 
                            className='col col-6 pl1 mt-auto' 
                            dropdownTitle='Timezone' 
                            dropdownDefaultSelect='Etc/UTC (+00:00 UTC)' 
                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => { return { ...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false } }, {})}
                            callback={(value: string) => props.updateStepperData({...props.stepperData, firststep: {...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, timezone: value.split(' ')[0]}}})}
                        />
                }
            </div>
            {
                props.stepperData.firststep.groupSettings.startMethod === 'Schedule' && props.stepperData.firststep.groupSettings.type === 'Pay Per View' &&
                    <div className='col col-12 mb2'>
                        <DateSinglePickerWrapper
                            date={moment.utc((startDay + startTime)*1000).tz(props.stepperData.firststep.groupSettings.timezone || 'UTC')}
                            callback={(_, timestamp: string) => setStartDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((startDay + startTime)*1000).tz(props.stepperData.firststep.groupSettings.timezone || 'UTC').format('HH:mm')}
                            onChange={(event) => setStartTime(inputTimeToTs(event.currentTarget.value, props.stepperData.firststep.groupSettings.timezone || 'UTC'))}
                            className='col col-6 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </div>
            }
        </div>
    )
}

export const GroupPriceStepperSecondStep = (props: { stepperData: GroupStepperData; updateStepperData: Function; setStepValidated: Function }) => {

    const [selectedFolder, setSelectedFolder] = React.useState<string>(null)
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([])
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([])
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([])
    const [searchString, setSearchString] = React.useState<string>(null)

    React.useEffect(() => {
        props.setStepValidated(selectedItems.length > 0)
    }, [selectedItems])

    let userId = userToken.getUserInfoItem('custom:dacast_user_id')

    const DEFAULT_QS = 'status=online&page=1&per-page=200&content-types=channel,vod,folder,playlist'

    React.useEffect(() => {
        props.stepperData.secondStep.getFolderContent(DEFAULT_QS + (searchString ? `&keyword=${searchString}` : ''))
    }, [selectedFolder, searchString])

    React.useEffect(() => {
        if(props.stepperData.secondStep.folderData.requestedContent.results && !selectedFolder && !searchString) {
            setSelectedItems(props.stepperData.secondStep.folderData.requestedContent.results.filter((content) => {
                return props.stepperData.firststep.contents.includes(userId + '-' + content.type + '-' +  content.objectID)
            }))
        }
    }, [props.stepperData.secondStep.folderData.requestedContent.results])


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
        if(props.stepperData.secondStep.folderData.requestedContent) {
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
        <>
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
        </>
    )
}