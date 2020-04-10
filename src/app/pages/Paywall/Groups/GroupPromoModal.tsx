import React from 'react';
import {Input} from '../../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Text } from '../../../../components/Typography/Text';
import { GroupPromo, GroupPrice } from '../../../redux-flow/store/Paywall/Groups';
import { GroupPromoDateContainer } from './GroupsStyle';
var moment = require('moment-timezone');

const defaultPromo: GroupPromo = {
    id: '-1',
    name: '',
    alphanumericCode: '',
    discount: 0,
    limit: 0,
    rateType: 'Subscription',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    timezone: null,
    discountApplied: 'Once'
}

export const GroupPromoModal = (props: {action: Function; toggle: Function; groupPromo: GroupPromo; groupList: GroupPrice[]}) => {

    const [groupPromo, setGroupPromo] = React.useState<GroupPromo>(props.groupPromo ? props.groupPromo : defaultPromo);

    React.useEffect(() => {
        setGroupPromo(props.groupPromo ? props.groupPromo : defaultPromo);
    }, [props.groupPromo])

    React.useEffect(() => {}, [props.groupList])

    return (
        <div>
            <div className='col col-12 pt2'>
                <Input className='col col-6 pr2' value={groupPromo.name} label='Preset name' onChange={(event) => setGroupPromo({...groupPromo, name: event.currentTarget.value})} />
                <Input className='col col-6' value={groupPromo.alphanumericCode} label='Alphanumeric Code' tooltip="Minimum 5 Characters" onChange={(event) => setGroupPromo({...groupPromo, alphanumericCode: event.currentTarget.value})} />
            </div>
            <div className='col col-12 pt2'>
                <DropdownSingle id='associatedGroupDropdown' className='col col-6 pt1 pr2' dropdownTitle='Associated Group' list={props.groupList.reduce((reduced: DropdownListType, item: GroupPrice)=> {return {...reduced, [item.name]: false }},{})  } />
                <DropdownSingle id='groupPromoRateTypeDropdown' dropdownDefaultSelect={groupPromo.rateType} className='col col-6 pt1' dropdownTitle='Rate Type' callback={(value: string) => setGroupPromo({...groupPromo, rateType: value})} list={{'Subscription': false, 'Pay Per View': false}} />
            </div>
            <div className='col col-12 pt2'>
                <Input className='col col-3 pr2' value={groupPromo.discount.toString()} label='Discount' onChange={(event) => setGroupPromo({...groupPromo, discount: parseInt(event.currentTarget.value)})} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col col-3 pr2' value={groupPromo.limit.toString()} label='Limit' tooltip="The maximum number of times the promo code can be redeemed" onChange={(event) => setGroupPromo({...groupPromo, limit: parseInt(event.currentTarget.value)})} />
            </div>
            <GroupPromoDateContainer className='col col-12 pt2 flex flex-end'>
                <DateSinglePickerWrapper className='col col-6 pr2' datepickerTitle='Promo Code Start Date' />
                <Input type='time' label='Start Time' value={groupPromo.startTime} className='col col-3' onChange={(event) => setGroupPromo({...groupPromo, startTime: event.currentTarget.value})} />
            </GroupPromoDateContainer>
            <GroupPromoDateContainer className='col col-12 pt2 flex flex-end'>
                <DateSinglePickerWrapper className='col col-6 pr2' datepickerTitle='Promo Code End Date' />
                <Input type='time' label='End Time' value={groupPromo.endTime} className='col col-3' onChange={(event) => setGroupPromo({...groupPromo, endTime: event.currentTarget.value})} />
            </GroupPromoDateContainer>
            <div className=' col col-12 py2'>
                <DropdownSingle hasSearch id='groupPromoTimezoneDropdown' dropdownDefaultSelect={groupPromo.timezone} className='col col-6 pr2' dropdownTitle='Timezone' callback={(value: string) => setGroupPromo({...groupPromo, timezone: value})} list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} />
                {
                    groupPromo.rateType === 'Subscription' ? 
                        <DropdownSingle id='groupPromoDiscountAppliedDropdown' dropdownDefaultSelect={groupPromo.discountApplied} className='col col-6' dropdownTitle='Discount Applied' callback={(value: string) => setGroupPromo({...groupPromo, discountApplied: value})} list={{'Once': false, 'Forever': false}} />
                        : null
                }
            </div>
            <div className='col col-12 py2'>
                <Button onClick={() => {props.action(groupPromo);props.toggle(false)}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}