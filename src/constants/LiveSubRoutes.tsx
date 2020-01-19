import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import LiveGeneral from '../containers/Live/General';

const paywallPlaceholder = () => {
    return (
        <h1>Live Paywall</h1>
    )
}

const advertisingPlaceholder = () => {
    return (
        <h1>Live Advertising</h1>
    )
}

const securityPlaceholder = () => {
    return (
        <h1>Live Security</h1>
    )
}

const themePlaceholder = () => {
    return (
        <h1>Live Theme</h1>
    )
}

export const LiveSubRoutes: Routes[] = [
    {
        path: '/general',
        name: 'General',
        component: LiveGeneral
    },
    {
        path: '/paywall',
        name: 'Paywall',
        component: paywallPlaceholder
    },
    {
        path: '/advertising',
        name: 'Advertising',
        component: advertisingPlaceholder
    },
    {
        path: '/security',
        name: 'Security',
        component: securityPlaceholder
    },
    {
        path: '/theme',
        name: 'Theme',
        component: themePlaceholder
    },
]