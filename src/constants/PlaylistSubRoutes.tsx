import React from 'react';
import { Routes } from '../containers/Navigation/NavigationTypes';
import GeneralPlaylist from '../containers/Playlists/General';
import PlaylistSecurity from '../containers/Playlists/Security';
import Engagement from '../containers/Playlists/Engagement';
import Theming from '../containers/Playlists/Theming';

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
        component: Engagement
    },
    {
        path: '/theme',
        name: 'Theme',
        component: Theming
    },
    {
        path: '/security',
        name: 'Security',
        component: PlaylistSecurity
    },
]