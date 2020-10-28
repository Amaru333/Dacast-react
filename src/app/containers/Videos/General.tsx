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
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { languages } from 'countries-list';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text'
import { IconStyle } from '../../../shared/Common/Icon';
import { ExpandableContainer, ButtonContainer } from '../../shared/General/GeneralStyle';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import styled from 'styled-components';
import { userToken } from '../../utils/services/token/tokenService';
import { ImageModal } from '../../shared/General/ImageModal';
import { handleImageModalFunction, userId } from '../../utils/general'
import { PreviewModal } from '../../shared/Common/PreviewModal';
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
    addSubtitle?: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: string) => Promise<void>
}
const General = (props: GeneralComponentProps) => {

    let { vodId } = useParams()

    const emptySubtitle = { targetID: "", name: "", languageLongName: "", languageShortName: "", convertToUTF8: false }
    let subtitleBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    const [stateContentDetails, setStateContentDetails] = React.useState<ContentDetails>(null)

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)
    const [contentDetails, setContentDetails] = React.useState<ContentDetails>(stateContentDetails)
    const [hasChanged, setHasChanged] = React.useState<boolean>(false)
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)
    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [subtitleModalOpen, setSubtitleModalOpen] = React.useState<boolean>(false)
    const [uploadedSubtitleFile, setUploadedSubtitleFile] = React.useState<SubtitleInfo>(emptySubtitle)
    const [subtitleFile, setSubtitleFile] = React.useState<File>(null)
    const [advancedSubtitleSectionExpanded, setAdvancedSubtitleSectionExpanded] = React.useState<boolean>(false)
    const [subtitleButtonLoading, setSubtitleButtonLoading] = React.useState<boolean>(false);
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

    React.useEffect(() => {
        if (stateContentDetails && stateContentDetails.uploadurl && subtitleModalOpen) {
            props.addSubtitle(subtitleFile, stateContentDetails.uploadurl, { ...uploadedSubtitleFile, targetID: stateContentDetails.subtitles[stateContentDetails.subtitles.length - 1].targetID }, stateContentDetails.id, "vod").then(() =>
                setSubtitleButtonLoading(false)
            ).catch(() =>
                setSubtitleButtonLoading(false)
            )
            setUploadedSubtitleFile(emptySubtitle)
            setSubtitleModalOpen(false);
        }
    }, [stateContentDetails])

    const handleDrop = (file: FileList) => {
        const acceptedImageTypes = ['.srt', '.vtt'];
        if (file.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setSubtitleFile(file[0])
                setUploadedSubtitleFile({ ...uploadedSubtitleFile, name: file[0].name })
            }
            reader.readAsDataURL(file[0])
        }
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const handleSubtitleSubmit = () => {
        setSubtitleButtonLoading(true)
        props.getUploadUrl('subtitle', stateContentDetails.id, null, "vod", uploadedSubtitleFile)
    }

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
                                    userId={userId}
                                    contentDetails={stateContentDetails}
                                    localContentDetails={contentDetails}
                                    contentType="vod"
                                    setHasChanged={setHasChanged}
                                    setLocalContentDetails={setContentDetails}
                                />
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralSharing 
                                    userId={userId}
                                    contentDetails={stateContentDetails}
                                    contentType="vod"
                                    setPreviewModalOpen={setPreviewModalOpen}
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
                                    setSubtitleModalOpen={setSubtitleModalOpen}
                                    deleteSubtitle={props.deleteSubtitle}
                                />
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralAdvancedLinks contentDetails={stateContentDetails} />

                                {
                                    subtitleModalOpen &&
                                        <Modal id="addSubtitles" opened={subtitleModalOpen === true} toggle={() => setSubtitleModalOpen(false)} size="small" modalTitle="Add Subtitles" hasClose={false}>
                                            <ModalContent>
                                                <DropdownSingle
                                                    hasSearch
                                                    className="col col-12"
                                                    id="subtitleLanguage"
                                                    dropdownTitle="Subtitle Language"
                                                    list={Object.keys(languages).reduce((reduced, language) => { return { ...reduced, [languages[language].name]: false } }, {})}
                                                    dropdownDefaultSelect={uploadedSubtitleFile.languageLongName}
                                                    callback={(value: string) => setUploadedSubtitleFile({ ...uploadedSubtitleFile, languageLongName: value, languageShortName: Object.keys(languages).find(l => languages[l].name === value) })}
                                                />
                                                <input type='file' ref={subtitleBrowseButtonRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{ display: 'none' }} id='browseButtonSubtitle' />
                                                <Button onClick={() => { subtitleBrowseButtonRef.current.click() }} className="mt25" typeButton="secondary" sizeButton="xs">
                                                    Select Files
                                                    </Button>
                                                <Text className="col col-12" size={10} weight="reg" color="gray-5">Max file size is 1MB, File srt or vtt</Text>
                                                {uploadedSubtitleFile.name === "" ? null :
                                                    <SubtitleFile className="col mt1">
                                                        <SubtitleTextContainer>
                                                            <Text className="ml2" color="gray-1" size={14} weight="reg">{uploadedSubtitleFile.name}</Text>
                                                        </SubtitleTextContainer>
                                                        <button style={{ border: "none", backgroundColor: "inherit" }}>
                                                            <IconStyle onClick={() => setUploadedSubtitleFile({ ...uploadedSubtitleFile, name: "" })} className='flex items-center' customsize={14}>close</IconStyle>
                                                        </button>
                                                    </SubtitleFile>
                                                }
                                                <div className="col col-12">
                                                    <div className="flex mt25" onClick={() => setAdvancedSubtitleSectionExpanded(!advancedSubtitleSectionExpanded)}>
                                                        <IconStyle className="col col-1 pointer">{advancedSubtitleSectionExpanded ? "expand_less" : "expand_more"}</IconStyle>
                                                        <Text className="col col-11 pointer" size={16} weight="med">Advanced Settings</Text>
                                                    </div>
                                                    <ExpandableContainer className="flex my2" isExpanded={advancedSubtitleSectionExpanded}>
                                                        <InputCheckbox className='col' id='convertToUtf8Checkbox' label='Convert to UTF-8' defaultChecked={uploadedSubtitleFile.convertToUTF8 || false} onChange={() => { setUploadedSubtitleFile({ ...uploadedSubtitleFile, convertToUTF8: !uploadedSubtitleFile.convertToUTF8 }) }} />
                                                        <IconStyle className="ml1" style={{ marginTop: 5 }} fontSize="small" id="utfTooltip">info_outlined</IconStyle>
                                                        <Tooltip target="utfTooltip">Uncheck if you have already converted your file to UTF-8.</Tooltip>
                                                    </ExpandableContainer>
                                                </div>
                                            </ModalContent>
                                            <ModalFooter>
                                                <Button disabled={uploadedSubtitleFile.name === "" || !uploadedSubtitleFile.languageLongName} isLoading={subtitleButtonLoading} onClick={() => { handleSubtitleSubmit() }}  >Add</Button>
                                                <Button onClick={() => { setSubtitleModalOpen(false); setUploadedSubtitleFile(emptySubtitle) }} typeButton="secondary">Cancel</Button>
                                            </ModalFooter>
                                        </Modal>
                                }

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
                            {
                                previewModalOpen && <PreviewModal contentId={userId + '-vod-' + stateContentDetails.id} toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
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

const SubtitleFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
    max-width: 352px;
    
`

const SubtitleTextContainer = styled.div`
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 352px;
`