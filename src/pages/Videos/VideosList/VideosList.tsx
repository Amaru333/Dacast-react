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
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DateSinglePicker } from '../../../components/FormsComponents/Datepicker/DateSinglePicker';
import { InputSlider } from '../../../components/FormsComponents/Input/InputSlider';
import { Badge } from '../../../components/Badge/Badge';

export interface VideosListProps {
    items: VodItem[];
    getVodList: Function;
    deleteVodList: Function;
}

export const VideosListPage = (props: VideosListProps) => {

    const [selectedVod, setSelectedVod] = React.useState<number[]>([]);
    const [showVodTabs, setShowVodTabs] = React.useState<boolean>(false);
    const [selectedVodId, setSelectedVodId] = React.useState<number>(-1);



    interface FilteringState {
        status: {
            online: boolean;
            offline: boolean;
            processing: boolean;
        };
        features: {
            paywall: boolean;
            advertising: boolean;
            playlists: boolean;
            rewind: boolean;
            recording: boolean;
        };
        afterDate: number | boolean;
        beforedate: number | boolean;
        sizeStart: number | boolean;
        sizeEnd: number | boolean;
    }

    var filteringDefault = {
        status: {
            online: false,
            offline: false,
            processing: false
        },
        features: {
            paywall: false,
            advertising: false,
            playlists: false,
            rewind: false,
            recording: false
        },
        afterDate: false,
        beforedate: false,
        sizeStart: false,
        sizeEnd: false
    }
    const [filteringState, setFilteringState] = React.useState<FilteringState>(filteringDefault);
    const [activeFilter, setActiveFilter] = React.useState<number>(0);

    const checkActiveFilter = () => {
        var counter = 0;
        Object.entries(filteringState.features).map(item => item[1] !== false ? counter++ : null);
        Object.entries(filteringState.status).map(item => item[1] !== false ? counter++ : null)
        filteringState.afterDate ? counter++ : null;
        filteringState.beforedate ? counter++ : null;
        filteringState.sizeStart ? counter++ : null;
        filteringState.sizeEnd ? counter++ : null;
        setActiveFilter(counter);
    }
    React.useEffect(() => {
        checkActiveFilter();
    }, [selectedVod, filteringState])

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

    const handleFeatures = (item: VodItem) => {
        var vodElement = []
        if (item.features.paywall) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>attach_money</IconStyle></IconGreyContainer>)
        }
        if (item.features.folder) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>folder</IconStyle></IconGreyContainer>)
        }
        if (item.features.playlist) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>video_library</IconStyle></IconGreyContainer>)
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
                    <>{handleFeatures(value)}</>,
                    <div key={"more" + value.id} className="iconAction right mr2" ><Icon onClick={() => { setSelectedVodId(value.id); setShowVodTabs(true) }} className="right mr1" >edit</Icon><Icon onClick={() => { props.deleteVodList(value.title) }} className="right mr1" >delete</Icon></div>,
                ]
            })
        }
    }

    const [openFilters, setOpenFilters] = React.useState<boolean>(false);

    return (
        showVodTabs ?
            <VideoTabs setShowVideoTabs={setShowVodTabs} videoId={selectedVodId.toString()} history={props.history} />
            :
            <>
                <div className="mb2 clearfix">
                    <Button buttonColor="blue" className="relative right" onClick={() => setOpenFilters(!openFilters)} sizeButton="small" typeButton="secondary" >
                        Filter
                        <Badge color="dark-violet" style={{ top: "-8px" }} number={activeFilter} className="absolute" />
                    </Button>
                </div>
                <VideosFiltering isOpen={openFilters} >
                    <div className="flex mb25" ><Text size={24} weight="med" color="gray-1" >Filters</Text><Icon className="ml-auto pointer" onClick={() => setOpenFilters(false)} >close</Icon></div>
                    <div className="mb3" id="vodFilterStatus">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Status</Text>
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.online}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, online: !prevState.status.online } } }) }}
                            id='vodFilterOnline' label="Online" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.offline}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, offline: !prevState.status.offline } } }) }}
                            id='vodFilterOffline' label="Offline" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.processing}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, processing: !prevState.status.processing } } }) }}
                            id='vodFilterProcessing' label="Processing" labelWeight="reg" />
                    </div>
                    <div className="mb3" id="vodFilterFeatures">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Features</Text>
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.paywall}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, paywall: !prevState.features.paywall } } }) }}
                            id='vodFilterPaywall' label="Paywall" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.advertising}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, advertising: !prevState.features.advertising } } }) }}
                            id='vodFilterAdvertising' label="Advertising" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.playlists}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, playlists: !prevState.features.playlists } } }) }}
                            id='vodFilterPlaylists' label="Playlists" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.rewind}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, rewind: !prevState.features.rewind } } }) }}
                            id='vodFilterRewind' label="30 Minutes Rewind" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.recording}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, recording: !prevState.features.recording } } }) }}
                            id='vodFilterRecording' label="Recording" labelWeight="reg" />
                    </div>
                    <div className="mb3" id="vodFilterAfter">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created After</Text>
                        <DateSinglePicker callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, createdAfter: ms } }) }} />
                    </div>
                    <div className="mb3" id="vodFilterBefore">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created Before</Text>
                        <DateSinglePicker callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, createdBefore: ms } }) }} />
                    </div>
                    <div className="mb3" id="vodFilterSize">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Size</Text>
                        <InputSlider min={0} max={450} value={[30, 100]} id="vodFilterSize" />
                    </div>
                    <div className="flex" id="vodFilterbuttons">
                        <Button onClick={ () => { setOpenFilters(false) }} className="mr1" typeButton="primary">
                            Apply
                        </Button>
                        <Button onClick={ () => { setFilteringState(filteringDefault) }} typeButton="tertiary">
                            Reset
                        </Button>
                    </div>
                </VideosFiltering>
                <Table className="col-12" id="apiKeysTable" header={vodListHeaderElement()} body={vodListBodyElement()} />
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