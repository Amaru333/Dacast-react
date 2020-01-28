import React from 'react';
import { Table } from '../../../components/Table/Table';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../components/Typography/Text';
import { tsToLocaleDate } from '../../../utils/utils';
import { Icon } from '@material-ui/core';
import { Label } from '../../../components/FormsComponents/Label/Label';
import styled from 'styled-components';
import { Pagination } from '../../../components/Pagination/Pagination'
import { PlaylistItem } from '../../../redux-flow/store/Playlists/List/types';
import { PlaylistsTabs } from './PlaylistTabs';

export interface LiveListProps {
    playlistItems: PlaylistItem[];
}

export const PlaylistListPage = (props: LiveListProps) => {

    const [selectedPlaylist, setSelectedPlaylist] = React.useState<string[]>([]);
    const [showPlaylistTabs, setShowPlaylistTabs] = React.useState<boolean>(false)
    const [selectedPlaylistId, setSelectedPlaylistId] = React.useState<PlaylistItem>(null)

    React.useEffect(() => {

    }, [selectedPlaylist])

    const liveListHeaderElement = () => {
        return [
            <InputCheckbox
                className="inline-flex"
                key="checkboxLiveListBulkAction"
                indeterminate={selectedPlaylist.length >= 1 && selectedPlaylist.length < props.playlistItems.length}
                defaultChecked={selectedPlaylist.length === props.playlistItems.length}
                id="globalCheckboxPlaylistList"
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedselectedLive = props.playlistItems.map(item => { return item.id })
                        setSelectedPlaylist(editedselectedLive);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setSelectedPlaylist([])
                    }
                }
                }
            />,
            <></>,
            <Text key="nameLiveList" size={14} weight="med" color="gray-1">Name</Text>,
            <Text key="viewsLiveList" size={14} weight="med" color="gray-1">Created</Text>,
            <Text key="statusLiveList" size={14} weight="med" color="gray-1">Status</Text>,
            <Text key="statusLiveList" size={14} weight="med" color="gray-1">Features</Text>,
            <div style={{ width: "80px" }} ></div>,
        ]
    }

    const handleFeatures = (item: PlaylistItem) => {
        var playlistElement = []
        if (item.features.paywall) {
            playlistElement.push(<IconGreyContainer className="mr1" ><IconStyle>attach_money</IconStyle></IconGreyContainer>)
        }
        if (item.features.playlist) {
            playlistElement.push(<IconGreyContainer className="mr1" ><IconStyle>video_library</IconStyle></IconGreyContainer>)
        }
        if (item.features.advertising) {
            playlistElement.push(<IconGreyContainer className="mr1" ><IconStyle>font_download</IconStyle></IconGreyContainer>)
        }
        return playlistElement;
    }

    const liveListBodyElement = () => {
        if (props.playlistItems) {
            return props.playlistItems.map((value, key) => {
                return [
                    <InputCheckbox className="inline-flex" label="" key={"checkbox" + value.id} defaultChecked={selectedPlaylist.includes(value.id)} id={"checkbox" + value.id} onChange={(event) => {
                        if (event.currentTarget.checked && selectedPlaylist.length < props.playlistItems.length) {
                            setSelectedPlaylist([...selectedPlaylist, value.id])
                        } else {
                            const editedselectedLive = selectedPlaylist.filter(item => item !== value.id)
                            setSelectedPlaylist(editedselectedLive);
                        }
                    }
                    } />,
                    <img className="p1" key={"thumbnail" + value.id} width={70} height={42} src={value.thumbnail} ></img>,
                    <Text key={"title" + value.id} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"created" + value.id} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <Text key={"status" + value.id} size={14} weight="reg" color="gray-1">{value.online ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                    <>{handleFeatures(value)}</>,
                    <div key={"more" + value.id} className="iconAction right mr2" ><Icon onClick={() => { setSelectedPlaylistId(value); setShowPlaylistTabs(true) }} className="right mr1" >edit</Icon><Icon onClick={() => { props.deleteLiveChannel(value.id) }} className="right mr1" >delete</Icon></div>,
                ]
            })
        }
    }

    return (
        showPlaylistTabs ?
            <PlaylistsTabs playlist={selectedPlaylistId} setShowPlaylistTabs={setShowPlaylistTabs} history={props.history} />
            :
            <>
                <Table className="col-12" id="liveListTable" header={liveListHeaderElement()} body={liveListBodyElement()} />
                <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />
            </>
    )
}

const IconStyle = styled(Icon)`
    margin: auto;
    font-size: 16px !important;
    
`

const IconGreyContainer = styled.div<{}>`
    position: relative;
    z-index: 1;
    color :  ${props => props.theme.colors["gray-3"]} ;
    display: inline-flex;
    height: 24px;
    width: 24px;
    align-items: center;
    &:before {
        content: '';
        display: inline-block;
        width: 24px;
        z-index: -1;
        height: 24px;
        position: absolute;
        border-radius: 12px;
        background-color: ${props => props.theme.colors["gray-8"]} ;
    }
`