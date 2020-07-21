import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, createPlaylistPricePresetAction, savePlaylistPricePresetAction, deletePlaylistPricePresetAction, createPlaylistPromoPresetAction, savePlaylistPromoPresetAction, deletePlaylistPromoPresetAction, getPlaylistPaywallInfosAction, savePlaylistPaywallInfosAction, getPlaylistPaywallPricesAction, getPlaylistPaywallPromosAction } from '../../redux-flow/store/Playlists/Paywall';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupPricesAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPricePresetsInfosAction, createPricePresetAction, createPromoPresetAction, getPromoPresetsInfosAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { useParams } from 'react-router-dom';
import { PlaylistsTabs } from './PlaylistTabs';
import { ContentPaywallPage } from '../../shared/Paywall/ContentPaywallPage';
import { Preset, PresetsPageInfos, Promo, ContentPaywallPageInfos, ContentPaywallState } from '../../redux-flow/store/Paywall/Presets/types';

var moment = require('moment-timezone');

export interface PlaylistPaywallComponentProps {
    playlistPaywallInfos: ContentPaywallState;
    getPlaylistPaywallInfos: Function;
    savePlaylistPaywallInfos: Function;
    getPlaylistPaywallPrices: Function;
    createPlaylistPricePreset: Function;
    savePlaylistPricePreset: Function;
    deletePlaylistPricePreset: Function;
    getPlaylistPaywallPromos: Function;
    createPlaylistPromoPreset: Function;
    savePlaylistPromoPreset: Function;
    deletePlaylistPromoPreset: Function;
    groupsInfos: GroupsPageInfos;
    getGroupsInfos: Function;
    theming: PaywallThemingData;
    getPaywallThemes: Function;
    globalPresets: PresetsPageInfos;
    getPricePresetsInfo: Function;
    getPromoPresetsInfo: Function;
    customPricePresetList: Preset[];
    createPricePreset: Function;
    customPromoPresetList: Promo[];
    createPromoPreset: Function;
    showToast: Function;
}

const PlaylistPaywall = (props: PlaylistPaywallComponentProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        if(!props.playlistPaywallInfos[playlistId]) {
            props.getPlaylistPaywallInfos(playlistId)
        }
        if(!props.groupsInfos) {
            props.getGroupsInfos()
        }
        if(!props.theming) {
            props.getPaywallThemes()
        }
        if(!props.globalPresets || !props.globalPresets.presets) {
            props.getPricePresetsInfo('page=1&per-page=100')
        }
        if(!props.globalPresets || !props.globalPresets.promos) {
            props.getPromoPresetsInfo('page=1&per-page=100')
        }
        props.getPlaylistPaywallPrices(playlistId)
        props.getPlaylistPaywallPromos(playlistId)
    }, [])

    const [customPricePresetList, setCustomPricePresetList] = React.useState<Preset[]>(null)

    const [customPromoPresetList, setCustomPromoPresetList] = React.useState<Promo[]>(null)

    React.useEffect(() => {
        if (props.playlistPaywallInfos[playlistId] && props.globalPresets) {
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
    }, [props.globalPresets.presets, props.playlistPaywallInfos])

    return props.playlistPaywallInfos[playlistId] && props.groupsInfos && customPricePresetList && props.theming ? 
        <div className='flex flex-column'>
            <PlaylistsTabs playlistId={playlistId} />
            <ContentPaywallPage
                contentId={playlistId}
                contentType='playlist'
                contentPaywallInfos={props.playlistPaywallInfos[playlistId]}
                getContentPrices={props.getPlaylistPaywallPrices}
                saveContentPaywallInfos={props.savePlaylistPaywallInfos}
                createContentPricePreset={props.createPlaylistPricePreset}
                saveContentPricePreset={props.savePlaylistPricePreset}
                deleteContentPricePreset={props.deletePlaylistPricePreset}
                getContentPromos={props.getPlaylistPaywallPromos}
                createContentPromoPreset={props.createPlaylistPromoPreset}
                saveContentPromoPreset={props.savePlaylistPromoPreset}
                deleteContentPromoPreset={props.deletePlaylistPromoPreset}
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
        playlistPaywallInfos: state.playlist.paywall,
        groupsInfos: state.paywall.groups,
        theming: state.paywall.theming,
        globalPresets: state.paywall.presets
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistPaywallInfos: (playlistId: string) => {
            dispatch(getPlaylistPaywallInfosAction(playlistId));
        },
        savePlaylistPaywallInfos: (data: ContentPaywallPageInfos, playlistId: string) => {
            dispatch(savePlaylistPaywallInfosAction(data, playlistId));
        },
        getPlaylistPaywallPrices: (playlistId: string) => {
            dispatch(getPlaylistPaywallPricesAction(playlistId));
        },
        createPlaylistPricePreset: (data: Preset, playlistId: string) => {
            dispatch(createPlaylistPricePresetAction(data, playlistId));
        },
        savePlaylistPricePreset: (data: Preset, playlistId: string) => {
            dispatch(savePlaylistPricePresetAction(data, playlistId));
        },
        deletePlaylistPricePreset: (data: Preset, playlistId: string) => {
            dispatch(deletePlaylistPricePresetAction(data, playlistId));
        },
        getPlaylistPaywallPromos: (playlistId: string) => {
            dispatch(getPlaylistPaywallPromosAction(playlistId));
        },
        createPlaylistPromoPreset: (data: Promo, playlistId: string) => {
            dispatch(createPlaylistPromoPresetAction(data, playlistId));
        },
        savePlaylistPromoPreset: (data: Promo, playlistId: string) => {
            dispatch(savePlaylistPromoPresetAction(data, playlistId));
        },
        deletePlaylistPromoPreset: (data: Promo, playlistId: string) => {
            dispatch(deletePlaylistPromoPresetAction(data, playlistId));
        },
        getGroupsInfos: () => {
            dispatch(getGroupPricesAction());
        },
        getPaywallThemes: () => {
            dispatch(getPaywallThemesAction())
        },
        getPricePresetsInfo: (qs: string) => {
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPaywall)