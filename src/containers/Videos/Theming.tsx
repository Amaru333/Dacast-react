import React from 'react';
import { VodThemingPage } from '../../pages/Videos/Theming/Theming';
import { VodTheme } from '../../redux-flow/store/VOD/Theming/types';
import { ThemesData, ThemeOptions } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getVodThemeAction, saveVodThemeAction } from '../../redux-flow/store/VOD/Theming/actions';
import { connect } from 'react-redux';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface VodThemingComponentProps {
    theme: VodTheme;
    themeList: ThemesData;
    getVodTheme: Function;
    saveVodTheme: Function;
    getThemingList: Function;
}

export const VodTheming = (props: VodThemingComponentProps) => {

    const customTheme: ThemeOptions = {
        id: "custom",
        themeName: 'Custom Theme',
        isDefault: false,
        createdDate: '',
        themeType: 'vod',
        bigPlayButton: false,
        playPause: false,
        scrubber: false,
        scrubbingThumbnail: false,
        timeCode: false,
        speedControls: false,
        qualityOptions: false,
        volume: false,
        fullscreen: false,
        thumbnailPosition: 'left',
        isViewerCounterEnabled: false,
        viewerCounterLimit: 100,
        downloadButton: false,
        socialSharing: false,
        embedCode: false,
        playerTransparency: false,
        hasCustomColor: false,
        customColor: '',
        autoplay: false,
        startVideoMuted: false,
        looping: false,
        continuousPlay: false,
        skipVideos: false,
        offlineMessage: '',
        deliveryMethod: 'compatible',
        regionSettings: 'standard'
    };

    React.useEffect(() => {
        if(!props.theme ||  (!props.theme && !props.themeList)) {
            props.getVodTheme();
            props.getThemingList();
        }
    }, [])
    
    const [customThemeList, setCustomThemeList] = React.useState<ThemesData>(null)
    React.useEffect(() => {
        if (props.themeList) {
            let customThemeListy = props.themeList.themes
            customThemeListy.push(customTheme)
            console.log(customThemeListy)
            setCustomThemeList({themes: customThemeListy})
        }
        console.log(props.themeList)
        
    }, [props.themeList])



    return (
        props.theme && customThemeList ?
            <VodThemingPage  themeList={customThemeList} {...props} />
            : <LoadingSpinner color='dark-violet' size='large' />
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        theme: state.vod.theming,
        themeList: state.settings.theming
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodTheme: () => {
            dispatch(getVodThemeAction());
        },
        saveVodTheme: (theme: VodTheme) => {
            dispatch(saveVodThemeAction(theme));
        },
        getThemingList: () => {
            dispatch(getThemingListAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodTheming);