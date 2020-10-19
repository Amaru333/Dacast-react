import React from 'react';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Preset } from '../../redux-flow/store/Paywall/Presets/types';
import { DropdownListType, DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
import { ClassHalfXsFullMd } from '../General/GeneralStyle';
import { CURRENCY } from '../../constants/Currencies';
import { currencyDropdownList, presetTypeDropdownList, recurrenceDropdownList, durationDropdownList, startMethodDropdownList, timezoneDropdownList } from '../../../utils/DropdownLists';

var moment = require('moment-timezone');

const pricesList = [
    {
        value: NaN,
        currency: 'USD'
    }
]

const defaultPreset: Preset = {
    id: 'custom',
    name: '',
    type: 'individual',
    priceType: 'Pay Per View',
    prices: pricesList,
    settings: {
        duration: { value: NaN, unit: 'Hours' },
        recurrence: null,
        startMethod: 'Upon Purchase',
        timezone: moment.tz.guess(),
        startDate: 0,
    }
}

export const ContentPricePresetsModal = (props: {contentType: string; contentId: string; action: (p: Preset, contentId: string, contentType: string) => Promise<void>; toggle: (b: boolean) => void; preset: Preset; presetList: Preset[]; savePresetGlobally: (p: Preset) => Promise<void>; fetchContentPrices: (contentId: string, contentType: string) => Promise<void>}) => {

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

    const [newPricePreset, setNewPricePreset] = React.useState<Preset>(props.preset ? props.preset : defaultPreset);
    const [savePreset, setSavePreset] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const presetDropdownList = props.presetList.map((item) => {
        let presetDropdownListItem: DropdownSingleListItem = {title: null}
        presetDropdownListItem.title = item.name
        return presetDropdownListItem
    })

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = newPricePreset.prices;
        if (inputChange === 'value') {
            tempPrices[key].value = parseFloat(value);
        }
        else {
            tempPrices[key].currency = value;
        }
        setNewPricePreset({ ...newPricePreset, prices: tempPrices });
    }

    const renderPrices = () => {
        if(newPricePreset.prices) {
            return newPricePreset.prices.map((price, key) => {
                return (
                    <div key={'pricePresetPriceSection' + key} className={'col col-12 flex items-center ' + (key === newPricePreset.prices.length - 1 ? '' : 'mb2')}>
                        <div className='col sm-col-12 col-12 clearfix flex'>
                            <Input type='number' className={"col sm-col-3 col-5 pr1"} value={price.value > 0 ? price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'value')} label={key === 0 ? 'Price' : ''} />
                            <DropdownSingle className={'col sm-col-3 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(item: DropdownSingleListItem) => handlePriceChange(item.title, key, 'currency')} id={'pricePresetCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={currencyDropdownList}  />
                            {
                                key === newPricePreset.prices.length - 1 ?
                                    <div onClick={() => setNewPricePreset({ ...newPricePreset, prices: [...newPricePreset.prices, { value: 0, currency: 'USD' }] })} className={'pointer col col-2 sm-col-6 px1 flex items-center xs-justify-center sm-ml2 ' + (key === 0 ? 'mt3 ' : '')}><IconStyle style={{ borderRadius: 4, backgroundColor: '#284CEB' }} coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div>
                                    : <div className={'pointer col col-2 sm-col-6 sm-ml2 px1 flex items-center xs-justify-center' + (key === 0 ? ' mt3 ' : '')} ><IconStyle onClick={() => { var newList = newPricePreset.prices.filter((item, index) => { return index !== key }); setNewPricePreset({ ...newPricePreset, prices: newList }) }} >close</IconStyle></div>
                            }
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div key='pricePresetPriceSection' className='col col-12 flex items-center mb2'>
                    <div className='col sm-col-12 col-12 clearfix flex'>
                        <Input className="col sm-col-3 col-5 pr1" value={newPricePreset.price.toString()} onChange={(event) => setNewPricePreset({...newPricePreset, price: parseInt(event.currentTarget.value)})} label='Price' />
                        <DropdownSingle className='col sm-col-3 col-5 pl1 mt-auto' callback={(item: DropdownSingleListItem) => setNewPricePreset({...newPricePreset, currency: item.title})} id='pricePresetCurrencyDropdown' dropdownTitle='' dropdownDefaultSelect={newPricePreset.currency} list={currencyDropdownList} />
                    </div>
                </div>
            )
        }

    }

    let startTimestamp = moment.tz((newPricePreset.settings.startDate && newPricePreset.settings.startDate > 0 ? newPricePreset.settings.startDate : Math.floor(Date.now() / 1000))*1000, moment.tz.guess())

    const [startDay, setStartDay] = React.useState<number>(startTimestamp.clone().startOf('day').valueOf()/1000)
    const [startTime, setStartTime] = React.useState<number>(startTimestamp.clone().valueOf()/1000 - startTimestamp.clone().startOf('day').valueOf()/1000)


    const handleSubmit = () => {
        setButtonLoading(true)

        let startDate = moment.utc((startDay + startTime)*1000).valueOf()/1000
        let savedPrice = {...newPricePreset, settings: {...newPricePreset.settings, startDate: startDate}}

        if (savePreset) { 
            props.savePresetGlobally(savedPrice) 
        }
        props.action(savedPrice, props.contentId, props.contentType)
        .then(() => {
            props.fetchContentPrices(props.contentId, props.contentType)
            .then(() => {
                setButtonLoading(false)
                props.toggle(false)
            })
        }).catch(() => {
            setButtonLoading(false)
        })
    }

    return (
        <div>
           { 
                !props.preset &&
                <PresetSelectRow className='col col-12 mb2'>
                    <DropdownSingle
                        id='pricePresetSelectDropdown'
                        className='col col-6'
                        dropdownTitle='Preset'
                        dropdownDefaultSelect='Custom Price'
                        list={props.presetList ? presetDropdownList : []}
                        callback={(item: DropdownSingleListItem) => { return setNewPricePreset(props.presetList.find(preset => preset.name === item.title)); }}
                    />
                    {
                        newPricePreset.id === "custom" &&
                            <InputCheckbox className="ml2 mt-auto" id='pricePresetSaveCheckbox' label='Save as Price Preset' defaultChecked={savePreset} onChange={() => setSavePreset(!savePreset)} />
                    }

                </PresetSelectRow>
            }
            <div className='col col-12 clearfix'>
                {(savePreset && newPricePreset.id === 'custom') &&
                    <Input className='col mb2 col-12 sm-col-6 sm-pr1' label='Preset Name' onChange={(event) => setNewPricePreset({ ...newPricePreset, name: event.currentTarget.value })} />
                }

                <DropdownSingle
                    id='pricePresetTypeDropdown'
                    className={'col col-12 sm-col-6 mb2 ' + (savePreset && newPricePreset.id === 'custom' ? 'sm-pl1' : '')}
                    dropdownTitle='Preset Type'
                    dropdownDefaultSelect={newPricePreset.priceType}
                    list={presetTypeDropdownList}
                    callback={(item: DropdownSingleListItem) => setNewPricePreset({ ...newPricePreset, priceType: item.title, settings:{...newPricePreset.settings, startMethod: item.title === 'Subscription' ? 'Upon Purchase' : newPricePreset.settings.startMethod, recurrence: item.title == 'Pay Per View' ? null: {unit: 'Weekly'}, duration: item.title === 'Pay Per View' ? {value: NaN, unit: 'Hours'} : null }})}
                />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    newPricePreset.priceType === 'Subscription' ?
                        <DropdownSingle
                            id='pricePresetRecurrenceDropdown' 
                            dropdownDefaultSelect={newPricePreset.settings.recurrence ? newPricePreset.settings.recurrence.unit : 'Weekly'} 
                            dropdownTitle='Recurrence'
                            list={recurrenceDropdownList}
                            callback={(item: DropdownSingleListItem) => setNewPricePreset({...newPricePreset, settings:{...newPricePreset.settings, recurrence: {unit: item.title}}})}

                        />
                        :
                        <>
                            <Input
                                className='col col-6 pr1'
                                label='Duration'
                                defaultValue={newPricePreset.settings.duration.value ? newPricePreset.settings.duration.value.toString() : ''} 
                                onChange={(event) => setNewPricePreset({ ...newPricePreset, settings:{ ...newPricePreset.settings, duration: { ...newPricePreset.settings.duration, value: parseInt(event.currentTarget.value) }} })}
                            />
                            <DropdownSingle
                                id='pricePresetDurationDropdown' 
                                className='col col-6 pl1 mt-auto' 
                                dropdownDefaultSelect={newPricePreset.settings.duration.unit} 
                                callback={(item: DropdownSingleListItem) => setNewPricePreset({ ...newPricePreset, settings:{...newPricePreset.settings, duration: { ...newPricePreset.settings.duration, unit: item.title }}})} 
                                dropdownTitle=''
                                list={durationDropdownList}
                            />
                        </>
                }

            </div>
            <div className='col col-12 mb2'>
                <DropdownSingle
                    id='pricePresetStartMethodDropdown' 
                    dropdownDefaultSelect={newPricePreset.settings.startMethod} 
                    className={ClassHalfXsFullMd + ' pr1'}
                    callback={(item: DropdownSingleListItem) => setNewPricePreset({ ...newPricePreset, settings:{...newPricePreset.settings, startMethod: item.title }})}
                    list={startMethodDropdownList} dropdownTitle='Start Method'
                    disabled={newPricePreset.priceType === 'Subscription'}
                />
                {
                    (newPricePreset.settings.startMethod === 'Schedule' && newPricePreset.priceType === 'Pay Per View') &&
                        <DropdownSingle
                            hasSearch
                            id='pricePresetTimezoneDropdown'
                            className={ClassHalfXsFullMd + ' px1'}
                            dropdownTitle='Timezone'
                            callback={(item: DropdownSingleListItem) => setNewPricePreset({...newPricePreset, settings: {...newPricePreset.settings, timezone: item.title.split(' ')[0]}})} 
                            dropdownDefaultSelect={moment.tz.guess() + ' (' + moment.tz(moment.tz.guess()).format('Z z') + ')'}
                            list={timezoneDropdownList}
                        />
                }
            </div>
            {
                (newPricePreset.settings.startMethod === 'Schedule' && newPricePreset.priceType === 'Pay Per View') &&
                    <div className='col col-12 mb2'>
                        <DateSinglePickerWrapper
                            date={moment.utc((startDay + startTime)*1000).tz(newPricePreset.settings.timezone || moment.tz.guess())}
                            callback={(_, timestamp: string) => setStartDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((startDay + startTime)*1000).tz(newPricePreset.settings.timezone || moment.tz.guess()).format('HH:mm')}
                            onChange={(event) => setStartTime(inputTimeToTs(event.currentTarget.value, newPricePreset.settings.timezone || 'UTC'))}
                            className='col col-6 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </div>
            }
            <div className='col col-12 mt3'>
                <Button
                    isLoading={buttonLoading}
                    disabled={(!newPricePreset.name && newPricePreset.id === 'custom' && savePreset) || (newPricePreset.priceType === 'Pay Per View' && Number.isNaN(newPricePreset.settings.duration.value)) || (!props.preset && newPricePreset.prices.some(price => Number.isNaN(price.value)&& Number.isNaN(newPricePreset.price)))}
                    onClick={() => handleSubmit()} className='mr2'
                    typeButton='primary'
                    sizeButton='large'
                    buttonColor='blue'
                >
                {props.preset ? "Save" : "Create"}
                </Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}

const PresetSelectRow = styled.div`
    display: flex;
    align-items: center;
`