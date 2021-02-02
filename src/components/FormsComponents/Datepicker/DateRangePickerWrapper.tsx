import React from 'react'
import { DateRangePickerr } from './DateRangePicker';

export const DateRangePickerWrapper = (props: {disabled? : boolean; presets?: any; callback?: (dates: {startDate: Date; endDate: Date}) => void; dates: {startDate: number; endDate: number}} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
    
    const {presets, callback,  ...other} = props;

    const [dates, setDates] = React.useState<{startDate: any; endDate: any}>(props.dates ? props.dates : {startDate: null, endDate: null})

    // const [focusedInput, setFocusedInput] = React.useState<any>(null)
    // let mobile = useMedia('(max-width: 780px)')

    React.useEffect(() => {
        props.dates ? setDates(props.dates) : null
    }, [props.dates])

    return (
        <div className='noTransition' {...other}>
            <DateRangePickerr 
                start={dates.startDate}
                end={dates.endDate}
                onDatesChange={(data) => { callback({startDate: data.startDate, endDate: data.endDate}) } } // PropTypes.func.isRequired,
            />
        </div>
    )
}