import React from 'react' 
import { PiracyPage } from '../../pages/Piracy/Piracy'
import { connect } from 'react-redux';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { PirateData } from '../../redux-flow/store/Piracy/Piracy/types';
import { getPirateAction } from '../../redux-flow/store/Piracy/Piracy/actions';

export interface PirateComponentProps {
    pirateData: PirateData | false;
    getPirate: (url: string) => Promise<void>;
}

const Piracy = (props: PirateComponentProps) => {
    return <PiracyPage {...props} />
}

export function mapStateToProps(state: AdminState) {
    return {
        pirateData: state.piracy.pirate
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getPirate: async (url: string) => {
            await dispatch(getPirateAction(url));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Piracy)