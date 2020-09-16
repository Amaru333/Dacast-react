import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PresetsPage } from '../../pages/Paywall/Presets/Presets';
import { getPricePresetsInfosAction, Action, PresetsPageInfos, createPricePresetAction, Preset, savePricePresetAction, deletePricePresetAction, Promo, createPromoPresetAction, savePromoPresetAction, deletePromoPresetAction, getPromoPresetsInfosAction } from '../../redux-flow/store/Paywall/Presets';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface PresetsComponentProps {
    presetsInfos: PresetsPageInfos;
    getPresetsInfos: (qs: string) => Promise<void>;
    getPromoPresets: (qs: string) => Promise<void>;
    createPricePreset: (p: Preset) => Promise<void>;
    savePricePreset: (p: Preset) => Promise<void>;
    deletePricePreset: (p: Preset) => Promise<void>;
    createPromoPreset: (p: Promo) => Promise<void>;
    savePromoPreset: (p: Promo) => Promise<void>;
    deletePromoPreset: (p: Promo) => Promise<void>;
}

const Presets = (props: PresetsComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getPresetsInfos('per-page=10&page=1')
        .catch(() => setNodataFetched(true))

        props.getPromoPresets('per-page=10&page=1')
        .catch(() => setNodataFetched(true))

    }, [props.presetsInfos])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

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
        getPresetsInfos: async (qs: string) => {
            await dispatch(getPricePresetsInfosAction(qs));
        },
        getPromoPresets: async (qs: string) => {
            await dispatch(getPromoPresetsInfosAction(qs));
        },
        createPricePreset: async (data: Preset) => {
            await dispatch(createPricePresetAction(data));
        },
        savePricePreset: async (data: Preset) => {
            await dispatch(savePricePresetAction(data));
        },
        deletePricePreset: async (data: Preset) => {
            await dispatch(deletePricePresetAction(data));
        },
        createPromoPreset: async (data: Promo) => {
            await dispatch(createPromoPresetAction(data));
        },
        savePromoPreset: async (data: Promo) => {
            await dispatch(savePromoPresetAction(data));
        },
        deletePromoPreset: async (data: Promo) => {
            await dispatch(deletePromoPresetAction(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Presets);