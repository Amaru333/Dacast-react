import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, createPlaylistPricePresetAction, savePlaylistPricePresetAction, deletePlaylistPricePresetAction, createPlaylistPromoPresetAction, savePlaylistPromoPresetAction, deletePlaylistPromoPresetAction, getPlaylistPaywallInfosAction, savePlaylistPaywallInfosAction, getPlaylistPaywallPricesAction, getPlaylistPaywallPromosAction } from '../../redux-flow/store/Playlists/Paywall';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupPricesAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPricePresetsInfosAction, createPricePresetAction, createPromoPresetAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { useParams } from 'react-router-dom';
import { PlaylistsTabs } from './PlaylistTabs';
import { ContentPaywallPage } from '../../shared/Paywall/ContentPaywallPage';
import { Preset, PresetsPageInfos, Promo, ContentPaywallPageInfos } from '../../redux-flow/store/Paywall/Presets/types';

var moment = require('moment-timezone');

export interface PlaylistPaywallComponentProps {
    playlistPaywallInfos: ContentPaywallPageInfos;
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
    customPricePresetList: Preset[];
    createPricePreset: Function;
    customPromoPresetList: Promo[];
    createPromoPreset: Function;
    showToast: Function;
}

const PlaylistPaywall = (props: PlaylistPaywallComponentProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        if(!props.playlistPaywallInfos) {
            props.getPlaylistPaywallInfos(playlistId)
        }
        if(!props.groupsInfos) {
            props.getGroupsInfos()
        }
        if(!props.theming) {
            props.getPaywallThemes()
        }
        if(!props.globalPresets) {
            props.getPricePresetsInfo('page=1&per-page=100')
        }
    }, [])

    const [customPricePresetList, setCustomPricePresetList] = React.useState<Preset[]>(null)

    const [customPromoPresetList, setCustomPromoPresetList] = React.useState<Promo[]>(null)

    React.useEffect(() => {
        if (props.playlistPaywallInfos && props.globalPresets) {
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
    }, [props.globalPresets.presets, props.playlistPaywallInfos])

    return props.playlistPaywallInfos && props.groupsInfos && customPricePresetList && props.theming ? 
        <div className='flex flex-column'>
            <PlaylistsTabs playlistId={playlistId} />
            <ContentPaywallPage
                contentId={playlistId}
                contentPaywallInfos={props.playlistPaywallInfos}
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
            />        </div>
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
        savePlaylistPaywallInfos: (data: ContentPaywallPageInfos) => {
            dispatch(savePlaylistPaywallInfosAction(data));
        },
        getPlaylistPaywallPrices: (playlistId: string) => {
            dispatch(getPlaylistPaywallPricesAction(playlistId));
        },
        createPlaylistPricePreset: (data: Preset) => {
            dispatch(createPlaylistPricePresetAction(data));
        },
        savePlaylistPricePreset: (data: Preset) => {
            dispatch(savePlaylistPricePresetAction(data));
        },
        deletePlaylistPricePreset: (data: Preset) => {
            dispatch(deletePlaylistPricePresetAction(data));
        },
        getPlaylistPaywallPromos: () => {
            dispatch(getPlaylistPaywallPromosAction());
        },
        createPlaylistPromoPreset: (data: Promo, playlistId: string) => {
            dispatch(createPlaylistPromoPresetAction(data, playlistId));
        },
        savePlaylistPromoPreset: (data: Promo) => {
            dispatch(savePlaylistPromoPresetAction(data));
        },
        deletePlaylistPromoPreset: (data: Promo) => {
            dispatch(deletePlaylistPromoPresetAction(data));
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
        createPricePreset: (data: Preset) => {
            dispatch(createPricePresetAction(data));
        },
        createPromoPreset: (data: Promo) => {
            dispatch(createPromoPresetAction(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPaywall)