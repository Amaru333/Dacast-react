import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import ReactDates, { SingleDatePicker } from 'react-dates';
import './datepicker_override.css';
import { Text } from '../../Typography/Text'

export const DateSinglePickerWrapper = (props: { className?: string; callback?: Function; id?: string; datepickerTitle?: string, openDirection?: ReactDates.OpenDirectionShape }) => {

    const [date, setDate] = React.useState<any>(null)
    const [focusedInput, setFocusedInput] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (props.callback && date) {
            props.callback(date.toString())
        }
    }, [date])

    return (
        <div className={props.className}>
            <div className="flex flex-column">
                {
                    props.datepickerTitle ?
                        <div style={{ marginTop: 4, marginBottom: 4 }}>
                            <Text size={14} weight='med'>{props.datepickerTitle}</Text>

                        </div> : null

                }
                <SingleDatePicker
                    placeholder='Select date'
                    showDefaultInputIcon
                    inputIconPosition='after'
                    date={date}
                    onDateChange={(date: any) => setDate(date)}
                    focused={focusedInput}
                    onFocusChange={(test: { focused: boolean }) => setFocusedInput(test.focused)}
                    id="your_unique_id"
                    numberOfMonths={1}
                    keepOpenOnDateSelect={false}
                    openDirection={props.openDirection ? props.openDirection : 'down'}
                />
            </div>
        </div>

    )
}