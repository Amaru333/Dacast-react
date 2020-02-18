import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PresetsPage } from '../../pages/Paywall/Presets/Presets';
import { getPresetsInfosAction, Action, PresetsPageInfos, createPricePresetAction, Preset, savePricePresetAction, deletePricePresetAction, Promo, createPromoPresetAction, savePromoPresetAction, deletePromoPresetAction } from '../../redux-flow/store/Paywall/Presets';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface PresetsComponentProps {
    presetsInfos: PresetsPageInfos;
    getPresetsInfos: Function;
    createPricePreset: Function;
    savePricePreset: Function;
    deletePricePreset: Function;
    createPromoPreset: Function;
    savePromoPreset: Function;
    deletePromoPreset: Function;
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
            : <SpinnerContainer><LoadingSpinner size='large' color='blue' /></SpinnerContainer>
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
        },
        createPricePreset: (data: Preset) => {
            dispatch(createPricePresetAction(data));
        },
        savePricePreset: (data: Preset) => {
            dispatch(savePricePresetAction(data));
        },
        deletePricePreset: (data: Preset) => {
            dispatch(deletePricePresetAction(data));
        },
        createPromoPreset: (data: Promo) => {
            dispatch(createPromoPresetAction(data));
        },
        savePromoPreset: (data: Promo) => {
            dispatch(savePromoPresetAction(data));
        },
        deletePromoPreset: (data: Promo) => {
            dispatch(deletePromoPresetAction(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Presets);