import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PlaylistPaywallPage } from '../../pages/Playlist/Paywall/Paywall'
import { Preset, Action, createPlaylistPricePresetAction, savePlaylistPricePresetAction, deletePlaylistPricePresetAction, Promo, createPlaylistPromoPresetAction, savePlaylistPromoPresetAction, deletePlaylistPromoPresetAction, PlaylistPaywallPageInfos, getPlaylistPaywallInfosAction, savePlaylistPaywallInfosAction } from '../../redux-flow/store/Playlists/Paywall';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GroupsPageInfos, getGroupsInfosAction } from '../../redux-flow/store/Paywall/Groups';
import { getPaywallThemesAction, PaywallThemingData } from '../../redux-flow/store/Paywall/Theming';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

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
}

const PlaylistPaywall = (props: PlaylistPaywallComponentProps) => {

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
    }, [])

    return props.playlistPaywallInfos && props.groupsInfos && props.theming ? 
        <PlaylistPaywallPage {...props} />
        : <SpinnerContainer><LoadingSpinner color='dark-violet' size='large' /></SpinnerContainer>
}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistPaywallInfos: state.playlist.paywall,
        groupsInfos: state.paywall.groups,
        theming: state.paywall.theming
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPaywall)