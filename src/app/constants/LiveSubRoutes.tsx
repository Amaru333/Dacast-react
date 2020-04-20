import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import LiveSecurity from '../containers/Live/Security';
import LiveGeneral from '../containers/Live/General';
import LiveTheming from '../containers/Live/Theming';
import LiveEngagement  from '../containers/Live/Engagement';
import LivePaywall from '../containers/Live/Paywall';

export const LiveSubRoutes: Routes[] = [
    {
        path: '/general',
        name: 'General',
        component: LiveGeneral
    },
    {
        path: '/paywall',
        name: 'Paywall',
        component: LivePaywall,
        associatePrivilege: 'privilege-paywall'
    },
    {
        path: '/engagement',
        name: 'Engagement',
        component: LiveEngagement,
        associatePrivilege: 'privilege-advertising'
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