var numeral = require('numeral');

export const dataToTimeVideo = (value: number) => {
    if(!value) {return '00:00:00'}
    if(typeof value === 'string' || value instanceof String) {return value}
    var hours = Math.floor(value / 3600);
    var minutes = Math.floor((value - (hours * 3600)) / 60);
    var seconds = Math.floor(value - (hours * 3600) - (minutes * 60));

    var timeString = hours.toString().padStart(2, '0') + ':' + 
        minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');
    return timeString;
}

export const inputTimeVideoToTs = (value: string) => {
    var splitValue = value.split(':');
    var hours = parseInt(splitValue[0]) * 3600;
    var min = !splitValue[1] ? 0 : parseInt(splitValue[1]) * 60;
    var sec = !splitValue[2] ? 0 :parseInt(splitValue[2]);
    var total = hours+min+sec;
    return total;
}

export function numberFormatter(num: number, format: 'k' | 'comma' | 'twoDecimalPlace'): string {
    var formatNumeral = ''
    switch (format) {
        case 'k':
            formatNumeral = '0a'
            break;
        case 'comma':
            formatNumeral = '0,0'
            break;
        case 'twoDecimalPlace':
            formatNumeral = '0.00'
            break;
    }
    return numeral(num).format(formatNumeral);
}

export function readableBytes(size: number): string {
    if (size == 0) {
        return "0";
    }
    var i = Math.floor(Math.log(size) / Math.log(1000));
    return (size / Math.pow(1000, i) * 1 ).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}


export function tsToLocaleDate(ts: number, options?: Intl.DateTimeFormatOptions): string {
    if(!options) {
        return new Date(ts * 1000).toLocaleDateString();
    }
    return new Date(ts * 1000).toLocaleString(undefined, options);
}

export function displayTimeForHumans(seconds: number) {
    if (seconds === 0) {
        return '0 sec'
    }
    var days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    var hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    var mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    return (days ? days + " day " : '') + (hrs ? hrs + " hr " : '') + (mnts ? mnts + " min " : '') + (seconds ? seconds + " sec" : '');
}

const formatTimeToUnit = (seconds: number, unit: 's' | 'm' | 'h') => {
    if(!seconds || seconds < 0) {
        return 0
    }

    if(unit === 'h') {
        return Math.floor(seconds / 3600)
    }

    if(unit === 'm') {
        return Math.floor(seconds / 60)
    }

    return seconds
}

export const formatTimeValue = (values: number[]) => {
    const maxValue = values.reduce((acc, next) => {
        if(next > acc) {
            return next
        }
        return acc
    }, 0)

    if(maxValue >= 3600) {
        return {values: values.map(v => formatTimeToUnit(v, 'h')), unitShort: 'h', unitLong: 'Hours'}
    }

    if (maxValue < 3600 && maxValue > 60) {
        return {values: values.map(v => formatTimeToUnit(v, 'm')), unitShort: 'm', unitLong: 'Minutes'}
    }

    return {values: values, unitShort: 's', unitLong: 'Seconds'}
}

export function displayBytesForHumans(mbAmount: number, decimals = 2, fromAnalytics = false) {
    if (fromAnalytics) {
        var bytes = mbAmount * 1000000000;
    } else {
        var bytes = mbAmount * 1000000;
    }
    if (bytes === 0) return '0 Bytes';

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
