import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Preset } from '../../../redux-flow/store/Paywall/Presets/types';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';

var moment = require('moment-timezone');

const pricesList = [
    {
        amount: NaN,
        currency: 'USD'
    }
]

const defaultPreset: Preset = {
    id: '-1',
    name: '',
    type: 'Pay Per View',
    price: pricesList,
    duration: {amount: NaN, type: 'Hours'},
    recurrence: 'Weekly',
    startMethod: 'Upon Purchase',
    timezone: null,
    startDate: null,
    startTime: '00:00'

}

export const PricePresetsModal = (props: {action: Function; toggle: Function; preset: Preset}) => {

    const [presetsList, setPresetsList] = React.useState<Preset>(props.preset ? props.preset : defaultPreset);

    React.useEffect(() => {
        setPresetsList(props.preset ? props.preset : defaultPreset);
    }, [props.preset])

    React.useEffect(() => {        console.log(presetsList)}, [presetsList])

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

    const renderPrices = () => {
        return presetsList.price.map((price, key) => {
            return( 
                <div key={'pricePresetPriceSection' + key} className='col col-12 py1 flex items-center'>
                    <div className='col col-6'>
                        <Input className='col col-6 pr1' defaultValue={price.amount > 0 ? price.amount.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')}label={key === 0 ? 'Price' : ''} /> 
                        <DropdownSingle className={key === 0 ? 'col col-6 px1 mt25' : 'col col-6 px1 mb1'} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'pricePresetCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={{'USD': false, 'AUD': false, 'GBP': false}} />
                    </div>

                    {
                        key === presetsList.price.length - 1 ? 
                            <div onClick={() => setPresetsList({...presetsList, price: [...presetsList.price, {amount: NaN, currency: 'USD'}]})} className={'pointer col col-5 mx1 flex' + (key === 0 ? ' mt3' : '')}><IconStyle style={{borderRadius: 4, backgroundColor:'#284CEB'}}coloricon='white'>add_box</IconStyle><Text className='pl1' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div> 
                            : <IconStyle onClick={() => setPresetsList({...presetsList, price: presetsList.price.filter((item, index) => {return index !== key})})} className={key === 0 ? 'px1 pt3' : 'px1'}>close</IconStyle>
                    }
                </div>
            )
        })
    }

    return (
        <div>
            <div className='col col-12 py1'>
                <Input className='col col-6 pr1' label='Preset Name' defaultValue={presetsList.name} onChange={(event) => setPresetsList({...presetsList, name: event.currentTarget.value})} />
                <DropdownSingle id='pricePresetTypeDropdown' className='col col-6 pl1' dropdownTitle='Preset Type' dropdownDefaultSelect={presetsList.type} callback={(value: string) => setPresetsList({...presetsList, type: value, startMethod: value === 'Subscription' ? 'Upon Purchase' : presetsList.startMethod})} list={{'Pay Per View': false, 'Subscription': false}} />
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