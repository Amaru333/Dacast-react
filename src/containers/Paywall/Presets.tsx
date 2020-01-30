import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PresetsPage } from '../../pages/Paywall/Presets/Presets';
import { getPresetsInfosAction, Action, PresetsPageInfos } from '../../redux-flow/store/Paywall/Presets';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface PresetsComponentProps {
    presetsInfos: PresetsPageInfos;
    getPresetsInfos: Function;
}

const Presets = (props: PresetsComponentProps) => {

    React.useEffect(() => {
        if(!props.presetsInfos) {
            props.getPresetsInfos()
        }
    }, [props.presetsInfos])

    return (
        props.presetsInfos ?
            <PresetsPage {...props} />
            : <LoadingSpinner size='large' color='blue' />
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        presetsInfos: state.paywall.presets
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPresetsInfos: () => {
            dispatch(getPresetsInfosAction());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Presets);