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
    startDate: 0,
    endDate: 0,
    timezone: 'Etc/UTC',
    discountApplied: 'Once',
    assignedGroupIds: [],
    assignedContentIds: []
}

export const PromoPresetsModal = (props: {action: (p: Promo) => Promise<void>; toggle: (b: boolean) => void; promo: Promo}) => {
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

    let startTimestamp = moment.tz((props.promo.startDate || Math.floor(Date.now() / 1000))*1000, 'UTC')
    let endTimestamp = moment.tz((props.promo.endDate || Math.floor(Date.now() / 1000))*1000, 'UTC')

    const [promoPreset, setPromoPreset] = React.useState<Promo>(props.promo ? props.promo : defaultPromo);
    const [startDay, setStartDay] = React.useState<number>(startTimestamp.clone().startOf('day').valueOf()/1000)
    const [endDay, setEndDay] = React.useState<number>(endTimestamp.clone().startOf('day').valueOf()/1000)
    const [startTime, setStartTime] = React.useState<number>(startTimestamp.clone().valueOf()/1000 - startTimestamp.clone().startOf('day').valueOf()/1000)
    const [endTime, setEndTime] = React.useState<number>(endTimestamp.clone().valueOf()/1000 - endTimestamp.clone().startOf('day').valueOf()/1000)
    const [startDateTime, setStartDateTime] = React.useState<string>(promoPreset.startDate > 0 ? 'Set Date and Time' : 'Always')
    const [endDateTime, setEndDateTime] = React.useState<string>(promoPreset.endDate > 0 ? 'Set Date and Time' : 'Forever')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    
    React.useEffect(() => {
        setPromoPreset(props.promo ? props.promo : defaultPromo);
    }, [props.promo])


    const handleSubmit = () => {
        setButtonLoading(true)
        let startDate = startDateTime === 'Set Date and Time' ? moment.utc((startDay + startTime)*1000).valueOf()/1000 : 0
        let endDate = endDateTime === 'Set Date and Time' ? moment.utc((endDay + endTime)*1000).valueOf()/1000 : 0
        props.action({...promoPreset, startDate: startDate, endDate: endDate}).then(() => {
            props.toggle(false)
            setButtonLoading(false)
        })
    }

    return (
        <div>
            <div className='col col-12 mb2 clearfix'>
                <Input className={ ClassHalfXsFullMd + 'pr1 xs-mb2'} value={promoPreset.name} label='Preset name' onChange={(event) => setPromoPreset({...promoPreset, name: event.currentTarget.value})} />
                {/* <Input className={ ClassHalfXsFullMd + 'pl1'} value={promoPreset.alphanumericCode} label='Alphanumeric Code' onChange={(event) => setPromoPreset({...promoPreset, alphanumericCode: event.currentTarget.value})} tooltip="Minimum 5 Characters" /> */}
            </div>
            <div className='col col-12 mb2'>
                <Input className='col sm-col-3 col-6 pr1 xs-mb2' value={promoPreset.discount ? promoPreset.discount.toString() : ''} label='Discount' onChange={(event) => setPromoPreset({...promoPreset, discount: parseInt(event.currentTarget.value)})} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col sm-col-3 col-6 px1' value={promoPreset.limit ? promoPreset.limit.toString() : ''} label='Limit' tooltip="The maximum number of times the promo code can be redeemed" onChange={(event) => setPromoPreset({...promoPreset, limit: parseInt(event.currentTarget.value)})} />
            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DropdownSingle className='col col-12 md-col-4 mr2' id="availableStart" dropdownTitle="Available" dropdownDefaultSelect={startDateTime} list={{ 'Always': false, "Set Date and Time": false }} callback={(value: string) => {setStartDateTime(value)}} />
                    {startDateTime === "Set Date and Time" &&
                        <>
                        <DateSinglePickerWrapper
                            date={moment.utc((startDay + startTime)*1000).tz(promoPreset.timezone || 'UTC')}
                            callback={(_, timestamp: string) => setStartDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((startDay + startTime)*1000).tz(promoPreset.timezone || 'UTC').format('HH:mm')}
                            onChange={(event) => setStartTime(inputTimeToTs(event.currentTarget.value, promoPreset.timezone || 'UTC'))}
                            className='col col-6 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                        </>
                    }
            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DropdownSingle className='col col-4 md-col-4 mr2' id="availableEnd" dropdownTitle="Until" dropdownDefaultSelect={endDateTime} list={{ 'Forever': false, "Set Date and Time": false }} callback={(value: string) => {setEndDateTime(value)}} />

                {
                    endDateTime === "Set Date and Time" &&
                    <>
                        <DateSinglePickerWrapper
                            date={moment.utc((endDay + endTime)*1000).tz(promoPreset.timezone || 'UTC')}
                            callback={(_, timestamp: string) => setEndDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-4 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((endDay + endTime)*1000).tz(promoPreset.timezone || 'UTC').format('HH:mm')}
                            onChange={(event) => setEndTime(inputTimeToTs(event.currentTarget.value, promoPreset.timezone || 'UTC'))}
                            className='col col-3 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </>
                }
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
                <DropdownSingle id='promoPresetDiscountAppliedDropdown' dropdownDefaultSelect={promoPreset.discountApplied} className={ClassHalfXsFullMd + ' pl1'} dropdownTitle='Discount Applied' callback={(value: string) => setPromoPreset({...promoPreset, discountApplied: value})} list={{'Once': false, 'Forever': false}} />
            </div>
            <div className='col col-12 mt1'>
                <Button isLoading={buttonLoading} disabled={!promoPreset.name || Number.isNaN(promoPreset.discount) || Number.isNaN(promoPreset.limit)} onClick={() => {handleSubmit()}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}