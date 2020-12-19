import Accounts from '../containers/Accounts/Accounts'
import EditPlan from '../containers/Accounts/EditPlan'
import EditAccount from '../containers/Accounts/EditAccount'
import AccountLogs from '../containers/Accounts/Logs'
import AccountAllowances from '../containers/Accounts/Allowances'
import Withdrawals from '../containers/Withdrawals/Withdrawals'
import EditStatus from '../containers/Withdrawals/EditStatus'
import Balances from '../containers/Paywall/Balances'
import Chargebacks from '../containers/Paywall/Chargebacks'
import Login from '../containers/Register/Login'
import Piracy from '../containers/Piracy/Piracy'
import { Routes } from '../shared/Navigation/NavigationTypes'

export const AdminRoutes: Routes[] = [
    {
        path: '/accounts',
        name: 'Accounts',
        iconName: 'account_circle',
        component: Accounts,
        exactPath: true,
        
    },
    {
        path: '/accounts/:accountId/plan',
        name: 'Edit Plan',
        component: EditPlan,
        exactPath: true,
        notDisplayedInNavigation: true
    },
    {
        path: "/accounts/:accountId/edit",
        name: 'Edit Account',
        component: EditAccount,
        exactPath: true,
        notDisplayedInNavigation: true
    },
    {
        path: "/accounts/:accountId/logs",
        name: 'Logs',
        component: AccountLogs,
        exactPath: true,
        notDisplayedInNavigation: true
    },
    {
        path: "/accounts/:accountId/allowances",
        name: 'Allowances',
        component: AccountAllowances,
        exactPath: true,
        notDisplayedInNavigation: true
    },
    {
        path: '/withdrawals',
        name: 'Withdrawals',
        iconName: 'attach_money',
        component: Withdrawals,
        exactPath: true,
    },
    {
        path: '/withdrawals/:withdrawalId/edit',
        name: 'Edit Status',
        component: EditStatus,
        exactPath: true,
        notDisplayedInNavigation: true
    },
    {
        path: '/balances',
        name: 'Balances',
        iconName: 'account_balance',
        component: Balances,
        exactPath: true,
    },
    {
        path: '/debits',
        name: 'Debits',
        iconName: 'credit_card',
        component: Chargebacks,
        exactPath: true,
    },
    {
        path: '/piracy',
        name: 'Piracy',
        iconName: 'security',
        component: Piracy,
        exactPath: true,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        exactPath: true,
        isPublic: true,
        notDisplayedInNavigation: true
    },
]