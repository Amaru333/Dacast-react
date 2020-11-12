import React from 'react'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { DateRangePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateRangePickerWrapper'
import { presets } from '../../constants/DatepickerPresets'
import moment from 'moment'
import { TimeRangeAnalytics } from '../../../DacastSdk/analytics'

interface DateFilteringAnalyticsProps {
    defaultDates: { end: number; start: number }, 
    callback?: (dates: {startDate?: number; endDate?: number, value?: TimeRangeAnalytics}) => void,
    showPreset?: boolean
}

export const DateFilteringAnalytics = (props: React.HTMLAttributes<HTMLDivElement> & DateFilteringAnalyticsProps) => {

    var { showPreset, callback, defaultDates, ...other } = props;

    const [dates, setDates] = React.useState<{ start: any; end: any }>({ start: props.defaultDates.start, end: props.defaultDates.end })

    const formateDateFromDatepicker = (dates: { startDate: any; endDate: any }) => {
        return { startDate: dates.startDate.format('x'), endDate: dates.endDate.format('x') }
    }

    const renderDatePresets = () => {
        return showPreset ? (
            <div>
                {presets.map(({ text, start, end, value }) => {
                    return (
                        <Button
                            key={text}
                            className='ml1 mb2'
                            typeButton='secondary'
                            buttonColor='blue'
                            sizeButton='small'
                            onClick={() => { setDates({ start, end }); props.callback({ value })  } }
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
            <DateRangePickerWrapper disabled callback={(dates) => props.callback(formateDateFromDatepicker(dates))} dates={{ startDate: moment().subtract(1, 'week'), endDate: moment()}} className="inline" presets={presets} />
        </div>
    )
}

DateFilteringAnalytics.defaultProps = {showPreset: true}