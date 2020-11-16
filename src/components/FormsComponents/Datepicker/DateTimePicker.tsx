import React from "react";
import { DropdownSingle } from '../Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from './DateSinglePickerWrapper';
import { Input } from '../Input/Input';
import { timezoneDropdownList } from '../../../utils/DropdownLists';
var moment = require('moment-timezone');


interface DateTimePickerProps {
    hideOption: string;
    callback?: (date: number, timezone: string) => void;
    defaultTs?: number;
    timezone?: string;
    id: string;
    dropdownTitle?: string;
    showTimezone?: boolean;
}


export const DateTimePicker = (props: DateTimePickerProps) => {

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

    let defaultTimestamp = moment.tz((props.defaultTs && props.defaultTs > 0 ?  props.defaultTs : Math.floor(Date.now() / 1000))*1000, moment.tz.guess())

    const [method, setMethod] = React.useState<string>(props.defaultTs === 0 ? props.hideOption : "Set Date and Time")
    const [time, setTime] = React.useState<number>(defaultTimestamp.clone().valueOf()/1000 - defaultTimestamp.clone().startOf('day').valueOf()/1000)
    const [day, setDay] = React.useState<number>(defaultTimestamp.clone().startOf('day').valueOf()/1000)
    const [timezone, setTimezone] = React.useState<string>(props.timezone)


    const list = [{title: props.hideOption}, {title: "Set Date and Time"}]

    React.useEffect(() => {
        props.callback(method === "Set Date and Time" ? moment.utc((day + time)*1000).valueOf()/1000 : 0, timezone)
    }, [ time, day, method, timezone ])

    return (
        <>
            <DropdownSingle className='col col-12 md-col-4 mr2' id={'dropdown'+props.id} dropdownTitle={props.dropdownTitle} dropdownDefaultSelect={method} list={list} callback={(item: DropdownSingleListItem) => {setMethod(item.title)}} />
                {method === "Set Date and Time" &&
                    <>
                        <DateSinglePickerWrapper
                            date={moment.utc((day + time)*1000).tz(props.timezone || moment.tz.guess())}
                            callback={(_, timestamp: string) => setDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((day + time)*1000).tz(props.timezone || moment.tz.guess()).format('HH:mm')}
                            onChange={(event) => setTime(inputTimeToTs(event.currentTarget.value, props.timezone || 'UTC'))}
                            className='col col-6 md-col-3'
                            disabled={false}
                            id={'input'+props.id}
                            pattern="[0-9]{2}:[0-9]{2}"
                        />
                        <DropdownSingle 
                            hasSearch 
                            id='startDateTimezoneDropdown' 
                            dropdownDefaultSelect={props.timezone} 
                            className='col col-3 px2 mb2' 
                            dropdownTitle='Timezone' 
                            callback={(item: DropdownSingleListItem) => setTimezone(item.title.split(' ')[0])} 
                            list={timezoneDropdownList} 
                        /> 
                    </>
                }
        </>
     );
}


