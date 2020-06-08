import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PresetsPage } from '../../pages/Paywall/Presets/Presets';
import { getPricePresetsInfosAction, Action, PresetsPageInfos, createPricePresetAction, Preset, savePricePresetAction, deletePricePresetAction, Promo, createPromoPresetAction, savePromoPresetAction, deletePromoPresetAction, getPromoPresetsInfosAction } from '../../redux-flow/store/Paywall/Presets';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface PresetsComponentProps {
    presetsInfos: PresetsPageInfos;
    getPresetsInfos: Function;
    getPromoPresets: Function;
    createPricePreset: Function;
    savePricePreset: Function;
    deletePricePreset: Function;
    createPromoPreset: Function;
    savePromoPreset: Function;
    deletePromoPreset: Function;
}

const Presets = (props: PresetsComponentProps) => {

    React.useEffect(() => {
        if(!props.presetsInfos.presets) {
            props.getPresetsInfos('per-page=10&page=1')
        }
        if(!props.presetsInfos.promos) {
            props.getPromoPresets('per-page=10&page=1')
        }
    }, [props.presetsInfos])

    return (
        props.presetsInfos.presets && props.presetsInfos.promos ?
            <PresetsPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        presetsInfos: state.paywall.presets
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPresetsInfos: (qs: string) => {
            dispatch(getPricePresetsInfosAction(qs));
        },
        getPromoPresets: (qs: string) => {
            dispatch(getPromoPresetsInfosAction(qs));
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