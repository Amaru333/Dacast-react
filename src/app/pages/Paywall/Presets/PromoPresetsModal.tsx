import React from 'react';
import {Input} from '../../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Text } from '../../../../components/Typography/Text';
import { Promo } from '../../../redux-flow/store/Paywall/Presets/types';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
var moment = require('moment-timezone');

const defaultPromo: Promo = {
    id: '-1',
    name: '',
    alphanumericCode: '',
    discount: NaN,
    limit: NaN,
    rateType: 'Pay Per View',
    startDate: 0,
    endDate: 0,
    timezone: 'Etc/UTC',
    discountApplied: 'Once',
    assignedGroupIds: [],
    assignedContentIds: []
}

export const PromoPresetsModal = (props: {action: Function; toggle: Function; promo: Promo}) => {

    const initTimestampValues = (ts: number): {date: any; time: string} => {
        if(ts > 0 ) {
            return {date: moment(ts).format('YYYY-MM-DD hh:mm').split(' ')[0], time: moment(ts).format('YYYY-MM-DD hh:mm').split(' ')[1]}
        } 
        return {date: moment().format('YYYY-MM-DD hh:mm').split(' ')[0], time: '00:00'}
    }

    const [promoPreset, setPromoPreset] = React.useState<Promo>(props.promo ? props.promo : defaultPromo);
    const [startDateTimeValue, setStartDateTimeValue] = React.useState<{date: string; time: string;}>({date: initTimestampValues(props.promo ? props.promo.startDate : defaultPromo.startDate).date, time: initTimestampValues(props.promo ? props.promo.startDate : defaultPromo.startDate).time})
    const [endDateTimeValue, setEndDateTimeValue] = React.useState<{date: string; time: string;}>({date: initTimestampValues(props.promo ? props.promo.endDate : defaultPromo.endDate).date, time: initTimestampValues(props.promo ? props.promo.endDate : defaultPromo.endDate).time})
    React.useEffect(() => {
        setPromoPreset(props.promo ? props.promo : defaultPromo);
    }, [props.promo])




    React.useEffect(() => {
        let startDate = moment.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${promoPreset.timezone}`).utc().valueOf()
        let endDate = moment.tz(`${endDateTimeValue.date} ${endDateTimeValue.time}`, `${promoPreset.timezone}`).utc().valueOf()
        setStartDateTimeValue({date: initTimestampValues(startDate).date, time: initTimestampValues(startDate).time})
        setEndDateTimeValue({date: initTimestampValues(endDate).date, time: initTimestampValues(endDate).time})
        setPromoPreset({...promoPreset, startDate: startDate, endDate: endDate})
    }, [promoPreset.timezone])

    return (
        <div>
            <div className='col col-12 mb2 clearfix'>
                <Input className={ ClassHalfXsFullMd + 'pr1 xs-mb2'} value={promoPreset.name} label='Preset name' onChange={(event) => setPromoPreset({...promoPreset, name: event.currentTarget.value})} />
                {/* <Input className={ ClassHalfXsFullMd + 'pl1'} value={promoPreset.alphanumericCode} label='Alphanumeric Code' onChange={(event) => setPromoPreset({...promoPreset, alphanumericCode: event.currentTarget.value})} tooltip="Minimum 5 Characters" /> */}
            </div>
            <div className='col col-12 mb2'>
                <Input className='col sm-col-3 col-6 pr1 xs-mb2' value={promoPreset.discount ? promoPreset.discount.toString() : ''} label='Discount' onChange={(event) => setPromoPreset({...promoPreset, discount: parseInt(event.currentTarget.value)})} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col sm-col-3 col-6 px1' value={promoPreset.limit ? promoPreset.limit.toString() : ''} label='Limit' tooltip="The maximum number of times the promo code can be redeemed" onChange={(event) => setPromoPreset({...promoPreset, limit: parseInt(event.currentTarget.value)})} />
                <DropdownSingle id='promoPresetRateTypeDropdown' dropdownDefaultSelect={promoPreset.rateType}  className='col sm-col-6 col-12 sm-pl1' dropdownTitle='Rate Type' callback={(value: string) => setPromoPreset({...promoPreset, rateType: value})} list={{'Pay Per View': false, 'Subscription': false}} />
            </div>
            <div className='col col-12 mb2'>
                <DateSinglePickerWrapper 
                    date={moment(startDateTimeValue.date)} 
                    callback={(date: string) => {setStartDateTimeValue({...startDateTimeValue, date: date}) }}
                    className='col sm-col-6 col-8 pr1' 
                    datepickerTitle='Promo Code Start Date' 
                    id='promoCodeStartDate'
                />
                <Input 
                    type='time' 
                    label='Start Time' 
                    value={startDateTimeValue.time} 
                    className='col sm-col-3 col-4 pl1' 
                    onChange={(event) =>{setStartDateTimeValue({...startDateTimeValue, time: event.currentTarget.value})} }
                />
            </div>
            <div className='col col-12 mb2'>
                <DateSinglePickerWrapper 
                    date={moment(endDateTimeValue.date)}    
                    callback={(date: string) => {setEndDateTimeValue({...endDateTimeValue, date: date}) }}
                    className='col sm-col-6 col-8 pr1' 
                    datepickerTitle='Promo Code End Date' 
                    id='promoCodeEndDate'
                />
                <Input 
                    type='time' 
                    label='End Time' 
                    value={endDateTimeValue.time} 
                    className='col sm-col-3 col-4 pl1' 
                    onChange={(event) =>{setEndDateTimeValue({...endDateTimeValue, time: event.currentTarget.value})} }
                />
            </div>
            <div className=' col col-12 mb25'>
                <DropdownSingle 
                    hasSearch 
                    id='promoPresetTimezoneDropdown' 
                    dropdownDefaultSelect='Etc/UTC (+00:00 UTC)'
                    className={ClassHalfXsFullMd + ' pr1'}  
                    dropdownTitle='Timezone' 
                    callback={(value: string) => setPromoPreset({...promoPreset, timezone: value.split(' ')[0]})} 
                    list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} />
                {
                    promoPreset.rateType === 'Subscription' &&
                        <DropdownSingle id='promoPresetDiscountAppliedDropdown' dropdownDefaultSelect={promoPreset.discountApplied} className={ClassHalfXsFullMd + ' pl1'} dropdownTitle='Discount Applied' callback={(value: string) => setPromoPreset({...promoPreset, discountApplied: value})} list={{'Once': false, 'Forever': false}} />
                }
            </div>
            <div className='col col-12 mt1'>
                <Button disabled={!promoPreset.name || Number.isNaN(promoPreset.discount) || Number.isNaN(promoPreset.limit)} onClick={() => {props.action(promoPreset);props.toggle(false)}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}