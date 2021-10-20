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
import LiveGeneral from '../containers/Live/General';
import LiveEngagement from '../containers/Live/Engagement';
import LiveSecurity from '../containers/Live/Security';
import LiveTheming from '../containers/Live/Theming';
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
import DesignExpos from '../containers/Expos/Design';
import ExposSetup from '../containers/Expos/Setup';
import RealTime from '../containers/Analytics/RealTime';
import ActivatedAccount from '../containers/Register/ActivatedAccount';
import Users from '../containers/Account/Users';
import Audience from '../containers/Analytics/Audience';
import Paywall from '../containers/Analytics/Paywall';
import Engagement from '../containers/Analytics/Engagement';
import DataConsumption from '../containers/Analytics/DataConsumption';
import DashboardNew from '../containers/Analytics/DashboardNew';
import AnalyticsContent from '../containers/Analytics/Content';
import AccountSelection from '../containers/Register/AccountSelection';
import WebRTC from "../containers/WebRTC/WebRTC";

export const AppRoutes: Routes[] = [
    {
        path: '/login',
        name: 'login',
        isPublic: true,
        notDisplayedInNavigation: true,
        component: Login
    },
    {
        path: '/impersonate',
        name: 'impersonate',
        isPublic: true,
        notDisplayedInNavigation: true,
        component: Impersonate
    },
    {
        path: '/confirm-email',
        name: 'confirm-email',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ConfirmEmail
    },
    {
        path: '/account-activated',
        name: 'account-activated',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ActivatedAccount
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ForgotPassword
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ChangePassword
    },
    {
        path: '/forgot-password-email',
        name: 'forgot-password-email',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: ForgotPasswordEmail
    },
    {
        path: '/selectAccount',
        name: 'selectAccount',
        notDisplayedInNavigation: true,
        isPublic: true,
        component: AccountSelection
    },
    {
        path: '/',
        isExact: true,
        name: 'common_navigation_bar_menu_item_dashboard',
        iconName: 'dashboard',
        component: DashboardTest,
    },
    {
        path: '/livestreams',
        name: 'common_navigation_bar_menu_item_live_streams',
        isExact: true,
        associatePrivilege: ['privilege-live'],
        iconName: 'videocam',
        component: LiveList
    },
    {
        path: '/livestreams/:liveId/general',
        name: 'common_content_tabs_general',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-live'],
        notDisplayedInNavigation: true,
        component: LiveGeneral
    },
    {
        path: '/livestreams/:liveId/paywall',
        name: 'common_navigation_bar_menu_item_paywall',
        component: LivePaywall,
        iconName: null,
        isExact: true,
        notDisplayedInNavigation: true,
        associatePrivilege: ['privilege-paywall']
    },
    {
        path: '/livestreams/:liveId/engagement',
        name: 'common_content_tabs_engagement',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-live'],
        notDisplayedInNavigation: true,
        component: LiveEngagement,
    },
    {
        path: '/livestreams/:liveId/security',
        name: 'common_content_tabs_security',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-live'],
        notDisplayedInNavigation: true,
        component: LiveSecurity
    },
    {
        path: '/livestreams/:liveId/theme',
        name: 'common_content_tabs_theme',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-live'],
        notDisplayedInNavigation: true,
        component: LiveTheming
    },
    {
        path: '/livestreams/:liveId/analytics',
        name: 'common_navigation_bar_menu_item_analytics',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-per-content-analytics'],
        notDisplayedInNavigation: true,
        component: LiveAnalytics
    },
    {
        path: '/videos',
        name: 'common_navigation_bar_menu_item_videos',
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        iconName: 'play_arrow',
        component: VodList,
    },
    {
        path: '/videos/:vodId/general',
        name: 'common_content_tabs_general',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: General,
    },
    {
        path: '/videos/:vodId/chapters',
        name: 'video_chapters_title',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: Chapters,
    },
    {
        path: '/videos/:vodId/paywall',
        name: 'common_navigation_bar_menu_item_paywall',
        iconName: null,
        isExact: true,
        notDisplayedInNavigation: true,
        component: VodPaywall,
        associatePrivilege: ['privilege-paywall']
    },
    {
        path: '/videos/:vodId/engagement',
        name: 'common_content_tabs_engagement',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: VodEngagement,
    },
    {
        path: '/videos/:vodId/security',
        name: 'common_content_tabs_security',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: VodSecurity,
    },
    {
        path: '/videos/:vodId/theme',
        name: 'common_content_tabs_theme',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: VodTheming,
    },
    {
        path: '/videos/:vodId/renditions',
        name: 'video_renditions_title',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-vod'],
        notDisplayedInNavigation: true,
        component: VodRenditions,
    },
    {
        path: '/videos/:vodId/analytics',
        name: 'common_navigation_bar_menu_item_analytics',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-per-content-analytics'],
        notDisplayedInNavigation: true,
        component: VodAnalytics
    },
    {
        path: '/expos/:exposId/general',
        name: 'common_content_tabs_general',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-expo'],
        notDisplayedInNavigation: true,
        component: GeneralExpos,
    },
    {
        path: '/expos/:exposId/setup',
        name: 'common_content_tabs_setup',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-expo'],
        notDisplayedInNavigation: true,
        component: ExposSetup,
    },
    {
        path: '/expos/:exposId/design',
        name: 'expo_tabs_design',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-expo'],
        notDisplayedInNavigation: true,
        component: DesignExpos,
    },
    {
        path: '/folders',
        name: 'common_navigation_bar_menu_item_folders',
        iconName: 'folder_open',
        associatePrivilege: ['privilege-folders'],
        component: Folders
    },
    {
        path: '/expos',
        name: 'common_navigation_bar_menu_item_expos',
        isExact: true,
        iconName: 'desktop_mac',
        associatePrivilege: ['privilege-expo'],
        component: ExposList
    },
    {
        path: '/playlists',
        name: 'common_navigation_bar_menu_item_playlists',
        isExact: true,
        iconName: 'playlist_play',
        associatePrivilege: ['privilege-playlists'],
        component: PlaylistList
    },
    {
        path: '/playlists/:playlistId/general',
        name: 'common_content_tabs_general',
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
        name: 'common_navigation_bar_menu_item_paywall',
        component: PlaylistPaywall,
        iconName: null,
        isExact: true,
        notDisplayedInNavigation: true,
        associatePrivilege: ['privilege-paywall']
    },
    {
        path: '/playlists/:playlistId/security',
        name: 'common_content_tabs_security',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-playlists'],
        notDisplayedInNavigation: true,
        component: PlaylistSecurity
    },
    {
        path: '/playlists/:playlistId/theme',
        name: 'common_content_tabs_theme',
        iconName: null,
        isExact: true,
        associatePrivilege: ['privilege-playlists'],
        notDisplayedInNavigation: true,
        component: PlaylistTheming
    },
    {
        path: '/analytics',
        name: 'common_navigation_bar_menu_item_analytics',
        iconName: 'bar_chart',
        associatePrivilege: ['privilege-analytics'],
        slug: [
            {
                path: '/analytics/dashboard',
                name: 'common_navigation_bar_menu_item_dashboard',
                component: DashboardNew,
            },
            {
                path: '/analytics/data',
                name: 'analytics_data_usage_title',
                component: DataConsumption,
            },
            {
                path: '/analytics/audience',
                name: 'common_analytics_audience_title',
                component: Audience,
            },
            {
                path: '/analytics/content',
                name: 'analytics_content_title',
                component: AnalyticsContent,
            },
            {
                path: '/analytics/engagement',
                name: 'common_content_tabs_engagement',
                component: Engagement,
            },
            {
                path: '/analytics/paywall',
                name: 'common_navigation_bar_menu_item_paywall',
                component: Paywall,
                associatePrivilege: ['privilege-paywall'],
            },
            {
                path: '/analytics/real-time',
                name: 'common_analytics_real_time_title',
                component: RealTime
            }
        ]
    },
    {
        path: '/paywall',
        name: 'common_navigation_bar_menu_item_paywall',
        iconName: 'attach_money',
        associatePrivilege: ['privilege-paywall'],
        isExact: true,
        component: Presets,
        slug: [
            {
                path: '/paywall/presets',
                name: 'paywall_presets_title',
                associatePrivilege: ['privilege-paywall'],
                component: Presets
            },
            {
                path: '/paywall/groups',
                name: 'paywall_groups_title',
                associatePrivilege: ['privilege-paywall'],
                component: Groups
            },
            {
                path: '/paywall/transactions',
                name: 'paywall_transactions_title',
                associatePrivilege: ['privilege-paywall'],
                component: Transactions
            },
            {
                path: '/paywall/withdrawals',
                name: 'paywall_withdrawals_title',
                component: Payout,
                associatePrivilege: ['privilege-payment-request']
            },
            {
                path: '/paywall/theming',
                name: 'paywall_theme_navbar_title',
                associatePrivilege: ['privilege-paywall'],
                component: PaywallTheming
            },
            {
                path: '/paywall/settings',
                name: 'common_navigation_bar_menu_item_settings',
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
        name: 'common_navigation_bar_menu_item_settings',
        iconName: 'settings',
        component: null,
        associatePrivilege: ['privilege-account-settings'],
        slug: [
            {
                path: '/settings/encoding',
                name: 'settings_encoding_navbar_title',
                component: EncodingRecipes
            },
            {
                path: '/settings/embed',
                name: 'settings_embed_title',
                component: EmbedSettings
            },
            {
                path: '/settings/security',
                name: 'common_content_tabs_security',
                component: Security
            },
            {
                path: '/settings/integrations',
                name: 'settings_integration_title',
                component: ApiIntegration,
                associatePrivilege: ['privilege-api-beta', 'privilege-api']
            },

            {
                path: '/settings/theming',
                name: 'paywall_theme_navbar_title',
                component: Theming
            },
            {
                path: '/settings/engagement',
                name: 'common_content_tabs_engagement',
                component: SettingsEngagement
            }
        ]
    },
    {
        path: '/account',
        name: 'common_navigation_bar_menu_item_account',
        iconName: 'person',
        component: null,
        slug: [
            {
                path: '/account/plan',
                name: 'account_plan_title',
                component: Plan,
                associatePrivilege: ['privilege-billing']
            },
            {
                path: '/account/upgrade',
                name: 'common_button_upgrade_text',
                component: UpgradeContainer
            },
            {
                path: '/account/profile',
                name: 'account_profile_title',
                component: Profile
            },
            {
                path: '/account/company',
                name: 'account_company_title',
                component: Company,
                associatePrivilege: ['privilege-account-settings']
            },
            {
                path: '/account/users',
                name: 'account_users_title',
                component: Users,
                associatePrivilege: ['privilege-multi-access-beta', 'privilege-multi-access']
            },
            {
                path: '/account/billing',
                name: 'account_billing_title',
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
                name: 'account_invoices_title',
                component: Invoices,
                associatePrivilege: ['privilege-billing']
            }
        ]
    },
    {
        path: "/livestreaming",
        name: "WebRTC",
        notDisplayedInNavigation: true,
        component: WebRTC,
    },
    {
        path: '/help',
        name: 'Help',
        notDisplayedInNavigation: true,
        component: HelpPage
    },
    {
        path: '/uploader',
        name: 'uploader_title',
        notDisplayedInNavigation: true,
        component: Uploader
    },
    {
        path: '*',
        name: '404',
        isPublic: true,
        notDisplayedInNavigation: true,
        component: NotFound
    },
];
