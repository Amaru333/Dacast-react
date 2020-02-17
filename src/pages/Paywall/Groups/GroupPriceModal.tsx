import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePicker } from '../../../components/FormsComponents/Datepicker/DateSinglePicker';
import { GroupPrice } from '../../../redux-flow/store/Paywall/Groups';

var moment = require('moment-timezone');

const pricesList = [
    {
        amount: 90,
        currency: 'USD'
    }
]

const defaultPrice: GroupPrice = {
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

export const GroupPriceModal = (props: {action: Function; toggle: Function; groupPrice: GroupPrice}) => {

    const [pricesList, setPricesList] = React.useState<GroupPrice>(props.groupPrice ? props.groupPrice : defaultPrice);

    React.useEffect(() => {
        setPricesList(props.groupPrice ? props.groupPrice : defaultPrice);
    }, [props.groupPrice])

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = pricesList.price;
        if(inputChange === 'amount') {
            tempPrices[key].amount = parseInt(value);
        }
        else {
            tempPrices[key].currency = value;
        }
        setPricesList({...pricesList, price: tempPrices});
    }   

    React.useEffect(() => {
        console.log(pricesList.price.length);
    }, [pricesList.price])

    const renderPrices = () => {
        return pricesList.price.map((price, key) => {
            return( 
                <div key={'groupPriceSection' + key} className='col col-9 py1 flex items-center'>
                    <Input className='col col-4 pr1' defaultValue={price.amount.toString()} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')}label={key === 0 ? 'Price' : ''} /> 
                    <DropdownSingle className={key === 0 ? 'col col-4 pl1 mt3' : 'col col-4 pl1'} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'groupPriceCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={{'USD': false, 'AUD': false, 'GBP': false}} />
                    {
                        key === pricesList.price.length - 1 ? 
                            <Button onClick={() => setPricesList({...pricesList, price: [...pricesList.price, {amount: 90, currency: 'USD'}]})} className='mx2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>+</Button> 
                            : <Icon onClick={() => setPricesList({...pricesList, price: pricesList.price.filter((item, index) => {return index !== key})})} className={key === 0 ? 'px2 pt3' : 'px2'}>close</Icon>
                    }
                </div>
            )
        })
    }

    return (
        <div>
            <div className='col col-12 py2'>
                <Input className='col col-6 pr1' label='Price Group Name' defaultValue={pricesList.name} onChange={(event) => setPricesList({...pricesList, name: event.currentTarget.value})} />
                <DropdownSingle id='groupPriceTypeDropdown' className='col col-6 pl1 mt1' dropdownTitle='Preset Type' dropdownDefaultSelect={pricesList.type} callback={(value: string) => setPricesList({...pricesList, type: value})} list={{'Subscription': false, 'Pay Per View': false}} />
            </div>
            {renderPrices()}
            <div className='col col-6 py2'>
                {
                    pricesList.type === 'Subscription' ?
                        <DropdownSingle id='groupPriceRecurrenceDropdown' dropdownDefaultSelect={pricesList.recurrence} dropdownTitle='Recurrence' list={{'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false}} />
                        :
                        <>
                            <Input className='col col-6 pr1' label='Duration' defaultValue={pricesList.duration.amount.toString()} onChange={(event) => setPricesList({...pricesList, duration: {...pricesList.duration, amount: parseInt(event.currentTarget.value)}})} />
                            <DropdownSingle id='groupPriceDurationDropdown' className='col col-6 pl1 mt3' dropdownDefaultSelect={pricesList.duration.type} callback={(value: string) => setPricesList({...pricesList, duration: {...pricesList.duration, type: value}})} dropdownTitle='' list={{'Hours': false, 'Days': false, 'Weeks': false, 'Month': false}} />
                        </>
                }

            </div>
            <div className='col col-12 py2'>
                <DropdownSingle id='groupPriceStartMethodDropdown' dropdownDefaultSelect={pricesList.startMethod} className='col col-6 pr1' callback={(value: string) => setPricesList({...pricesList, startMethod: value})} list={{'Upon Purchase': false, 'Schedule': false}} dropdownTitle='Start Method' />
                {
                    pricesList.startMethod === 'Schedule' && pricesList.type === 'Pay Per View' ?
                        <DropdownSingle hasSearch id='groupPriceTimezoneDropdown' className='col col-6 pl1' dropdownTitle='Timezone' list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} />
                        : null
                }
            </div>
            {  
                pricesList.startMethod === 'Schedule' && pricesList.type === 'Pay Per View' ?  
                    <div className='col col-12 py2'>
                        <DateSinglePicker className='col col-6 pr1' DatepickerTitle='Start Date' />
                        <Input className='col col-3 pl1' type='time' label='Start Time' />
                    </div>
                    : null
            }
            <div className='col col-12 py2'>
                <Button onClick={() => {props.action(pricesList);props.toggle(false)}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}