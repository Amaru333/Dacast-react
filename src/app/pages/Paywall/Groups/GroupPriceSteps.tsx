import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../../shared/Common/Icon';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { FolderAsset } from '../../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../../components/Typography/Text';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { Breadcrumb } from '../../Folders/Breadcrumb';
import { ItemSetupRow, ContainerHalfSelector, HeaderBorder } from './GroupsStyle';
import { GroupStepperData } from './Groups';
import { ArrowButton } from '../../../shared/Common/MiscStyle';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { userToken } from '../../../utils/services/token/tokenService';
import { handleRowIconType } from '../../../shared/Analytics/AnalyticsCommun';
import { currencyDropdownList, presetTypeDropdownList, recurrenceDropdownList, durationDropdownList, startMethodDropdownList } from '../../../../utils/DropdownLists';
import { DateTimePicker } from '../../../../components/FormsComponents/Datepicker/DateTimePicker';

export const GroupPriceStepperFirstStep = (props: { stepperData: GroupStepperData; updateStepperData: (g: GroupStepperData) => void; setStepValidated: (b: boolean) => void }) => {

    React.useEffect(() => {
        props.setStepValidated(props.stepperData.firststep.name && (props.stepperData.firststep.groupSettings.type === 'Pay Per View' && props.stepperData.firststep.groupSettings.duration && props.stepperData.firststep.groupSettings.duration.value || props.stepperData.firststep.groupSettings.type === 'Subscription') && !props.stepperData.firststep.prices.some(price => !price.price.value))
    }, [props.stepperData])

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = props.stepperData.firststep.prices;
        if (inputChange === 'amount') {
            tempPrices[key].price.value = parseFloat(value);
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
                        <Input type='number' className={"col sm-col-6 col-5 px1"} value={price.price.value > 0 ? price.price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? 'Price' : ''} />
                        <DropdownSingle className={'col sm-col-6 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(item: DropdownSingleListItem) => handlePriceChange(item.title, key, 'currency')} id={'groupPriceCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.price.currency} list={currencyDropdownList} />
                    </div>
                    {
                        key === props.stepperData.firststep.prices.length - 1 ?
                            <div onClick={() => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, prices: [...props.stepperData.firststep.prices, { price: { value: "", currency: 'USD' } }] } })} className={'pointer sm-ml2 col col-2 sm-col-6 px1 flex ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')}><IconStyle style={{ borderRadius: 4, backgroundColor: '#284CEB' }} coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div>

                            : <div className={'pointer sm-ml2 col col-2 sm-col-6 px1 ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')} ><IconStyle onClick={() => { var newList = props.stepperData.firststep.prices.filter((item, index) => { return index !== key }); props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, prices: newList } }) }}  >close</IconStyle></div>
                    }
                </div>
            )
        })
    }

    // React.useEffect(() => {
    //     props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings } } })
    // }, [props.stepperData.firststep.groupSettings.timezone])


    return (
        <div>
            <div className='col col-12'>
                <Input className={ClassHalfXsFullMd + 'pr1 mb2'} label='Price Group Name' defaultValue={props.stepperData.firststep.name} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, name: event.currentTarget.value } })} />
                <DropdownSingle id='groupPriceTypeDropdown' className={ClassHalfXsFullMd + 'pl1 mb2'} dropdownTitle='Preset Type' dropdownDefaultSelect={props.stepperData.firststep.groupSettings.type} callback={(item: DropdownSingleListItem) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, type: item.title, startMethod: item.title === 'Subscription' ? 'Upon Purchase' : props.stepperData.firststep.groupSettings.startMethod } } })} list={presetTypeDropdownList} />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    props.stepperData.firststep.groupSettings.type === 'Subscription' ?
                        <DropdownSingle id='groupPriceRecurrenceDropdown' className="col col-6" dropdownDefaultSelect={props.stepperData.firststep.groupSettings.recurrence ? props.stepperData.firststep.groupSettings.recurrence.unit : 'Weekly'} dropdownTitle='Recurrence' list={recurrenceDropdownList} callback={(item: DropdownSingleListItem) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, recurrence: { unit: item.title } } } })} />
                        :
                        <>
                            <Input className='col col-6 pr2' label='Duration' defaultValue={props.stepperData.firststep.groupSettings.duration && props.stepperData.firststep.groupSettings.duration.value > 0 ? props.stepperData.firststep.groupSettings.duration.value.toString() : ''} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, duration: { ...props.stepperData.firststep.groupSettings.duration, value: parseInt(event.currentTarget.value) } } } })} />
                            <DropdownSingle id='groupPriceDurationDropdown' className='col col-6 pr1 mt-auto' dropdownDefaultSelect={props.stepperData.firststep.groupSettings.duration ? props.stepperData.firststep.groupSettings.duration.unit : null} callback={(item: DropdownSingleListItem) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, duration: { ...props.stepperData.firststep.groupSettings.duration, unit: item.title } } } })} dropdownTitle='' list={durationDropdownList} />
                        </>
                }

            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker
                    showTimezone={true}
                    defaultTs={props.stepperData.firststep.groupSettings.startDate}
                    timezone={props.stepperData.firststep.groupSettings.timezone}
                    callback={(ts: number, timezone: string) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, startMethod: ts === 0 ? 'Upon Purchase' : "Subscription", startDate: ts, timezone: timezone && timezone.split(' ')[0] } } })}
                    hideOption="Upon Purchase"
                    id="endDate"
                    dropdownTitle="Start Method"
                />
            </div>
        </div>
    )
}

export const GroupPriceStepperSecondStep = (props: { stepperData: GroupStepperData; updateStepperData: (g: GroupStepperData) => void; setStepValidated: (b: boolean) => void }) => {

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
        if (props.stepperData.secondStep.folderData.requestedContent.results && !selectedFolder && !searchString) {
            setSelectedItems(props.stepperData.secondStep.folderData.requestedContent.results.filter((content) => {
                return props.stepperData.firststep.contents.includes(userId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)
            }))
        }
    }, [props.stepperData.secondStep.folderData.requestedContent.results])

    React.useEffect(() => {
        if (selectedItems && selectedItems.length > 0) {
            props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, contents: selectedItems } })
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
        if (newSelectedItems.length === 0) {
            props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, contents: newSelectedItems } })
        }
        setSelectedItems(newSelectedItems);
        setCheckedSelectedItems([]);
    }

    const renderContentsList = () => {
        if (props.stepperData.secondStep.folderData.requestedContent) {
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
                <InputTags oneTag noBorder={true} placeholder="Search..." style={{ display: "inline-block", backgroundColor: 'white' }} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => { setSearchString(value[0]) }} />
            </div>
            <ContainerHalfSelector className="col sm-col-5 col-12" >
                <div className="pl1 pr1">
                    <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                </div>
                {renderContentsList()}
            </ContainerHalfSelector>
            <div className="col sm-show sm-col-2 col-12" style={{ marginTop: 180 }}>
                <ArrowButton onClick={(event) => { event.preventDefault(); handleMoveContentsToSelected() }} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle style={{ paddingTop: '2px' }} coloricon="dark-violet" fontSize="small">chevron_right</IconStyle></ArrowButton>
                <ArrowButton onClick={(event) => { event.preventDefault(); handleRemoveFromSelected() }} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle style={{ paddingTop: '2px' }} coloricon="dark-violet" fontSize="small">chevron_left</IconStyle></ArrowButton>
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