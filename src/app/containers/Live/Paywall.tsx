import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getGroupPricesAction } from '../../redux-flow/store/Paywall/Groups/actions';
import { getPaywallThemesAction } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPricePresetsInfosAction, createPricePresetAction, createPromoPresetAction, getPromoPresetsInfosAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentPaywallPage } from '../../shared/Paywall/ContentPaywallPage';
import { ContentPaywallPageInfos, Preset, Promo } from '../../redux-flow/store/Paywall/Presets/types';
import { ContentPaywallComponentProps } from '../Videos/Paywall';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { Action, createContentPricePresetAction, saveContentPricePresetAction, deleteContentPricePresetAction, createContentPromoPresetAction, saveContentPromoPresetAction, deleteContentPromoPresetAction, getContentPaywallInfosAction, saveContentPaywallInfosAction, getContentPaywallPricesAction, getContentPaywallPromosAction } from '../../redux-flow/store/Content/Paywall/actions';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { ContentType } from '../../redux-flow/store/Common/types';

const LivePaywall = (props: ContentPaywallComponentProps) => {

    let { liveId } = useParams<{liveId: string}>()
    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getContentPaywallInfos(liveId, 'live')
        .then(() => setIsFetching(false))        
        .catch(() => setNodataFetched(true))

        if(!props.groupsInfos) {
            props.getGroupsInfos()
            .catch(() => setNodataFetched(true))
        }
        if(!props.theming) {
            props.getPaywallThemes()
            .catch(() => setNodataFetched(true))
        }
        if(!props.globalPresets|| !props.globalPresets.presets) {
            props.getPresetsInfo('page=1&per-page=100')
            .catch(() => setNodataFetched(true))
        }
        if(!props.globalPresets || !props.globalPresets.promos) {
            props.getPromoPresetsInfo('page=1&per-page=100')
            .catch(() => setNodataFetched(true))
        }
        props.getContentPaywallPrices(liveId, 'live')
        .catch(() => setNodataFetched(true))
        props.getContentPaywallPromos(liveId, 'live')
        .catch(() => setNodataFetched(true))
    }, [])

    const [customPricePresetList, setCustomPricePresetList] = React.useState<Preset[]>(null)

    const [customPromoPresetList, setCustomPromoPresetList] = React.useState<Promo[]>(null)

    React.useEffect(() => {
        if (props.contentPaywallInfo['live'] && props.contentPaywallInfo['live'][liveId] && props.globalPresets) {
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
                timezone: null,
                discountApplied: 'Once',
                assignedContentIds: [],
                assignedGroupIds: []
            }
            let globalPricePresets: Preset[] = props.globalPresets.presets && props.globalPresets.presets.prices.length > 0 ? props.globalPresets.presets.prices : []
            let globalPromoPresets: Promo[] = props.globalPresets.promos && props.globalPresets.promos.totalItems > 0  ? props.globalPresets.promos.promos : []
            setCustomPricePresetList([...globalPricePresets, customPricePreset])
            setCustomPromoPresetList([...globalPromoPresets, customPromoPreset])
        }
    }, [props.globalPresets.presets, props.contentPaywallInfo['live']])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }
    
    return !isFetching && props.groupsInfos && props.theming && customPricePresetList? 
        <div className='flex flex-column'>
            <LiveTabs liveId={liveId} />
            <ContentPaywallPage
                contentId={liveId}
                contentType='live'
                contentPaywallInfos={props.contentPaywallInfo['live'][liveId]}
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
        : <><LiveTabs liveId={liveId} /><SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer></>
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
        getContentPaywallInfos: async (liveId: string, contentType: ContentType) => {
            await dispatch(getContentPaywallInfosAction(contentType)(liveId));
        },
        getContentPaywallPrices: async (liveId: string, contentType: ContentType) => {
            await dispatch(getContentPaywallPricesAction({id: liveId, contentType: contentType}));
        },
        saveContentPaywallInfos: async (data: ContentPaywallPageInfos, liveId: string, contentType: ContentType) => {
            await dispatch(saveContentPaywallInfosAction(contentType)({info: data, contentId: liveId}));
        },
        createContentPricePreset: async (data: Preset, liveId: string, contentType: ContentType) => {
            await dispatch(createContentPricePresetAction({price: data, id: liveId, contentType: contentType}));
        },
        saveContentPricePreset: async (data: Preset, liveId: string, contentType: ContentType) => {
            await dispatch(saveContentPricePresetAction({price: data, contentId: liveId, contentType: contentType}));
        },
        deleteContentPricePreset: async (data: Preset, liveId: string, contentType: ContentType) => {
            await dispatch(deleteContentPricePresetAction({price: data, contentId: liveId, contentType: contentType}));
        },
        getContentPaywallPromos: async (liveId: string, contentType: ContentType) => {
            await dispatch(getContentPaywallPromosAction({contentId: liveId, contentType: contentType}));
        },
        createContentPromoPreset: async (data: Promo, liveId: string, contentType: ContentType) => {
            await dispatch(createContentPromoPresetAction({promo: data, contentId: liveId, contentType: contentType}));
        },
        saveContentPromoPreset: async (data: Promo, liveId: string, contentType: ContentType) => {
            await dispatch(saveContentPromoPresetAction({promo: data, contentId: liveId, contentType: contentType}));
        },
        deleteContentPromoPreset: async (data: Promo, liveId: string, contentType: ContentType) => {
            await dispatch(deleteContentPromoPresetAction({promo: data, contentId: liveId, contentType: contentType}));
        },
        getGroupsInfos: async () => {
            await dispatch(getGroupPricesAction(undefined));
        },
        getPaywallThemes: async () => {
            await dispatch(getPaywallThemesAction(undefined))
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

export default connect(mapStateToProps, mapDispatchToProps)(LivePaywall)