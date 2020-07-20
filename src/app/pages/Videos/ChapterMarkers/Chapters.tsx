import React from 'react';
import { Table } from '../../../../components/Table/Table';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import { Modal } from '../../../../components/Modal/Modal';
import { ChapterMarkerForm } from './ChapterMarkerForm';
import { useMedia } from '../../../../utils/utils';
import { ChapterMarkerInfos } from '../../../redux-flow/store/VOD/Chapters/types';
import { TableContainer, ChaptersContainer, PlayerSection, PlayerContainer, ButtonsArea } from './ChaptersStyle';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { usePlayer } from '../../../utils/player';
import { ChapterComponentProps } from '../../../containers/Videos/Chapters';
import { addTokenToHeader } from '../../../utils/token';
import { emptyContentListBody, emptyContentListHeader } from '../../../shared/List/emptyContentListState';


export const ChaptersPage = (props: ChapterComponentProps & {vodId: string}) => {

    const [chapterMarkerModalOpened, setChapterMarkerModalOpened] = React.useState<boolean>(false);
    const [selectedItem, setSelectedItem] = React.useState<string>(null);
    const [marker, setMarker] = React.useState<number>(null);

    const {userId} = addTokenToHeader()


    let isMobile = useMedia('(max-width: 832px)');
    let playerRef = React.useRef<HTMLDivElement>(null);
    let player = usePlayer(playerRef, userId +  '-vod-' + props.vodId);


    const tableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"chapterTitleTableHeader"} size={14}  weight="med" color="gray-1">Title</Text>},
            {cell: <Text  key={"chapterStartTimeTableHeader"} size={14}  weight="med" color="gray-1">Start Time</Text>}, 
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
                <Text key={key.toString() +value.start} size={14}  weight="reg" color="gray-1">{value.start}</Text>,
                <IconContainer className="iconAction" key={key.toString()+value.text}>
                    <ActionIcon id={"deleteTooltip" + value.id}>
                        <IconStyle onClick={(event) => {event.preventDefault;props.deleteVodChapterMarker(props.vodId, props.chapterPageDetails.chapterMarkers.filter(chapterMarker => chapterMarker.id !== value.id))}} >delete</IconStyle>
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
                        <Button onClick={(event) =>handleClickPrevFrame(event)} className="mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">Previous Frame</Button>
                        <Button onClick={(event) => handleClickNextFrame(event)} className="mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">Next Frame</Button>
                        <Button onClick={(event) => {event.preventDefault();setSelectedItem(null);player.getTime((currentTime: number) => {setMarker(currentTime)}); setChapterMarkerModalOpened(true)}} className="right" sizeButton="xs" typeButton="primary" buttonColor="blue">Add Chapter Marker</Button>
                    </ButtonsArea>
                </PlayerSection>
                <TableContainer className='col col-12 md-col-6'>
                    <Table id='chapterTable' headerBackgroundColor="white" header={props.chapterPageDetails.chapterMarkers.length > 0 ? tableHeaderElement() : emptyContentListHeader()} body={props.chapterPageDetails.chapterMarkers.length > 0 ? chapterBodyElement() : emptyContentListBody("Select positions in video to add as chapter markers")} />
                </TableContainer>
 
            </ChaptersContainer>
            <Modal 
                hasClose={false} 
                modalTitle={(selectedItem ? 'Edit' : 'Add')  + ' Chapter'} 
                toggle={() => setChapterMarkerModalOpened(!chapterMarkerModalOpened)} 
                size='small' 
                opened={chapterMarkerModalOpened}
            >
                {
                    chapterMarkerModalOpened &&
                        <ChapterMarkerForm 
                            vodId={props.vodId} 
                            chapters={props.chapterPageDetails.chapterMarkers} 
                            item={selectedItem && props.chapterPageDetails.chapterMarkers.filter(item => item.id === selectedItem).length > 0 ? props.chapterPageDetails.chapterMarkers.filter(item => item.id === selectedItem)[0] : {text: '', start: marker}} 
                            toggle={setChapterMarkerModalOpened} 
                            submit={selectedItem ? props.saveVodChapterMarker : props.addVodChapterMarker}
                            chapterState={props.chapterPageDetailsState}
                        />
                }
            </Modal>
        </div>

    )
}