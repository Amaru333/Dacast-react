import { useEffect, useState } from "react";
var numeral = require('numeral');
import { DateTime, LocaleOptions } from 'luxon';
import { useLocation } from "react-router-dom";
import { Country } from 'countries-list';

export default function ScrollToTop(): void {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export const dataToTimeVideo = (value: number) => {
    if(!value) {return ''}
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

export const compareValues = (key: string, order: 'asc' | 'desc' = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}


export function readableBytes(size: number): string {
    if (size == 0) {
        return "0";
    }
    var i = Math.floor(Math.log(size) / Math.log(1000));
    return (size / Math.pow(1000, i) * 1 ).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export function tsToLocaleDate(ts: number, options?: LocaleOptions & Intl.DateTimeFormatOptions): string {
    return DateTime.fromSeconds(ts).toLocaleString(options);
}

export function intToTime(num: number) {
    var hours = Math.floor(num / 3600);
    var minutes = Math.floor((num - (hours * 3600)) / 60);
    var seconds = Math.floor(num - (hours * 3600) - (minutes * 60));

    const hoursString = hours >= 10 ? hours : "0" + hours;
    const minutesString = minutes >= 10 ? minutes : "0" + minutes;
    const secondsString = seconds >= 10 ? seconds : "0" + seconds;
    return hoursString + ':' + minutesString + ':' + secondsString;
}

export function getPercentage(num: number, max: number): number {
    var percentage = Math.round((num * 100) / max);
    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }
    return percentage
}

export const replaceAt = (string: string, index: number, replace: string | number) => {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  

export function useEasyOutsideAlerter(ref: React.RefObject<HTMLElement>, callback: Function) {
    function handleClickOutside(event: MouseEvent): void {
        if (ref.current && !ref.current.contains(event.target)) {
            callback()
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}


export function useOutsideAlerter(ref: React.RefObject<HTMLElement>, callback: Function) {
    function handleClickOutside(event: MouseEvent): void {
        if (ref.current && ref.current.offsetParent !== null && event.target instanceof Node && !ref.current.contains(event.target) && !ref.current.offsetParent.contains(event.target)) {
            callback()
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });
}

export function useMedia(query: string) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [matches, query]);

    return matches;
}

export const getNameFromFullPath = (fullPath: string): string => {
    let split = fullPath.split('/').filter(t => t)
    return split[split.length - 1]
}

const roundTo2decimals = (num: number) => {
    return Math.round(num * 100) / 100;
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

/**
 * A linear interpolator for hexadecimal colors
 * @param {String} a
 * @param {String} b
 * @param {Number} amount
 * @example
 * // returns #7F7F7F
 * lerpColor('#000000', '#ffffff', 0.5)
 * @returns {String}
 */
export const lerpColor = (a: string, b: string, amount: number): string => {

    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

export const logScale = (value: number, minp: number, maxp: number, minv: number, maxv: number) => {
    var minv = Math.log(minv);
    var maxv = Math.log(maxv);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return Math.exp(minv + scale * (value - minp));
}

export const mapMarkerNameTranformBytesFromGB = (name: string, value: number) => {
    return name + ': ' + displayBytesForHumans(value, true);
}

export const formateDateFromDatepicker = (dates: { startDate: any; endDate: any }) => {
    return { startDate: dates.startDate.format('x'), endDate: dates.endDate.format('x') }
}


export const convertToCSV = (objArray: any) => {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

export const exportCSVFile = (headers: Object, items: Object[], fileTitle: string) => {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

export const useKeyboardSubmit = (callback: Function) => {
    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                callback()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);
}

export const calculateDiscount = (total: number, discount: number) => {
    if(discount === 0) {
        return total
    } else {
    return total - ((total / 100) * discount)
    }
}

export const calculateAnnualPrice = (total: number) => {
    return total * 12
}

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export const handleDataPrice = (data: number, setDataAmount: Function, setDataPrice: Function) => {
    setDataAmount(data)
    if(data <= 4999 ){
        setDataPrice(0.25)
    } else if(data >= 5000 && data <= 9999){
        setDataPrice(0.12)
    } else if(data >= 10000) {
        setDataPrice(0.09)
    } else {
        setDataPrice(null)
    }
}

export const compareCountries = (a: Country, b: Country) => {
    const countryA = a.name.toUpperCase();
    const countryB = b.name.toUpperCase();

    let comparison = 0
    if (countryA > countryB) {
        comparison = 1;
      } else if (countryA < countryB) {
        comparison = -1;
      }
      return comparison;
}