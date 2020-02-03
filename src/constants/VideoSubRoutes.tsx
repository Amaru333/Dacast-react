import { Routes } from '../containers/Navigation/NavigationTypes';
import VodSecurity from '../containers/Videos/Security';
import General from '../containers/Videos/General';
import Chapters from '../containers/Videos/Chapters';
import VodRenditions from '../containers/Videos/Renditions';
import React from 'react';
import VodTheming from '../containers/Videos/Theming';
import { VodEngagement } from '../containers/Videos/Engagement';

const VodPaywallPlaceholder = () => {
    return (
        <h1>VOD Paywall</h1>
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
        path: '/engagement',
        name: 'Engagement',
        iconName: null,
        component: VodEngagement,
    },
    {
        path: '/security',
        name: 'Security',
        iconName: null,
        component: VodSecurity,
    },
    {
        path: '/renditions',
        name: 'Renditions',
        iconName: null,
        component: VodRenditions,
    },
    {
        path: '/theme',
        name: 'Theme',
        iconName: null,
        component: VodTheming,
    },

];