import React from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './datepicker_override.css'
import { useMedia } from '../../../utils/utils';

export const DateRangePickerWrapper = () => {
    const [dates, setDates] = React.useState<{startDate: any; endDate: any}>({startDate: null, endDate: null})
    const [focusedInput, setFocusedInput] = React.useState<any>(null)
    let mobile = useMedia('(max-width: 780px)')

    return (
        <div>
            <DateRangePicker  
                showDefaultInputIcon={false}
                showClearDates
                orientation={mobile ? 'vertical' : 'horizontal'}
                withFullScreenPortal={mobile}
                inputIconPosition='after'
                startDatePlaceholderText='Select date'
                endDatePlaceholderText='Select date'
                horizontalMargin={8}                 
                startDate={dates.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={dates.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => setDates({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={(focusedInput) => {setFocusedInput(focusedInput)}} // PropTypes.func.isRequired,
            />
        </div>
    )
}