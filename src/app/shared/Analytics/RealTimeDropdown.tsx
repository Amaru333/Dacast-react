import React from 'react';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import {  DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { RealTimeRange } from '../../redux-flow/store/Content/Analytics/types';

export const RealTimeDropdown = (props: {callback?: (value: RealTimeRange) => void }) => {

    const timePeriodDropdownList: {title: string, data: RealTimeRange}[] = [{title: "15 Minutes", data: 'LAST_15_MINUTES'}, {title: "30 Minutes", data: 'LAST_30_MINUTES'}, {title: "45 Minutes", data: 'LAST_45_MINUTES'}, {title: "1 Hour", data: 'LAST_HOUR'},  {title: "2 Hours", data: 'LAST_2_HOURS'}]
    
    return (
        <DropdownSingle
            id='real-time-dropdown'
            callback={(item: DropdownSingleListItem) => props.callback(item.data) }
            isInModal={false}
            isWhiteBackground
            defaultSelected="45 Minutes"
            className='col sm-col-2 col-5 pr1'
            dropdownTitle='Time Period'
            list={timePeriodDropdownList}
        />
    )
}