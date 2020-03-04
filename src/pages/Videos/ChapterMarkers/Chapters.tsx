import React from 'react';
import { Table } from '../../../components/Table/Table';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { IconStyle, IconContainer } from '../../../shared/Common/Icon';
import { Modal } from '../../../components/Modal/Modal';
import { ChapterMarkerForm } from './ChapterMarkerForm';
import { intToTime, useMedia } from '../../../utils/utils';
import { ChapterMarkerInfos } from '../../../redux-flow/store/VOD/Chapters/types';
import { TableContainer, ChaptersContainer, PlayerSection, PlayerContainer, ButtonsArea } from './ChaptersStyle';
import { ActionIcon } from '../../../shared/ActionIconStyle';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { usePlayer } from '../../../utils/player';

interface ChapterComponentProps {
    chapterPageDetails: ChapterMarkerInfos;
    getVodChapterMarkers: Function;
    saveVodChapterMarker: Function;
    addVodChapterMarker: Function;
    deleteVodChapterMarker: Function;
}

export const ChaptersPage = (props: ChapterComponentProps) => {

    const [chapterMarkerModalOpened, setChapterMarkerModalOpened] = React.useState<boolean>(false);
    const [selectedItem, setSelectedItem] = React.useState<string>(null);
    const [marker, setMarker] = React.useState<number>(0);

    let isMobile = useMedia('(max-width: 832px)');
    let playerRef = React.useRef<HTMLDivElement>(null);

    let player = usePlayer(playerRef, '104301_f_713989');

    const tableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"chapterTitleTableHeader"} size={14}  weight="med" color="gray-1">Title</Text>},
            {cell: <Text  key={"chapterStartTimeTableHeader"} size={14}  weight="med" color="gray-1">Start Time</Text>}, 
            {cell: <Text size={14} weight='med' color='gray-10' key={"MatchingColumn"}>Buttons placeholder</Text>}
        ]}
    }

    const handleClickNextFrame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if(!player || !player.getPlayerInstance()){
            return;
        }
        player.getPlayerInstance().currentTime += 1/24.0;
    }

    const handleClickPrevFrame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if(!player || !player.getPlayerInstance()){
            return;
        }
        player.getPlayerInstance().currentTime -= 1/24.0;

    }



    const chapterBodyElement = () => {
        return props.chapterPageDetails.chapterMarkers.map((value, key) => {
            return {data: [
                <Text key={key.toString() +value.name} size={14}  weight="reg" color="gray-1">{value.name}</Text>,
                <Text key={key.toString() +value.time} size={14}  weight="reg" color="gray-1">{value.time}</Text>,
                <IconContainer className="iconAction" key={key.toString()+value.name}>
                    <ActionIcon id={"deleteTooltip" + value.id}>
                        <IconStyle onClick={(event) => {event.preventDefault;props.deleteVodChapterMarker(value)}} >delete</IconStyle>
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
                        <Button onClick={() => {setSelectedItem(null);setMarker(player.getPlayerInstance().currentTime); setChapterMarkerModalOpened(true)}} className="right" sizeButton="xs" typeButton="primary" buttonColor="blue">Add Chapter Marker</Button>
                    </ButtonsArea>
                </PlayerSection>
                <TableContainer className='col col-12 md-col-6'>
                    <Table id='chapterTable' headerBackgroundColor="white" header={tableHeaderElement()} body={chapterBodyElement()} />
                </TableContainer>

            </ChaptersContainer>
            <Modal hasClose={false} title={(selectedItem ? 'Edit' : 'Add')  + ' Chapter'} toggle={() => setChapterMarkerModalOpened(!chapterMarkerModalOpened)} size='small' opened={chapterMarkerModalOpened}>
                <ChapterMarkerForm item={selectedItem && props.chapterPageDetails.chapterMarkers.filter(item => item.id === selectedItem).length > 0 ? props.chapterPageDetails.chapterMarkers.filter(item => item.id === selectedItem)[0] : {name: '', time: intToTime(marker)}} toggle={setChapterMarkerModalOpened} submit={selectedItem ? props.saveVodChapterMarker : props.addVodChapterMarker} />
            </Modal>
        </div>

    )
}