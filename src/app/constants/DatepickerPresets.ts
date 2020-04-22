import moment from 'moment';

const today = moment();
const yesterday = moment().subtract(1, 'day')
const thisMonth = moment().month()
const thisYear = moment().year()

export const presets = [{
    text: 'Today',
    start: today,
    end: today
},
{
    text: 'Yesterday',
    start: yesterday,
    end: yesterday,
},
{
    text: 'Last 7 days',
    start: moment().subtract(1, 'week'),
    end: today,
},
{
    text: 'Last 30 days',
    start: moment().subtract(1, 'month'),
    end: today,
},
{
    text: 'Month To Date',
    start: moment().date(1).month(thisMonth).year(thisYear),
    end: today,
},
{
    text: 'Year To Date',
    start: moment().date(1).month(0).year(thisYear),
    end: today
}
]