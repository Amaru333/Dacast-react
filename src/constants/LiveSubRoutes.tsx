import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import LiveSecurity from '../containers/Live/Security';
import LiveGeneral from '../containers/Live/General';
import LiveTheming from '../containers/Live/Theming';

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
        component: LiveSecurity
    },
    {
        path: '/theme',
        name: 'Theme',
        component: LiveTheming
    },
]