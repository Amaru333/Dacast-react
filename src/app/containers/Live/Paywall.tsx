import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, createLivePricePresetAction, saveLivePricePresetAction, deleteLivePricePresetAction, createLivePromoPresetAction, saveLivePromoPresetAction, deleteLivePromoPresetAction, getLivePaywallInfosAction, saveLivePaywallInfosAction } from '../../redux-flow/store/Live/Paywall';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupPricesAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPricePresetsInfosAction, createPricePresetAction, createPromoPresetAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentPaywallPage } from '../../shared/Paywall/ContentPaywallPage';
import { ContentPaywallPageInfos, Preset, Promo, PresetsPageInfos } from '../../redux-flow/store/Paywall/Presets/types';

var moment = require('moment-timezone');

export interface LivePaywallComponentProps {
    livePaywallInfos: ContentPaywallPageInfos;
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
    globalPresets: PresetsPageInfos;
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
            props.getPresetsInfo('page=1&per-page=100')
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
                prices: [
                    
                    {
                        value: NaN,
                        currency: 'USD'
                    }
                    
                ],
                settings: {
                    duration: {value: NaN, unit: 'Hours'},
                    recurrence: {recurrence: 'Weekly'},
                    startMethod: 'Upon Purchase',
                    timezone: null,
                    startDate: null,
                    startTime: '00:00'
                }

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
            let globalPricePresets: Preset[] = props.globalPresets.presets.prices ? props.globalPresets.presets.prices : []
            let globalPromoPresets: Promo[] = props.globalPresets.promos && props.globalPresets.promos.totalItems > 0  ? props.globalPresets.promos.promos : []
            setCustomPricePresetList([...globalPricePresets, customPricePreset])
            setCustomPromoPresetList([...globalPromoPresets, customPromoPreset])
        }
    }, [props.globalPresets.presets, props.livePaywallInfos])

    return props.livePaywallInfos && props.groupsInfos && props.theming && customPricePresetList? 
        <div className='flex flex-column'>
            <LiveTabs liveId={liveId} />
            <ContentPaywallPage
                contentId={liveId}
                contentPaywallInfos={props.livePaywallInfos}
                saveContentPaywallInfos={props.saveLivePaywallInfos}
                createContentPricePreset={props.createLivePricePreset}
                saveContentPricePreset={props.saveLivePricePreset}
                deleteContentPricePreset={props.deleteLivePricePreset}
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
        getLivePaywallInfos: () => {
            dispatch(getLivePaywallInfosAction());
        },
        saveLivePaywallInfos: (data: ContentPaywallPageInfos) => {
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
            dispatch(getGroupPricesAction());
        },
        getPaywallThemes: () => {
            dispatch(getPaywallThemesAction())
        },
        getPresetsInfo: (qs: string) => {
            dispatch(getPricePresetsInfosAction(qs))
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