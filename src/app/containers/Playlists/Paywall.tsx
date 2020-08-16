import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getGroupPricesAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPricePresetsInfosAction, createPricePresetAction, createPromoPresetAction, getPromoPresetsInfosAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { useParams } from 'react-router-dom';
import { PlaylistsTabs } from './PlaylistTabs';
import { ContentPaywallPage } from '../../shared/Paywall/ContentPaywallPage';
import { Preset, Promo, ContentPaywallPageInfos } from '../../redux-flow/store/Paywall/Presets/types';
import { ContentPaywallComponentProps } from '../Videos/Paywall';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { Action, createContentPricePresetAction, saveContentPricePresetAction, deleteContentPricePresetAction, createContentPromoPresetAction, saveContentPromoPresetAction, deleteContentPromoPresetAction, getContentPaywallInfosAction, saveContentPaywallInfosAction, getContentPaywallPricesAction, getContentPaywallPromosAction } from '../../redux-flow/store/Content/Paywall/actions';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';

var moment = require('moment-timezone');

const PlaylistPaywall = (props: ContentPaywallComponentProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        props.getContentPaywallInfos(playlistId, 'playlist')
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
        props.getContentPaywallPrices(playlistId, 'playlist')
        props.getContentPaywallPromos(playlistId, 'playlist')
    }, [])

    const [customPricePresetList, setCustomPricePresetList] = React.useState<Preset[]>(null)

    const [customPromoPresetList, setCustomPromoPresetList] = React.useState<Promo[]>(null)

    React.useEffect(() => {
        if (props.contentPaywallInfo['playlist'] && props.contentPaywallInfo['playlist'][playlistId] && props.globalPresets) {
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
                assignedGroupIds: [],
                assignedContentIds: []
            }
            let globalPricePresets: Preset[] = props.globalPresets.presets && props.globalPresets.presets.prices.length > 0 ? props.globalPresets.presets.prices : []
            let globalPromoPresets: Promo[] = props.globalPresets.promos && props.globalPresets.promos.totalItems > 0  ? props.globalPresets.promos.promos : []
            setCustomPricePresetList([...globalPricePresets, customPricePreset])
            setCustomPromoPresetList([...globalPromoPresets, customPromoPreset])
        }
    }, [props.globalPresets.presets, props.contentPaywallInfo['playlist']])

    return props.contentPaywallInfo['playlist'] && props.contentPaywallInfo['playlist'][playlistId] && props.groupsInfos && customPricePresetList && props.theming ? 
        <div className='flex flex-column'>
            <PlaylistsTabs playlistId={playlistId} />
            <ContentPaywallPage
                contentId={playlistId}
                contentType='playlist'
                contentPaywallInfos={props.contentPaywallInfo['playlist'][playlistId]}
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
        : <><PlaylistsTabs playlistId={playlistId} /><SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer></>
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
        getContentPaywallInfos: async (playlistId: string, contentType: string) => {
            await dispatch(getContentPaywallInfosAction(playlistId, contentType));
        },
        getContentPaywallPrices: async (playlistId: string, contentType: string) => {
            await dispatch(getContentPaywallPricesAction(playlistId, contentType));
        },
        saveContentPaywallInfos: async (data: ContentPaywallPageInfos, playlistId: string, contentType: string) => {
            await dispatch(saveContentPaywallInfosAction(data, playlistId, contentType));
        },
        createContentPricePreset: async (data: Preset, playlistId: string, contentType: string) => {
            await dispatch(createContentPricePresetAction(data, playlistId, contentType));
        },
        saveContentPricePreset: async (data: Preset, playlistId: string, contentType: string) => {
            await dispatch(saveContentPricePresetAction(data, playlistId, contentType));
        },
        deleteContentPricePreset: async (data: Preset, playlistId: string, contentType: string) => {
            await dispatch(deleteContentPricePresetAction(data, playlistId, contentType));
        },
        getContentPaywallPromos: async (playlistId: string, contentType: string) => {
            await dispatch(getContentPaywallPromosAction(playlistId, contentType));
        },
        createContentPromoPreset: async (data: Promo, playlistId: string, contentType: string) => {
            await dispatch(createContentPromoPresetAction(data, playlistId, contentType));
        },
        saveContentPromoPreset: async (data: Promo, playlistId: string, contentType: string) => {
            await dispatch(saveContentPromoPresetAction(data, playlistId, contentType));
        },
        deleteContentPromoPreset: async (data: Promo, playlistId: string, contentType: string) => {
            await dispatch(deleteContentPromoPresetAction(data, playlistId, contentType));
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPaywall)