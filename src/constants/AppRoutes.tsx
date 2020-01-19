import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import { LoadingSpinner } from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import Dashboard from '../containers/Dashboard/Dashboard';
import Company from '../containers/Account/Company';
import ApiIntegration from '../containers/Settings/ApiIntegration';
import Profile from '../containers/Account/Profile';
import Uploader from '../containers/Videos/Uploader';
import EncodingRecipes from '../containers/Settings/EncodingRecipes';
import Security from '../containers/Settings/Security';
import EmbedSettings from '../containers/Settings/EmbedSettings';
import VodList from '../containers/Videos/VideosList';
import Billing from '../containers/Account/Billing';
import VodSecurity from '../containers/Videos/Security';
import LiveList from '../containers/Live/List';

/** TO DO: Remove the functional components and import the real one when they're built */


const functionTest1 = () => {
    return (
        <LoadingSpinner size="small" color="dark-violet" />
    )
}

const functionTest2 = () => {
    return (
        <LoadingSpinner size="small" color="red" />
    )
}

const functionTest3 = () => {
    return (
        <LoadingSpinner size="small" color="yellow" />
    )
}

const functionTest4 = () => {
    return (
        <LoadingSpinner size="small" color="green" />
    )
}

const DashboardRender = () => {
    return (
        <Dashboard/>
    )
}

const ApiIntegrationRender = () => {
    return (
        <ApiIntegration/>
    )
}


const LiveChannel = () => {
    return (        
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>LiveChannel</h2>
        </div>
    )
}

const Playlist = () => {
    return (        
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Playlist</h2>
        </div>
    )
}

export const AppRoutes: Routes[] = [   
    {
        path: '/dashboard',
        name: 'Dashboard',
        iconName: 'dashboard',
        component: DashboardRender,
    },
    {
        path: '/livestreams',
        name: 'Live Streams',
        iconName: 'videocam',
        component: LiveList
    },
    {
        path: '/videos',
        name: 'Videos',
        iconName: 'play_arrow',
        component: VodList,
    },
    {
        path: '/folders',
        name: 'Folders',
        iconName: 'folder_open',
        component: functionTest1
    },

    {
        path: '/playlists',
        name: 'Playlists',
        iconName: 'playlist_play',
        component: Playlist
    },
    {
        path: '/analytics',
        name: 'Analytics',
        iconName: 'bar_chart',
        component: null,
        slug: [
            {
                path: '/analytics/dashboard',
                name: 'Dashboard',
                component: functionTest2
            },
            {
                path: '/analytics/realtime',
                name: 'Real Time',
                component: functionTest2
            },
            {
                path: '/analytics/viewership',
                name: 'Viewership',
                component: functionTest2
            },
            {
                path: '/analytics/revenue',
                name: 'Revenue',
                component: functionTest2
            }
        ]
    },
    {
        path: '/monetization',
        name: 'Monetization',
        iconName: 'attach_money',
        component: null,
        slug: [
            {
                path: '/monetization/presets',
                name: 'Presets',
                component: functionTest4
            },
            {
                path: '/monetization/groups',
                name: 'Groups',
                component: functionTest2
            },
            {
                path: '/monetization/balance',
                name: 'Balance',
                component: functionTest2
            }
        ]
    },
    {
        path: 'break',
        name: 'break'
    },
    {
        path: '/settings',
        name: 'Settings',
        iconName: 'settings',
        component: null,
        slug: [
            {
                path: '/settings/encoding',
                name: 'Encoding',
                component: EncodingRecipes
            },
            {
                path: '/mainsettings/deliveryembed',
                name: 'Embed',
                component: EmbedSettings
            },
            {
                path: '/settings/security',
                name: 'Security',
                component: Security
            },
            {
                path: '/settings/apiintegrations',
                name: 'API & Integration',
                component: ApiIntegrationRender
            },

            {
                path: '/settings/theming',
                name: 'Theming',
                component: functionTest4
            },
        ]
    },
    {
        path: '/account',
        name: 'Account',
        iconName: 'person',       
        component: null,
        slug: [
            {
                path: '/account/plans',
                name: 'Plans',
                component: functionTest3
            },
            {
                path: '/account/profile',
                name: 'Profile',
                component: Profile
            },
            {
                path: '/account/company',
                name: 'Company',
                component: Company
            },
            {
                path: '/account/billing',
                name: 'Billing',
                component: Billing
            },
            {
                path: '/account/invoices',
                name: 'Invoices',
                component: functionTest1
            }
        ]
    }
];