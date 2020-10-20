import React from 'react';
import { Text } from '../../../components/Typography/Text'
import { Table } from '../../../components/Table/Table';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle, IconContainer, ActionIcon } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';


export const GeneralSubtitles = (props: {contentType: string, contentDetails: ContentDetails, setSubtitleModalOpen: React.Dispatch<React.SetStateAction<boolean>>, deleteSubtitle?: (targetId: string, contentId: string, fileName: string, contentType: string) => Promise<void>;}) => {

    const disabledSubtitlesTableHeader = (setSubtitleModalOpen: (boolean: boolean) => void) => {
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

    const subtitlesTableHeader = (setSubtitleModalOpen: (boolean: boolean) => void) => {
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
                        <ActionIcon id={"deleteSubtitleTooltip" + key}><IconStyle onClick={() => props.deleteSubtitle(props.contentDetails.id, value.targetID, value.name, props.contentType)}>delete</IconStyle></ActionIcon>
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
                            <Table className="col col-12" headerBackgroundColor="gray-10" header={disabledSubtitlesTableHeader(props.setSubtitleModalOpen)} body={disabledSubtitlesTableBody('You currently have no Subtitles')} id="subtitlesTable" />
                            : <Table className="col col-12" headerBackgroundColor="gray-10" header={subtitlesTableHeader(props.setSubtitleModalOpen)} body={subtitlesTableBody()} id="subtitlesTable" />
                        }
        </React.Fragment>
    )
}