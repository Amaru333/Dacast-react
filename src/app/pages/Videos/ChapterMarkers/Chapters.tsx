import React from 'react';
import { Table } from '../../../../components/Table/Table';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import { Modal } from '../../../../components/Modal/Modal';
import { ChapterMarkerForm } from './ChapterMarkerForm';
import { useMedia } from '../../../../utils/utils';
import { TableContainer, ChaptersContainer, PlayerSection, PlayerContainer, ButtonsArea } from './ChaptersStyle';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { usePlayer } from '../../../utils/services/player/player';
import { ChapterComponentProps } from '../../../containers/Videos/Chapters';
import { emptyContentListBody, emptyContentListHeader } from '../../../shared/List/emptyContentListState';
import { userToken } from '../../../utils/services/token/tokenService';
import { dataToTimeVideo } from '../../../../utils/formatUtils';
import { ContentType } from '../../../redux-flow/store/Common/types';
import { useTranslation } from 'react-i18next';


export const ChaptersPage = (props: ChapterComponentProps & {contentId: string; contentType: ContentType}) => {

    const [chapterMarkerModalOpened, setChapterMarkerModalOpened] = React.useState<boolean>(false);
    const [selectedItem, setSelectedItem] = React.useState<string>(null);
    const [marker, setMarker] = React.useState<number>(null);

    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')

    let isMobile = useMedia('(max-width: 832px)');
    let playerRef = React.useRef<HTMLDivElement>(null);
    let player = usePlayer(playerRef, accountId + '-vod-' + props.contentId);
    const { t } = useTranslation()

    const tableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"chapterTitleTableHeader"} size={14}  weight="med" color="gray-1">{t('common_content_list_table_header_title')}</Text>},
            {cell: <Text  key={"chapterStartTimeTableHeader"} size={14}  weight="med" color="gray-1">{t('video_chapters_add_chapter_modal_start_time_input')}</Text>}, 
            {cell: <span key={"emptyCell"}></span>}
        ]}
    }

    const handleClickNextFrame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if(!player) {
            throw new Error('Player not found')
        }
        player.getTime((currentTime: number) => { 
            player.seekTo(currentTime + 1/24.0)
        })
    }

    const handleClickPrevFrame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if(!player) {
            throw new Error('Player not found')
        }
        player.getTime((currentTime: number) => {
            player.seekTo(currentTime - 1/24.0)
        })

    }



    const chapterBodyElement = () => {
        return props.chapterPageDetails.chapterMarkers.sort((a, b) => a.start - b.start ).map((value, key) => {
            return {data: [
                <Text key={key.toString() +value.text} size={14}  weight="reg" color="gray-1">{value.text}</Text>,
                <Text key={key.toString() +value.start} size={14}  weight="reg" color="gray-1">{dataToTimeVideo(value.start)}</Text>,
                <IconContainer className="iconAction" key={key.toString()+value.text}>
                    <ActionIcon id={"deleteTooltip" + value.id}>
                        <IconStyle onClick={(event) => {event.preventDefault;props.deleteContentChapterMarker(props.contentId, props.contentType, props.chapterPageDetails.chapterMarkers.filter(chapterMarker => chapterMarker.id !== value.id))}} >delete</IconStyle>
                    </ActionIcon>
                    <Tooltip target={"deleteTooltip" + value.id}>Delete</Tooltip>
                    <ActionIcon id={"editTooltip" + value.id}>
                        <IconStyle onClick={() => {setSelectedItem(value.id);  setChapterMarkerModalOpened(true) }}>edit</IconStyle>   
                    </ActionIcon>
                    <Tooltip target={"editTooltip" + value.id}>Edit</Tooltip>     
                </IconContainer>
            ]}
        })
    }

    return (
        <div>
            <ChaptersContainer mobile={isMobile} className='col col-12'>
                <PlayerSection className='col col-12 md-col-6 mr2 mb2'>
                    <PlayerContainer>
                        <div ref={playerRef}>
                        </div>
                    </PlayerContainer>
                    <ButtonsArea className='my2'>
                        <Button onClick={(event) =>handleClickPrevFrame(event)} className="mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">{t('video_chapters_previous_frame_button')}</Button>
                        <Button onClick={(event) => handleClickNextFrame(event)} className="mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">{t('video_chapters_next_frame_button')}</Button>
                        <Button onClick={(event) => {event.preventDefault();setSelectedItem(null);player.getTime((currentTime: number) => {setMarker(currentTime)}); setChapterMarkerModalOpened(true)}} className="right" sizeButton="xs" typeButton="primary" buttonColor="blue">{t('video_chapters_add_chapter_button')}</Button>
                    </ButtonsArea>
                </PlayerSection>
                <TableContainer className='col col-12 md-col-6'>
                    <Table id='chapterTable' headerBackgroundColor="white" header={props.chapterPageDetails.chapterMarkers.length > 0 ? tableHeaderElement() : emptyContentListHeader()} body={props.chapterPageDetails.chapterMarkers.length > 0 ? chapterBodyElement() : emptyContentListBody(t('video_chapters_table_placeholder'))} />
                </TableContainer>
 
            </ChaptersContainer>
            <Modal 
                hasClose={false} 
                modalTitle={(selectedItem ? 'Edit Chapter' : t('video_chapters_add_chapter_modal_title'))} 
                toggle={() => setChapterMarkerModalOpened(!chapterMarkerModalOpened)} 
                size='small' 
                opened={chapterMarkerModalOpened}
            >
                {
                    chapterMarkerModalOpened &&
                        <ChapterMarkerForm 
                            contentId={props.contentId} 
                            contentType={props.contentType}
                            chapters={props.chapterPageDetails.chapterMarkers} 
                            item={selectedItem && props.chapterPageDetails.chapterMarkers.filter(item => item.id === selectedItem).length > 0 ? props.chapterPageDetails.chapterMarkers.filter(item => item.id === selectedItem)[0] : {text: '', start: marker}} 
                            toggle={setChapterMarkerModalOpened} 
                            submit={selectedItem ? props.saveContentChapterMarker : props.addContentChapterMarker}
                        />
                }
            </Modal>
        </div>

    )
}