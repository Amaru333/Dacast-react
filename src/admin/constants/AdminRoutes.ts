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

export const AdminRoutes = [
    {
        path: '/accounts',
        name: 'Accounts',
        component: Accounts,
        exactPath: true,
        displayedInHeadertab: true
    },
    {
        path: '/accounts/:accountId/plan',
        name: 'Edit Plan',
        component: EditPlan,
        exactPath: true
    },
    {
        path: "/accounts/:accountId/edit",
        name: 'Edit Account',
        component: EditAccount,
        exactPath: true
    },
    {
        path: "/accounts/:accountId/logs",
        name: 'Logs',
        component: AccountLogs,
        exactPath: true
    },
    {
        path: "/accounts/:accountId/allowances",
        name: 'Allowances',
        component: AccountAllowances,
        exactPath: true
    },
    {
        path: '/withdrawals',
        name: 'Withdrawals',
        component: Withdrawals,
        exactPath: true,
        displayedInHeadertab: true
    },
    {
        path: '/withdrawals/:withdrawalId/edit',
        name: 'EditStatus',
        component: EditStatus,
        exactPath: true
    },
    {
        path: '/balances',
        name: 'Balances',
        component: Balances,
        exactPath: true,
        displayedInHeadertab: true
    },
    {
        path: '/chargebacks',
        name: 'Chargebacks',
        component: Chargebacks,
        exactPath: true,
        displayedInHeadertab: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        exactPath: true,
        isPublic: true
    },
]