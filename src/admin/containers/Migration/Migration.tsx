import React from 'react' 
import { connect } from 'react-redux';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MigrationPage } from '../../pages/Migration/MigrationPage';
import { MigrationData } from '../../redux-flow/store/Migration/types';
import { getJobsListAction } from '../../redux-flow/store/Migration/actions';

export interface MigrationComponentProps {
    migrationData: MigrationData | false;
    getJobsList: () => Promise<void>;
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Migration)