import React from 'react';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import {  DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';

export const RealTimeDropdown = (props: {callback?: (value: number) => void }) => {

    const timePeriodDropdownList = [{title: "5 Minutes", data: 5}, {title: "15 Minutes", data: 15}, {title: "30 Minutes", data: 30}, {title: "45 Minutes", data: 45}, {title: "1 Hour", data: 60}, {title: "1.5 Hours", data: 90}]
    
    return (
        <DropdownSingle
            id='real-time-dropdown'
            callback={(item: DropdownSingleListItem) => props.callback(item.data) }
            isInModal={false}
            isWhiteBackground
            defaultSelected="5 Minutes"
            className='col sm-col-2 col-5 pr1'
            dropdownTitle='Time Period'
            list={timePeriodDropdownList}
        />
    )
}