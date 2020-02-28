import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {SingleDatePicker} from 'react-dates';
import './datepicker_override.css';

export const DateSinglePickerWrapper = (props: {className: string}) => {

    const [date, setDate] = React.useState<{startDate: any; endDate: any}>(null)
    const [focusedInput, setFocusedInput] = React.useState<boolean>(false)

    return (
        <div className={props.className}>
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