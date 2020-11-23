import React from 'react'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { DateRangePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateRangePickerWrapper';
import { presets } from '../../constants/DatepickerPresets'
import { TimeRangeAnalytics } from '../../redux-flow/store/Content/Analytics/types';
import moment from 'moment';

interface DateFilteringAnalyticsProps {
    defaultDates: { end: number; start: number }, 
    callback?: (dates: {startDate?: number; endDate?: number, value?: TimeRangeAnalytics}) => void,
    showPreset?: boolean,
    selectedPreset?: TimeRangeAnalytics
}

export const DateFilteringAnalytics = (props: React.HTMLAttributes<HTMLDivElement> & DateFilteringAnalyticsProps) => {

    var { showPreset, callback, defaultDates, ...other } = props;

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
                            focusState={props.selectedPreset === value}
                            onClick={() => { callback({ value: value, end: props.defaultDates.end, start: props.defaultDates.start })  } }
                        >
                            {text}
                        </Button>
                    );
                })}
                { props.selectedPreset === "CUSTOM" &&  
                    <div className="col col-12 mt2 clearfix">
                        <DateRangePickerWrapper 
                            dates={{ startDate: moment(props.defaultDates.start), endDate: moment(props.defaultDates.end) }} 
                            callback={(dates) => { callback({ startDate: dates.startDate.valueOf(), endDate: dates.endDate.valueOf() }) }} 
                            className="inline" />
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