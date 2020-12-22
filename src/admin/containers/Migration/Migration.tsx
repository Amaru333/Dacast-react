import React from 'react' 
import { connect } from 'react-redux';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MigrationPage } from '../../pages/Migration/MigrationPage';
import { MigrationData } from '../../redux-flow/store/Migration/types';
import { getJobDetailsAction, getJobsListAction, startMigrationJobAction } from '../../redux-flow/store/Migration/actions';

export interface MigrationComponentProps {
    migrationData: MigrationData | false;
    getJobsList: () => Promise<void>;
    getJobDetails: (jobId: string) =>  Promise<void>;
    startJob: (platform: 'Dacast' | 'Vzaar', usersList: string[]) => Promise<void>
}

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
        getJobsList: async () => {
            await dispatch(getJobsListAction(undefined));
        },
        getJobDetails: async (jobId: string) => {
            await dispatch(getJobDetailsAction(jobId))
        },
        startJob: async (platform: 'Dacast' | 'Vzaar', usersList: string[]) => {
            dispatch(startMigrationJobAction({platform: platform, usersList: usersList}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Migration)