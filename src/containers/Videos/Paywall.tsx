import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { VodPaywallPage } from '../../pages/Videos/Paywall/Paywall'
import { Preset, Action, createVodPricePresetAction, saveVodPricePresetAction, deleteVodPricePresetAction, Promo, createVodPromoPresetAction, saveVodPromoPresetAction, deleteVodPromoPresetAction, VodPaywallPageInfos, getVodPaywallInfosAction } from '../../redux-flow/store/VOD/Paywall';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupsInfosAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';

export interface VodPaywallComponentProps {
    VodPaywallInfos: VodPaywallPageInfos;
    getVodPaywallInfos: Function;
    createVodPricePreset: Function;
    saveVodPricePreset: Function;
    deleteVodPricePreset: Function;
    createVodPromoPreset: Function;
    saveVodPromoPreset: Function;
    deleteVodPromoPreset: Function;
    groupsInfos: GroupsPageInfos;
    getGroupsInfos: Function;
    themes: PaywallThemingData;
    getPaywallThemes: Function;
}

const VodPaywall = (props: VodPaywallComponentProps) => {

    React.useEffect(() => {
        if(!props.VodPaywallInfos) {
            props.getVodPaywallInfos()
        }
        if(!props.groupsInfos) {
            props.getGroupsInfos()
        }
        if(!props.themes) {
            props.getPaywallThemes()
        }
    }, [])

    return props.VodPaywallInfos && props.groupsInfos && props.themes ? 
        <VodPaywallPage {...props} />
        : <LoadingSpinner size='medium' color='violet' />
}

export function mapStateToProps(state: ApplicationState) {
    return {
        VodPaywallInfos: state.vod.paywall,
        groupsInfos: state.paywall.groups,
        themes: state.paywall.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodPaywallInfos: () => {
            dispatch(getVodPaywallInfosAction());
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