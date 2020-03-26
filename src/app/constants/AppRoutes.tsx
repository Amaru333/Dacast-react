import { Routes } from '../containers/Navigation/NavigationTypes';
import Dashboard from '../containers/Dashboard/Dashboard';
import Company from '../containers/Account/Company';
import ApiIntegration from '../containers/Settings/ApiIntegration';
import Profile from '../containers/Account/Profile';
import EncodingRecipes from '../containers/Settings/EncodingRecipes';
import Security from '../containers/Settings/Security';
import EmbedSettings from '../containers/Settings/EmbedSettings';
import VodList from '../containers/Videos/VideosList';
import Billing from '../containers/Account/Billing';
import Folders from '../containers/Folders/Folders';
import Invoices from '../containers/Account/Invoices';
import Interactions from '../containers/Settings/Interactions';
import Theming from '../containers/Settings/Theming';
import PlansContainer from '../containers/Account/Plans'
import LiveList from '../containers/Live/List';
import Payout from '../containers/Paywall/Payout';
import Transactions from '../containers/Paywall/Transactions';
import PlaylistList from '../containers/Playlists/List';
import PaywallSettings from '../containers/Paywall/Settings';
import Presets from '../containers/Paywall/Presets';
import PaywallTheming from '../containers/Paywall/Theming';
import PendingOrders from '../containers/Account/PendingOrders';
import Groups from '../containers/Paywall/Groups';
import Viewership from '../containers/Analytics/Viewership';
import Revenue from '../containers/Analytics/Revenue';
import DashboardAnalytics from '../containers/Analytics/Dashboard';
import RealTime from '../containers/Analytics/RealTime';
import Login from '../containers/Register/Login/Login';
import SignUp from '../containers/Register/SignUp/SignUp';
import ConfirmEmail from '../containers/Register/ConfirmEmail';
import { NotFound } from '../containers/404page';
import { HelpPage } from '../pages/Help/Help';
import Uploader from '../containers/Videos/Uploader';
import ResetPassword from '../containers/Register/ResetPassword';
import { ChangePassword } from '../pages/Register/ResetPassword/ChangePassword';

export const AppRoutes: Routes[] = [   
    {
        path:'/login',
        name: 'login',
        isPublic: true,
        notDisplayedInNavigation: true,
        component: Login
    },
    {
        path:'/signup',
        name: 'signup',
        isPublic: true,
        notDisplayedInNavigation: true,
        component: SignUp
    },
    {
        path:'/confirm-email',
        name: 'confirm-email',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ConfirmEmail
    },
    {
        path:'/reset-password',
        name: 'reset-password',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ResetPassword
    },
    {
        path:'/change-password',
        name: 'change-password',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ChangePassword
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        iconName: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/livestreams',
        name: 'Live Streams',
        isExact: true,
        iconName: 'videocam',
        component: LiveList
    },
    {
        path: '/videos',
        name: 'Videos',
        isExact: true,
        iconName: 'play_arrow',
        component: VodList,
    },
    {
        path: '/folders',
        name: 'Folders',
        iconName: 'folder_open',
        component: Folders
    },

    {
        path: '/playlists',
        name: 'Playlists',
        isExact: true,
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
                component: DashboardAnalytics
            },
            {
                path: '/analytics/realtime',
                name: 'Real Time',
                component: RealTime
            },
            {
                path: '/analytics/viewership',
                name: 'Viewership',
                component: Viewership
            },
            {
                path: '/analytics/revenue',
                name: 'Revenue',
                component: Revenue
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
                component: Groups
            },
            {
                path: '/paywall/transactions',
                name: 'Transactions',
                component: Transactions
            },
            {
                path: '/paywall/withdrawals',
                name: 'Withdrawals',
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
                name: 'API & Integrations',
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
                component: PlansContainer
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
                path: '/account/pendingorders',
                name: 'Pending Orders',
                component: PendingOrders
            },
            {
                path: '/account/invoices',
                name: 'Invoices',
                component: Invoices
            }
        ]
    },
    {
        path: '/help',
        name: 'Help',
        notDisplayedInNavigation: true,
        component: HelpPage
    },
    {
        path: '/uploader',
        name: 'Uploader',
        notDisplayedInNavigation: true,
        component: Uploader
    },
    {
        path:'*',
        name: '404',
        isPublic: true,
        notDisplayedInNavigation: true,
        component: NotFound
    },
];