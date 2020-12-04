import moment from 'moment';

const today = moment();
const yesterday = moment().subtract(1, 'day')
const thisMonth = moment().month()
const thisYear = moment().year()

export const presets = [
{
    text: 'Last 24 Hours',
    start: moment().subtract(1, 'day').startOf('day'),
    end: moment().subtract(1, 'day').endOf('day'),
    value: 'LAST_24_HOURS'
},
{
    text: 'Last 7 Days',
    start: moment().subtract(1, 'week'),
    end: today,
    value: 'LAST_WEEK'
},
{
    text: 'Last 30 Days',
    start: moment().subtract(1, 'month'),
    end: today,
    value: 'LAST_MONTH'
},
{
    text: 'Last 6 Months',
    start: moment().date(1).month(thisMonth).year(thisYear),
    end: today,
    value: 'LAST_6_MONTHS'
},
{
    text: 'Year To Date',
    start: moment().date(1).month(0).year(thisYear),
    end: today,
    value: 'YEAR_TO_DATE'
},
{
    text: 'Custom',
    start: moment().date(1).month(0).year(thisYear),
    end: today,
    value: 'CUSTOM'
}
]