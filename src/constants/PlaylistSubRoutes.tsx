import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import GeneralPlaylist from '../containers/Playlists/General';
import PlaylistSecurity from '../containers/Playlists/Security';

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

const themePlaceholder = () => {
    return (
        <h1>Live Theme</h1>
    )
}

const setupPlaceholder = () => {
    return (
        <h1>Setup</h1>
    )
}

export const PlaylistSubRoutes: Routes[] = [
    {
        path: '/general',
        name: 'General',
        component: GeneralPlaylist
    },
    {
        path: '/setup',
        name: 'Setup',
        component: setupPlaceholder
    },
    {
        path: '/engagement',
        name: 'Engagement',
        component: advertisingPlaceholder
    },
    {
        path: '/theme',
        name: 'Theme',
        component: themePlaceholder
    },
    {
        path: '/security',
        name: 'Security',
        component: PlaylistSecurity
    },
]