import React from 'react';
import { Table } from '../../../components/Table/Table';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../components/Typography/Text';
import { tsToLocaleDate, readableBytes } from '../../../utils/utils';
import { Icon } from '@material-ui/core';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { LiveItem } from '../../../redux-flow/store/Live/General/types';
import styled from 'styled-components';

export interface LiveListProps {
    liveList: LiveItem[];
    deleteLiveChannel: Function;
}

export const LiveListPage = (props: LiveListProps) => {

    const [selectedLive, setSelectedLive] = React.useState<string[]>([]);

    React.useEffect(() => {

    }, [selectedLive])

    const liveListHeaderElement = () => {
        return [
            <InputCheckbox 
            className="inline-flex" 
            key="checkboxLiveListBulkAction" 
            indeterminate={selectedLive.length >= 1 && selectedLive.length < props.liveList.length} 
            defaultChecked={selectedLive.length === props.liveList.length}
            id="globalCheckboxVodList" 
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
            <div style={{width: "80px"}} ></div>,
        ]
    }

    const handleFeatures = (item: LiveItem) => {
        var vodElement = []
        if (item.features.paywall) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>attach_money</IconStyle></IconGreyContainer>)
        }
        if (item.features.recording) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>videocam</IconStyle></IconGreyContainer>)
        }
        if (item.features.playlist) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>video_library</IconStyle></IconGreyContainer>)
        }
        if (item.features.rewind) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>replay_30</IconStyle></IconGreyContainer>)
        }
        if (item.features.advertising) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>font_download</IconStyle></IconGreyContainer>)
        }
        return vodElement;
    }

    const liveListBodyElement = () => {
        if (props.liveList) {
            return props.liveList.map((value, key) => {
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
                    <>{handleFeatures(value)}</>,
                    <div key={"more" + value.id} className="iconAction right mr2" ><Icon onClick={() => {} } className="right mr1" >edit</Icon><Icon onClick={() => { props.deleteLiveChannel(value.id) }}  className="right mr1" >delete</Icon></div>,
                ]
            })
        }
    }


    return (
        <Table className="col-12" id="liveListTable" header={liveListHeaderElement()} body={liveListBodyElement()} />
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