import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isMobile } from 'react-device-detect';

export default function ScrollToTop(): void {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
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

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export const randDarkColor = () => {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

export const lightenDarkenColor = (col: string, amt: number) => {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

export const hexToRgbA = (hex: string, alpha: number) => {
    var c: any;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+`,${alpha})`;
    }
    throw new Error('Bad Hex');
}

export function getUrlParam(param: string) {
    param = param.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + param + "=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1]);
}

export const responsiveMenu = () => {

    const navBarWidth = "235px";
    const reduceNavBarWidth = "64px";

    const [isOpen, setOpen] = useState<boolean>(isMobile ? false : window.innerWidth > 1024);
    const [currentNavWidth, setCurrentNavWidth] = useState<string>(isOpen? navBarWidth : isMobile ? "0px" : reduceNavBarWidth);
    const [menuLocked, setMenuLocked] = useState(window.innerWidth > 1024);
    useEffect(() => {
        if(!isMobile) {
            window.addEventListener('resize', (event) => {
                if(window.innerWidth < 1024) {
                    setOpen(false);
                    setMenuLocked(false)
                } else {
                    setOpen(true);
                    setMenuLocked(true)
                }
            }, true);
        }
        return () => {
            window.removeEventListener('resize', (event) => {
                if(window.innerWidth < 1024 ) {
                    setOpen(false);
                    setMenuLocked(false)
                } else {
                    setOpen(true);
                    setMenuLocked(true)
                }
            }, true)
        }
    }, [])



    const calculateNavBarWidth = () => {
        if (isMobile) {
            var width = isOpen ? navBarWidth : "0px";
        } else {
            var width = isOpen ? navBarWidth : reduceNavBarWidth;
        }
        setCurrentNavWidth(width);
    }

    useEffect(() => {
        calculateNavBarWidth();
    }, [isOpen]);


    return {isOpen, currentNavWidth, setOpen, menuLocked, setMenuLocked};
}
