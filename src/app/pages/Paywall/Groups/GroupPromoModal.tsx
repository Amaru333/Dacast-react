import React from 'react';
import {Input} from '../../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Text } from '../../../../components/Typography/Text';
import { GroupPromo, GroupPrice } from '../../../redux-flow/store/Paywall/Groups';
import { GroupPromoDateContainer } from './GroupsStyle';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
var moment = require('moment-timezone');

const defaultPromo: GroupPromo = {
    id: '-1',
    alphanumericCode: '',
    discount: 0,
    limit: 0,
    rateType: 'Pay Per View',
    startDate: 0,
    endDate: 0,
    timezone: 'Etc/UTC',
    discountApplied: 'Once',
    assignedContentIds: [],
    assignedGroupIds: []
}

export const GroupPromoModal = (props: {action: (p: GroupPromo) => Promise<void>; toggle: (b: boolean) => void; groupPromo: GroupPromo; groupList: GroupPrice[]}) => {
    const initTimestampValues = (ts: number): {date: any; time: string} => {
        if(ts > 0 ) {
            return {date: moment(ts).format('YYYY-MM-DD hh:mm').split(' ')[0], time: moment(ts).format('YYYY-MM-DD hh:mm').split(' ')[1]}
        } 
        return {date: moment().format('YYYY-MM-DD hh:mm').split(' ')[0], time: '00:00'}
    }

    const [groupPromo, setGroupPromo] = React.useState<GroupPromo>(props.groupPromo ? props.groupPromo : defaultPromo);
    const [startDateTimeValue, setStartDateTimeValue] = React.useState<{date: string; time: string;}>({date: initTimestampValues(props.groupPromo ? props.groupPromo.startDate : defaultPromo.startDate).date, time: initTimestampValues(props.groupPromo ? props.groupPromo.startDate : defaultPromo.startDate).time})
    const [endDateTimeValue, setEndDateTimeValue] = React.useState<{date: string; time: string;}>({date: initTimestampValues(props.groupPromo ? props.groupPromo.endDate : defaultPromo.endDate).date, time: initTimestampValues(props.groupPromo ? props.groupPromo.endDate : defaultPromo.endDate).time})
    React.useEffect(() => {
        setGroupPromo(props.groupPromo ? props.groupPromo : defaultPromo);
    }, [props.groupPromo])


    React.useEffect(() => {
        let startDate = moment.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${groupPromo.timezone}`).utc().valueOf()
        let endDate = moment.tz(`${endDateTimeValue.date} ${endDateTimeValue.time}`, `${groupPromo.timezone}`).utc().valueOf()
        setStartDateTimeValue({date: initTimestampValues(startDate).date, time: initTimestampValues(startDate).time})
        setEndDateTimeValue({date: initTimestampValues(endDate).date, time: initTimestampValues(endDate).time})
        setGroupPromo({...groupPromo, startDate: startDate, endDate: endDate})
    }, [groupPromo.timezone])

    const handleSubmit = () => {
        let startDate = moment.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${groupPromo.timezone}`).valueOf()
        let endDate = moment.tz(`${endDateTimeValue.date} ${endDateTimeValue.time}`, `${groupPromo.timezone}`).valueOf()
        props.action({...groupPromo, startDate: startDate, endDate: endDate})
        props.toggle(false)
    }

    return (
        <div>
            <div className="'col col-12 mb2 clearfix">
                {/* <Input className={ ClassHalfXsFullMd + 'pr2 xs-mb2'} value={groupPromo.name} label='Preset name' onChange={(event) => setGroupPromo({...groupPromo, name: event.currentTarget.value})} /> */}
                <Input className={ ClassHalfXsFullMd + ''} value={groupPromo.alphanumericCode} label='Alphanumeric Code' tooltip="Minimum 5 Characters" onChange={(event) => setGroupPromo({...groupPromo, alphanumericCode: event.currentTarget.value})} />
            </div>
            <div className='col col-12 clearfix mb2'>
                <DropdownSingle 
                    id='associatedGroupDropdown' 
                    className={ ClassHalfXsFullMd + 'pr2 xs-mb2'} 
                    dropdownTitle='Associated Group'
                    dropdownDefaultSelect={props.groupList.filter(g => g.id === groupPromo.assignedGroupIds[0]).length > 0 ? props.groupList.filter(g => g.id === groupPromo.assignedGroupIds[0])[0].name : ''}
                    list={props.groupList.reduce((reduced: DropdownListType, item: GroupPrice)=> {return {...reduced, [item.name]: false }},{})  } 
                    callback={(value:string) => setGroupPromo({...groupPromo, assignedGroupIds: [props.groupList.filter(n => n.name === value)[0].id]})}
                />
                <DropdownSingle id='groupPromoRateTypeDropdown' className={ ClassHalfXsFullMd + ''} dropdownDefaultSelect={groupPromo.rateType}  dropdownTitle='Rate Type' callback={(value: string) => setGroupPromo({...groupPromo, rateType: value})} list={{'Subscription': false, 'Pay Per View': false}} />
            </div>
            <div className='col col-12 mb2 clearfix'>
                <Input className='col sm-col-3 col-6 pr2' value={groupPromo.discount ? groupPromo.discount.toString() : ''} label='Discount' onChange={(event) => setGroupPromo({...groupPromo, discount: parseInt(event.currentTarget.value)})} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col sm-col-3 col-6 pr2' value={groupPromo.limit ? groupPromo.limit.toString() : ''} label='Limit' tooltip="The maximum number of times the promo code can be redeemed" onChange={(event) => setGroupPromo({...groupPromo, limit: parseInt(event.currentTarget.value)})} />
            </div>
            <GroupPromoDateContainer className='col col-12 mb2 flex flex-end'>
                <DateSinglePickerWrapper 
                    date={moment(startDateTimeValue.date)} 
                    callback={(date: string) => {setStartDateTimeValue({...startDateTimeValue, date: date}) }}
                    openDirection="up" 
                    className='col col-6 pr2' 
                    datepickerTitle='Promo Code Start Date' 
                    id='promoCodeStartDate'
                />
                <Input 
                    type='time' 
                    label='Start Time' 
                    value={startDateTimeValue.time} 
                    className='col sm-col-3 col-6' 
                    onChange={(event) =>{setStartDateTimeValue({...startDateTimeValue, time: event.currentTarget.value})} }
                />
            </GroupPromoDateContainer>
            <GroupPromoDateContainer className='col col-12 mb2 flex flex-end'>
                <DateSinglePickerWrapper 
                    date={moment(endDateTimeValue.date)}    
                    callback={(date: string) => {setEndDateTimeValue({...endDateTimeValue, date: date}) }}
                    openDirection="up" 
                    className='col col-6 pr2' 
                    datepickerTitle='Promo Code End Date'
                    id='promoCodeEndDate'
                />
                <Input 
                    type='time' 
                    label='End Time' 
                    value={endDateTimeValue.time} 
                    className='col sm-col-3 col-6' 
                    onChange={(event) =>{setEndDateTimeValue({...endDateTimeValue, time: event.currentTarget.value})} }
                />
            </GroupPromoDateContainer>
            <div className=' col col-12 mb2'>
                <DropdownSingle 
                    hasSearch 
                    id='groupPromoTimezoneDropdown' 
                    dropdownDefaultSelect='Etc/UTC (+00:00 UTC)' 
                    className='col col-6 pr2' 
                    dropdownTitle='Timezone' 
                    callback={(value: string) => setGroupPromo({...groupPromo, timezone: value.split(' ')[0]})} 
                    list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} 
                />
                {
                    groupPromo.rateType === 'Subscription' &&
                        <DropdownSingle id='groupPromoDiscountAppliedDropdown' dropdownDefaultSelect={groupPromo.discountApplied} className='col col-6' dropdownTitle='Discount Applied' callback={(value: string) => setGroupPromo({...groupPromo, discountApplied: value})} list={{'Once': false, 'Forever': false}} />
                }
            </div>
            <div className='col col-12 py2'>
                <Button onClick={() => handleSubmit()} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}