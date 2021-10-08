import { dateAdd } from '../../utils/services/date/dateService';

const today = new Date();

export const presets = [
{
    text: 'common_analytics_time_range_preset_24_hours',
    start: new Date(dateAdd(today, 'day', -1).setHours(0,0,0,0)),
    end: new Date(dateAdd(today, 'day', -1).setHours(23,59,59,999)),
    value: 'LAST_24_HOURS'
},
{
    text: 'common_analytics_time_range_preset_7_days',
    start: dateAdd(today, 'week', -1),
    end: today,
    value: 'LAST_WEEK'
},
{
    text: 'common_analytics_time_range_preset_30_days',
    start: dateAdd(today, 'month', -1),
    end: today,
    value: 'LAST_MONTH'
},
{
    text: 'common_analytics_time_range_preset_6_months',
    start: dateAdd(today, 'month', -6),
    end: today,
    value: 'LAST_6_MONTHS'
},
{
    text: 'common_analytics_time_range_preset_year_to_date',
    start: new Date(new Date().getFullYear(), 0, 1),
    end: today,
    value: 'YEAR_TO_DATE'
},
{
    text: 'common_analytics_time_range_preset_custom',
    start: new Date(new Date().getFullYear(), 0, 1),
    end: today,
    value: 'CUSTOM'
}
]