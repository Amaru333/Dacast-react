import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { VodPaywallPage } from '../../pages/Videos/Paywall/Paywall'
import { Preset, Action, createVodPricePresetAction, saveVodPricePresetAction, deleteVodPricePresetAction, Promo, createVodPromoPresetAction, saveVodPromoPresetAction, deleteVodPromoPresetAction, VodPaywallPageInfos, getVodPaywallInfosAction, saveVodPaywallInfosAction } from '../../redux-flow/store/VOD/Paywall';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupsInfosAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface VodPaywallComponentProps {
    vodPaywallInfos: VodPaywallPageInfos;
    getVodPaywallInfos: Function;
    saveVodPaywallInfos: Function;
    createVodPricePreset: Function;
    saveVodPricePreset: Function;
    deleteVodPricePreset: Function;
    createVodPromoPreset: Function;
    saveVodPromoPreset: Function;
    deleteVodPromoPreset: Function;
    groupsInfos: GroupsPageInfos;
    getGroupsInfos: Function;
    theming: PaywallThemingData;
    getPaywallThemes: Function;
}

const VodPaywall = (props: VodPaywallComponentProps) => {

    React.useEffect(() => {
        if(!props.vodPaywallInfos) {
            props.getVodPaywallInfos()
        }
        if(!props.groupsInfos) {
            props.getGroupsInfos()
        }
        if(!props.theming) {
            props.getPaywallThemes()
        }
    }, [])

    return props.vodPaywallInfos && props.groupsInfos && props.theming ? 
        <VodPaywallPage {...props} />
        : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
}

export function mapStateToProps(state: ApplicationState) {
    return {
        vodPaywallInfos: state.vod.paywall,
        groupsInfos: state.paywall.groups,
        theming: state.paywall.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodPaywallInfos: () => {
            dispatch(getVodPaywallInfosAction());
        },
        saveVodPaywallInfos: (data: VodPaywallPageInfos) => {
            dispatch(saveVodPaywallInfosAction(data));
        },
        createVodPricePreset: (data: Preset) => {
            dispatch(createVodPricePresetAction(data));
        },
        saveVodPricePreset: (data: Preset) => {
            dispatch(saveVodPricePresetAction(data));
        },
        deleteVodPricePreset: (data: Preset) => {
            dispatch(deleteVodPricePresetAction(data));
        },
        createVodPromoPreset: (data: Promo) => {
            dispatch(createVodPromoPresetAction(data));
        },
        saveVodPromoPreset: (data: Promo) => {
            dispatch(saveVodPromoPresetAction(data));
        },
        deleteVodPromoPreset: (data: Promo) => {
            dispatch(deleteVodPromoPresetAction(data));
        },
        getGroupsInfos: () => {
            dispatch(getGroupsInfosAction());
        },
        getPaywallThemes: () => {
            dispatch(getPaywallThemesAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodPaywall)