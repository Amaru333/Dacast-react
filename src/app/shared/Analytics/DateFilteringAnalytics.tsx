import React from 'react'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { presets } from '../../constants/DatepickerPresets'
import { TimeRangeAnalytics } from '../../redux-flow/store/Content/Analytics/types';
import { DateRangePicker } from '../../../components/FormsComponents/Datepicker/DateRangePicker';

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
                                start={props.defaultDates.start}
                                end={props.defaultDates.end}
                                onDatesChange={(dates) => { callback({ value: "CUSTOM", startDate: dates.startDate ? dates.startDate.getTime() : null , endDate: dates.endDate ? dates.endDate.getTime() : null }) } }
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