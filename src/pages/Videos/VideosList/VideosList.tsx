import React from 'react';
import { Icon } from '@material-ui/core';
import { tsToLocaleDate, readableBytes } from '../../../utils/utils';
import { Table } from '../../../components/Table/Table';
import { Text } from '../../../components/Typography/Text';
import { VodItem } from '../../../redux-flow/store/VOD/General/types';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import styled from "styled-components";
import { VideoTabs } from '../../../containers/Videos/VideoTabs';
import { VideosFiltering } from './VideosFiltering';
import { Pagination } from '../../../components/Pagination/Pagination';
import { Tooltip } from '../../../components/Tooltip/Tooltip';

export interface VideosListProps {
    items: VodItem[];
    getVodList: Function;
    deleteVodList: Function;
}

export const VideosListPage = (props: VideosListProps) => {

    const [selectedVod, setSelectedVod] = React.useState<number[]>([]);
    const [showVodTabs, setShowVodTabs] = React.useState<boolean>(false);
    const [selectedVodId, setSelectedVodId] = React.useState<VodItem>(null);

    React.useEffect(() => {
    }, [selectedVod])

    const vodListHeaderElement = () => {
        return [
            <InputCheckbox className="inline-flex" label="" key="checkboxVodListBulkAction" indeterminate={selectedVod.length >= 1 && selectedVod.length < props.items.length} defaultChecked={selectedVod.length === props.items.length} id="globalCheckboxVodList"
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedSelectedVod = props.items.map(item => { return item.id })
                        setSelectedVod(editedSelectedVod);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setSelectedVod([])
                    }
                }} />,
            <></>,
            <Text key="nameVodList" size={14} weight="med" color="gray-1">Name</Text>,
            <Text key="sizeVodList" size={14} weight="med" color="gray-1">Size</Text>,
            <Text key="viewsVodList" size={14} weight="med" color="gray-1">Views</Text>,
            <Text key="viewsVodList" size={14} weight="med" color="gray-1">Created</Text>,
            <Text key="statusVodList" size={14} weight="med" color="gray-1">Status</Text>,
            <Text key="statusVodList" size={14} weight="med" color="gray-1">Features</Text>,
            <div style={{ width: "80px" }} ></div>,
        ]
    }

    const handleFeatures = (item: VodItem, id: string) => {
        var vodElement = []
        if (item.features.paywall) {
            vodElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"paywallTooltip" + id}>attach_money</IconStyle>
                    <Tooltip target={"paywallTooltip" + id}>Paywall</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.features.folder) {
            vodElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"folderTooltip" + id}>folder</IconStyle>
                    <Tooltip target={"folderTooltip" + id}></Tooltip>
                </IconGreyContainer>)
        }
        if (item.features.playlist) {
            vodElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"playlistTooltip" + id}>video_library</IconStyle>
                    <Tooltip target={"playlistTooltip" + id}>Playlist</Tooltip>
                </IconGreyContainer>)
        }
        return vodElement;
    }

    const vodListBodyElement = () => {
        if (props.items) {
            return props.items.map((value) => {
                return [
                    <InputCheckbox className="inline-flex" label="" key={"checkbox" + value.id} defaultChecked={selectedVod.includes(value.id)} id={"checkboxVod" + value.id.toString()} onChange={(event) => {
                        if (event.currentTarget.checked && selectedVod.length < props.items.length) {
                            setSelectedVod([...selectedVod, value.id])
                        } else {
                            const editedSelectedVod = selectedVod.filter(item => item !== value.id)
                            setSelectedVod(editedSelectedVod);
                        }
                    }
                    } />,
                    <img className="p2" key={"thumbnail" + value.id} width={70} height={42} src={value.thumbnail} ></img>,
                    <Text key={"title" + value.id} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"size" + value.id} size={14} weight="reg" color="gray-1">{readableBytes(value.size)}</Text>,
                    <Text key={"views" + value.id} size={14} weight="reg" color="gray-1">{value.views}</Text>,
                    <Text key={"created" + value.id} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <Text key={"status" + value.id} size={14} weight="reg" color="gray-1">{value.online ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                    <>{handleFeatures(value, value.id.toString())}</>,
                    <div key={"more" + value.id} className="iconAction right mr2" ><Icon onClick={() => { setSelectedVodId(value); setShowVodTabs(true) }} className="right mr1" >edit</Icon><Icon onClick={() => { props.deleteVodList(value.title) }} className="right mr1" >delete</Icon></div>,
                ]
            })
        }
    }


    return (
        showVodTabs ?
            <VideoTabs video={selectedVodId} setShowVideoTabs={setShowVodTabs} videoId={selectedVodId.id.toString()} history={props.history} />
            :
            <>
                <VideosFiltering />
                <Table className="col-12" id="apiKeysTable" header={vodListHeaderElement()} body={vodListBodyElement()} />
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