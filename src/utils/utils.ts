import { useEffect, useState } from "react";
var numeral = require('numeral');
import { DateTime, LocaleOptions } from 'luxon';
import { showToastNotification } from '../redux-flow/store/Toasts';
import { updateTitle } from '../redux-flow/store/Title/logic';
import { store } from '..';

export function numberFormatter(num: number, format: 'k' | 'comma'): string {
    var formatNumeral = ''
    switch (format) {
        case 'k':
            formatNumeral = '0a'
            break;
        case 'comma':
            formatNumeral = '0,0'
            break;
    }
    return numeral(num).format(formatNumeral);
}

export function updateClipboard(newClip: string): void {
    navigator.clipboard.writeText(newClip).then(function () {
        store.dispatch(showToastNotification("Copy in clipboard", 'fixed', "success"));
    }, function () {
        store.dispatch(showToastNotification("Failed to copy in clipboard", 'fixed', "error"));
    });
}

export function updateTitleApp(title: string): void {
    store.dispatch(updateTitle(title))
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

export function useOutsideAlerter(ref: React.RefObject<HTMLElement>, callback: Function) {
    function handleClickOutside(event: MouseEvent): void {
        if (ref.current && ref.current.offsetParent !== null && event.target instanceof Node && !ref.current.contains(event.target) && !ref.current.offsetParent.contains(event.target)) {
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

const roundTo2decimals = (num) => {
    return Math.round(num * 100) / 100;
}

export function displayTimeForHumans(seconds) {
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

export function displayBytesForHumans(mbAmount, fromGB = false) {
    //amount in MB
    let units = ['MB', 'GB', 'TB'];
    if (fromGB) {
        units.shift()
    }
    let i = 0;

    while (units[i] !== undefined) {
        if (mbAmount < 1000) {
            return roundTo2decimals(mbAmount) + ' ' + units[i];
        }
        mbAmount /= 1000;
        i++;
    }
    return roundTo2decimals(mbAmount * 1000) + ' ' + units[units.length - 1]
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
export const lerpColor = (a, b, amount) =>{ 

    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

export const logScale= (value, minp, maxp, minv, maxv) => {
    var minv = Math.log(minv);
    var maxv = Math.log(maxv);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return Math.exp(minv + scale * (value - minp));
}

export const mapMarkerNameTranformBytesFromGB = (name, value, datasetName) => {
    return name + ': ' + displayBytesForHumans(value, true);
}