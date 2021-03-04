import React from 'react';
import { Text } from '../../../components/Typography/Text'
import { Table } from '../../../components/Table/Table';
import { ContentDetails, SubtitleInfo } from '../../redux-flow/store/Content/General/types';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle, IconContainer, ActionIcon } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { ExpandableContainer } from './GeneralStyle';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
import { languages } from 'countries-list';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ContentType } from '../../redux-flow/store/Common/types';

interface GeneralSubtitlesProps {
    contentType: ContentType, 
    contentDetails: ContentDetails, 
    getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: ContentType, subtitleInfo?: SubtitleInfo) => Promise<void>;
    deleteSubtitle?: (contentId: string, targetId: string, contentType: ContentType) => Promise<void>, 
    addSubtitle?: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: ContentType) => Promise<void>, 
}

export const GeneralSubtitles = (props: GeneralSubtitlesProps) => {

    const emptySubtitle = { targetID: "", name: "", languageLongName: "", languageShortName: "", convertToUTF8: false }
    let subtitleBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    const [subtitleModalOpen, setSubtitleModalOpen] = React.useState<boolean>(false)
    const [uploadedSubtitleFile, setUploadedSubtitleFile] = React.useState<SubtitleInfo>(emptySubtitle)
    const [subtitleFile, setSubtitleFile] = React.useState<File>(null)
    const [advancedSubtitleSectionExpanded, setAdvancedSubtitleSectionExpanded] = React.useState<boolean>(false)
    const [subtitleButtonLoading, setSubtitleButtonLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.contentDetails && props.contentDetails.uploadurl && subtitleModalOpen) {
            props.addSubtitle(subtitleFile, props.contentDetails.uploadurl, { ...uploadedSubtitleFile, targetID: props.contentDetails.subtitles[props.contentDetails.subtitles.length - 1].targetID }, props.contentDetails.id, "vod").then(() =>
                setSubtitleButtonLoading(false)
            ).catch(() =>
                setSubtitleButtonLoading(false)
            )
            setUploadedSubtitleFile(emptySubtitle)
            setSubtitleModalOpen(false);
        }
    }, [props.contentDetails])

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
        props.getUploadUrl('subtitle', props.contentDetails.id, null, "vod", uploadedSubtitleFile)
    }

    const disabledSubtitlesTableHeader = () => {
        return {
            data: [
                { cell: <span key={'disabledTableHeader'}></span> },
                { cell: <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button> }
            ]
        }
    }

    const disabledSubtitlesTableBody = (text: string) => {
        return [{
            data: [
                <span key={'disabledTableBody'}></span>,
                <div className='left'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>
            ]
        }]
    }

    const subtitlesTableHeader = () => {
        return {
            data: [
                { cell: <Text size={14} weight="med">Subtitles</Text> },
                { cell: <Text size={14} weight="med">Language</Text> },
                { cell: <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button> }
            ]
        }
    };

    const subtitlesTableBody = () => {
        return props.contentDetails.subtitles &&props.contentDetails.subtitles.map((value, key) => {
            return {
                data: [
                    <div className='flex'>
                        <Text key={"generalPage_subtitles_" + value.name + key} size={14} weight="reg">{value.name}</Text>
                        {
                            !value.url &&
                            <div className='pl2 relative'>
                                <IconStyle coloricon='orange' id={'failedUploadedFileSubtitle' + key}>warning_outlined</IconStyle>
                                <Tooltip style={{ width: 330 }} target={"failedUploadedFileSubtitle" + key}>Your file wasn't uploaded properly! Please upload a new one.</Tooltip>
                            </div>
                        }

                    </div>
                    ,
                    <Text key={"generalPage_subtitles_" + value.languageLongName + key} size={14} weight="reg">{value.languageLongName}</Text>,
                    <IconContainer key={"generalPage_subtitles_actionIcons" + value.name + key} className="iconAction">
                        <ActionIcon id={"downloadSubtitleTooltip" + key}><a href={value.url} download><IconStyle>get_app</IconStyle></a></ActionIcon>
                        <Tooltip target={"downloadSubtitleTooltip" + key}>Download</Tooltip>
                        <ActionIcon id={"deleteSubtitleTooltip" + key}><IconStyle onClick={() => props.deleteSubtitle(props.contentDetails.id, value.targetID, props.contentType)}>delete</IconStyle></ActionIcon>
                        <Tooltip target={"deleteSubtitleTooltip" + key}>Delete</Tooltip>
                    </IconContainer>
                ]
            }
        })
    };

    return (
        <React.Fragment>
            <div className="subtitles col col-12">
                <Text className="col col-12" size={20} weight="med">Subtitles</Text>
                <Text className="col col-12 pt2" size={14} weight="reg">Add subtitles to improve the accessibility of your content.</Text>
            </div>
            {(!props.contentDetails.subtitles || props.contentDetails.subtitles.length === 0) ?
                <Table className="col col-12" headerBackgroundColor="gray-10" header={disabledSubtitlesTableHeader()} body={disabledSubtitlesTableBody('You currently have no Subtitles')} id="subtitlesTable" />
                : <Table className="col col-12" headerBackgroundColor="gray-10" header={subtitlesTableHeader()} body={subtitlesTableBody()} id="subtitlesTable" />
            }
            {
                subtitleModalOpen &&
                    <Modal id="addSubtitles" opened={subtitleModalOpen === true} toggle={() => setSubtitleModalOpen(false)} size="small" modalTitle="Add Subtitles" hasClose={false}>
                        <ModalContent>
                            <DropdownSingle
                                hasSearch
                                className="col col-12"
                                id="subtitleLanguage"
                                dropdownTitle="Subtitle Language"
                                list={Object.keys(languages).map(language => { return { title: languages[language].name, data: {shortName: language}} }, {})}
                                dropdownDefaultSelect={uploadedSubtitleFile.languageLongName}
                                callback={(value: DropdownSingleListItem) => setUploadedSubtitleFile({ ...uploadedSubtitleFile, languageLongName: value.title, languageShortName: value.data.shortName })}
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
        </React.Fragment>
    )
}

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