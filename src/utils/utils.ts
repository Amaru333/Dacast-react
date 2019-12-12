import { useEffect, useState } from "react";
var numeral = require('numeral');
import { DateTime } from 'luxon';
import { showToastNotification } from '../redux-flow/store/toasts';
import { store } from '..';

export function numberFormatter(num: number, format: 'k' | 'comma'): string {
    var formatNumeral = ''
    switch(format) {
        case 'k' :
            formatNumeral = '0a'
            break;
        case 'comma' :
            formatNumeral = '0,0'
            break;
    }
    return numeral(num).format(formatNumeral);
}

export function updateClipboard(newClip: string): void {
    navigator.clipboard.writeText(newClip).then(function() {
        store.dispatch(showToastNotification("Copy in clipboard", 'fixed', "success"));
    }, function() {
        store.dispatch(showToastNotification("Failed to copy in clipboard", 'fixed', "error"));
    });
}

export function readableBytes(size: number): string {
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return parseInt(( size / Math.pow(1024, i) ).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export function tsToLocaleDate(ts: number): string {
    return DateTime.fromSeconds(ts).toLocaleString();
}

export function intToTime(num: number) {
    var hours   = Math.floor(num / 3600);
    var minutes = Math.floor((num - (hours * 3600)) / 60);
    var seconds = Math.floor(num - (hours * 3600) - (minutes * 60));

    const hoursString = hours >= 10 ? hours : "0"+hours;
    const minutesString = minutes >= 10 ?  minutes : "0"+minutes;
    const secondsString = seconds >= 10 ? seconds :"0"+seconds;
    return hoursString+':'+minutesString+':'+secondsString;
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