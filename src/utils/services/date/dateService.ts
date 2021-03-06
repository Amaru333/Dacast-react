//Replacement for function moment()
export const getCurrentTs = ( format: 'ms' | 's' ) => {
    if(format === 's') {
        return Math.floor(Date.now() / 1000)
    } else {
        return Date.now();
    }
}

//Replacement for function moment().tz().guess()
//Offset is weird
export const guessTimezone = (offset: boolean = true) => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export const getTimezoneOffsetInSecs = (tzCode: string, date: Date) => {
    const tzDate = date || new Date()
    const day = tzDate.getFullYear() + "/" + (tzDate.getMonth() + 1) + "/" + tzDate.getDate()
    const datetime = `${day} 00:00:00 +0000`
    const timezoneDate = new Date(new Date(datetime).toLocaleString('en-US', {timeZone: tzCode || 'UTC'})) // DST Aware
    const gmtDate = new Date(new Date(datetime).toLocaleString('en-US', {timeZone: 'Etc/GMT'})) // Ignores DST
    return (timezoneDate - gmtDate) / 1000
}


export const inputTimeToTs = (value: string, timezoneName: string, date?: Date) => {
    const offset = getTimezoneOffsetInSecs(timezoneName, date)
    let splitValue = value.split(':')
    let hours = parseInt(splitValue[0]) * 3600
    if (isNaN(hours)) {
        hours = 0
    }
    let min = !splitValue[1] ? 0 : parseInt(splitValue[1]) * 60
    if (isNaN(min)) {
        min = 0
    }
    let total = offset <= 0 ? hours + min + Math.abs(offset) : hours + min - offset
    return total
}

export const tsToInputTime = (value: number, timezoneName?: string, date?: Date) => {
    const offset = getTimezoneOffsetInSecs(timezoneName, date)
    let total = offset <= 0 ? value - Math.abs(offset) : value + offset
    return total
}


export const tsToUtc = (value: number, timezoneName?: string, date?: Date) => {
    const offset = getTimezoneOffsetInSecs(timezoneName, date)
    let total = offset <= 0 ? value + Math.abs(offset) : value - offset
    return total
}


/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 *
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
export const dateAdd = (date: Date, interval: 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second', units: number) => {
    if (!(date instanceof Date))
        return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
    switch (String(interval).toLowerCase()) {
        case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
        case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
        case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
        case 'week': ret.setDate(ret.getDate() + 7 * units); break;
        case 'day': ret.setDate(ret.getDate() + units); break;
        case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
        case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
        case 'second': ret.setTime(ret.getTime() + units * 1000); break;
        default: ret = undefined; break;
    }
    return ret;
}

export const utcOffsetToMin = (offset: string) => {
    let [h, m] = offset.split(':');

    let hours = Number.parseInt(h);
    let minutes = Number.parseInt(m);

    return hours * 60 + (hours < 0 ? (-minutes) : minutes);
}

export const getNbDaysForMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
}

export const formatTsToMs = (ts: number): number => {
    let startTime = 0
    const HUNDRED_YEARS = 100 * 365 * 24 * 3600
    if(ts < HUNDRED_YEARS * Date.now() / 1000) {
        return startTime = ts
    }
    return startTime = ts * 1000
}