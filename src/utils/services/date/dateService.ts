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
    return Intl.DateTimeFormat().resolvedOptions().timeZone + offset ? `(-(${new Date().getTimezoneOffset() / 60}) )` : '';
}

export const formatTimezone = () => {

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