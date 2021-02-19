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
import { ContentDetails, ExpoDetails } from '../../redux-flow/store/Content/General/types';
import { Card } from '../../../components/Card/Card';
import { GeneralDetails } from '../../shared/General/Details';
import { GeneralSharing } from '../../shared/General/Sharing';
import { GeneralImages } from '../../shared/General/Images';
import { ImageModal } from '../../shared/General/ImageModal';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { handleImageModalFunction } from '../../utils/general';
import { Divider } from '../../../shared/MiscStyles';
import { ButtonContainer } from '../../shared/General/GeneralStyle';
import { ContentType } from '../../redux-flow/store/Common/types';
import { ContentUploadType } from '../../../DacastSdk/common';

const GeneralExpos = (props: GeneralComponentProps) => {

    let { exposId } = useParams<{exposId: string}>()

    const [stateContentDetails, setStateContentDetails] = React.useState<ExpoDetails>(null)
    const [contentDetails, setContentDetails] = React.useState<ExpoDetails>(stateContentDetails)
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
            setStateContentDetails(props.contentDetailsState['expo'][exposId] as ExpoDetails)
            setContentDetails(props.contentDetailsState['expo'][exposId] as ExpoDetails)
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
                                contentDetails={stateContentDetails}
                                localContentDetails={contentDetails}
                                contentType="expo"
                                setHasChanged={setHasChanged}
                                setLocalContentDetails={setContentDetails}
                            />
                            <Divider className="col col-12 mt3 mr25 mb25" />
                            <GeneralSharing 
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
         deleteFile: async (contentId: string, targetId: string, contentType: ContentType, imageType: string) => {
            await dispatch(deleteFileAction(contentType)({contentId: contentId, id: targetId}))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralExpos);