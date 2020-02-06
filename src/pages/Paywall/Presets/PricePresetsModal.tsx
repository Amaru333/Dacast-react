import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { Preset } from '../../../redux-flow/store/Paywall/Presets/types';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePicker } from '../../../components/FormsComponents/Datepicker/DateSinglePicker';

var moment = require('moment-timezone');

const pricesList = [
    {
        amount: 90,
        currency: 'USD'
    }
]

const defaultPreset: Preset = {
    id: '-1',
    name: '',
    type: 'Subscription',
    price: pricesList,
    duration: {amount: 90, type: 'Hours'},
    recurrence: 'Weekly',
    startMethod: 'Upon Purchase',
    timezone: null,
    startDate: null,
    startTime: null

}

export const PricePresetsModal = (props: {action: Function; toggle: Function; preset: Preset}) => {

    const [presetsList, setPresetsList] = React.useState<Preset>(props.preset ? props.preset : defaultPreset);

    React.useEffect(() => {
        setPresetsList(props.preset ? props.preset : defaultPreset);
    }, [props.preset])

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = presetsList.price;
        if(inputChange === 'amount') {
            tempPrices[key].amount = parseInt(value);
        }
        else {
            tempPrices[key].currency = value;
        }
        setPresetsList({...presetsList, price: tempPrices});
    }   

    React.useEffect(() => {
        console.log(presetsList.price.length);
    }, [presetsList.price])

    const renderPrices = () => {
        return presetsList.price.map((price, key) => {
            return( 
                <div key={'pricePresetPriceSection' + key} className='col col-9 py1 flex items-center'>
                    <Input className='col col-4 pr1' defaultValue={price.amount.toString()} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')}label={key === 0 ? 'Price' : ''} /> 
                    <DropdownSingle className={key === 0 ? 'col col-4 pl1 mt3' : 'col col-4 pl1'} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'pricePresetCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={{'USD': false, 'AUD': false, 'GBP': false}} />
                    {
                        key === presetsList.price.length - 1 ? 
                            <Button onClick={() => setPresetsList({...presetsList, price: [...presetsList.price, {amount: 90, currency: 'USD'}]})} className='mx2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>+</Button> 
                            : <Icon onClick={() => setPresetsList({...presetsList, price: presetsList.price.filter((item, index) => {return index !== key})})} className={key === 0 ? 'px2 pt3' : 'px2'}>close</Icon>
                    }
                </div>
            )
        })
    }

    return (
        <div>
            <div className='col col-12 py2'>
                <Input className='col col-6 pr1' label='Preset Name' defaultValue={presetsList.name} onChange={(event) => setPresetsList({...presetsList, name: event.currentTarget.value})} />
                <DropdownSingle id='pricePresetTypeDropdown' className='col col-6 pl1 mt1' dropdownTitle='Preset Type' dropdownDefaultSelect={presetsList.type} callback={(value: string) => setPresetsList({...presetsList, type: value})} list={{'Subscription': false, 'Pay Per View': false}} />
            </div>
            {renderPrices()}
            <div className='col col-6 py2'>
                {
                    presetsList.type === 'Subscription' ?
                        <DropdownSingle id='pricePresetRecurrenceDropdown' dropdownDefaultSelect={presetsList.recurrence} dropdownTitle='Recurrence' list={{'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false}} />
                        :
                        <>
                            <Input className='col col-6 pr1' label='Duration' defaultValue={presetsList.duration.amount.toString()} onChange={(event) => setPresetsList({...presetsList, duration: {...presetsList.duration, amount: parseInt(event.currentTarget.value)}})} />
                            <DropdownSingle id='pricePresetDurationDropdown' className='col col-6 pl1 mt3' dropdownDefaultSelect={presetsList.duration.type} callback={(value: string) => setPresetsList({...presetsList, duration: {...presetsList.duration, type: value}})} dropdownTitle='' list={{'Hours': false, 'Days': false, 'Weeks': false, 'Month': false}} />
                        </>
                }

            </div>
            <div className='col col-12 py2'>
                <DropdownSingle id='pricePresetStartMethodDropdown' dropdownDefaultSelect={presetsList.startMethod} className='col col-6 pr1' callback={(value: string) => setPresetsList({...presetsList, startMethod: value})} list={{'Upon Purchase': false, 'Schedule': false}} dropdownTitle='Start Method' />
                {
                    presetsList.startMethod === 'Schedule' && presetsList.type === 'Pay Per View' ?
                        <DropdownSingle hasSearch id='pricePresetTimezoneDropdown' className='col col-6 pl1' dropdownTitle='Timezone' list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} />
                        : null
                }
            </div>
            {  
                presetsList.startMethod === 'Schedule' && presetsList.type === 'Pay Per View' ?  
                    <div className='col col-12 py2'>
                        <DateSinglePicker className='col col-6 pr1' DatepickerTitle='Start Date' />
                        <Input className='col col-3 pl1' type='time' label='Start Time' />
                    </div>
                    : null
            }
            <div className='col col-12 py2'>
                <Button onClick={() => {props.action(presetsList);props.toggle(false)}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}