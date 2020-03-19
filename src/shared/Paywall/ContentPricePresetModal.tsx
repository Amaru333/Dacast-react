import React from 'react';
import {Input} from '../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Preset } from '../../redux-flow/store/Paywall/Presets/types';
import { DropdownListType } from '../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { IconStyle } from '../../shared/Common/Icon';
import { Text } from '../../components/Typography/Text';

export const ContentPricePresetsModal = () => {
    return (
        <div>
            <div className='col col-12 py1'>
                <Input className='col col-6 pr1' label='Preset Name' />
                <DropdownSingle id='pricePresetTypeDropdown' className='col col-6 pl1' dropdownTitle='Preset Type' list={{'Pay Per View': false, 'Subscription': false}} />
            </div>
            {renderPrices()}
            <div className='col col-6 py1'>
                {
                    presetsList.type === 'Subscription' ?
                        <DropdownSingle id='pricePresetRecurrenceDropdown' dropdownDefaultSelect={presetsList.recurrence} dropdownTitle='Recurrence' list={{'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false}} />
                        :
                        <>
                            <Input className='col col-6 pr1' label='Duration' defaultValue={presetsList.duration.amount ? presetsList.duration.amount.toString() : ''} onChange={(event) => setPresetsList({...presetsList, duration: {...presetsList.duration, amount: parseInt(event.currentTarget.value)}})} />
                            <DropdownSingle id='pricePresetDurationDropdown' className='col col-6 px1 mt25' dropdownDefaultSelect={presetsList.duration.type} callback={(value: string) => setPresetsList({...presetsList, duration: {...presetsList.duration, type: value}})} dropdownTitle='' list={{'Hours': false, 'Days': false, 'Weeks': false, 'Month': false}} />
                        </>
                }

            </div>
            <div className='col col-12 py1'>
                <DropdownSingle id='pricePresetStartMethodDropdown' dropdownDefaultSelect={presetsList.startMethod} className='col col-6 pr1' callback={(value: string) => setPresetsList({...presetsList, startMethod: value})} list={{'Upon Purchase': false, 'Schedule': false}} dropdownTitle='Start Method' disabled={presetsList.type === 'Subscription'}/>
                {
                    presetsList.startMethod === 'Schedule' && presetsList.type === 'Pay Per View' ?
                        <DropdownSingle 
                            hasSearch 
                            id='pricePresetTimezoneDropdown' 
                            className='col col-6 px1' 
                            dropdownTitle='Timezone' 
                            dropdownDefaultSelect={moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')'}
                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} 
                            
                        />
                        : null
                }
            </div>
            {  
                presetsList.startMethod === 'Schedule' && presetsList.type === 'Pay Per View' ?  
                    <div className='col col-12 py1'>
                        <DateSinglePickerWrapper className='col col-6 pr1' datepickerTitle='Start Date' />
                        <Input className='col col-3 pl1' type='time' defaultValue={presetsList.startTime} label='Start Time' />
                    </div>
                    : null
            }
            <div className='col col-12 mt3'>
                <Button disabled={!presetsList.name || (presetsList.type === 'Pay Per View' && Number.isNaN(presetsList.duration.amount)) || presetsList.price.some(price => Number.isNaN(price.amount))} onClick={() => {props.action(presetsList);props.toggle(false)}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}