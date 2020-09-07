import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, createContentPricePresetAction, saveContentPricePresetAction, deleteContentPricePresetAction, createContentPromoPresetAction, saveContentPromoPresetAction, deleteContentPromoPresetAction, getContentPaywallInfosAction, saveContentPaywallInfosAction, getContentPaywallPricesAction, getContentPaywallPromosAction } from '../../redux-flow/store/Content/Paywall/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupPricesAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPricePresetsInfosAction, createPricePresetAction, createPromoPresetAction, getPromoPresetsInfosAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { Preset, PresetsPageInfos, Promo, ContentPaywallPageInfos } from '../../redux-flow/store/Paywall/Presets/types';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentPaywallPage } from '../../shared/Paywall/ContentPaywallPage';
import { ContentPaywallState } from '../../redux-flow/store/Content/Paywall/types';
var moment = require('moment-timezone');

export interface ContentPaywallComponentProps {
    contentPaywallInfo: ContentPaywallState;
    groupsInfos: GroupsPageInfos;
    theming: PaywallThemingData;
    globalPresets: PresetsPageInfos;
    customPricePresetList: Preset[];
    customPromoPresetList: Promo[];
    getContentPaywallInfos: (contentId: string, contentType: string) => Promise<void>;
    saveContentPaywallInfos: (data: ContentPaywallPageInfos, contentId: string, contentType: string) => Promise<void>;
    getContentPaywallPrices: (contentId: string, contentType: string) => Promise<void>;
    createContentPricePreset: (data: Preset, contentId: string, contentType: string) => Promise<void>;
    saveContentPricePreset: (data: Preset, contentId: string, contentType: string) => Promise<void>;
    deleteContentPricePreset: (data: Preset, contentId: string, contentType: string) => Promise<void>;
    getContentPaywallPromos: (contentId: string, contentType: string) => Promise<void>;
    createContentPromoPreset: (data: Promo, contentId: string, contentType: string) => Promise<void>;
    saveContentPromoPreset: (data: Promo, contentId: string, contentType: string) => Promise<void>;
    deleteContentPromoPreset: (data: Promo, contentId: string, contentType: string) => Promise<void>;
    getGroupsInfos: () => Promise<void>;
    getPaywallThemes: () => Promise<void>;
    getPresetsInfo: (qs: string) => Promise<void>;
    getPromoPresetsInfo: (qs: string) => Promise<void>;
    createPromoPreset: (data: Promo) => Promise<void>;
    createPricePreset: (data: Preset) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const VodPaywall = (props: ContentPaywallComponentProps) => {

    let { vodId } = useParams()
    const [isFetching, setIsFetching] = React.useState<boolean>(true)

    React.useEffect(() => {
        props.getContentPaywallInfos(vodId, 'vod')
        .then(() => setIsFetching(false))
        if(!props.groupsInfos) {
            props.getGroupsInfos()
        }
        if(!props.theming) {
            props.getPaywallThemes()
        }
        if(!props.globalPresets || !props.globalPresets.presets) {
            props.getPresetsInfo('page=1&per-page=100')
        }
        if(!props.globalPresets || !props.globalPresets.promos) {
            props.getPromoPresetsInfo('page=1&per-page=100')
        }
        props.getContentPaywallPrices(vodId, 'vod')
        props.getContentPaywallPromos(vodId, 'vod')
    }, [])

    const [customPricePresetList, setCustomPricePresetList] = React.useState<Preset[]>(null)

    const [customPromoPresetList, setCustomPromoPresetList] = React.useState<Promo[]>(null)

    React.useEffect(() => {
        if (props.contentPaywallInfo['vod'] && props.contentPaywallInfo['vod'][vodId] && props.globalPresets) {
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
    }, [props.globalPresets.presets, props.contentPaywallInfo['vod']])

    return !isFetching && props.groupsInfos && customPricePresetList && customPromoPresetList && props.theming ? 
        <div className='flex flex-column'>
            <VideoTabs videoId={vodId} />
            <ContentPaywallPage
                contentId={vodId}
                contentType='vod'
                contentPaywallInfos={props.contentPaywallInfo['vod'][vodId]}
                getContentPrices={props.getContentPaywallPrices}
                saveContentPaywallInfos={props.saveContentPaywallInfos}
                createContentPricePreset={props.createContentPricePreset}
                saveContentPricePreset={props.saveContentPricePreset}
                deleteContentPricePreset={props.deleteContentPricePreset}
                getContentPromos={props.getContentPaywallPromos}
                createContentPromoPreset={props.createContentPromoPreset}
                saveContentPromoPreset={props.saveContentPromoPreset}
                deleteContentPromoPreset={props.deleteContentPromoPreset}
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
        : <><VideoTabs videoId={vodId} /><SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer></>
}

export function mapStateToProps(state: ApplicationState) {
    return {
        contentPaywallInfo: state.content.paywall,
        groupsInfos: state.paywall.groups,
        theming: state.paywall.theming,
        globalPresets: state.paywall.presets
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentPaywallInfos: async (vodId: string, contentType: string) => {
            await dispatch(getContentPaywallInfosAction(vodId, contentType));
        },
        getContentPaywallPrices: async (vodId: string, contentType: string) => {
            await dispatch(getContentPaywallPricesAction(vodId, contentType));
        },
        saveContentPaywallInfos: async (data: ContentPaywallPageInfos, vodId: string, contentType: string) => {
            await dispatch(saveContentPaywallInfosAction(data, vodId, contentType));
        },
        createContentPricePreset: async (data: Preset, vodId: string, contentType: string) => {
            await dispatch(createContentPricePresetAction(data, vodId, contentType));
        },
        saveContentPricePreset: async (data: Preset, vodId: string, contentType: string) => {
            await dispatch(saveContentPricePresetAction(data, vodId, contentType));
        },
        deleteContentPricePreset: async (data: Preset, vodId: string, contentType: string) => {
            await dispatch(deleteContentPricePresetAction(data, vodId, contentType));
        },
        getContentPaywallPromos: async (vodId: string, contentType: string) => {
            await dispatch(getContentPaywallPromosAction(vodId, contentType));
        },
        createContentPromoPreset: async (data: Promo, vodId: string, contentType: string) => {
            await dispatch(createContentPromoPresetAction(data, vodId, contentType));
        },
        saveContentPromoPreset: async (data: Promo, vodId: string, contentType: string) => {
            await dispatch(saveContentPromoPresetAction(data, vodId, contentType));
        },
        deleteContentPromoPreset: async (data: Promo, vodId: string, contentType: string) => {
            await dispatch(deleteContentPromoPresetAction(data, vodId, contentType));
        },
        getGroupsInfos: async () => {
            await dispatch(getGroupPricesAction());
        },
        getPaywallThemes: async () => {
            await dispatch(getPaywallThemesAction())
        },
        getPresetsInfo: async (qs: string) => {
            await dispatch(getPricePresetsInfosAction(qs))
        },
        getPromoPresetsInfo: async (qs: string) => {
            await dispatch(getPromoPresetsInfosAction(qs))
        },
        createPricePreset: async (data: Preset) => {
            await dispatch(createPricePresetAction(data));
        },
        createPromoPreset: async (data: Promo) => {
            await dispatch(createPromoPresetAction(data));
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodPaywall)