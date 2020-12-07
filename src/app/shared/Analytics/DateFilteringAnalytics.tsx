import React from 'react'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { presets } from '../../constants/DatepickerPresets'
import { TimeRangeAnalytics } from '../../redux-flow/store/Content/Analytics/types';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import Icon from '@material-ui/core/Icon';

interface DateFilteringAnalyticsProps {
    defaultDates: { end: number; start: number }, 
    callback?: (dates: {startDate?: number; endDate?: number, value?: TimeRangeAnalytics}) => void,
    showPreset?: boolean,
    selectedPreset?: TimeRangeAnalytics;
    isDisabled?: boolean;
}

export const DateFilteringAnalytics = (props: React.HTMLAttributes<HTMLDivElement> & DateFilteringAnalyticsProps) => {

    var { showPreset, callback, defaultDates, ...other } = props;
    const [focusedInput, setFocusedInput] = React.useState<any>(null)

    const renderDatePresets = () => {
        return showPreset ? (
            <div>
                {presets.map(({ text, start, end, value }) => {
                    return (
                        <Button
                            key={text}
                            className='ml1'
                            typeButton='secondary'
                            buttonColor='blue'
                            sizeButton='small'
                            disabled={props.isDisabled}
                            focusState={props.selectedPreset === value}
                            onClick={() => { callback({ value: value, endDate: props.defaultDates.end, startDate: props.defaultDates.start })  } }
                        >
                            {text}
                        </Button>
                    );
                })}
                { props.selectedPreset === "CUSTOM" &&  
                    <div className="col col-12 mt2 clearfix">
                        <div className='noTransition inline' >
                            <DateRangePicker 
                                readOnly={true}
                                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} 
                                isDayHighlighted= {() => false}
                                navPrev={<Icon style={{color:'#58606E', position: 'absolute', top: 23, left: 26}}>keyboard_arrow_left</Icon>}
                                navNext={<Icon style={{color:'#58606E', position: 'absolute', top: 23, right: 26}}>keyboard_arrow_right</Icon>}
                                showDefaultInputIcon={false}
                                inputIconPosition='after'
                                startDatePlaceholderText='Select date'
                                endDatePlaceholderText='Select date'
                                horizontalMargin={8}             
                                startDate={moment(props.defaultDates.start)} // momentPropTypes.momentObj or null,
                                startDateId="dateFiletringAnalyticsStart" // PropTypes.string.isRequired,
                                endDate={moment(props.defaultDates.end)} // momentPropTypes.momentObj or null,
                                endDateId="dateFiletringAnalyticsEnd" // PropTypes.string.isRequired,
                                onDatesChange={({ startDate, endDate }) => callback({ value: "CUSTOM", startDate: startDate && startDate.valueOf() , endDate: endDate && endDate.valueOf() }) } // PropTypes.func.isRequired,
                                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={(focusedInput) => {setFocusedInput(focusedInput)}} // PropTypes.func.isRequired,
                            />
                        </div>
                    </div> 
                }
            </div>
        )
            : null;
    }

    return (
        <div {...other}>
            {renderDatePresets()}
        </div>
    )
}

DateFilteringAnalytics.defaultProps = {showPreset: true}