import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, createLivePricePresetAction, saveLivePricePresetAction, deleteLivePricePresetAction, createLivePromoPresetAction, saveLivePromoPresetAction, deleteLivePromoPresetAction, getLivePaywallInfosAction, saveLivePaywallInfosAction, getLivePaywallPromosAction, getLivePaywallPricesAction } from '../../redux-flow/store/Live/Paywall';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupPricesAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPricePresetsInfosAction, createPricePresetAction, createPromoPresetAction, getPromoPresetsInfosAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentPaywallPage } from '../../shared/Paywall/ContentPaywallPage';
import { ContentPaywallPageInfos, Preset, Promo, PresetsPageInfos, ContentPaywallState } from '../../redux-flow/store/Paywall/Presets/types';

var moment = require('moment-timezone');

export interface LivePaywallComponentProps {
    livePaywallInfos: ContentPaywallState;
    getLivePaywallInfos: Function;
    saveLivePaywallInfos: Function;
    getLivePaywallPrices: Function;
    createLivePricePreset: Function;
    saveLivePricePreset: Function;
    deleteLivePricePreset: Function;
    getLivePaywallPromos: Function;
    createLivePromoPreset: Function;
    saveLivePromoPreset: Function;
    deleteLivePromoPreset: Function;
    groupsInfos: GroupsPageInfos;
    getGroupsInfos: Function;
    theming: PaywallThemingData;
    getPaywallThemes: Function;
    globalPresets: PresetsPageInfos;
    getPresetsInfo: Function;
    getPromoPresetsInfo: Function;
    customPricePresetList: Preset[];
    createPricePreset: Function;
    customPromoPresetList: Promo[];
    createPromoPreset: Function;
    showToast: Function;
}

const LivePaywall = (props: LivePaywallComponentProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if(!props.livePaywallInfos[liveId]) {
            props.getLivePaywallInfos(liveId)
        }
        if(!props.groupsInfos) {
            props.getGroupsInfos()
        }
        if(!props.theming) {
            props.getPaywallThemes()
        }
        if(!props.globalPresets|| !props.globalPresets.presets) {
            props.getPresetsInfo('page=1&per-page=100')
        }
        if(!props.globalPresets || !props.globalPresets.promos) {
            props.getPromoPresetsInfo('page=1&per-page=100')
        }
        props.getLivePaywallPrices(liveId)
        props.getLivePaywallPromos(liveId)
    }, [])

    const [customPricePresetList, setCustomPricePresetList] = React.useState<Preset[]>(null)

    const [customPromoPresetList, setCustomPromoPresetList] = React.useState<Promo[]>(null)

    React.useEffect(() => {
        if (props.livePaywallInfos[liveId] && props.globalPresets) {
            let customPricePreset: Preset = {
                id: 'custom',
                name: 'Custom Price',
                type: 'Pay Per View',
                prices: [
                    
                    {
                        value: NaN,
                        currency: 'USD'
                    }
                    
                ],
                settings: {
                    duration: {value: NaN, unit: 'Hours'},
                    recurrence: {unit: 'Weekly'},
                    startMethod: 'Upon Purchase',
                    timezone: null,
                    startDate: null,
                }

            };
            let customPromoPreset: Promo = {
                id: 'custom',
                name: 'Custom Promo',
                alphanumericCode: '',
                discount: NaN,
                limit: NaN,
                rateType: 'Pay Per View',
                startDate: null,
                endDate: null,
                timezone: moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')',
                discountApplied: 'Once',
                assignedContentIds: [],
                assignedGroupIds: []
            }
            let globalPricePresets: Preset[] = props.globalPresets.presets && props.globalPresets.presets.prices.length > 0 ? props.globalPresets.presets.prices : []
            let globalPromoPresets: Promo[] = props.globalPresets.promos && props.globalPresets.promos.totalItems > 0  ? props.globalPresets.promos.promos : []
            setCustomPricePresetList([...globalPricePresets, customPricePreset])
            setCustomPromoPresetList([...globalPromoPresets, customPromoPreset])
        }
    }, [props.globalPresets.presets, props.livePaywallInfos])

    return props.livePaywallInfos[liveId] && props.groupsInfos && props.theming && customPricePresetList? 
        <div className='flex flex-column'>
            <LiveTabs liveId={liveId} />
            <ContentPaywallPage
                contentId={liveId}
                contentType='live'
                contentPaywallInfos={props.livePaywallInfos[liveId]}
                saveContentPaywallInfos={props.saveLivePaywallInfos}
                getContentPrices={props.getLivePaywallPrices}
                createContentPricePreset={props.createLivePricePreset}
                saveContentPricePreset={props.saveLivePricePreset}
                deleteContentPricePreset={props.deleteLivePricePreset}
                getContentPromos={props.getLivePaywallPromos}
                createContentPromoPreset={props.createLivePromoPreset}
                saveContentPromoPreset={props.saveLivePromoPreset}
                deleteContentPromoPreset={props.deleteLivePromoPreset}
                groupsInfos={props.groupsInfos}
                theming={props.theming}
                globalPresets={props.globalPresets}
                customPricePresetList={customPricePresetList} 
                customPromoPresetList={customPromoPresetList}     
                createPricePreset={props.createPricePreset}
                createPromoPreset={props.createPromoPreset}
                showToast={props.showToast}
            />        
        </div>
        : <><LiveTabs liveId={liveId} /><SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer></>
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
        getLivePaywallInfos: (liveId: string) => {
            dispatch(getLivePaywallInfosAction(liveId));
        },
        saveLivePaywallInfos: (data: ContentPaywallPageInfos, liveId: string) => {
            dispatch(saveLivePaywallInfosAction(data, liveId));
        },
        getLivePaywallPrices: (liveId: string) => {
            dispatch(getLivePaywallPricesAction(liveId));
        },
        createLivePricePreset: (data: Preset, liveId: string) => {
            dispatch(createLivePricePresetAction(data, liveId));
        },
        saveLivePricePreset: (data: Preset, liveId: string) => {
            dispatch(saveLivePricePresetAction(data, liveId));
        },
        deleteLivePricePreset: (data: Preset, liveId: string) => {
            dispatch(deleteLivePricePresetAction(data, liveId));
        },
        getLivePaywallPromos: (liveId: string) => {
            dispatch(getLivePaywallPromosAction(liveId));
        },
        createLivePromoPreset: (data: Promo, liveId: string) => {
            dispatch(createLivePromoPresetAction(data, liveId));
        },
        saveLivePromoPreset: (data: Promo, liveId: string) => {
            dispatch(saveLivePromoPresetAction(data, liveId));
        },
        deleteLivePromoPreset: (data: Promo, liveId: string) => {
            dispatch(deleteLivePromoPresetAction(data, liveId));
        },
        getGroupsInfos: () => {
            dispatch(getGroupPricesAction());
        },
        getPaywallThemes: () => {
            dispatch(getPaywallThemesAction())
        },
        getPresetsInfo: (qs: string) => {
            dispatch(getPricePresetsInfosAction(qs))
        },
        getPromoPresetsInfo: (qs: string) => {
            dispatch(getPromoPresetsInfosAction(qs))
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