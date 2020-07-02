import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, createVodPricePresetAction, saveVodPricePresetAction, deleteVodPricePresetAction, createVodPromoPresetAction, saveVodPromoPresetAction, deleteVodPromoPresetAction, getVodPaywallInfosAction, saveVodPaywallInfosAction, getVodPaywallPricesAction, getVodPaywallPromosAction } from '../../redux-flow/store/VOD/Paywall/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupPricesAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPricePresetsInfosAction, createPricePresetAction, createPromoPresetAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { Preset, PresetsPageInfos, Promo, ContentPaywallPageInfos, ContentPaywallState } from '../../redux-flow/store/Paywall/Presets/types';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentPaywallPage } from '../../shared/Paywall/ContentPaywallPage';
var moment = require('moment-timezone');

export interface VodPaywallComponentProps {
    vodPaywallInfos: ContentPaywallState;
    getVodPaywallInfos: Function;
    getVodPaywallPrices: Function;
    saveVodPaywallInfos: Function;
    createVodPricePreset: Function;
    saveVodPricePreset: Function;
    deleteVodPricePreset: Function;
    getVodPaywallPromos: Function;
    createVodPromoPreset: Function;
    saveVodPromoPreset: Function;
    deleteVodPromoPreset: Function;
    groupsInfos: GroupsPageInfos;
    getGroupsInfos: Function;
    theming: PaywallThemingData;
    getPaywallThemes: Function;
    globalPresets: PresetsPageInfos;
    getPresetsInfo: Function;
    customPricePresetList: Preset[];
    customPromoPresetList: Promo[];
    createPromoPreset: Function;
    createPricePreset: Function;
    showToast: Function;
}

const VodPaywall = (props: VodPaywallComponentProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if(!props.vodPaywallInfos[vodId]) {
            props.getVodPaywallInfos(vodId)
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
        props.getVodPaywallPrices(vodId)
        props.getVodPaywallPromos(vodId)
    }, [])

    const [customPricePresetList, setCustomPricePresetList] = React.useState<Preset[]>(null)

    const [customPromoPresetList, setCustomPromoPresetList] = React.useState<Promo[]>(null)

    React.useEffect(() => {
        if (props.vodPaywallInfos[vodId] && props.globalPresets) {
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
            let globalPricePresets: Preset[] = props.globalPresets.presets.prices ? props.globalPresets.presets.prices : []
            let globalPromoPresets: Promo[] = props.globalPresets.promos && props.globalPresets.promos.totalItems > 0  ? props.globalPresets.promos.promos : []
            setCustomPricePresetList([...globalPricePresets, customPricePreset])
            setCustomPromoPresetList([...globalPromoPresets, customPromoPreset])

        }
    }, [props.globalPresets.presets, props.vodPaywallInfos])

    return props.vodPaywallInfos[vodId] && props.groupsInfos && customPricePresetList && customPromoPresetList && props.theming ? 
        <div className='flex flex-column'>
            <VideoTabs videoId={vodId} />
            <ContentPaywallPage
                contentId={vodId}
                contentType='vod'
                contentPaywallInfos={props.vodPaywallInfos[vodId]}
                getContentPrices={props.getVodPaywallPrices}
                saveContentPaywallInfos={props.saveVodPaywallInfos}
                createContentPricePreset={props.createVodPricePreset}
                saveContentPricePreset={props.saveVodPricePreset}
                deleteContentPricePreset={props.deleteVodPricePreset}
                getContentPromos={props.getVodPaywallPromos}
                createContentPromoPreset={props.createVodPromoPreset}
                saveContentPromoPreset={props.saveVodPromoPreset}
                deleteContentPromoPreset={props.deleteVodPromoPreset}
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
        vodPaywallInfos: state.vod.paywall,
        groupsInfos: state.paywall.groups,
        theming: state.paywall.theming,
        globalPresets: state.paywall.presets
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodPaywallInfos: (vodId: string) => {
            dispatch(getVodPaywallInfosAction(vodId));
        },
        getVodPaywallPrices: (vodId: string) => {
            dispatch(getVodPaywallPricesAction(vodId));
        },
        saveVodPaywallInfos: (data: ContentPaywallPageInfos, vodId: string) => {
            dispatch(saveVodPaywallInfosAction(data, vodId));
        },
        createVodPricePreset: (data: Preset, vodId: string) => {
            dispatch(createVodPricePresetAction(data, vodId));
        },
        saveVodPricePreset: (data: Preset, vodId: string) => {
            dispatch(saveVodPricePresetAction(data, vodId));
        },
        deleteVodPricePreset: (data: Preset, vodId: string) => {
            dispatch(deleteVodPricePresetAction(data, vodId));
        },
        getVodPaywallPromos: (vodId: string) => {
            dispatch(getVodPaywallPromosAction(vodId));
        },
        createVodPromoPreset: (data: Promo, vodId: string) => {
            dispatch(createVodPromoPresetAction(data, vodId));
        },
        saveVodPromoPreset: (data: Promo, vodId: string) => {
            dispatch(saveVodPromoPresetAction(data, vodId));
        },
        deleteVodPromoPreset: (data: Promo, vodId: string) => {
            dispatch(deleteVodPromoPresetAction(data, vodId));
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

export default connect(mapStateToProps, mapDispatchToProps)(VodPaywall)