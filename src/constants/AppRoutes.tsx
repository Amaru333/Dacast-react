import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import { Tab } from '../components/Tab/Tab';
import { LoadingSpinner } from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

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
    const tabsName = props.routes.map((item: any) => {
        return item.name
    })
    return (
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Dashboard</h2>
            <Tab list={tabsName} orientation="horizontal" contentList={[functionTest1, functionTest2, functionTest3, functionTest4]} />
        </div>

    )
}

const LiveChannel = () => {
    return <h2 style={{margin: 'auto', width: '50%'}}>LiveChannel</h2>
}

const Video = () => {
    return <h2 style={{margin: 'auto', width: '50%'}}>Video</h2>
}

const Playlist = () => {
    return <h2 style={{margin: 'auto', width: '50%'}}>Playlist</h2>
}

const MainSettings = (props: any) => {
    const tabsName = props.routes.map((item: any) => {
        return item.name
    })
    return (
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Main settings</h2>
            <Tab list={tabsName} orientation="vertical" contentList={[functionTest1, functionTest2, functionTest3, functionTest4, functionTest1, functionTest2, functionTest3, functionTest4, functionTest4, functionTest4, functionTest4]} />
        </div>

    )
}

const Account = (props: any) => {
    const tabsName = props.routes.map((item: any) => {
        return item.name
    })
    return (
        <div style={{margin: 'auto', width: '50%'}}>
            <h2>Account</h2>
            <Tab list={tabsName} orientation="vertical" contentList={[functionTest1, functionTest2, functionTest3, functionTest4, functionTest1, functionTest2, functionTest3, functionTest4, functionTest4, functionTest4, functionTest4]} />
        </div>

    )
}

const Admin = () => {
    return <h2 style={{margin: 'auto', width: '50%'}}>Admin</h2>
}

export const AppRoutes:Array<Routes> = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        iconName: 'dashboard',
        component: Dashboard,
        slug: [
            {
                path: '/dashboard/tab1',
                name: 'tab1'
            },
            {
                path: '/dashboard/tab2',
                name: 'tab2'
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
                name: 'General'
            },
            {
                path: '/livechannel/monetization',
                name: 'Monetization'
            },
            {
                path: '/livechannel/security',
                name: 'Security'
            },
            {
                path: '/livechannel/interactions',
                name: 'Interactions'
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
                name: 'tab1'
            },
            {
                path: '/video/tab2',
                name: 'tab2'
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
                name: 'tab1'
            },
            {
                path: '/playlist/tab2',
                name: 'tab2'
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
                name: 'Analytics'
            },
            {
                path: '/mainsettings/deliveryembed',
                name: 'Delivery & Embed'
            },
            {
                path: '/mainsettings/security',
                name: 'Security'
            },
            {
                path: '/mainsettings/monetization',
                name: 'Monetization'
            },
            {
                path: '/mainsettings/apiintegrations',
                name: 'API & Integration'
            },
            {
                path: '/mainsettings/encoding',
                name: 'Encoding'
            },
            {
                path: '/mainsettings/interations',
                name: 'Interactions'
            },
            {
                path: '/mainsettings/general',
                name: 'General'
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
                name: 'Summary'
            },
            {
                path: '/account/profile',
                name: 'Profile'
            },
            {
                path: '/account/company',
                name: 'Company'
            },
            {
                path: '/account/users',
                name: 'Users'
            },
            {
                path: '/account/billing',
                name: 'Billing'
            },
            {
                path: '/account/invoices',
                name: 'Invoices'
            },
            {
                path: '/account/payout',
                name: 'Payout'
            },
            {
                path: '/account/whitelabeling',
                name: 'Whitelabeling'
            },
            {
                path: '/account/encoder',
                name: 'Encoder'
            },
            {
                path: '/account/apis3keys',
                name: 'API & S3 Keys'
            },
            {
                path: '/account/webhooksettings',
                name: 'Webhook Settings'
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
                name: 'Blue Chip'
            }
        ]
    },
];