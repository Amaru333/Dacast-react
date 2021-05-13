import { Routes } from '../containers/Navigation/NavigationTypes';
import DashboardTest from '../containers/Dashboard/DashboardTest';
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
import SettingsEngagement from '../containers/Settings/Engagement';
import Theming from '../containers/Settings/Theming';
import UpgradeContainer from '../containers/Account/Upgrade'
import LiveList from '../containers/Live/List';
import Payout from '../containers/Paywall/Payout';
import Transactions from '../containers/Paywall/Transactions';
import PlaylistList from '../containers/Playlists/List';
import PaywallSettings from '../containers/Paywall/Settings';
import Presets from '../containers/Paywall/Presets';
import PaywallTheming from '../containers/Paywall/Theming';
import PendingOrders from '../containers/Account/PendingOrders';
import Groups from '../containers/Paywall/Groups';
import Login from '../containers/Register/Login/Login';
import ConfirmEmail from '../containers/Register/ConfirmEmail';
import { NotFound } from '../containers/404page';
import { HelpPage } from '../pages/Help/Help';
import Uploader from '../containers/Videos/Uploader';
import ForgotPassword from '../containers/Register/ForgotPassword';
import ChangePassword from '../pages/Register/ResetPassword/ChangePassword';
import { ActivatedAccountPage } from '../pages/Register/ActivatedAccount';
import General from '../containers/Videos/General';
import VodRenditions from '../containers/Videos/Renditions';
import VodTheming from '../containers/Videos/Theming';
import VodSecurity from '../containers/Videos/Security';
import VodEngagement from '../containers/Videos/Engagement';
import Chapters from '../containers/Videos/Chapters';
import VodPaywall from '../containers/Videos/Paywall';
import LiveGeneral  from '../containers/Live/General';
import LiveEngagement  from '../containers/Live/Engagement';
import LiveSecurity from '../containers/Live/Security';
import LiveTheming  from '../containers/Live/Theming';
import LivePaywall from '../containers/Live/Paywall';
import LiveAnalytics from '../containers/Live/Analytics';
import VodAnalytics from '../containers/Videos/Analytics';
import GeneralPlaylist from '../containers/Playlists/General';
import PlaylistSecurity from '../containers/Playlists/Security';
import PlaylistTheming from '../containers/Playlists/Theming';
import Setup from '../containers/Playlists/Setup';
import PlaylistPaywall from '../containers/Playlists/Paywall';
import { ForgotPasswordEmail } from '../pages/Register/ResetPassword/ForgotPasswordEmail';
import Plan from '../containers/Account/Plan';
import { Impersonate } from '../pages/Impersonate/Impersonate';
import ExposList from '../containers/Expos/ExposList';
import GeneralExpos from '../containers/Expos/General';
import ExposSetup from '../containers/Expos/Setup';
import Viewership from '../containers/Analytics/Viewership';
import Revenue from '../containers/Analytics/Revenue';
import DashboardAnalytics from '../containers/Analytics/Dashboard';
import RealTime from '../containers/Analytics/RealTime';
import ActivatedAccount from '../containers/Register/ActivatedAccount';
import Users from '../containers/Account/Users';
import Audience from '../containers/Analytics/Audience';
import Paywall from '../containers/Analytics/Paywall';
import Engagement from '../containers/Analytics/Engagement';
import DataConsumption from '../containers/Analytics/DataConsumption';
import DashboardNew from '../containers/Analytics/DashboardNew';
import AccountSelection from '../containers/Register/AccountSelection';


