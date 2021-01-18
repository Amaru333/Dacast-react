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
    minDate?: number;
    disabled?: boolean;
    fullLineTz?: boolean;
}

export const DateTimePicker = (props: DateTimePickerProps) => {

    const inputTimeToTs = (value: string, timezoneName: string) => {
        let offset = moment.tz(timezoneName).utcOffset() * 60
        let splitValue = value.split(':')
        let hours = parseInt(splitValue[0]) * 3600
        if (isNaN(hours)) {
            hours = 0
        }
        let min = !splitValue[1] ? 0 : parseInt(splitValue[1]) * 60
        if (isNaN(min)) {
            min = 0
        }
        let total = hours + min - offset
        return total
    }

    let defaultTimestamp = props.defaultTs && props.defaultTs > 0 ?  moment.tz( props.defaultTs, props.timezone ? props.timezone : 'UTC') : moment(null) ;

    const [method, setMethod] = React.useState<string>(props.defaultTs === 0 ? props.hideOption : "Set Date and Time")
    const [day, setDay] = React.useState<number>(defaultTimestamp.clone().startOf('day').valueOf() / 1000)
    const [time, setTime] = React.useState<string>(moment.utc((defaultTimestamp.clone().startOf('day').valueOf() / 1000 + defaultTimestamp.clone().valueOf() / 1000 - defaultTimestamp.clone().startOf('day').valueOf() / 1000) * 1000).tz(props.timezone || moment.tz.guess()).format('HH:mm'))

    const [timezone, setTimezone] = React.useState<string>(props.timezone)
    const colClass= props.fullLineTz ? 'col col-4 px1' : 'col col-3 px1';
    const list = [{ title: props.hideOption }, { title: "Set Date and Time" }]

    React.useEffect(() => {
        props.callback(method === "Set Date and Time" ? moment.utc((day + inputTimeToTs(time , props.timezone || 'UTC')) * 1000).valueOf() : 0, timezone)
    }, [time, day, method, timezone])
    return (
        <div className="flex flex-wrap items-end col col-12 mxn1">
            <DropdownSingle disabled={props.disabled} className={colClass} id={'dropdown' + props.id} dropdownTitle={props.dropdownTitle} dropdownDefaultSelect={method} list={list} callback={(item: DropdownSingleListItem) => { setMethod(item.title) }} />
            {method === "Set Date and Time" &&
                <>
                    <DateSinglePickerWrapper
                        minDate={moment(props.minDate)}
                        callback={(_, timestamp: string) => setDay(moment.tz(parseInt(timestamp) * 1000, 'UTC').startOf('day').valueOf() / 1000)}
                        className={colClass}
                        id={'datePicker' + props.id}
                        date={props.defaultTs ? moment(props.defaultTs) : null}
                    />
                    <Input
                        type='time'
                        value={time}
                        onChange={(event) => setTime(event.currentTarget.value)}
                        className={colClass}
                        disabled={false}
                        id={'input' + props.id}
                    />
                    {
                        props.showTimezone &&
                        <DropdownSingle
                            hasSearch
                            id={'timezoneDropdown' + props.id}
                            dropdownDefaultSelect={props.timezone}
                            className={colClass}
                            dropdownTitle='Timezone'
                            callback={(item: DropdownSingleListItem) => setTimezone(item.title.split(' ')[0])}
                            list={timezoneDropdownList}
                        />

                    }

                </>
            }
        </div>
    );
}


