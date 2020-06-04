import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PlaylistPaywallPage } from '../../pages/Playlist/Paywall/Paywall'
import { Preset, Action, createPlaylistPricePresetAction, savePlaylistPricePresetAction, deletePlaylistPricePresetAction, Promo, createPlaylistPromoPresetAction, savePlaylistPromoPresetAction, deletePlaylistPromoPresetAction, PlaylistPaywallPageInfos, getPlaylistPaywallInfosAction, savePlaylistPaywallInfosAction } from '../../redux-flow/store/Playlists/Paywall';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupsInfosAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getPricePresetsInfosAction, createPricePresetAction, createPromoPresetAction } from '../../redux-flow/store/Paywall/Presets/actions';
import { useParams } from 'react-router-dom';
import { PlaylistsTabs } from './PlaylistTabs';
var moment = require('moment-timezone');

export interface PlaylistPaywallComponentProps {
    playlistPaywallInfos: PlaylistPaywallPageInfos;
    getPlaylistPaywallInfos: Function;
    savePlaylistPaywallInfos: Function;
    createPlaylistPricePreset: Function;
    savePlaylistPricePreset: Function;
    deletePlaylistPricePreset: Function;
    createPlaylistPromoPreset: Function;
    savePlaylistPromoPreset: Function;
    deletePlaylistPromoPreset: Function;
    groupsInfos: GroupsPageInfos;
    getGroupsInfos: Function;
    theming: PaywallThemingData;
    getPaywallThemes: Function;
    globalPresets: PlaylistPaywallPageInfos;
    getPresetsInfo: Function;
    customPricePresetList: Preset[];
    createPricePreset: Function;
    customPromoPresetList: Promo[];
    createPromoPreset: Function;
}

const PlaylistPaywall = (props: PlaylistPaywallComponentProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        if(!props.playlistPaywallInfos) {
            props.getPlaylistPaywallInfos()
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
        if (props.playlistPaywallInfos && props.globalPresets) {
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
    }, [props.globalPresets.presets, props.playlistPaywallInfos])

    return props.playlistPaywallInfos && props.groupsInfos && customPricePresetList && props.theming ? 
        <div className='flex flex-column'>
            <PlaylistsTabs playlistId={playlistId} />
            <PlaylistPaywallPage {...props} customPricePresetList={customPricePresetList} customPromoPresetList={customPromoPresetList} />
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
        getPlaylistPaywallInfos: () => {
            dispatch(getPlaylistPaywallInfosAction());
        },
        savePlaylistPaywallInfos: (data: PlaylistPaywallPageInfos) => {
            dispatch(savePlaylistPaywallInfosAction(data));
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
        createPlaylistPromoPreset: (data: Promo) => {
            dispatch(createPlaylistPromoPresetAction(data));
        },
        savePlaylistPromoPreset: (data: Promo) => {
            dispatch(savePlaylistPromoPresetAction(data));
        },
        deletePlaylistPromoPreset: (data: Promo) => {
            dispatch(deletePlaylistPromoPresetAction(data));
        },
        getGroupsInfos: () => {
            dispatch(getGroupsInfosAction());
        },
        getPaywallThemes: () => {
            dispatch(getPaywallThemesAction())
        },
        getPricePresetsInfosAction: () => {
            dispatch(getPricePresetsInfosAction())
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