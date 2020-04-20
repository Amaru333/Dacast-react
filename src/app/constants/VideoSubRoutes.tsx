import { Routes } from '../containers/Navigation/NavigationTypes';
import VodSecurity from '../containers/Videos/Security';
import General from '../containers/Videos/General';
import Chapters from '../containers/Videos/Chapters';
import VodRenditions from '../containers/Videos/Renditions';
import VodTheming from '../containers/Videos/Theming';
import VodEngagement from '../containers/Videos/Engagement';
import VodPaywall from '../containers/Videos/Paywall';

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
        component: VodPaywall,
        associatePrivilege: 'privilege-paywall'
    },
    {
        path: '/engagement',
        name: 'Engagement',
        iconName: null,
        component: VodEngagement
    },
    {
        path: '/security',
        name: 'Security',
        iconName: null,
        component: VodSecurity,
    },
    {
        path: '/theme',
        name: 'Theme',
        iconName: null,
        component: VodTheming,
    },
    {
        path: '/renditions',
        name: 'Renditions',
        iconName: null,
        component: VodRenditions,
    }

];