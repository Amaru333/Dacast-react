import React from 'react';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Preset } from '../../redux-flow/store/Paywall/Presets/types';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
import { ClassHalfXsFullMd } from '../General/GeneralStyle';

var moment = require('moment-timezone');

const pricesList = [
    {
        value: NaN,
        currency: 'USD'
    }
]

const defaultPreset: Preset = {
    id: '-1',
    name: '',
    type: 'Pay Per View',
    prices: pricesList,
    settings: {
        duration: { value: NaN, unit: 'Hours' },
        recurrence: {recurrence: 'Weekly'},
        startMethod: 'Upon Purchase',
        timezone: null,
        startDate: null,
        startTime: '00:00'
    }
}

export const ContentPricePresetsModal = (props: {contentId: string; action: Function; toggle: Function; preset: Preset; presetList: Preset[]; savePresetGlobally: Function }) => {

    const [newPricePreset, setNewPricePreset] = React.useState<Preset>(defaultPreset);
    const [savePreset, setSavePreset] = React.useState<boolean>(false)

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = newPricePreset.prices;
        if (inputChange === 'value') {
            tempPrices[key].value = parseInt(value);
        }
        else {
            tempPrices[key].currency = value;
        }
        setNewPricePreset({ ...newPricePreset, prices: tempPrices });
    }

    const renderPrices = () => {
        return newPricePreset.prices.map((price, key) => {
            return (
                <div key={'pricePresetPriceSection' + key} className={'col col-12 flex items-center ' + (key === newPricePreset.prices.length - 1 ? '' : 'mb2')}>
                    <div className='col sm-col-12 col-12 clearfix flex'>
                        <Input className={"col sm-col-3 col-5 pr1"} value={price.value > 0 ? price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'value')} label={key === 0 ? 'Price' : ''} />
                        <DropdownSingle className={'col sm-col-3 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'pricePresetCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={{ 'USD': false, 'AUD': false, 'GBP': false }} />
                        {
                            key === newPricePreset.prices.length - 1 ?
                                <div onClick={() => setNewPricePreset({ ...newPricePreset, prices: [...newPricePreset.prices, { value: NaN, currency: 'USD' }] })} className={'pointer col col-2 sm-col-6 px1 flex items-center xs-justify-center sm-ml2 ' + (key === 0 ? 'mt3 ' : '')}><IconStyle style={{ borderRadius: 4, backgroundColor: '#284CEB' }} coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div>
                                : <div className={'pointer col col-2 sm-col-6 sm-ml2 px1 flex items-center xs-justify-center' + (key === 0 ? ' mt3 ' : '')} ><IconStyle onClick={() => { var newList = newPricePreset.prices.filter((item, index) => { return index !== key }); setNewPricePreset({ ...newPricePreset, prices: newList }) }} >close</IconStyle></div>
                        }
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <PresetSelectRow className='col col-12 mb2'>
                <DropdownSingle
                    id='pricePresetSelectDropdown'
                    className='col col-6'
                    dropdownTitle='Preset'
                    dropdownDefaultSelect='Custom Price'
                    list={props.presetList ? props.presetList.reduce((reduced: DropdownListType, preset: Preset) => { return { ...reduced, [preset.name]: false } }, {}) : {}}
                    callback={(selectedPreset: string) => { return setNewPricePreset(props.presetList.find(preset => preset.name === selectedPreset)); }}
                />
                {
                    newPricePreset.id === "custom" ?
                        <InputCheckbox className="ml2 mt-auto" id='pricePresetSaveCheckbox' label='Save as Price Preset' defaultChecked={savePreset} onChange={() => setSavePreset(!savePreset)} />
                        : null
                }

            </PresetSelectRow>
            <div className='col col-12 clearfix'>
                {savePreset && newPricePreset.id === 'custom' ?
                    <Input className='col mb2 col-12 sm-col-6 sm-pr1' label='Preset Name' onChange={(event) => setNewPricePreset({ ...newPricePreset, name: event.currentTarget.value })} /> : null
                }

                <DropdownSingle
                    id='pricePresetTypeDropdown'
                    className={'col col-12 sm-col-6 mb2 ' + (savePreset && newPricePreset.id === 'custom' ? 'sm-pl1' : '')}
                    dropdownTitle='Preset Type'
                    dropdownDefaultSelect={newPricePreset.type}
                    list={{ 'Pay Per View': false, 'Subscription': false }}
                    callback={(value: string) => setNewPricePreset({ ...newPricePreset, type: value, settings:{...newPricePreset.settings, startMethod: value === 'Subscription' ? 'Upon Purchase' : newPricePreset.settings.startMethod }})}
                />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    newPricePreset.type === 'Subscription' ?
                        <DropdownSingle
                            id='pricePresetRecurrenceDropdown' dropdownDefaultSelect={newPricePreset.settings.recurrence.recurrence} dropdownTitle='Recurrence'
                            list={{ 'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false }}
                        />
                        :
                        <>
                            <Input
                                className='col col-6 pr1'
                                label='Duration'
                                defaultValue={newPricePreset.settings.duration.value ? newPricePreset.settings.duration.value.toString() : ''} onChange={(event) => setNewPricePreset({ ...newPricePreset, settings:{ ...newPricePreset.settings, duration: { ...newPricePreset.settings.duration, value: parseInt(event.currentTarget.value) }} })}
                            />
                            <DropdownSingle
                                id='pricePresetDurationDropdown' className='col col-6 pl1 mt-auto' dropdownDefaultSelect={newPricePreset.settings.duration.unit} callback={(value: string) => setNewPricePreset({ ...newPricePreset, settings:{...newPricePreset.settings, duration: { ...newPricePreset.settings.duration, unit: value }}})} dropdownTitle=''
                                list={{ 'Hours': false, 'Days': false, 'Weeks': false, 'Month': false }}
                            />
                        </>
                }

            </div>
            <div className='col col-12 mb2'>
                <DropdownSingle
                    id='pricePresetStartMethodDropdown' dropdownDefaultSelect={newPricePreset.settings.startMethod} className={ClassHalfXsFullMd + ' pr1'}
                    callback={(value: string) => setNewPricePreset({ ...newPricePreset, settings:{...newPricePreset.settings, startMethod: value }})}
                    list={{ 'Upon Purchase': false, 'Schedule': false }} dropdownTitle='Start Method'
                    disabled={newPricePreset.type === 'Subscription'}
                />
                {
                    newPricePreset.settings.startMethod === 'Schedule' && newPricePreset.type === 'Pay Per View' ?
                        <DropdownSingle
                            hasSearch
                            id='pricePresetTimezoneDropdown'
                            className={ClassHalfXsFullMd + ' px1'}
                            dropdownTitle='Timezone'
                            dropdownDefaultSelect={moment.tz.guess() + ' (' + moment.tz(moment.tz.guess()).format('Z z') + ')'}
                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => { return { ...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false } }, {})}
                        />
                        : null
                }
            </div>
            {
                newPricePreset.settings.startMethod === 'Schedule' && newPricePreset.type === 'Pay Per View' ?
                    <div className='col col-12 mb2'>
                        <DateSinglePickerWrapper date={moment()} openDirection="up" className='col col-8 pr1' datepickerTitle='Start Date' />
                        <Input className='col col-4 pl1' type='time' defaultValue={newPricePreset.settings.startTime} label='Start Time' />
                    </div>
                    : null
            }
            <div className='col col-12 mt3'>
                <Button
                    disabled={!newPricePreset.name || (newPricePreset.type === 'Pay Per View' && Number.isNaN(newPricePreset.settings.duration.value)) || newPricePreset.prices.some(price => Number.isNaN(price.value))}
                    onClick={() => { if (savePreset) { props.savePresetGlobally(newPricePreset) }; props.action(newPricePreset, props.contentId); props.toggle(false) }} className='mr2'
                    typeButton='primary'
                    sizeButton='large'
                    buttonColor='blue'>
                    Create
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