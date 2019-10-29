import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import { Tab } from '../components/Tab/Tab';
import { LoadingSpinner } from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import StaticCompany from '../containers/Account/StaticCompany';
import { Theme } from '../styled/themes/dacast-theme';
import StaticDashbaord from '../components/StaticDashboard';

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

const Dashboard = (props: any) => {
    return (
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Dashboard</h2>
            <Tab {...props}  list={props.routes} orientation="horizontal" />
        </div>
    )
}

const LiveChannel = (props: any) => {
    return (        
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Account</h2>
            <Tab {...props} list={props.routes} orientation="vertical" />
        </div>
    )
}

const Video = (props: any) => {
    return (        
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Account</h2>
            <Tab {...props} list={props.routes} orientation="vertical" />
        </div>
    )
}

const Playlist = (props: any) => {
    return (        
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Account</h2>
            <Tab {...props} list={props.routes} orientation="vertical" />
        </div>
    )
}

const MainSettings = (props: any) => {
    return (
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Main settings</h2>
            <Tab {...props}  list={props.routes} orientation="vertical" />
        </div>

    )
}

const Account = (props: any) => {

    return (
        <div>
            <Tab {...props} list={props.routes} orientation="vertical" />
        </div>

    )
}

const Admin = (props: any) => {
    return (        
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Account</h2>
            <Tab {...props} list={props.routes} orientation="vertical" />
        </div>
    )
}

export const AppRoutes: Routes[] = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        iconName: 'dashboard',
        component: StaticDashbaord,
        slug: [
            {
                path: '/dashboard/tab1',
                name: 'tab1',
                component: functionTest1
            },
            {
                path: '/dashboard/tab2',
                name: 'tab2',
                component: functionTest2
            }
        ]
    },
    {
        path: '/livechannel',
        name: 'Live Channel',
        iconName: 'videocam',
        component: LiveChannel,
        slug: [
            {
                path: '/livechannel/general',
                name: 'General',
                component: functionTest2
            },
            {
                path: '/livechannel/monetization',
                name: 'Monetization',
                component: functionTest3
            },
            {
                path: '/livechannel/security',
                name: 'Security',
                component: functionTest2
            },
            {
                path: '/livechannel/interactions',
                name: 'Interactions',
                component: functionTest4
            }
        ]
    },
    {
        path: '/video',
        name: 'Video',
        iconName: 'play_arrow',
        component: Video,
        slug: [
            {
                path: '/video/tab1',
                name: 'tab1',
                component: functionTest1
            },
            {
                path: '/video/tab2',
                name: 'tab2',
                component: functionTest3
            }
        ]
    },
    {
        path: '/playlist',
        name: 'playlist',
        iconName: 'playlist_play',
        component: Playlist,
        slug: [
            {
                path: '/playlist/tab1',
                name: 'tab1',
                component: functionTest4
            },
            {
                path: '/playlist/tab2',
                name: 'tab2',
                component: functionTest2
            }
        ]
    },
    {
        path: 'break',
        name: 'break'
    },
    {
        path: 'title',
        name: 'Settings'
    },
    {
        path: '/mainsettings',
        name: 'Main Settings',
        iconName: 'settings',
        component: MainSettings,
        slug: [
            {
                path: '/mainsettings/analytics',
                name: 'Analytics',
                component: functionTest1
            },
            {
                path: '/mainsettings/deliveryembed',
                name: 'Delivery & Embed',
                component: functionTest4
            },
            {
                path: '/mainsettings/security',
                name: 'Security',
                component: functionTest2
            },
            {
                path: '/mainsettings/monetization',
                name: 'Monetization',
                component: functionTest1
            },
            {
                path: '/mainsettings/apiintegrations',
                name: 'API & Integration',
                component: functionTest3
            },
            {
                path: '/mainsettings/encoding',
                name: 'Encoding',
                component: functionTest4
            },
            {
                path: '/mainsettings/interations',
                name: 'Interactions',
                component: functionTest4
            },
            {
                path: '/mainsettings/general',
                name: 'General',
                component: functionTest1
            }
        ]
    },
    {
        path: '/account',
        name: 'Account',
        iconName: 'person',       
        component: Account,
        slug: [
            {
                path: '/account/summary',
                name: 'Summary',
                component: functionTest3
            },
            {
                path: '/account/profile',
                name: 'Profile',
                component: functionTest2
            },
            {
                path: '/account/company',
                name: 'Company',
                component: StaticCompany
            },
            {
                path: '/account/users',
                name: 'Users',
                component: functionTest4
            },
            {
                path: '/account/billing',
                name: 'Billing',
                component: functionTest2
            },
            {
                path: '/account/invoices',
                name: 'Invoices',
                component: functionTest1
            },
            {
                path: '/account/payout',
                name: 'Payout',
                component: functionTest1
            },
            {
                path: '/account/whitelabeling',
                name: 'Whitelabeling',
                component: functionTest3
            },
            {
                path: '/account/encoder',
                name: 'Encoder',
                component: functionTest1
            },
            {
                path: '/account/apis3keys',
                name: 'API & S3 Keys',
                component: functionTest4
            },
            {
                path: '/account/webhooksettings',
                name: 'Webhook Settings',
                component: functionTest3
            },
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        iconName: 'vpn_key',
        component: Admin,
        slug: [
            {
                path: '/admin/bluechip',
                name: 'Blue Chip',
                component: functionTest2
            }
        ]
    },
];