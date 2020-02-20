import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LivePaywallPage } from '../../pages/Live/Paywall/Paywall'
import { Preset, Action, createLivePricePresetAction, saveLivePricePresetAction, deleteLivePricePresetAction, Promo, createLivePromoPresetAction, saveLivePromoPresetAction, deleteLivePromoPresetAction, LivePaywallPageInfos, getLivePaywallInfosAction, saveLivePaywallInfosAction } from '../../redux-flow/store/Live/Paywall';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupsInfosAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';

export interface LivePaywallComponentProps {
    livePaywallInfos: LivePaywallPageInfos;
    getLivePaywallInfos: Function;
    saveLivePaywallInfos: Function;
    createLivePricePreset: Function;
    saveLivePricePreset: Function;
    deleteLivePricePreset: Function;
    createLivePromoPreset: Function;
    saveLivePromoPreset: Function;
    deleteLivePromoPreset: Function;
    groupsInfos: GroupsPageInfos;
    getGroupsInfos: Function;
    theming: PaywallThemingData;
    getPaywallThemes: Function;
}

const LivePaywall = (props: LivePaywallComponentProps) => {

    React.useEffect(() => {
        if(!props.livePaywallInfos) {
            props.getLivePaywallInfos()
        }
        if(!props.groupsInfos) {
            props.getGroupsInfos()
        }
        if(!props.theming) {
            props.getPaywallThemes()
        }
    }, [])

    return props.livePaywallInfos && props.groupsInfos && props.theming ? 
        <LivePaywallPage {...props} />
        : <LoadingSpinner size='medium' color='violet' />
}

export function mapStateToProps(state: ApplicationState) {
    return {
        livePaywallInfos: state.live.paywall,
        groupsInfos: state.paywall.groups,
        theming: state.paywall.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLivePaywallInfos: () => {
            dispatch(getLivePaywallInfosAction());
        },
        saveLivePaywallInfos: (data:LivePaywallPageInfos) => {
            dispatch(saveLivePaywallInfosAction(data));
        },
        createLivePricePreset: (data: Preset) => {
            dispatch(createLivePricePresetAction(data));
        },
        saveLivePricePreset: (data: Preset) => {
            dispatch(saveLivePricePresetAction(data));
        },
        deleteLivePricePreset: (data: Preset) => {
            dispatch(deleteLivePricePresetAction(data));
        },
        createLivePromoPreset: (data: Promo) => {
            dispatch(createLivePromoPresetAction(data));
        },
        saveLivePromoPreset: (data: Promo) => {
            dispatch(saveLivePromoPresetAction(data));
        },
        deleteLivePromoPreset: (data: Promo) => {
            dispatch(deleteLivePromoPresetAction(data));
        },
        getGroupsInfos: () => {
            dispatch(getGroupsInfosAction());
        },
        getPaywallThemes: () => {
            dispatch(getPaywallThemesAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LivePaywall)