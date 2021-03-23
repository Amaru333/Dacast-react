import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { ExposTabs } from './ExposTabs';
import { ExpoDetails } from '../../redux-flow/store/Content/General/types';
import { ContentType } from '../../redux-flow/store/Common/types';
import { DesignPage } from '../../pages/Expos/Design';
import { Action, getContentThemeAction, saveContentThemeAction } from '../../redux-flow/store/Content/Theming/actions';
import { ContentThemeState, ThemeOptions } from '../../redux-flow/store/Settings/Theming';
import { ExposThemingState } from '../../redux-flow/store/Content/Theming/types';
import { ContentUploadType } from '../../../DacastSdk/common';
import { deleteFileAction, getUploadUrlAction, uploadFileAction } from '../../redux-flow/store/Content/General/actions';
import { getContentSetupAction } from '../../redux-flow/store/Content/Setup/actions';
import { ContentSetupState } from '../../redux-flow/store/Content/Setup/types';

export interface DesignComponentProps {
    themeState: ContentThemeState;
    contentDataState: ContentSetupState;
    getContentTheme: (contentId: string, contentType: ContentType) => Promise<void>
    saveContentTheme: (theme: ThemeOptions, contentId: string, contentType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    getContentSetup: (contentId: string, contentType: string) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: ContentType, subtitleInfo?: SubtitleInfo) => Promise<void>;
}

const DesignExpos = (props: DesignComponentProps) => {

    var fakeDesignState = {
        darkModeEnable: true,
        coverBackgroundEnable: true,
        coverBackgroundUrl: "",
        coverBackgroundColor: "#fff",
        contentDescriptions: false,
        featuredContentEnable: true,
        featuredContentId: "f4aae457-5dbd-193c-6521-3491eb0938e3"
    }

    let { exposId } = useParams<{exposId: string}>()

    const [stateContentDetails, setStateContentDetails] = React.useState<ExpoDetails>(null)
    const [contentDetails, setContentDetails] = React.useState<ExpoDetails>(stateContentDetails)

    React.useEffect(() => {
        props.getContentTheme(exposId, 'expo');
        props.getContentSetup(exposId, 'expo')
    }, [])

    const handleSave = () => {
        props.saveContentTheme(contentDetails, "expo").then(() => { }).catch(() => {})
    }

    return (
        <>
            <ExposTabs exposId={exposId} />
            { (props.themeState['expos'] && props.themeState['expos'][exposId]) || true  && props.contentDataState['expo'] && props.contentDataState['expo'][exposId] ?
                (
                    <DesignPage 
                        //designState={props.themeState['expos'][exposId].themes[0] as ExposThemingState} 
                        designState={fakeDesignState} 
                        exposId={exposId}
                        {...props}
                    />          
                )
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        themeState: state.content.theming,
        contentDataState: state.content.setup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        getContentTheme: async (contentId: string, contentType: string) => {
            await dispatch(getContentThemeAction(contentId, contentType))
        },
        saveContentTheme: async (theme: ThemeOptions, contentId: string, contentType: string) => {
            await dispatch(saveContentThemeAction(theme, contentId, contentType))
        },
        getUploadUrl: async (uploadType: ContentUploadType, contentId: string, extension: string, contentType: ContentType) => {
            await dispatch(getUploadUrlAction(contentType)({assetType: uploadType, contentId: contentId, extension: extension}))
        },
        deleteFile: async (contentId: string, targetId: string, contentType: ContentType, imageType: string) => {
            await dispatch(deleteFileAction(contentType)({contentId: contentId, id: targetId}))
        },
        uploadFile: async (data: File, uploadUrl: string, contentId: string, contentType: ContentType) => {
            await dispatch(uploadFileAction(contentType)({data: data, uploadUrl: uploadUrl, contentId: contentId}))
        },
        getContentSetup: async (contentId: string, contentType: ContentType) => {
            await dispatch(getContentSetupAction(contentType)(contentId))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignExpos);