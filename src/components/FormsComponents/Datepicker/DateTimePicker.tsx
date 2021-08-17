import React from "react";
import { DropdownSingle } from '../Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from './DateSinglePickerWrapper';
import { Input } from '../Input/Input';
import { Text } from '../../Typography/Text';
import { timezoneDropdownList } from '../../../utils/DropdownLists';
import { dateAdd, inputTimeToTs, tsToInputTime, getTimezoneOffsetInSecs } from "../../../utils/services/date/dateService";
import { IconStyle } from "../../../shared/Common/Icon";


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
    isConvertedToUtc?: boolean;
    displayTimezoneFirst?: boolean;
}

export const DateTimePicker = (props: DateTimePickerProps) => {

    let defaultTimestamp = props.defaultTs && props.defaultTs > 0 ? new Date(tsToInputTime(props.defaultTs, props.timezone, new Date())*1000) : null ;
    const [method, setMethod] = React.useState<string>(props.defaultTs === 0 ? props.hideOption : "Set Date and Time")
    const [day, setDay] = React.useState<number>(defaultTimestamp ? Math.round(new Date(props.defaultTs*1000).setHours(0,0,0,0) / 1000)  : null)
    const [time, setTime] = React.useState<string>(defaultTimestamp ? ("0" + defaultTimestamp.getUTCHours()).slice(-2)+':'+("0" + defaultTimestamp.getUTCMinutes()).slice(-2): '00:00')

    const [timezone, setTimezone] = React.useState<string>(props.timezone)
    const colClass= props.fullLineTz ? 'col col-6 px1 sm-col-4' : 'col col-6 px1 sm-col-3';
    const list = [{ title: props.hideOption }, { title: "Set Date and Time" }]

    React.useEffect(() => {
        const dayTZOffset = getTimezoneOffsetInSecs(timezone, new Date(day * 1000))
        var dayStart = new Date((day + dayTZOffset) * 1000).setUTCHours(0, 0, 0, 0)
        const dayStartDate = new Date(dayStart)
        var timeStamp = dateAdd(dayStartDate, 'second', inputTimeToTs(time , timezone || 'UTC', dayStartDate)).getTime()
        props.callback(method === "Set Date and Time" ? new Date(timeStamp).getTime() < 0 ? 0 :  Math.round(new Date(timeStamp).getTime() / 1000) : 0, timezone)
    }, [time, day, method, timezone])

    return (
        <div className="flex flex-wrap items-end col col-12 mxn1">
            {props.dropShowing && <DropdownSingle disabled={props.disabled} className={props.displayTimezoneFirst ? 'col col-12 px1 sm-col-6' : colClass} id={'dropdown' + props.id} dropdownTitle={props.dropdownTitle} dropdownDefaultSelect={method} list={list} callback={(item: DropdownSingleListItem) => { setMethod(item.title) }} />}
            { (method === "Set Date and Time" || !props.dropShowing) &&
                <>
                    {
                        (props.showTimezone && props.displayTimezoneFirst) &&
                        <DropdownSingle
                            hasSearch
                            id={'timezoneDropdown' + props.id}
                            dropdownDefaultSelect={props.timezone}
                            className={props.fullLineTz ? 'col col-12 px1 sm-col-6' : colClass}
                            dropdownTitle='Timezone'
                            callback={(item: DropdownSingleListItem) => setTimezone(item.title.split(' ')[0])}
                            list={timezoneDropdownList}
                            tooltip={props.isConvertedToUtc ? "The time saved will be converted to Coordinated Universal Time (UTC), UTC +0" : null}
                            leftTooltipPosition
                        />

                    }
                    <div className={props.displayTimezoneFirst ? 'col col-6 px1 mt2' : colClass}>
                        {props.displayTimezoneFirst && <Text style={{lineHeight:'10px'}} size={14} weight='med'>Start Date</Text>}
                        <DateSinglePickerWrapper
                            minDate={new Date(props.minDate)}
                            callback={(date: Date) => setDay(Math.floor(date.valueOf() / 1000))}
                            id={'datePicker' + props.id}
                            date={day ? new Date(props.defaultTs * 1000) : null}
                        />
                    </div>

                    <Input
                        label={props.displayTimezoneFirst && 'Start Time'}
                        type='time'
                        value={time}
                        onChange={(event) => setTime(event.currentTarget.value)}
                        className={(props.displayTimezoneFirst ? 'col col-6 px1 pt2 sm-col-4' : colClass) }
                        disabled={false}
                        id={'input' + props.id}
                    />
                    {
                        (props.showTimezone && !props.displayTimezoneFirst) &&
                        <DropdownSingle
                            hasSearch
                            id={'timezoneDropdown' + props.id}
                            dropdownDefaultSelect={props.timezone}
                            className={props.fullLineTz ? 'col col-12 px1 sm-col-6' : colClass}
                            dropdownTitle='Timezone'
                            callback={(item: DropdownSingleListItem) => setTimezone(item.title.split(' ')[0])}
                            list={timezoneDropdownList}
                            tooltip={props.isConvertedToUtc ? "The time saved will be converted to Coordinated Universal Time (UTC), UTC +0" : null}
                            leftTooltipPosition
                        />

                    }
                    {
                        props.isConvertedToUtc &&
                        <div className='flex px1 mt1'>
                            <IconStyle>info_outlined</IconStyle>
                            <Text size={14} weight="reg">This will change to Available on Purchase at the scheduled time.</Text>
                        </div>
                    }

                </>
            }
        </div>
    );
}

DateTimePicker.defaultProps = { dropShowing: true };



