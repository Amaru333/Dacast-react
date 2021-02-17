import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams, Prompt } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';
import { GeneralComponentProps } from '../Videos/General';
import { getContentDetailsAction, Action, editContentDetailsAction, getUploadUrlAction, uploadFileAction, deleteFileAction } from '../../redux-flow/store/Content/General/actions';
import { ContentDetails, PlaylistDetails } from '../../redux-flow/store/Content/General/types';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { Card } from '../../../components/Card/Card';
import { GeneralDetails } from '../../shared/General/Details';
import { GeneralSharing } from '../../shared/General/Sharing';
import { GeneralImages } from '../../shared/General/Images';
import { GeneralAdvancedLinks } from '../../shared/General/AdvancedLinks';
import { ImageModal } from '../../shared/General/ImageModal';
import { ButtonContainer } from '../../shared/General/GeneralStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { handleImageModalFunction } from '../../utils/general';
import { Divider } from '../../../shared/MiscStyles';
import { ContentType } from '../../redux-flow/store/Common/types';

const GeneralPlaylist = (props: GeneralComponentProps) => {

    let { playlistId } = useParams<{playlistId: string}>()

    const [stateContentDetails, setStateContentDetails] = React.useState<PlaylistDetails>(null)
    const [contentDetails, setContentDetails] = React.useState<PlaylistDetails>(stateContentDetails)
    const [hasChanged, setHasChanged] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)
    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getContentDetails(playlistId, 'playlist')
        .catch(() => setNodataFetched(true))

    }, [])

    React.useEffect(() => {
        if(props.contentDetailsState['playlist']){
            setStateContentDetails(props.contentDetailsState['playlist'][playlistId] as PlaylistDetails)
            setContentDetails(props.contentDetailsState['playlist'][playlistId] as PlaylistDetails)
        }
    }, [props.contentDetailsState])

    const handleSave = () => {
        setButtonLoading(true)
        props.saveContentDetails(contentDetails, "playlist").then(() => {
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
            <PlaylistsTabs playlistId={playlistId} />
            { props.contentDetailsState['playlist'] && stateContentDetails ?
                (
                    <div className='flex flex-column'>
                        <Card className="col col-12 clearfix">
                            <GeneralDetails
                                contentDetails={stateContentDetails}
                                localContentDetails={contentDetails}
                                contentType="playlist"
                                setHasChanged={setHasChanged}
                                setLocalContentDetails={setContentDetails}
                            />
                            <Divider className="col col-12 mt3 mr25 mb25" />
                            <GeneralSharing 
                                contentDetails={stateContentDetails}
                                contentType="playlist"
                            />
                            <Divider className="col col-12 mt3 mr25 mb25" />
                            <GeneralImages 
                                contentType="playlist"
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
                            <GeneralAdvancedLinks contentDetails={stateContentDetails} />

                            {
                                imageModalOpen &&
                                    <ImageModal
                                        imageFileName={selectedImageName}
                                        imageType={handleImageModalFunction(imageModalTitle, "playlist")}
                                        contentId={stateContentDetails.id}
                                        contentType="playlist"
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
        getUploadUrl: async (uploadType: string, contentId: string, extension: string, contentType: string) => {
            await dispatch(getUploadUrlAction(uploadType, contentId, extension, contentType))
        },
        uploadFile: async (data: File, uploadUrl: string, contentId: string, uploadType: string, contentType: string) => {
           await dispatch(uploadFileAction(data, uploadUrl, contentId, uploadType, contentType))
        },
        deleteFile: async (contentId: string, targetId: string, contentType: string, imageType: string) => {
            await dispatch(deleteFileAction(contentId, targetId, contentType, imageType))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralPlaylist);