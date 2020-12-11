import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams, Prompt } from 'react-router-dom';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { GeneralComponentProps } from '../Videos/General';
import { ContentDetails, SubtitleInfo } from '../../redux-flow/store/Content/General/types';
import { Action, getContentDetailsAction, editContentDetailsAction, deleteFileAction, uploadFileAction, getUploadUrlAction } from '../../redux-flow/store/Content/General/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { Card } from '../../../components/Card/Card';
import { GeneralDetails } from '../../shared/General/Details';
import { GeneralSharing } from '../../shared/General/Sharing';
import { GeneralSettings } from '../../shared/General/Settings';
import { GeneralImages } from '../../shared/General/Images';
import { GeneralAdvancedLinks } from '../../shared/General/AdvancedLinks';
import { ImageModal } from '../../shared/General/ImageModal';
import { handleImageModalFunction } from '../../utils/general';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { Bubble } from '../../../components/Bubble/Bubble';
import { BubbleContent } from '../../shared/Security/SecurityStyle';
import { Text } from '../../../components/Typography/Text'
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { LinkBoxContainer, ClassHalfXsFullMd, LinkBoxLabel, LinkBox, LinkText, ButtonContainer } from '../../shared/General/GeneralStyle';
import { IconStyle } from '../../../shared/Common/Icon';
import { updateClipboard } from '../../utils/utils';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Divider } from '../../shared/Common/MiscStyle';
import { segmentService } from '../../utils/services/segment/segmentService';

