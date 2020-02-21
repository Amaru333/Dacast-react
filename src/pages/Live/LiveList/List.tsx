import React from 'react';
import { Table } from '../../../components/Table/Table';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../components/Typography/Text';
import { tsToLocaleDate, readableBytes } from '../../../utils/utils';
import { Icon } from '@material-ui/core';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { LiveItem } from '../../../redux-flow/store/Live/General/types';
import styled from 'styled-components';
import { LiveTabs } from '../../../containers/Live/LiveTabs';
import { LivesFiltering } from './LivesFiltering';
import { Pagination } from '../../../components/Pagination/Pagination'
import { Tooltip } from '../../../components/Tooltip/Tooltip'
import { ActionIcon } from '../../../shared/ActionIconStyle';


export interface LiveListProps {
    liveList: LiveItem[];
    deleteLiveChannel: Function;
}

export const LiveListPage = (props: LiveListProps) => {

    const [selectedLive, setSelectedLive] = React.useState<string[]>([]);
    const [showLiveTabs, setShowLiveTabs] = React.useState<boolean>(false)
    const [selectedLiveId, setSelectedLiveId] = React.useState<LiveItem>(null)

    React.useEffect(() => {

    }, [selectedLive])

    const liveListHeaderElement = () => {
        return [
            <InputCheckbox
                className="inline-flex"
                key="checkboxLiveListBulkAction"
                indeterminate={selectedLive.length >= 1 && selectedLive.length < props.liveList.length}
                defaultChecked={selectedLive.length === props.liveList.length}
                id="globalCheckboxLiveList"
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedselectedLive = props.liveList.map(item => { return item.id })
                        setSelectedLive(editedselectedLive);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setSelectedLive([])
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

    const handleFeatures = (item: LiveItem, id: string) => {
        var liveElement = []
        if (item.features.paywall) {
            liveElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"paywallTooltip" + id}>attach_money</IconStyle>
                    <Tooltip target={"paywallTooltip" + id}>Paywall</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.features.recording) {
            liveElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"recordingTooltip" + id}>videocam</IconStyle>
                    <Tooltip target={"recordingTooltip" + id}>Recording</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.features.playlist) {
            liveElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"playlistTooltip" + id}>video_library</IconStyle>
                    <Tooltip target={"playlistTooltip" + id}>Playlists</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.features.rewind) {
            liveElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"rewindTooltip" + id}>replay_30</IconStyle>
                    <Tooltip target={"rewindTooltip" + id}>30 min Rewind</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.features.advertising) {
            liveElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"advertisingTooltip" + id}>font_download</IconStyle>
                    <Tooltip target={"advertisingTooltip" + id}>Advertising</Tooltip>
                </IconGreyContainer>
            )
        }
        return liveElement;
    }

    const liveListBodyElement = () => {
        if (props.liveList) {
            return props.liveList.map((value) => {
                return [
                    <InputCheckbox className="inline-flex" label="" key={"checkbox" + value.id} defaultChecked={selectedLive.includes(value.id)} id={"checkbox" + value.id} onChange={(event) => {
                        if (event.currentTarget.checked && selectedLive.length < props.liveList.length) {
                            setSelectedLive([...selectedLive, value.id])
                        } else {
                            const editedselectedLive = selectedLive.filter(item => item !== value.id)
                            setSelectedLive(editedselectedLive);
                        }
                    }
                    } />,
                    <img className="p2" key={"thumbnail" + value.id} width={70} height={42} src={value.thumbnail} ></img>,
                    <Text key={"title" + value.id} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"created" + value.id} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <Text key={"status" + value.id} size={14} weight="reg" color="gray-1">{value.streamOnline ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                    <>{handleFeatures(value, value.id)}</>,
                    <div key={"more" + value.id} className="iconAction right mr2" >
                        <ActionIcon id={"editTooltip" + value.id}>
                            <Icon onClick={() => { setSelectedLiveId(value); setShowLiveTabs(true) }} className="right mr1" >edit</Icon>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + value.id}>Edit</Tooltip>
                        <ActionIcon id={"deleteTooltip" + value.id}>
                            <Icon onClick={() => { props.deleteLiveChannel(value.id) }} className="right mr1" >delete</Icon>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + value.id}>Delete</Tooltip>    
                    </div>,
                ]
            })
        }
    }


    return (
        showLiveTabs ?
            <LiveTabs live={selectedLiveId} setShowLiveTabs={setShowLiveTabs} liveId={selectedLiveId.id.toString()} history={props.history} />
            :
            <>
                <LivesFiltering />
                <Table className="col-12" id="liveListTable" header={liveListHeaderElement()} body={liveListBodyElement()} />
                <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />
            </>
    )
}

export const IconStyle = styled(Icon)`
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