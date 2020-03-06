import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Text } from '../../../components/Typography/Text';
import { Promo } from '../../../redux-flow/store/Paywall/Presets/types';
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

export const PromoPresetsModal = (props: {action: Function; toggle: Function; promo: Promo}) => {

    const [promoPreset, setPromoPreset] = React.useState<Promo>(props.promo ? props.promo : defaultPromo);

    React.useEffect(() => {
        setPromoPreset(props.promo ? props.promo : defaultPromo);
    }, [props.promo])

    return (
        <div>
            <div className='col col-12 py1'>
                <Input className='col col-6 pr1' value={promoPreset.name} label='Preset name' onChange={(event) => setPromoPreset({...promoPreset, name: event.currentTarget.value})} />
                <Input className='col col-6 pl1' value={promoPreset.alphanumericCode} label='Alphanumeric Code' onChange={(event) => setPromoPreset({...promoPreset, alphanumericCode: event.currentTarget.value})} />
            </div>
            <div className='col col-12 py1'>
                <Input className='col col-3 pr1' value={promoPreset.discount ? promoPreset.discount.toString() : ''} label='Discount' onChange={(event) => setPromoPreset({...promoPreset, discount: parseInt(event.currentTarget.value)})} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col col-3 px1' value={promoPreset.limit ? promoPreset.limit.toString() : ''} label='Limit' onChange={(event) => setPromoPreset({...promoPreset, limit: parseInt(event.currentTarget.value)})} />
                <DropdownSingle id='promoPresetRateTypeDropdown' dropdownDefaultSelect={promoPreset.rateType} className='col col-6 pl1' dropdownTitle='Rate Type' callback={(value: string) => setPromoPreset({...promoPreset, rateType: value})} list={{'Pay Per View': false, 'Subscription': false}} />
            </div>
            <div className='col col-12 py1'>
                <DateSinglePickerWrapper className='col col-6 pr1' datepickerTitle='Promo Code Start Date' />
                <Input type='time' label='Start Time' value={promoPreset.startTime} className='col col-3 pl1' onChange={(event) => setPromoPreset({...promoPreset, startTime: event.currentTarget.value})} />
            </div>
            <div className='col col-12 py1'>
                <DateSinglePickerWrapper className='col col-6 pr1' datepickerTitle='Promo Code End Date' />
                <Input type='time' label='End Time' value={promoPreset.endTime} className='col col-3 pl1' onChange={(event) => setPromoPreset({...promoPreset, endTime: event.currentTarget.value})} />
            </div>
            <div className=' col col-12 py1'>
                <DropdownSingle hasSearch id='promoPresetTimezoneDropdown' dropdownDefaultSelect={promoPreset.timezone ? promoPreset.timezone : moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')'} className='col col-6 pr1' dropdownTitle='Timezone' callback={(value: string) => setPromoPreset({...promoPreset, timezone: value})} list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} />
                {
                    promoPreset.rateType === 'Subscription' ? 
                        <DropdownSingle id='promoPresetDiscountAppliedDropdown' dropdownDefaultSelect={promoPreset.discountApplied} className='col col-6 pl1' dropdownTitle='Discount Applied' callback={(value: string) => setPromoPreset({...promoPreset, discountApplied: value})} list={{'Once': false, 'Forever': false}} />
                        : null
                }
            </div>
            <div className='col col-12 my2'>
                <Button disabled={!promoPreset.name || Number.isNaN(promoPreset.discount) || promoPreset.alphanumericCode.length < 5 || Number.isNaN(promoPreset.limit)} onClick={() => {props.action(promoPreset);props.toggle(false)}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}