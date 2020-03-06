import moment from 'moment';

const today = moment();
const tomorrow = moment().add(1, 'day');

export const presets = [{
    text: 'Today',
    start: today,
    end: today
},
{
    text: 'Tomorrow',
    start: tomorrow,
    end: tomorrow,
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
    text: 'Last year',
    start: moment().subtract(1, 'year'),
    end: today,
},
{
    text: 'This Year',
    start: today,
    end: moment().add(1, 'year'),
}
]