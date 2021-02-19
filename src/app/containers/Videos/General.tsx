import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SubtitleInfo, ContentDetails, ContentDetailsState, VodDetails } from '../../redux-flow/store/Content/General/types';
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
import { handleImageModalFunction } from '../../utils/general'
import { Divider } from '../../../shared/MiscStyles';
import { ContentType } from '../../redux-flow/store/Common/types';
import { ContentUploadType } from '../../../DacastSdk/common';

export interface GeneralComponentProps {
    contentDetailsState: ContentDetailsState;
    contentDetails: ContentDetails;
    getContentDetails: (contentId: string, contentType: ContentType) => Promise<void>
    saveContentDetails: (data: ContentDetails, contentType: ContentType) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: ContentType, subtitleInfo?: SubtitleInfo) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string) => Promise<void>;
    deleteFile: (contentId: string, targetId: string, uploadType: string, contentType: ContentType) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    uploadImageFromVideo?: (contentId: string, time: number, imageType: string) => Promise<void>
    deleteSubtitle?: (targetId: string, contentId: string, fileName: string, contentType: ContentType) => Promise<void>;
    addSubtitle?: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: ContentType) => Promise<void>;
    generateEncoderKey?: (liveId: string) => Promise<void>
}
const General = (props: GeneralComponentProps) => {

    let { vodId } = useParams<{vodId: string}>()

    const [stateContentDetails, setStateContentDetails] = React.useState<VodDetails>(null)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)
    const [contentDetails, setContentDetails] = React.useState<VodDetails>(stateContentDetails)
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
            setStateContentDetails(props.contentDetailsState['vod'][vodId] as VodDetails)
            setContentDetails(props.contentDetailsState['vod'][vodId] as VodDetails)
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
        getContentDetails: async (contentId: string, contentType: ContentType) => {
            await dispatch(getContentDetailsAction(contentType)(contentId));
        },
        saveContentDetails: async (data: ContentDetails, contentType: ContentType) => {
            await dispatch(editContentDetailsAction(contentType)(data))
        },
        getUploadUrl: async (uploadType: ContentUploadType, contentId: string, extension: string, contentType: ContentType) => {
            await dispatch(getUploadUrlAction(contentType)({assetType: uploadType, contentId: contentId, extension: extension}))
        },
        uploadFile: async (data: File, uploadUrl: string, contentId: string, contentType: ContentType) => {
           await dispatch(uploadFileAction(contentType)({data: data, uploadUrl: uploadUrl, contentId: contentId}))
        },
        uploadImageFromVideo: async (contentId: string, time: number, imageType: string)  => {
            await dispatch(uploadImageFromVideoAction({id: contentId, time: time, imageType: imageType}))
        },
        deleteFile: async (contentId: string, targetId: string, contentType: ContentType, imageType: string) => {
            await dispatch(deleteFileAction(contentType)({contentId: contentId, id: targetId}))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        addSubtitle: async (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: ContentType) => {
            await dispatch(addSubtitleAction(contentType)({data: data, uploadUrl: uploadUrl, subtitleInfo: subtitleInfo, contentId: contentId}))
        },
        deleteSubtitle: async (targetId: string, contentId: string, fileName: string, contentType: string) => {
            await dispatch(deleteSubtitleAction(targetId, contentId, fileName, contentType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);

