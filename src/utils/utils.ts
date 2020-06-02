import { useEffect, useState } from "react";
var numeral = require('numeral');
import { DateTime, LocaleOptions } from 'luxon';
import { Privilege } from '../app/constants/PrivilegesName';
import { getUserInfoItem } from '../app/utils/token';
import { useLocation } from "react-router-dom";

export default function ScrollToTop(): void {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
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

export const getPrivilege = (privilege: Privilege) => {
    //Remove this by updating type on backend
    return getUserInfoItem(privilege) === 'true';
}


export function readableBytes(size: number): string {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return parseInt((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
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
    return Math.round((num * 100) / max);
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
    if(fromAnalytics) {
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

//SOOOO this thing is working, THOOOOO we might need an extra deepth cause at one point converting the map i got some {{objetc, object}}
//Might remove the Class / static function if we don;t need anyting else related to CSV in the app
// I dion't know if we either update the data in the components to fit with this function need or update this function to fix with every need
// Also, we need to find a way to convert timestamp to date, either in this function or in the component. Knowing that this function accept Date object tho
export class CsvService {
    static exportToCsv(filename: string, rows: object[]) {
        if (!rows || !rows.length) {
            return;
        }
        const separator = ',';
        const keys = Object.keys(rows[0]);
        const csvContent =
            keys.join(separator) +
            '\n' +
            rows.map(row => {
                return keys.map(k => {
                    let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                    cell = cell instanceof Date
                        ? cell.toLocaleString()
                        : cell.toString().replace(/"/g, '""');
                    if (cell.search(/("|,|\n)/g) >= 0) {
                        cell = `"${cell}"`;
                    }
                    return cell;
                }).join(separator);
            }).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) {
            //This is to support fucking IE 
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
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

export const calculateDiscount = (total: number) => {
    return total - ((total / 100) * 25)
}

export const calculateAnnualPrice = (total: number) => {
    return total * 12
}

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}