export const LiveGeneral = (props: GeneralComponentProps) => {

    let { liveId } = useParams()

    const [stateContentDetails, setStateContentDetails] = React.useState<ContentDetails>(null)

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)
    const [contentDetails, setContentDetails] = React.useState<ContentDetails>(stateContentDetails)
    const [hasChanged, setHasChanged] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)
    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [encoderModalOpen, setEncoderModalOpen] = React.useState<boolean>(false)
    const [stepModalRewind, setStepModalRewind] = React.useState<1 | 2>(1)
    const [confirmRewindModal, setConfirmRewindModal] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getContentDetails(liveId, 'live')
        .catch(() => setNodataFetched(true))

    }, [])

    React.useEffect(() => {
        if(props.contentDetailsState['live']){
            setStateContentDetails(props.contentDetailsState['live'][liveId])
            setContentDetails(props.contentDetailsState['live'][liveId])
        }
    }, [props.contentDetailsState])

    const handleSave = () => {
        setButtonLoading(true)
        props.saveContentDetails(contentDetails, "live").then(() => {
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
            <LiveTabs liveId={liveId} />
            {
                props.contentDetailsState['live'] && stateContentDetails ?
                    (
                        <div className='flex flex-column'>
                            {/* <ContentGeneralPage
                                contentType="live" 
                                contentDetails={props.contentDetailsState['live'][liveId]}
                                getContentDetails={props.getContentDetails}
                                saveContentDetails={props.saveContentDetails}
                                getUploadUrl={props.getUploadUrl}
                                uploadFile={props.uploadFile}
                                deleteFile={props.deleteFile}
                                showToast={props.showToast}
                            /> */}
                            <Card className="col col-12 clearfix">
                                <GeneralDetails
                                    contentDetails={stateContentDetails}
                                    localContentDetails={contentDetails}
                                    contentType="live"
                                    setHasChanged={setHasChanged}
                                    setLocalContentDetails={setContentDetails}
                                    setEncoderModalOpen={setEncoderModalOpen}
                                />
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralSharing 
                                    contentDetails={stateContentDetails}
                                    contentType="live"
                                />
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralSettings 
                                    contentDetails={stateContentDetails}
                                    localContentDetails={contentDetails}
                                    setLocalContentDetails={setContentDetails}
                                    setHasChanged={setHasChanged}
                                />
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralImages 
                                    contentType="live"
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
                                            imageType={handleImageModalFunction(imageModalTitle, "live")}
                                            contentId={stateContentDetails.id}
                                            contentType="live"
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

                                <Modal hasClose={false} size="large" modalTitle="Encoder Setup" opened={encoderModalOpen} toggle={() => setEncoderModalOpen(!encoderModalOpen)} >
                                    <ModalContent>
                                        <div className="col col-12">
                                            <Bubble type='info' className='my2'>
                                                <BubbleContent>
                                                    <Text weight="reg" size={16} >
                                                        Correct <a href={getKnowledgebaseLink("Encoder Setup")} target="_blank">Encoder Setup</a> is required — <a href='/help'>contact us</a> if you need help.
                                                        </Text>
                                                    </BubbleContent>
                                                </Bubble>

                                                <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                                    <LinkBoxLabel>
                                                        <Text size={14} weight="med">Server</Text>
                                                    </LinkBoxLabel>
                                                    <LinkBox>
                                                        <LinkText size={14} weight="reg">{stateContentDetails.primaryPublishURL}</LinkText>
                                                        <IconStyle className='pointer' onClick={() => {updateClipboard(stateContentDetails.primaryPublishURL, "Copied to clipboard");segmentService.track('Livestream Created', {action: 'Setup Livestream', 'livestream_id': liveId, step: 2}) } }>file_copy</IconStyle>
                                                    </LinkBox>
                                                </LinkBoxContainer>
                                                <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                                    <LinkBoxLabel>
                                                        <Text size={14} weight="med">Backup Server</Text>
                                                    </LinkBoxLabel>
                                                    <LinkBox>
                                                        <LinkText size={14} weight="reg">{stateContentDetails.backupPublishURL}</LinkText>
                                                        <IconStyle className='pointer' onClick={() => updateClipboard(stateContentDetails.backupPublishURL, "Copied to clipboard")}>file_copy</IconStyle>
                                                    </LinkBox>
                                                </LinkBoxContainer>
                                                <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                                    <LinkBoxLabel>
                                                        <Text size={14} weight="med">Username</Text>
                                                    </LinkBoxLabel>
                                                    <LinkBox>
                                                        <LinkText size={14} weight="reg">{stateContentDetails.username}</LinkText>
                                                        <IconStyle className='pointer' onClick={() => updateClipboard(stateContentDetails.username, "Copied to clipboard")}>file_copy</IconStyle>
                                                    </LinkBox>
                                                </LinkBoxContainer>
                                                <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                                    <LinkBoxLabel>
                                                        <Text size={14} weight="med">Password</Text>
                                                    </LinkBoxLabel>
                                                    <LinkBox>
                                                        <LinkText size={14} weight="reg">{stateContentDetails.password}</LinkText>
                                                        <IconStyle className='pointer' onClick={() => updateClipboard(stateContentDetails.password, "Copied to clipboard")}>file_copy</IconStyle>
                                                    </LinkBox>
                                                </LinkBoxContainer>
                                                {stateContentDetails.streamKeys.map((streamKey, i) => {
                                                    return(
                                                    <LinkBoxContainer key={streamKey} className={ClassHalfXsFullMd + " mb2"}>
                                                    <LinkBoxLabel>
                                                        <Text size={14} weight="med">{"Stream Key " + (i+1)}</Text>
                                                    </LinkBoxLabel>
                                                    <LinkBox>
                                                        <LinkText size={14} weight="reg">{streamKey}</LinkText>
                                                        <IconStyle className='pointer' onClick={() => updateClipboard(streamKey, "Copied to clipboard")}>file_copy</IconStyle>
                                                    </LinkBox>
                                                </LinkBoxContainer>
                                                    )
                                                })}
                                            </div>
                                            <div className="flex col col-12 mt2">
                                                <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                                                <Text size={14} weight="reg">Need help setting up an encoder? Visit the <a href={getKnowledgebaseLink('Encoder Setup')} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                                            </div>
                                        </ModalContent>
                                        <ModalFooter className="mt1" >
                                            <Button onClick={() => setEncoderModalOpen(false)}>Close</Button>
                                        </ModalFooter>
                                    </Modal>

                                    {/* UNCOMMENT WHEN REWIND ADDED
                                        <Modal hasClose={false} icon={stepModalRewind === 1 ? { name: 'info_outlined', color: 'yellow' } : { name: 'check', color: 'green' }} size="large" modalTitle={stepModalRewind === 1 ? "Is your Encoder turned off?" : "30 Minute Rewind Enabled"} opened={confirmRewindModal} toggle={() => setConfirmRewindModal(!confirmRewindModal)} >
                                        {stepModalRewind === 1 ?
                                            <>
                                                <ModalContent>
                                                    <Text weight="reg" size={14}>
                                                        Please confirm you have turned off your encoder before continuing.
                                                            </Text>
                                                    <Text weight="med" size={14}>
                                                        Need step by step help? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a>.
                                                            </Text>
                                                </ModalContent>
                                                <ModalFooter className="mt1" >
                                                    <Button onClick={() => { setStepModalRewind(2) }}>Yes</Button>
                                                    <Button onClick={() => { setConfirmRewindModal(false) }} typeButton="tertiary">No</Button>
                                                </ModalFooter>
                                            </>
                                            :
                                            <>
                                                <ModalContent>
                                                    <Text weight="reg" size={14}>
                                                        You must now purge your live stream. 30min rewind will take effect in 2 hours.
                                                            </Text>
                                                    <Text weight="med" size={14}>
                                                        Need step by step help? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a>.
                                                            </Text>
                                                </ModalContent>
                                                <ModalFooter className="mt1" >
                                                    <Button onClick={() => { setContentDetails({ ...contentDetails, rewind: !contentDetails.rewind }); setConfirmRewindModal(false); setStepModalRewind(1) }}>Confirm</Button>
                                                </ModalFooter>
                                            </>
                                        }
                                    </Modal> */}
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
        getContentDetails: async (liveId: string, contentType: string) => {
            await dispatch(getContentDetailsAction(liveId, contentType));
        },
        saveContentDetails: async (data: ContentDetails, contentType: string) => {
            await dispatch(editContentDetailsAction(data, contentType))
        },
        getUploadUrl: async (uploadType: string, vodId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => {
            await dispatch(getUploadUrlAction(uploadType, vodId, extension, contentType, subtitleInfo))
        },
        uploadFile: async (data: File, uploadUrl: string, vodId: string, uploadType: string, contentType: string) => {
           await dispatch(uploadFileAction(data, uploadUrl, vodId, uploadType, contentType))
        },
        deleteFile: async (vodId: string, targetId: string, contentType: string, imageType: string) => {
            await dispatch(deleteFileAction(vodId, targetId, contentType, imageType))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveGeneral);