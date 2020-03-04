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
    start: today,
    end: moment().subtract(1, 'week'),
  },
  {
    text: 'Last 30 days',
    start: today,
    end: moment().subtract(1, 'month'),
  },
  {
    text: 'Last year',
    start: today,
    end: moment().subtract(1, 'year'),
  },
  {
    text: 'This Year',
    start: today,
    end: moment().add(1, 'year'),
  }
]