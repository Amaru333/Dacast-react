import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect, ReactReduxContext } from 'react-redux';
import { VodPaywallPage } from '../../pages/Videos/Paywall/Paywall'
import { Preset, Action, createVodPricePresetAction, saveVodPricePresetAction, deleteVodPricePresetAction, Promo, createVodPromoPresetAction, saveVodPromoPresetAction, deleteVodPromoPresetAction, VodPaywallPageInfos, getVodPaywallInfosAction, saveVodPaywallInfosAction } from '../../redux-flow/store/VOD/Paywall';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupsInfosAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { PresetsPageInfos, getPresetsInfosAction, createPricePresetAction } from '../../redux-flow/store/Paywall/Presets';

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
    globalPresets: PresetsPageInfos
    getPresetsInfo: Function
    customPricePresetList: Preset[]
    createPricePreset: Function;
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
        if(!props.globalPresets) {
            props.getPresetsInfo()
        }
    }, [])

    const [customPricePresetList, setCustomPricePresetList] = React.useState<Preset[]>(null)

    React.useEffect(() => {
        if (props.vodPaywallInfos && props.globalPresets) {
            let customPricePreset: Preset = {
                id: 'custom',
                name: 'Custom Preset',
                type: 'Pay Per View',
                price: [
                    
                        {
                            amount: NaN,
                            currency: 'USD'
                        }
                    
                ],
                duration: {amount: NaN, type: 'Hours'},
                recurrence: 'Weekly',
                startMethod: 'Upon Purchase',
                timezone: null,
                startDate: null,
                startTime: '00:00'
            };
            let pricePresetList = props.globalPresets.presets
            pricePresetList.push(customPricePreset)
            setCustomPricePresetList(pricePresetList)
        }
    }, [props.globalPresets.presets])

    return props.vodPaywallInfos && props.groupsInfos && customPricePresetList && props.theming ? 
        <VodPaywallPage {...props} customPricePresetList={customPricePresetList} />
        : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
}

export function mapStateToProps(state: ApplicationState) {
    return {
        vodPaywallInfos: state.vod.paywall,
        groupsInfos: state.paywall.groups,
        theming: state.paywall.theming,
        globalPresets: state.paywall.presets
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
        },
        getPresetsInfo: () => {
            dispatch(getPresetsInfosAction())
        },
        createPricePreset: (data: Preset) => {
            dispatch(createPricePresetAction(data));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodPaywall)