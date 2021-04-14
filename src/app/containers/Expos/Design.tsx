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
import { ContentDetails, ContentDetailsState, ExpoDetails, ExposThemingState } from '../../redux-flow/store/Content/General/types';
import { ContentType } from '../../redux-flow/store/Common/types';
import { DesignPage, ScaledFrame, WrapIFrame } from '../../pages/Expos/Design';
import { Action } from '../../redux-flow/store/Content/Theming/actions';
import { ContentUploadType } from '../../../DacastSdk/common';
import { deleteFileAction, editContentDetailsAction, getContentDetailsAction, getUploadUrlAction, uploadFileAction } from '../../redux-flow/store/Content/General/actions';
import { getContentSetupAction } from '../../redux-flow/store/Content/Setup/actions';
import { ContentSetupState } from '../../redux-flow/store/Content/Setup/types';
import { isProduction } from '../../utils/services/player/stage';
import { PlayerSection } from '../../pages/Videos/ChapterMarkers/ChaptersStyle';

export interface DesignComponentProps {
    themeState: ContentDetailsState;
    contentDataState: ContentSetupState;
    getContentDetails: (contentId: string, contentType: ContentType) => Promise<void>
    saveContentDetails: (data: ContentDetails, contentType: ContentType) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    getContentSetup: (contentId: string, contentType: string) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: ContentType) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string, contentId: string, contentType: ContentType) => Promise<void>;
    deleteFile: (contentId: string, targetId: string, uploadType: string) => Promise<void>;
}

const DesignExpos = (props: DesignComponentProps) => {

    let { exposId } = useParams<{exposId: string}>()
    const expoClientBaseUrl = isProduction() ? 'https://dacastexpo.com/?id=' : 'https://singularity-expo.dacast.com/?id='

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getContentDetails(exposId, 'expo');
        props.getContentSetup(exposId, 'expo')
    }, [])

    const handleSave = (data: ExposThemingState) => {
        setIsLoading(true)
        console.log(data);
        return props.saveContentDetails({...props.themeState['expo'][exposId], appearance: data}, "expo").then( ()=>  setIsLoading(false)).catch(() => {})
    }

    return (
        <>
            <ExposTabs exposId={exposId} />
            { (props.themeState['expo'] && props.themeState['expo'][exposId])  && props.contentDataState['expo'] && props.contentDataState['expo'][exposId] ?
                (
                    <React.Fragment>
                        <DesignPage 
                            uploadUrl={(props.themeState['expo'][exposId] as ExpoDetails).uploadurl}
                            designState={ (props.themeState['expo'][exposId] as ExpoDetails).appearance } 
                            exposId={exposId}
                            {...props}
                            save={handleSave}
                        />
                        {
                            !isLoading ?
                            <PlayerSection className='xs-mb2 col col-right col-6 md-col-8 relative sm-pl1'>
                                <WrapIFrame className='col-12'>
                                    <ScaledFrame  src={expoClientBaseUrl+exposId} />   
                                </WrapIFrame>
                            </PlayerSection>
                            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
                        }
                    </React.Fragment>
                )
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        themeState: state.content.general,
        contentDataState: state.content.setup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        saveContentDetails: async (data: ContentDetails, contentType: ContentType) => {
            await dispatch(editContentDetailsAction(contentType)(data as ExpoDetails))
        },
        getContentDetails: async (contentId: string, contentType: ContentType) => {
            await dispatch(getContentDetailsAction(contentType)(contentId));
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