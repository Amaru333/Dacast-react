import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import ReactDates, { SingleDatePicker } from 'react-dates';
import './datepicker_override.css';
import { Text } from '../../Typography/Text'
import moment from 'moment';

export const DateSinglePickerWrapper = (props: { date?: moment.Moment; allowOustsideDate?: boolean; className?: string; callback?: Function; id?: string; datepickerTitle?: string; openDirection?: ReactDates.OpenDirectionShape }) => {

    const [date, setDate] = React.useState<any>(props.date)
    const [focusedInput, setFocusedInput] = React.useState<boolean>(false)

    React.useEffect(() => {
        setDate(props.date)
    }, [props.date])

    const handleDateChange = (date: any) => {
        if (props.callback && date) {
            props.callback(date.format("YYYY-MM-DD").toString(), date.format("X"))
        }
        setDate(date)
    }
    
    return (
        <div className={props.className}>
            <div className="flex flex-column">
                {
                    props.datepickerTitle &&
                        <div style={{ marginTop: 4, marginBottom: 4 }}>
                            <Text size={14} weight='med'>{props.datepickerTitle}</Text>
                        </div>
                }
                <SingleDatePicker
                    placeholder='Select date'
                    showDefaultInputIcon
                    inputIconPosition='after'
                    {...(props.allowOustsideDate ? {isOutsideRange: ()=> false} : {})}
                    date={date}
                    onDateChange={(date: any) => handleDateChange(date)}
                    focused={focusedInput}
                    onFocusChange={(test: { focused: boolean }) => setFocusedInput(test.focused)}
                    id={props.id + "singleDatePicker"}
                    numberOfMonths={1}
                    keepOpenOnDateSelect={false}
                    openDirection={props.openDirection ? props.openDirection : 'down'}
                />
            </div>
        </div>

    )
}