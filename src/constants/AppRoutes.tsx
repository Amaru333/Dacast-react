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

const MainSettings = () => {
    return <h2 style={{margin: 'auto', width: '50%'}}>MainSettings</h2>
}

const Account = () => {
    return <h2 style={{margin: 'auto', width: '50%'}}>Account</h2>
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
                path: '/livechannel/tab1',
                name: 'tab1'
            },
            {
                path: '/livechannel/tab2',
                name: 'tab2'
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
                path: '/mainsettings/tab1',
                name: 'tab1'
            },
            {
                path: '/mainsettings/tab2',
                name: 'tab2'
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
                path: '/account/tab1',
                name: 'tab1'
            },
            {
                path: '/account/tab2',
                name: 'tab2'
            }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        iconName: 'vpn_key',
        component: Admin,
        slug: [
            {
                path: '/admin/tab1',
                name: 'tab1'
            },
            {
                path: '/admin/tab2',
                name: 'tab2'
            }
        ]
    },
];