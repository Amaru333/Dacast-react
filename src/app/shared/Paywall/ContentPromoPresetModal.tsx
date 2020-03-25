import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../..//components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../..//components/FormsComponents/Button/Button';
import { DropdownListType } from '../../..//components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../..//components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Text } from '../../..//components/Typography/Text';
import { Promo } from '../../redux-flow/store/Paywall/Presets/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
var moment = require('moment-timezone');

const defaultPromo: Promo = {
    id: '-1',
    name: '',
    alphanumericCode: '',
    discount: NaN,
    limit: NaN,
    rateType: 'Pay Per View',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    timezone: moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')',
    discountApplied: 'Once'
}

export const ContentPromoPresetsModal = (props: {action: Function; toggle: Function; promo: Promo, presetList: Promo[]; savePresetGlobally: Function;}) => {

    const [newPromoPreset, setNewPromoPreset] = React.useState<Promo>(defaultPromo);
    const [savePreset, setSavePreset] = React.useState<boolean>(false)

    return (
        <div>
            <PresetSelectRow className='col col-12 py1'>
                <DropdownSingle 
                    id='pricePresetSelectDropdown' 
                    className='col col-6' 
                    dropdownTitle='Preset' 
                    list={props.presetList ? props.presetList.reduce((reduced: DropdownListType, preset: Promo)=> {return {...reduced, [preset.name]: false }},{}) : {}} 
                    callback={(selectedPreset: string) => {return setNewPromoPreset(props.presetList.find(preset => preset.name === selectedPreset));}}
                />
                {
                    newPromoPreset.id === "custom" ?
                    <InputCheckbox  className="ml2 mt25" id='pricePresetSaveCheckbox' label='Save as Promo Preset' onChange={() => setSavePreset(!savePreset)} />
                    : null
                }
               
            </PresetSelectRow>
            <div className='col col-12 py1'>
                { savePreset ? 
                    <Input className='col col-6 pr1' value={newPromoPreset.name} label='Preset name' onChange={(event) => setNewPromoPreset({...newPromoPreset, name: event.currentTarget.value})} /> : null
                }
                
                <Input className='col col-6 pl1' value={newPromoPreset.alphanumericCode} label='Alphanumeric Code' onChange={(event) => setNewPromoPreset({...newPromoPreset, alphanumericCode: event.currentTarget.value})} />
            </div>
            <div className='col col-12 py1'>
                <Input className='col col-3 pr1' value={newPromoPreset.discount ? newPromoPreset.discount.toString() : ''} label='Discount' onChange={(event) => setNewPromoPreset({...newPromoPreset, discount: parseInt(event.currentTarget.value)})} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col col-3 px1' value={newPromoPreset.limit ? newPromoPreset.limit.toString() : ''} label='Limit' onChange={(event) => setNewPromoPreset({...newPromoPreset, limit: parseInt(event.currentTarget.value)})} />
                <DropdownSingle id='newPromoPresetRateTypeDropdown' dropdownDefaultSelect={newPromoPreset.rateType} className='col col-6 pl1' dropdownTitle='Rate Type' callback={(value: string) => setNewPromoPreset({...newPromoPreset, rateType: value})} list={{'Pay Per View': false, 'Subscription': false}} />
            </div>
            <div className='col col-12 py1'>
                <DateSinglePickerWrapper className='col col-6 pr1' datepickerTitle='Promo Code Start Date' />
                <Input type='time' label='Start Time' value={newPromoPreset.startTime} className='col col-3 pl1' onChange={(event) => setNewPromoPreset({...newPromoPreset, startTime: event.currentTarget.value})} />
            </div>
            <div className='col col-12 py1'>
                <DateSinglePickerWrapper className='col col-6 pr1' datepickerTitle='Promo Code End Date' />
                <Input type='time' label='End Time' value={newPromoPreset.endTime} className='col col-3 pl1' onChange={(event) => setNewPromoPreset({...newPromoPreset, endTime: event.currentTarget.value})} />
            </div>
            <div className=' col col-12 py1'>
                <DropdownSingle hasSearch id='newPromoPresetTimezoneDropdown' dropdownDefaultSelect={newPromoPreset.timezone ? newPromoPreset.timezone : moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')'} className='col col-6 pr1' dropdownTitle='Timezone' callback={(value: string) => setNewPromoPreset({...newPromoPreset, timezone: value})} list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} />
                {
                    newPromoPreset.rateType === 'Subscription' ? 
                        <DropdownSingle id='newPromoPresetDiscountAppliedDropdown' dropdownDefaultSelect={newPromoPreset.discountApplied} className='col col-6 pl1' dropdownTitle='Discount Applied' callback={(value: string) => setNewPromoPreset({...newPromoPreset, discountApplied: value})} list={{'Once': false, 'Forever': false}} />
                        : null
                }
            </div>
            <div className='col col-12 my2'>
                <Button 
                disabled={!newPromoPreset.name || Number.isNaN(newPromoPreset.discount) || newPromoPreset.alphanumericCode.length < 5 || Number.isNaN(newPromoPreset.limit)} 
                onClick={() => {if (savePreset) {props.savePresetGlobally(newPromoPreset)}; props.action(newPromoPreset);props.toggle(false)}}
                className='mr2' 
                typeButton='primary' 
                sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}

const PresetSelectRow = styled.div`
    display: flex;
    align-items: center;
`