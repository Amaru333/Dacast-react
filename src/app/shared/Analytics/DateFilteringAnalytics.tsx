import React from 'react'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { presets } from '../../constants/DatepickerPresets'
import { TimeRangeAnalytics } from '../../../DacastSdk/analytics'

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
                            onClick={() => { callback({ value })  } }
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
        <div {...other}>
            {renderDatePresets()}
        </div>
    )
}

DateFilteringAnalytics.defaultProps = {showPreset: true}