export const AppRoutes: Routes[] = [
    {
        path:'/login',
        name: 'login',
        isPublic: true,
        notDisplayedInNavigation: true,
        component: Login
    },
    {
        path:'/impersonate',
        name: 'impersonate',
        isPublic: true,
        notDisplayedInNavigation: true,
        component: Impersonate
    },
    {
        path:'/confirm-email',
        name: 'confirm-email',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ConfirmEmail
    },
    {
        path:'/account-activated',
        name: 'account-activated',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ActivatedAccount
    },
    {
        path:'/forgot-password',
        name: 'forgot-password',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ForgotPassword
    },
    {
        path:'/reset-password',
        name: 'reset-password',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ChangePassword
    },
    {
        path:'/forgot-password-email',
        name: 'forgot-password-email',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ForgotPasswordEmail
    },
    {
        path:'/selectAccount',
        name: 'selectAccount',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: AccountSelection
    },
    {
        path: '/livestreams',
        name: 'Live Streams',
        isExact: true,
        associatePrivilege: ['privilege-live'],
        iconName: 'videocam',
        component: LiveList
    },
    {
        path: '/livestreams/:liveId/general',
        name: 'General',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-live'],
        notDisplayedInNavigation: true,
        component: LiveGeneral
    },
    {
        path: '/livestreams/:liveId/paywall',
        name: 'Paywall',
        component: LivePaywall,
        iconName: null,
        isExact: true,
        notDisplayedInNavigation: true,
        associatePrivilege: ['privilege-paywall']
    },
    {
        path: '/livestreams/:liveId/engagement',
        name: 'Engagement',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-live'],
        notDisplayedInNavigation: true,
        component: LiveEngagement,
    },
    {
        path: '/livestreams/:liveId/security',
        name: 'Security',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-live'],
        notDisplayedInNavigation: true,
        component: LiveSecurity
    },
    {
        path: '/livestreams/:liveId/theme',
        name: 'Theme',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-live'],
        notDisplayedInNavigation: true,
        component: LiveTheming
    },
    {
        path: '/livestreams/:liveId/analytics',
        name: 'Analytics',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-analytics'],
        notDisplayedInNavigation: true,
        component: LiveAnalytics
    },
    {
        path: '/videos',
        name: 'Videos',
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        iconName: 'play_arrow',
        component: VodList,
    },
    {
        path: '/videos/:vodId/general',
        name: 'General',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: General,
    },
    {
        path: '/videos/:vodId/chapters',
        name: 'Chapters',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: Chapters,
    },
    {
        path: '/videos/:vodId/paywall',
        name: 'Paywall',
        iconName: null,
        isExact: true,
        notDisplayedInNavigation: true,
        component: VodPaywall,
        associatePrivilege: ['privilege-paywall']
    },
    {
        path: '/videos/:vodId/engagement',
        name: 'Engagement',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: VodEngagement,
    },
    {
        path: '/videos/:vodId/security',
        name: 'Security',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: VodSecurity,
    },
    {
        path: '/videos/:vodId/theme',
        name: 'Theme',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: VodTheming,
    },
    {
        path: '/videos/:vodId/renditions',
        name: 'Renditions',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: VodRenditions,
    },
    {
        path: '/videos/:vodId/analytics',
        name: 'Analytics',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-analytics'],
        notDisplayedInNavigation: true,
        component: VodAnalytics
    },
    {
        path: '/expos/:exposId/general',
        name: 'General',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-expo'],
        notDisplayedInNavigation: true,
        component: GeneralExpos,
    },
    {
        path: '/expos/:exposId/setup',
        name: 'Setup',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-expo'],
        notDisplayedInNavigation: true,
        component: ExposSetup,
    },
    {
        path: '/folders',
        name: 'Folders',
        iconName: 'folder_open',
        associatePrivilege: ['privilege-folders'],
        component: Folders
    },
    {
        path: '/expos',
        name: 'Expos',
        isExact: true,
        iconName: 'desktop_mac',
        associatePrivilege: ['privilege-expo'],
        component: ExposList
    },
    {
        path: '/playlists',
        name: 'Playlists',
        isExact: true,
        iconName: 'playlist_play',
        associatePrivilege: ['privilege-playlists'],
        component: PlaylistList
    },
    {
        path: '/playlists/:playlistId/general',
        name: 'General',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-playlists'],
        notDisplayedInNavigation: true,
        component: GeneralPlaylist
    },
    {
        path: '/playlists/:playlistId/setup',
        name: 'Setup',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-playlists'],
        notDisplayedInNavigation: true,
        component: Setup
    },
    {
        path: '/playlists/:playlistId/paywall',
        name: 'Paywall',
        component: PlaylistPaywall,
        iconName: null,
        isExact: true,
        notDisplayedInNavigation: true,
        associatePrivilege: ['privilege-paywall']
    },
    {
        path: '/playlists/:playlistId/security',
        name: 'Security',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-playlists'],
        notDisplayedInNavigation: true,
        component: PlaylistSecurity
    },
    {
        path: '/playlists/:playlistId/theme',
        name: 'Theme',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-playlists'],
        notDisplayedInNavigation: true,
        component: PlaylistTheming
    },
    {
        path: '/analytics',
        name: 'Analytics',
        iconName: 'bar_chart',
        associatePrivilege: ['privilege-analytics'],
        slug: [
            {
                path: '/analytics/dashboard',
                name: 'Dashboard',
                component: DashboardNew,
            },
            {
                path: '/analytics/data',
                name: 'Data Usage',
                component: DataConsumption,
            },
            {
                path: '/analytics/audience',
                name: 'Audience',
                component: Audience,
            },
            {
                path: '/analytics/engagement',
                name: 'Engagement',
                component: Engagement,
            },
            {
                path: '/analytics/paywall',
                name: 'Paywall',
                component: Paywall,
                associatePrivilege: ['privilege-paywall'],
            },
            {
                path: '/analytics/real-time',
                name: 'Real Time',
                component: RealTime
            }
        ]
    },
    {
        path: '/paywall',
        name: 'Paywall',
        iconName: 'attach_money',
        associatePrivilege: 'privilege-paywall',
        isExact: true,
        component: Presets,
        slug: [
            {
                path: '/paywall/presets',
                name: 'Presets',
                associatePrivilege: ['privilege-paywall'],
                component: Presets
            },
            {
                path: '/paywall/groups',
                name: 'Groups',
                associatePrivilege: ['privilege-paywall'],
                component: Groups
            },
            {
                path: '/paywall/transactions',
                name: 'Transactions',
                associatePrivilege: ['privilege-paywall'],
                component: Transactions
            },
            {
                path: '/paywall/withdrawals',
                name: 'Withdrawals',
                component: Payout,
                associatePrivilege: ['privilege-payment-request']
            },
            {
                path: '/paywall/theming',
                name: 'Theming',
                associatePrivilege: ['privilege-paywall'],
                component: PaywallTheming
            },
            {
                path: '/paywall/settings',
                name: 'Settings',
                associatePrivilege: ['privilege-paywall'],
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
        associatePrivilege: ['privilege-account-settings'],
        slug: [
            {
                path: '/settings/encoding',
                name: 'Encoding',
                component: EncodingRecipes
            },
            {
                path: '/settings/embed',
                name: 'Embed',
                component: EmbedSettings
            },
            {
                path: '/settings/security',
                name: 'Security',
                component: Security
            },
            // {
            //     path: '/settings/integrations',
            //     name: 'Integrations',
            //     component: ApiIntegration,
            //     associatePrivilege: 'privilege-api'
            // },

            {
                path: '/settings/theming',
                name: 'Theming',
                component: Theming
            },
            {
                path: '/settings/engagement',
                name: 'Engagement',
                component: SettingsEngagement
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
                path: '/account/plan',
                name: 'Plan',
                component: Plan,
                associatePrivilege: ['privilege-billing']
            },
            {
                path: '/account/upgrade',
                name: 'Upgrade',
                component: UpgradeContainer
            },
            {
                path: '/account/profile',
                name: 'Profile',
                component: Profile
            },
            {
                path: '/account/company',
                name: 'Company',
                component: Company,
                associatePrivilege: ['privilege-account-settings']
            },
            {
                path: '/account/users',
                name: 'Users',
                component: Users,
                associatePrivilege: ['privilege-multi-access-beta', 'privilege-multi-access']
            },
            {
                path: '/account/billing',
                name: 'Billing',
                component: Billing,
                associatePrivilege: ['privilege-billing']
            },
            // {
            //     path: '/account/pending-orders',
            //     name: 'Pending Orders',
            //     component: PendingOrders
            // },
            {
                path: '/account/invoices',
                name: 'Invoices',
                component: Invoices,
                associatePrivilege: ['privilege-billing']
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
    {
        path: '/',
        name: 'Dashboard',
        iconName: 'dashboard',
        component: DashboardTest,
    },
];
