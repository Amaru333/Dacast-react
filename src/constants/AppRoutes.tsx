import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import { Tab } from '../components/Tab/Tab';
import { LoadingSpinner } from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import Dashboard from '../containers/Dashboard/Dashboard';
import Company from '../containers/Account/Company';
import { Theme } from '../styled/themes/dacast-theme';
import ApiIntegration from '../containers/Settings/ApiIntegration/ApiIntegration';

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

const DashboardRender = (props: any) => {
    return (
        <Dashboard/>
    )
}

const ApiIntegrationRender = (props: any) => {
    return (
        <ApiIntegration/>
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
    {
        path: '/dashboard',
        name: 'Dashboard',
        iconName: 'dashboard',
        component: DashboardRender,
    },
    {
        path: '/channels',
        name: 'Channels',
        iconName: 'videocam',
        component: LiveChannel,
        slug: [
            {
                path: '/channels/general',
                name: 'General',
                component: functionTest2
            },
            {
                path: '/channels/monetization',
                name: 'Monetization',
                component: functionTest3
            },
            {
                path: '/channels/security',
                name: 'Security',
                component: functionTest2
            },
            {
                path: '/channels/interactions',
                name: 'Interactions',
                component: functionTest4
            }
        ]
    },
    {
        path: '/videos',
        name: 'Videos',
        iconName: 'play_arrow',
        component: Video,
        slug: [
            {
                path: '/videos/tab1',
                name: 'tab1',
                component: functionTest1
            },
            {
                path: '/videos/tab2',
                name: 'tab2',
                component: functionTest3
            }
        ]
    },
    {
        path: '/folders',
        name: 'Folders',
        iconName: 'folder_open',
        component: Video,
        slug: [
            {
                path: '/folders/tab1',
                name: 'tab1',
                component: functionTest1
            },
            {
                path: '/folders/tab2',
                name: 'tab2',
                component: functionTest3
            }
        ]
    },
    {
        path: '/playlists',
        name: 'Playlists',
        iconName: 'playlist_play',
        component: Playlist,
        slug: [
            {
                path: '/playlists/tab1',
                name: 'tab1',
                component: functionTest4
            },
            {
                path: '/playlists/tab2',
                name: 'tab2',
                component: functionTest2
            }
        ]
    },
    {
        path: '/monetization',
        name: 'Monetization',
        iconName: 'attach_money',
        component: Playlist,
        slug: [
            {
                path: '/monetization/tab1',
                name: 'tab1',
                component: functionTest4
            },
            {
                path: '/monetization/tab2',
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
                component: ApiIntegrationRender
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
                component: Company
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
];