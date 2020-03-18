import React from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './datepicker_override.css'
import { useMedia } from '../../../app/utils/utils';
import { Icon } from '@material-ui/core';
import { Button } from '../Button/Button';

export const DateRangePickerWrapper = (props: {presets?: any; callBack?: Function} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
    const [dates, setDates] = React.useState<{startDate: any; endDate: any}>({startDate: null, endDate: null})
    const [focusedInput, setFocusedInput] = React.useState<any>(null)
    let mobile = useMedia('(max-width: 780px)')

    React.useEffect(() => {
        props.callBack ? props.callBack(dates) : null;
    }, [dates])

    const {presets,  ...other} = props;

    const renderDatePresets = () => {    
        return props.presets ?(
            <div>
                {props.presets.map(({ text, start, end }) => {
                    return (
                        <Button
                            key={text}
                            className='mx1 mb2'
                            typeButton='secondary'
                            buttonColor='blue'
                            sizeButton='small'
                            onClick={() => setDates({ startDate: start, endDate: end })}
                        >
                            {text}
                        </Button>
                    );
                })}
            </div>
        )
            : null;
    }

    return (
        <div className='noTransition' {...other}>
            <DateRangePicker 
                isOutsideRange={() => false} 
                isDayHighlighted= {() => false}
                navPrev={<Icon style={{color:'#58606E', position: 'absolute', top: 23, left: 26}}>keyboard_arrow_left</Icon>}
                navNext={<Icon style={{color:'#58606E', position: 'absolute', top: 23, right: 26}}>keyboard_arrow_right</Icon>}
                showDefaultInputIcon={false}
                showClearDates
                renderCalendarInfo={() => renderDatePresets()}
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