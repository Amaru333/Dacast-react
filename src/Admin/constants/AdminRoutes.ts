import Accounts from '../containers/Accounts/Accounts'
import EditPlan from '../containers/Accounts/EditPlan'

export const AdminRoutes = [
    {
        path: '/accounts',
        name: 'Accounts',
        component: Accounts,
    },
    {
        path: "/accounts/:accountId/plan",
        name: 'Edit Plan',
        component: EditPlan
    }
]