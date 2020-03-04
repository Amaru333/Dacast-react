import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {SingleDatePicker} from 'react-dates';
import './datepicker_override.css';
import { Text } from '../../Typography/Text'

export const DateSinglePickerWrapper = (props: {className?: string; callback?: Function; id?: string; datepickerTitle?: string}) => {

    const [date, setDate] = React.useState<any>(null)
    const [focusedInput, setFocusedInput] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(props.callback && date) {
            props.callback(date.toString())
        }
    }, [date])

    return (
        <div className={props.className}>
            {
                props.datepickerTitle ? 
                    <Text size={14} weight='med'>{props.datepickerTitle}</Text>
                    : null
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
            />
        </div>

    )
}