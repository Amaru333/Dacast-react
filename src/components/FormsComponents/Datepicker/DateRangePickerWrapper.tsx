import React from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './datepicker_override.css'
import { useMedia } from '../../../utils/utils';
import { Icon } from '@material-ui/core';
import { Button } from '../Button/Button';

export const DateRangePickerWrapper = (props: {disabled? : boolean; presets?: any; callback?: (dates: {startDate: any; endDate: any}) => void; dates: {startDate: any; endDate: any}} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
    
    const {presets, callback,  ...other} = props;

    const [dates, setDates] = React.useState<{startDate: any; endDate: any}>(props.dates ? props.dates : {startDate: null, endDate: null})
    const [focusedInput, setFocusedInput] = React.useState<any>(null)
    let mobile = useMedia('(max-width: 780px)')

    React.useEffect(() => {
        callback ? callback(dates) : null;
    }, [dates])

    React.useEffect(() => {
        props.dates ? setDates(props.dates) : null
    }, [props.dates])
    return (
        <div className='noTransition' {...other}>
            <DateRangePicker 
                disabled={props.disabled}
                isOutsideRange={() => false} 
                isDayHighlighted= {() => false}
                navPrev={<Icon style={{color:'#58606E', position: 'absolute', top: 23, left: 26}}>keyboard_arrow_left</Icon>}
                navNext={<Icon style={{color:'#58606E', position: 'absolute', top: 23, right: 26}}>keyboard_arrow_right</Icon>}
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