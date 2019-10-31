import { useEffect, useState } from "react";
var numeral = require('numeral');


export function numberFormatter(num: number, format: 'k' | 'comma') : string {
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

export function getPercentage(num: number, max: number) : number {
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