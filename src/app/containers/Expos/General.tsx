import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams, Prompt } from 'react-router';
import { ExposTabs } from './ExposTabs';
import { GeneralComponentProps } from '../Videos/General';
import { getContentDetailsAction, Action, editContentDetailsAction, getUploadUrlAction, uploadFileAction, deleteFileAction } from '../../redux-flow/store/Content/General/actions';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { Card } from '../../../components/Card/Card';
import { GeneralDetails } from '../../shared/General/Details';
import { GeneralSharing } from '../../shared/General/Sharing';
import { GeneralImages } from '../../shared/General/Images';
import { ImageModal } from '../../shared/General/ImageModal';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { userId, handleImageModalFunction } from '../../utils/general';
import { Divider } from '../../shared/Common/MiscStyle';
import { ButtonContainer } from '../../shared/General/GeneralStyle';

const GeneralExpos = (props: GeneralComponentProps) => {

    let { exposId } = useParams()

    const [stateContentDetails, setStateContentDetails] = React.useState<ContentDetails>(null)
    const [contentDetails, setContentDetails] = React.useState<ContentDetails>(stateContentDetails)
    const [hasChanged, setHasChanged] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)
    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getContentDetails(exposId, 'expo');
    }, [])

    React.useEffect(() => {
        if(props.contentDetailsState['expo']){
            setStateContentDetails(props.contentDetailsState['expo'][exposId])
            setContentDetails(props.contentDetailsState['expo'][exposId])
        }
    }, [props.contentDetailsState])

    const handleSave = () => {
        setButtonLoading(true)
        props.saveContentDetails(contentDetails, "expo").then(() => {
            setButtonLoading(false)
            setHasChanged(false)
        }).catch(() =>
            setButtonLoading(false)
        )
    }

    return (
        <>
            <ExposTabs exposId={exposId} />
            {props.contentDetailsState['expo'] && stateContentDetails ?
                (
                    <div className='flex flex-column'>
                        <Card className="col col-12 clearfix">
                            <GeneralDetails
                                userId={userId}
                                contentDetails={stateContentDetails}
                                localContentDetails={contentDetails}
                                contentType="expo"
                                setHasChanged={setHasChanged}
                                setLocalContentDetails={setContentDetails}
                            />
                            <Divider className="col col-12 mt3 mr25 mb25" />
                            <GeneralSharing 
                                userId={userId}
                                contentDetails={stateContentDetails}
                                contentType="expo"
                            />
                            <Divider className="col col-12 mt3 mr25 mb25" />
                            <GeneralImages 
                                contentType="expo"
                                localContentDetails={contentDetails}
                                setLocalContentDetails={setContentDetails}
                                contentDetails={stateContentDetails}
                                setHasChanged={setHasChanged}
                                setImageModalTitle={setImageModalTitle}
                                setSelectedImageName={setSelectedImageName}
                                setImageModalOpen={setImageModalOpen}
                                deleteFile={props.deleteFile}
                            />
                            {
                                imageModalOpen &&
                                <ImageModal
                                    imageFileName={selectedImageName}
                                    imageType={handleImageModalFunction(imageModalTitle, "expo")}
                                    contentId={stateContentDetails.id}
                                    contentType="expo"
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

export default connect(mapStateToProps, mapDispatchToProps)(GeneralExpos);