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
    startDate: 0,
    endDate: 0,
    timezone: 'Etc/UTC',
    discountApplied: 'Once',
    assignedContentIds: [],
    assignedGroupIds: []
}

export const GroupPromoModal = (props: {action: (p: GroupPromo) => Promise<void>; toggle: (b: boolean) => void; groupPromo: GroupPromo; groupList: GroupPrice[]}) => {
    const initTimestampValues = (ts: number, timezone: string): {date: any; time: string} => {
        console.log(ts)
        if(ts > 0 ) {
            return {date: moment(ts * 1000).tz(timezone).utc().format('YYYY-MM-DD'), time: moment(ts * 1000).tz(timezone).utc().format('HH:mm')}
        } 
        return {date: moment().format('YYYY-MM-DD'), time: '00:00'}
    }

    const [groupPromo, setGroupPromo] = React.useState<GroupPromo>(props.groupPromo ? {...props.groupPromo, timezone: props.groupPromo.timezone ? props.groupPromo.timezone : 'Etc/UTC'} : defaultPromo);
    const [startDateTimeValue, setStartDateTimeValue] = React.useState<{date: string; time: string;}>({...initTimestampValues(props.groupPromo ? props.groupPromo.startDate : defaultPromo.startDate, 'Etc/UTC')})
    const [endDateTimeValue, setEndDateTimeValue] = React.useState<{date: string; time: string;}>({...initTimestampValues(props.groupPromo ? props.groupPromo.endDate : defaultPromo.endDate, 'Etc/UTC')})
    const [startDateTime, setStartDateTime] = React.useState<string>(groupPromo.startDate > 0 ? 'Set Date and Time' : 'Always')
    const [endDateTime, setEndDateTime] = React.useState<string>(groupPromo.endDate > 0 ? 'Set Date and Time' : 'Forever')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    
    React.useEffect(() => {
        setGroupPromo(props.groupPromo ? props.groupPromo : defaultPromo);
    }, [props.groupPromo])
    const [modalValid, setModalValid] = React.useState<boolean>(false)

    React.useEffect(() => {
        setModalValid((groupPromo.alphanumericCode && groupPromo.alphanumericCode.length > 4) && (groupPromo.discount && groupPromo.discount !== null) && (groupPromo.limit && groupPromo.limit !== null) && (groupPromo.assignedGroupIds.length > 0)) 
    }, [groupPromo])
    
    React.useEffect(() => {
        let startDate = moment.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${groupPromo.timezone}`).valueOf()
        let endDate = moment.tz(`${endDateTimeValue.date} ${endDateTimeValue.time}`, `${groupPromo.timezone}`).valueOf()
        setStartDateTimeValue({...initTimestampValues(startDate, groupPromo.timezone ? groupPromo.timezone : 'Etc/UTC')})
        setEndDateTimeValue({...initTimestampValues(endDate, groupPromo.timezone ? groupPromo.timezone : 'Etc/UTC')})
        setGroupPromo({...groupPromo, startDate: startDate, endDate: endDate})
        debugger
    }, [groupPromo.timezone])

    const handleSubmit = () => {
        setButtonLoading(true)
        let startDate = startDateTime === 'Set Date and Time' ? moment.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `Etc/UTC`).valueOf() : 0
        let endDate = endDateTime === 'Set Date and Time' ? moment.tz(`${endDateTimeValue.date} ${endDateTimeValue.time}`, `Etc/UTC`).valueOf() : 0
        props.action({...groupPromo, startDate: startDate, endDate: endDate}).then(() => {
            props.toggle(false)
            setButtonLoading(false)
        })
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
            </div>
            <div className='col col-12 mb2 clearfix'>
                <Input className='col sm-col-3 col-6 pr2' value={groupPromo.discount ? groupPromo.discount.toString() : ''} label='Discount' onChange={(event) => setGroupPromo({...groupPromo, discount: parseInt(event.currentTarget.value)})} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col sm-col-3 col-6 pr2' value={groupPromo.limit ? groupPromo.limit.toString() : ''} label='Limit' tooltip="The maximum number of times the promo code can be redeemed" onChange={(event) => setGroupPromo({...groupPromo, limit: parseInt(event.currentTarget.value)})} />
            </div>
            <GroupPromoDateContainer className='col col-12 mb2 flex flex-end'>
                <DropdownSingle className='col col-12 md-col-4 mr2' id="availableStart" dropdownTitle="Available" dropdownDefaultSelect={startDateTime} list={{ 'Always': false, "Set Date and Time": false }} callback={(value: string) => {setStartDateTime(value)}} />
                {startDateTime === "Set Date and Time" &&
                    <>
                        <DateSinglePickerWrapper
                            date={moment(startDateTimeValue.date)}
                            callback={(date: string) => { setStartDateTimeValue({...startDateTimeValue, date: date}) }}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={startDateTimeValue.time}
                            onChange={(event) =>{ setStartDateTimeValue({...startDateTimeValue, time: event.currentTarget.value})} }
                            className='col col-6 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </>
                }
            </GroupPromoDateContainer>
            <GroupPromoDateContainer className='col col-12 mb2 flex flex-end'>
                <DropdownSingle className='col col-4 md-col-4 mr2' id="availableEnd" dropdownTitle="Until" dropdownDefaultSelect={endDateTime} list={{ 'Forever': false, "Set Date and Time": false }} callback={(value: string) => {setEndDateTime(value)}} />

                {
                    endDateTime === "Set Date and Time" &&
                    <>
                        <DateSinglePickerWrapper
                            date={moment(endDateTimeValue.date)}
                            callback={(date: string) => {setEndDateTimeValue({...endDateTimeValue, date: date}) }}
                            className='col col-4 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={endDateTimeValue.time}
                            onChange={(event) => {setEndDateTimeValue({...endDateTimeValue, time: event.currentTarget.value})}}
                            className='col col-3 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </>
                }
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

                <DropdownSingle id='groupPromoDiscountAppliedDropdown' dropdownDefaultSelect={groupPromo.discountApplied} className='col col-6' dropdownTitle='Discount Applied' callback={(value: string) => setGroupPromo({...groupPromo, discountApplied: value})} list={{'Once': false, 'Forever': false}} />
            </div>
            <div className='col col-12 py2'>
                <Button isLoading={buttonLoading} onClick={() => handleSubmit()} disabled={!modalValid} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}