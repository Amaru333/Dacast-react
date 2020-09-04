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



    const [groupPromo, setGroupPromo] = React.useState<GroupPromo>(props.groupPromo ? {...props.groupPromo, timezone: props.groupPromo.timezone ? props.groupPromo.timezone : moment.tz.guess() + ' (' + moment.tz(moment.tz.guess()).format('Z z') + ')'} : defaultPromo)

    let startTimestamp = moment.tz((groupPromo.startDate && groupPromo.startDate > 0 ? groupPromo.startDate :  Math.floor(Date.now() / 1000))*1000, moment.tz.guess() + ' (' + moment.tz(moment.tz.guess()).format('Z z') + ')')
    let endTimestamp = moment.tz((groupPromo.endDate && groupPromo.endDate > 0 ? groupPromo.endDate : Math.floor(Date.now() / 1000))*1000, moment.tz.guess() + ' (' + moment.tz(moment.tz.guess()).format('Z z') + ')')

    const [startDay, setStartDay] = React.useState<number>(startTimestamp.clone().startOf('day').valueOf()/1000)
    const [endDay, setEndDay] = React.useState<number>(endTimestamp.clone().startOf('day').valueOf()/1000)
    const [startTime, setStartTime] = React.useState<number>(startTimestamp.clone().valueOf()/1000 - startTimestamp.clone().startOf('day').valueOf()/1000)
    const [endTime, setEndTime] = React.useState<number>(endTimestamp.clone().valueOf()/1000 - endTimestamp.clone().startOf('day').valueOf()/1000)
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

    const handleSubmit = () => {
        setButtonLoading(true)
        let startDate = startDateTime === 'Set Date and Time' ? moment.utc((startDay + startTime)*1000).valueOf()/1000 : 0
        let endDate = endDateTime === 'Set Date and Time' ? moment.utc((endDay + endTime)*1000).valueOf()/1000 : 0
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
                    callback={(value: string) => setGroupPromo({...groupPromo, assignedGroupIds: [props.groupList.filter(n => n.name === value)[0].id]})}
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
                            date={moment.utc((startDay + startTime)*1000).tz(groupPromo.timezone || 'UTC')}
                            callback={(_, timestamp: string) => setStartDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((startDay + startTime)*1000).tz(groupPromo.timezone || 'UTC').format('HH:mm')}
                            onChange={(event) => setStartTime(inputTimeToTs(event.currentTarget.value, groupPromo.timezone || 'UTC'))}
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
                            date={moment.utc((endDay + endTime)*1000).tz(groupPromo.timezone || 'UTC')}
                            callback={(_, timestamp: string) => setEndDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-4 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((endDay + endTime)*1000).tz(groupPromo.timezone || 'UTC').format('HH:mm')}
                            onChange={(event) => setEndTime(inputTimeToTs(event.currentTarget.value, groupPromo.timezone || 'UTC'))}
                            className='col col-3 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </>
                }
            </GroupPromoDateContainer>
            <div className=' col col-12 mb2'> 
                {
                    (endDateTime === 'Set Date and Time' || startDateTime === 'Set Date and Time') &&
                    <DropdownSingle 
                        hasSearch 
                        id='groupPromoTimezoneDropdown' 
                        dropdownDefaultSelect={groupPromo.timezone || moment.tz.guess() + ' (' + moment.tz(moment.tz.guess()).format('Z z') + ')'} 
                        className='col col-6 pr2' 
                        dropdownTitle='Timezone' 
                        callback={(value: string) => setGroupPromo({...groupPromo, timezone: value.split(' ')[0]})} 
                        list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} 
                    />
                }


                <DropdownSingle id='groupPromoDiscountAppliedDropdown' dropdownDefaultSelect={groupPromo.discountApplied} className='col col-6' dropdownTitle='Discount Applied' callback={(value: string) => setGroupPromo({...groupPromo, discountApplied: value})} list={{'Once': false, 'Forever': false}} />
            </div>
            <div className='col col-12 py2'>
                <Button isLoading={buttonLoading} onClick={() => handleSubmit()} disabled={!modalValid} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}