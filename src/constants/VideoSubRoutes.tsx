import { Routes } from '../containers/Navigation/NavigationTypes';
import VodSecurity from '../containers/Videos/Security';
import General from '../containers/Videos/General';
import Chapters from '../containers/Videos/Chapters';
import React from 'react';

const VodPaywallPlaceholder = () => {
    return (
        <h1>VOD Paywall</h1>
    )
}

const VodAdvertisingPlaceholder = () => {
    return (
        <h1>VOD Advertising</h1>
    )
}

const VodThemePlaceholder = () => {
    return (
        <h1>VOD Theme</h1>
    )
}

const VodRenditionsPlaceholder = () => {
    return (
        <h1>VOD Renditions</h1>
    )
}

export const VideoSubRoutes: Routes[] = [   
    {
        path: '/general',
        name: 'General',
        iconName: null,
        component: General,
    },
    {
        path: '/chapters',
        name: 'Chapters',
        iconName: null,
        component: Chapters,
    },
    {
        path: '/paywall',
        name: 'Paywall',
        iconName: null,
        component: VodPaywallPlaceholder,
    },
    {
        path: '/advertising',
        name: 'Advertising',
        iconName: null,
        component: VodAdvertisingPlaceholder,
    },
    {
        path: '/security',
        name: 'Security',
        iconName: null,
        component: VodSecurity,
    },
    {
        path: '/theme',
        name: 'Theme',
        iconName: null,
        component: VodThemePlaceholder,
    },
    {
        path: '/renditions',
        name: 'Renditions',
        iconName: null,
        component: VodRenditionsPlaceholder,
    },
];