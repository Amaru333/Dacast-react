import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SubtitleInfo, ContentDetails, ContentDetailsState } from '../../redux-flow/store/Content/General/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams, Prompt } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { getContentDetailsAction, editContentDetailsAction, getUploadUrlAction, uploadFileAction, uploadImageFromVideoAction, deleteFileAction, deleteSubtitleAction, addSubtitleAction, Action } from '../../redux-flow/store/Content/General/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { Card } from '../../../components/Card/Card';
import { GeneralDetails } from '../../shared/General/Details';
import { GeneralSharing } from '../../shared/General/Sharing';
import { GeneralImages } from '../../shared/General/Images';
import { GeneralSubtitles } from '../../shared/General/Subtitles';
import { GeneralAdvancedLinks } from '../../shared/General/AdvancedLinks';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { ButtonContainer } from '../../shared/General/GeneralStyle';
import { ImageModal } from '../../shared/General/ImageModal';
import { handleImageModalFunction, userId } from '../../utils/general'
import { Divider } from '../../shared/Common/MiscStyle';

export interface GeneralComponentProps {
    contentDetailsState: ContentDetailsState;
    contentDetails: ContentDetails;
    getContentDetails: (contentId: string, contentType: string) => Promise<void>
    saveContentDetails: (data: ContentDetails, contentType: string) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string, contentId: string, uploadType: string, contentType: string) => Promise<void>;
    deleteFile: (contentId: string, targetId: string, uploadType: string, contentType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    uploadImageFromVideo?: (contentId: string, time: number, imageType: string) => Promise<void>
    deleteSubtitle?: (targetId: string, contentId: string, fileName: string, contentType: string) => Promise<void>;
    addSubtitle?: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: string) => Promise<void>;
    generateEncoderKey?: (liveId: string) => Promise<void>
}
const General = (props: GeneralComponentProps) => {

    let { vodId } = useParams()

    const [stateContentDetails, setStateContentDetails] = React.useState<ContentDetails>(null)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)
    const [contentDetails, setContentDetails] = React.useState<ContentDetails>(stateContentDetails)
    const [hasChanged, setHasChanged] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)
    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    
    React.useEffect(() => {
        props.getContentDetails(vodId, "vod")
        .catch(() => setNodataFetched(true))
    }, [])

    React.useEffect(() => {
        if(props.contentDetailsState['vod']){
            setStateContentDetails(props.contentDetailsState['vod'][vodId])
            setContentDetails(props.contentDetailsState['vod'][vodId])
        }
    }, [props.contentDetailsState])

    const handleSave = () => {
        setButtonLoading(true)
        props.saveContentDetails(contentDetails, "vod").then(() => {
            setButtonLoading(false)
            setHasChanged(false)
        }).catch(() =>
            setButtonLoading(false)
        )
    }

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.contentDetailsState["vod"] && stateContentDetails ?
                    (
                        <div className='flex flex-column'>
                            <Card className="col col-12 clearfix">
                                <GeneralDetails
                                    contentDetails={stateContentDetails}
                                    localContentDetails={contentDetails}
                                    contentType="vod"
                                    setHasChanged={setHasChanged}
                                    setLocalContentDetails={setContentDetails}
                                />
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralSharing 
                                    contentDetails={stateContentDetails}
                                    contentType="vod"
                                />
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralImages 
                                    contentType="vod"
                                    localContentDetails={contentDetails}
                                    setLocalContentDetails={setContentDetails}
                                    contentDetails={stateContentDetails}
                                    setHasChanged={setHasChanged}
                                    setImageModalTitle={setImageModalTitle}
                                    setSelectedImageName={setSelectedImageName}
                                    setImageModalOpen={setImageModalOpen}
                                    deleteFile={props.deleteFile}
                                />
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralSubtitles 
                                    contentType="vod"
                                    contentDetails={stateContentDetails}
                                    deleteSubtitle={props.deleteSubtitle}
                                    addSubtitle={props.addSubtitle}
                                    getUploadUrl={props.getUploadUrl}
                                />
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralAdvancedLinks contentDetails={stateContentDetails} />

                                {
                                    imageModalOpen &&
                                        <ImageModal
                                            imageFileName={selectedImageName}
                                            imageType={handleImageModalFunction(imageModalTitle, "vod")}
                                            contentId={stateContentDetails.id}
                                            contentType="vod"
                                            uploadFromVideoAction={props.uploadImageFromVideo}
                                            uploadUrl={stateContentDetails.uploadurl}
                                            getUploadUrl={props.getUploadUrl}
                                            title={imageModalTitle}
                                            toggle={() => setImageModalOpen(false)}
                                            opened={imageModalOpen === true}
                                            submit={props.uploadFile}
                                            getContentDetails={props.getContentDetails}
                                        />
                                }
                            </Card>
                            {
                                hasChanged &&
                                <ButtonContainer>
                                    <Button isLoading={buttonLoading} className="mr2" onClick={() => handleSave()}>Save</Button>
                                    <Button typeButton="tertiary" onClick={() => { setContentDetails(stateContentDetails); props.showToast("Changes have been discarded", 'fixed', "success"); setHasChanged(false) }}>Discard</Button>
                                </ButtonContainer>
                            }
                            <Prompt when={hasChanged} message='' />
                        </div>
                    )
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        contentDetailsState: state.content.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentDetails: async (contentId: string, contentType: string) => {
            await dispatch(getContentDetailsAction(contentId, contentType));
        },
        saveContentDetails: async (data: ContentDetails, contentType: string) => {
            await dispatch(editContentDetailsAction(data, contentType))
        },
        getUploadUrl: async (uploadType: string, contentId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => {
            await dispatch(getUploadUrlAction(uploadType, contentId, extension, contentType, subtitleInfo))
        },
        uploadFile: async (data: File, uploadUrl: string, contentId: string, uploadType: string, contentType: string) => {
           await dispatch(uploadFileAction(data, uploadUrl, contentId, uploadType, contentType))
        },
        uploadImageFromVideo: async (contentId: string, time: number, imageType: string)  => {
            await dispatch(uploadImageFromVideoAction(contentId, time, imageType))
        },
        deleteFile: async (contentId: string, targetId: string, contentType: string, imageType: string) => {
            await dispatch(deleteFileAction(contentId, targetId, contentType, imageType))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        addSubtitle: async (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: string) => {
            await dispatch(addSubtitleAction(data, uploadUrl, subtitleInfo, contentId, contentType))
        },
        deleteSubtitle: async (targetId: string, contentId: string, fileName: string, contentType: string) => {
            await dispatch(deleteSubtitleAction(targetId, contentId, fileName, contentType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);

