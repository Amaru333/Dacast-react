import Accounts from '../containers/Accounts/Accounts'
import EditPlan from '../containers/Accounts/EditPlan'
import EditAccount from '../containers/Accounts/EditAccount'
import AccountLogs from '../containers/Accounts/Logs'
import AccountAllowances from '../containers/Accounts/Allowances'
import Withdrawals from '../containers/Withdrawals/Withdrawals'
import EditStatus from '../containers/Withdrawals/EditStatus'

export const AdminRoutes = [
    {
        path: '/',
        name: 'root',
        component: Accounts,
        exactPath: true
    },
    {
        path: '/accounts',
        name: 'Accounts',
        component: Accounts,
        exactPath: true
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
        exactPath: true
    },
    {
        path: '/withdrawals/:withdrawalId/edit',
        name: 'EditStatus',
        component: EditStatus,
        exactPath: true
    },
]