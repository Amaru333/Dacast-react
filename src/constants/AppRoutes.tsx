import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import { LoadingSpinner } from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import Dashboard from '../containers/Dashboard/Dashboard';
import Company from '../containers/Account/Company';
import ApiIntegration from '../containers/Settings/ApiIntegration';
import Profile from '../containers/Account/Profile';
import EncodingRecipes from '../containers/Settings/EncodingRecipes';
import Security from '../containers/Settings/Security';
import EmbedSettings from '../containers/Settings/EmbedSettings';
import VodList from '../containers/Videos/VideosList';
import Billing from '../containers/Account/Billing';
import Invoices from '../containers/Account/Invoices';
import Interactions from '../containers/Settings/Interactions';
import Theming from '../containers/Settings/Theming';
import Plans from '../containers/Account/Plans'
import LiveList from '../containers/Live/List';
import Payout from '../containers/Paywall/Payout';
import Transactions from '../containers/Paywall/Transactions';
import PlaylistList from '../containers/Playlists/List';
import PaywallSettings from '../containers/Paywall/Settings';
import Presets from '../containers/Paywall/Presets';
import PaywallTheming from '../containers/Paywall/Theming';

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

export const AppRoutes: Routes[] = [   
    {
        path: '/dashboard',
        name: 'Dashboard',
        iconName: 'dashboard',
        component: Dashboard,
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
        component: PlaylistList
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
        path: '/paywall',
        name: 'Paywall',
        iconName: 'attach_money',
        component: null,
        slug: [
            {
                path: '/paywall/presets',
                name: 'Presets',
                component: Presets
            },
            {
                path: '/paywall/groups',
                name: 'Groups',
                component: functionTest2
            },
            {
                path: '/paywall/transactions',
                name: 'Transactions',
                component: Transactions
            },
            {
                path: '/paywall/payout',
                name: 'Payout',
                component: Payout
            },
            {
                path: '/paywall/theming',
                name: 'Theming',
                component: PaywallTheming
            },
            {
                path: '/paywall/settings',
                name: 'Settings',
                component: PaywallSettings
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
                path: '/settings/deliveryembed',
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
                component: ApiIntegration
            },

            {
                path: '/settings/theming',
                name: 'Theming',
                component: Theming
            },
            {
                path: '/settings/Engagement',
                name: 'Engagement',
                component: Interactions
            }
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
                component: Plans
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
                component: Invoices
            }
        ]
    }
];