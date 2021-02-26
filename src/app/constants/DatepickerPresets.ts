import { dateAdd } from '../../utils/services/date/dateService';

const today = new Date();

export const presets = [
{
    text: 'Last 24 Hours',
    start: new Date(dateAdd(today, 'day', -1).setHours(0,0,0,0)),
    end: new Date(dateAdd(today, 'day', -1).setHours(23,59,59,999)),
    value: 'LAST_24_HOURS'
},
{
    text: 'Last 7 Days',
    start: dateAdd(today, 'week', -1),
    end: today,
    value: 'LAST_WEEK'
},
{
    text: 'Last 30 Days',
    start: dateAdd(today, 'month', -1),
    end: today,
    value: 'LAST_MONTH'
},
{
    text: 'Last 6 Months',
    start: dateAdd(today, 'month', -6),
    end: today,
    value: 'LAST_6_MONTHS'
},
{
    text: 'Year To Date',
    start: new Date(new Date().getFullYear(), 0, 1),
    end: today,
    value: 'YEAR_TO_DATE'
},
{
    text: 'Custom',
    start: new Date(new Date().getFullYear(), 0, 1),
    end: today,
    value: 'CUSTOM'
}
]