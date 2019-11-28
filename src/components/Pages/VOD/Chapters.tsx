import React from 'react';
import { Table } from '../../Table/Table';
import { Button } from '../../FormsComponents/Button/Button';
import { Text } from '../../Typography/Text';
import { Icon } from '@material-ui/core';
import { Modal } from '../../Modal/Modal';
import { ChapterMarkerForm } from './ChapterMarkerForm';
import { intToTime } from '../../../utils/utils';
import { ChapterMarkerInfos } from '../../../redux-flow/store/VOD/Chapters/types';
import { TableContainer, ChaptersContainer, PlayerSection, PlayerContainer, ButtonsArea, IconContainer } from './ChaptersStyle';

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
    let playerRef = React.useRef<HTMLDivElement>(null);

    const [player, setPlayer] = React.useState<any>(null)

    const tableHeaderElement = () => {
        return[
            <Text  key={"chapterTitleTableHeader"} size={14}  weight="med" color="gray-1">Title</Text>,
            <Text  key={"chapterStartTimeTableHeader"} size={14}  weight="med" color="gray-1">Start Time</Text>, 
            <span key={"MatchingColumn"}></span>
        ]
    }

    const handleClickNextFrame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if(!player || !player.getPlayerInstance()){
            return;
        }
        player.getPlayerInstance().currentTime += 1/24.0;
        setMarker(player.getPlayerInstance().currentTime + 1/24.0)
    }

    const handleClickPrevFrame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if(!player || !player.getPlayerInstance()){
            return;
        }
        player.getPlayerInstance().currentTime -= 1/24.0;
        setMarker(player.getPlayerInstance().currentTime - 1/24.0)
    }

    React.useEffect(() => {
        if(playerRef && playerRef.current)
        {
            const playerScript = document.createElement('script');
            playerScript.src = "https://player.dacast.com/js/player.js";
            playerRef.current.appendChild(playerScript);
            playerScript.addEventListener('load', () => {

                setPlayer(dacast('104301_f_769886', playerRef.current, {
                    player: 'theo',
                    height: 341,
                    width: '100%'
                }))

            })
        }
        return () => player.dispose();
    }, [])

    React.useEffect(() => {
        if(player) {
            player.onReady(() => {
                if(player.getPlayerInstance().autoplay){
                    let onPlay = () => {
                        player.getPlayerInstance().pause()
                        player.getPlayerInstance().removeEventListener('loadedmetadata', onPlay);
                    };
                    player.getPlayerInstance().addEventListener('loadedmetadata', onPlay);
                    player.play();
                }
            })
        }
    }, [player])

    const chapterBodyElement = () => {
        return props.chapterPageDetails.chapterMarkers.map((value, key) => {
            return [
                <Text key={key.toString() +value.name} size={14}  weight="reg" color="gray-1">{value.name}</Text>,
                <Text key={key.toString() +value.time} size={14}  weight="reg" color="gray-1">{value.time}</Text>,
                <IconContainer className="iconAction" key={key.toString()+value.name}><Icon onClick={(event) => {event.preventDefault;props.deleteVodChapterMarker(value)}} >delete</Icon><Icon onClick={() => {setSelectedItem(value.id);  setChapterMarkerModalOpened(true) }}>edit</Icon> </IconContainer>
            ]
        })
    }

    return (
        <div>
            <ChaptersContainer>
                <TableContainer className='mr2'>
                    <Table id='chapterTable' header={tableHeaderElement()} body={chapterBodyElement()} />
                </TableContainer>
                <PlayerSection>
                    <PlayerContainer>
                        <div ref={playerRef}>
                        </div>
                    </PlayerContainer>
                    <ButtonsArea className='my2'>
                        <Button onClick={(event) =>handleClickPrevFrame(event)} className="mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">Previous Frame</Button>
                        <Button onClick={(event) => handleClickNextFrame(event)} className="mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">Next Frame</Button>
                        <Button onClick={() => {setSelectedItem(null); setChapterMarkerModalOpened(true)}} className="right" sizeButton="xs" typeButton="primary" buttonColor="blue">Add Chapter Market</Button>
                    </ButtonsArea>
                </PlayerSection>
            </ChaptersContainer>
            <Modal hasClose={false} title={(selectedItem ? 'Edit' : 'Add')  + ' Chapter'} toggle={() => setChapterMarkerModalOpened(!chapterMarkerModalOpened)} size='small' opened={chapterMarkerModalOpened}>
                <ChapterMarkerForm item={selectedItem && props.chapterPageDetails.chapterMarkers.filter(item => item.id === selectedItem).length > 0 ? props.chapterPageDetails.chapterMarkers.filter(item => item.id === selectedItem)[0] : {name: '', time: intToTime(marker)}} toggle={setChapterMarkerModalOpened} submit={selectedItem ? props.saveVodChapterMarker : props.addVodChapterMarker} />
            </Modal>
        </div>

    )
}