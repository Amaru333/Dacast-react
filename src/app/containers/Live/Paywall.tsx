import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LivePaywallPage } from '../../pages/Live/Paywall/Paywall'
import { Preset, Action, createLivePricePresetAction, saveLivePricePresetAction, deleteLivePricePresetAction, Promo, createLivePromoPresetAction, saveLivePromoPresetAction, deleteLivePromoPresetAction, LivePaywallPageInfos, getLivePaywallInfosAction, saveLivePaywallInfosAction } from '../../redux-flow/store/Live/Paywall';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupsInfosAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPresetsInfosAction, createPricePresetAction, createPromoPresetAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
var moment = require('moment-timezone');

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
    globalPresets: LivePaywallPageInfos;
    getPresetsInfo: Function;
    customPricePresetList: Preset[];
    createPricePreset: Function;
    customPromoPresetList: Promo[];
    createPromoPreset: Function;
    showToast: Function;
}

const LivePaywall = (props: LivePaywallComponentProps) => {

    let { liveId } = useParams()

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
        if(!props.globalPresets) {
            props.getPresetsInfo()
        }
    }, [])

    const [customPricePresetList, setCustomPricePresetList] = React.useState<Preset[]>(null)

    const [customPromoPresetList, setCustomPromoPresetList] = React.useState<Promo[]>(null)

    React.useEffect(() => {
        if (props.livePaywallInfos && props.globalPresets) {
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
            let customPromoPreset: Promo = {
                id: 'custom',
                name: 'Custom Preset',
                alphanumericCode: '',
                discount: NaN,
                limit: NaN,
                rateType: 'Pay Per View',
                startDate: null,
                startTime: null,
                endDate: null,
                endTime: null,
                timezone: moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')',
                discountApplied: 'Once'
            }
            setCustomPricePresetList([...props.globalPresets.presets, customPricePreset])
            setCustomPromoPresetList([...props.globalPresets.promos, customPromoPreset])
        }
    }, [props.globalPresets.presets, props.livePaywallInfos])

    return props.livePaywallInfos && props.groupsInfos && props.theming && customPricePresetList? 
        <div className='flex flex-column'>
            <LiveTabs liveId={liveId} />
            <LivePaywallPage {...props} customPricePresetList={customPricePresetList} customPromoPresetList={customPromoPresetList} />
        </div>
        : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
}

export function mapStateToProps(state: ApplicationState) {
    return {
        livePaywallInfos: state.live.paywall,
        groupsInfos: state.paywall.groups,
        theming: state.paywall.theming,
        globalPresets: state.paywall.presets
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLivePaywallInfos: () => {
            dispatch(getLivePaywallInfosAction());
        },
        saveLivePaywallInfos: (data: LivePaywallPageInfos) => {
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
        },
        getPresetsInfo: () => {
            dispatch(getPresetsInfosAction())
        },
        createPricePreset: (data: Preset) => {
            dispatch(createPricePresetAction(data));
        },
        createPromoPreset: (data: Promo) => {
            dispatch(createPromoPresetAction(data));
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LivePaywall)