import React from 'react';
import { isMobile } from 'react-device-detect';

export const responsiveMenu = () => {

    const navBarWidth = "235px";
    const reduceNavBarWidth = "64px";

    const [isOpen, setOpen] = React.useState<boolean>(isMobile ? false : window.innerWidth > 768);
    const [currentNavWidth, setCurrentNavWidth] = React.useState<string>(isOpen? navBarWidth : isMobile ? "0px" : reduceNavBarWidth);

    window.addEventListener('resize', (event) => {
        if(window.innerWidth < 768 ) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, true);

    const calculateNavBarWidth = () => {
        if (isMobile) {
            var width = isOpen ? navBarWidth : "0px";
        } else {
            var width = isOpen ? navBarWidth : reduceNavBarWidth;
        }
        setCurrentNavWidth(width);
    }

    React.useEffect(() => {
        calculateNavBarWidth();
    }, [isOpen]);


    return {isOpen, currentNavWidth, setOpen};
}