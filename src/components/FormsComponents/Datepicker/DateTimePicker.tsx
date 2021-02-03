import React from "react";
import { DropdownSingle } from '../Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from './DateSinglePickerWrapper';
import { Input } from '../Input/Input';
import { timezoneDropdownList } from '../../../utils/DropdownLists';
import timezones from 'compact-timezone-list';
import { utcOffsetToMin } from "../../../utils/services/date/dateService";


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
    dropShowing?: boolean;
}

export const DateTimePicker = (props: DateTimePickerProps) => {

    const inputTimeToTs = (value: string, timezoneName: string) => {
        console.log(timezoneName)
        let offsetitem = timezones.find(el => el.tzCode === timezoneName)
        let offset = utcOffsetToMin(offsetitem.offset) * 60
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
        console.log(total, 'total')
        return total
    }

    console.log(props.defaultTs)
    let defaultTimestamp = props.defaultTs && props.defaultTs > 0 ? new Date(props.defaultTs) : null ;

    const [method, setMethod] = React.useState<string>(props.defaultTs === 0 ? props.hideOption : "Set Date and Time")
    const [day, setDay] = React.useState<number>(new Date(defaultTimestamp).setHours(0,0,0,0))
    const [time, setTime] = React.useState<string>(new Date(defaultTimestamp).toLocaleTimeString().substr(0, 5))

    const [timezone, setTimezone] = React.useState<string>(props.timezone)
    const colClass= props.fullLineTz ? 'col col-6 px1 sm-col-4' : 'col col-6 px1 sm-col-3';
    const list = [{ title: props.hideOption }, { title: "Set Date and Time" }]

    React.useEffect(() => {
        console.log(time, day, method, timezone)
        props.callback(method === "Set Date and Time" ? new Date((day + inputTimeToTs(time , props.timezone || 'UTC')) ).getTime() < 0 ? 0 : new Date((day + inputTimeToTs(time , props.timezone || 'UTC')) ).getTime() : 0, timezone)
    }, [time, day, method, timezone])

    return (
        <div className="flex flex-wrap items-end col col-12 mxn1">
            {props.dropShowing && <DropdownSingle disabled={props.disabled} className={colClass} id={'dropdown' + props.id} dropdownTitle={props.dropdownTitle} dropdownDefaultSelect={method} list={list} callback={(item: DropdownSingleListItem) => { setMethod(item.title) }} />}
            { (method === "Set Date and Time" || !props.dropShowing) &&
                <>
                    <DateSinglePickerWrapper
                        minDate={new Date(props.minDate)}
                        callback={(date: Date) => setDay(Math.floor(date.valueOf() / 1000))}
                        className={colClass}
                        id={'datePicker' + props.id}
                        date={day ? new Date(props.defaultTs * 1000) : null}
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

DateTimePicker.defaultProps = { dropShowing: true };



