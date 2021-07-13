import React from 'react' 
import { connect } from 'react-redux';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MigrationPage } from '../../pages/Migration/MigrationPage';
import { getJobDetailsAction, getJobsListAction, getMigratedUsersListAction, startMigrationJobAction, switchOverUsersAction } from '../../redux-flow/store/Migration/actions';
import { FilteringMigrationState } from '../../pages/Migration/MigrationFilters';


const Migration = (props: MigrationComponentProps) => {
    return <MigrationPage {...props} />
}

export function mapStateToProps(state: AdminState) {
    return {
        migrationData: state.migration
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getJobsList: async (pendingOnly: boolean) => {
            await dispatch(getJobsListAction(pendingOnly));
        },
        getJobDetails: async (jobId: string) => {
            await dispatch(getJobDetailsAction(jobId))
        },
        startJob: async (platform: 'Dacast' | 'Vzaar', usersList: string[], isDifferentialMigrationJob: boolean) => {
            await dispatch(startMigrationJobAction({platform: platform, usersList: usersList, enableDifferential: isDifferentialMigrationJob}))
        },
        switchUsers: async (usersList: string[], jobId: string) => {
            await dispatch(switchOverUsersAction(usersList, jobId))
        },
        getMigratedUsersList: async (filters: FilteringMigrationState & {next: string}) => {
            await dispatch(getMigratedUsersListAction(filters))
        }
    }
}
export type MigrationComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>


export default connect(mapStateToProps, mapDispatchToProps)(Migration)