import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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