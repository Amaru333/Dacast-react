import React from 'react';
import { isMobile } from 'react-device-detect';

export const responsiveMenu = () => {

    const navBarWidth = "235px";
    const reduceNavBarWidth = "64px";

    const [isOpen, setOpen] = React.useState<boolean>(isMobile ? false : window.innerWidth > 1024);
    const [currentNavWidth, setCurrentNavWidth] = React.useState<string>(isOpen? navBarWidth : isMobile ? "0px" : reduceNavBarWidth);
    const [menuLocked, setMenuLocked] = React.useState(window.innerWidth > 1024);
    React.useEffect(() => {
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

    React.useEffect(() => {
        calculateNavBarWidth();
    }, [isOpen]);


    return {isOpen, currentNavWidth, setOpen, menuLocked, setMenuLocked};
}