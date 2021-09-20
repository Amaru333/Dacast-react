import React from 'react';
import { Filtering } from '../../../components/Filtering/Filtering';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Badge } from '../../../components/Badge/Badge';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';

export interface FoldersFilteringState {
    status: {
        online: boolean;
        offline: boolean;
        processing: boolean;
        deleted: boolean;
    };
    features: {
        paywall: boolean;
        ads: boolean;
        playlists: boolean;
        rewind: boolean;
        recording: boolean;
    };
    afterDate: number | boolean | null;
    beforedate: number | boolean | null;
    "content-types": {
        folder: boolean;
        channel: boolean;
        vod: boolean;
        playlist: boolean;
    };
}

export const FoldersFiltering = (props: {setSelectedFilter: Function; className?: string}) => {

    var filteringDefault: FoldersFilteringState = {
        status: {
            online: false,
            offline: false,
            processing: false,
            deleted: false
        },
        features: {
            paywall: false,
            ads: false,
            playlists: false,
            rewind: false,
            recording: false
        },
        afterDate: null,
        beforedate: null,
        "content-types": {
            folder: false,
            channel: false,
            vod: false,
            playlist: false
        }
    }

    const [filteringState, setFilteringState] = React.useState<FoldersFilteringState>(filteringDefault);
    const [activeFilter, setActiveFilter] = React.useState<number>(0);
    const [openFilters, setOpenFilters] = React.useState<boolean>(false);

    const checkActiveFilter = () => {
        var counter = 0;
        Object.entries(filteringState.features).map(item => item[1] !== false ? counter++ : null);
        Object.entries(filteringState.status).map(item => item[1] !== false ? counter++ : null)
        Object.entries(filteringState["content-types"]).map(item => item[1] !== false ? counter++ : null);
        filteringState.afterDate ? counter++ : null;
        filteringState.beforedate ? counter++ : null;
        setActiveFilter(counter);
    }

    React.useEffect(() => {
        checkActiveFilter();
    }, [filteringState])


    return (
        <>
            <Button buttonColor="gray" className={props.className} onClick={() => setOpenFilters(!openFilters)} sizeButton="small" typeButton="secondary" >
                Filter
                {
                    activeFilter > 0 &&
                        <Badge color="dark-violet" style={{ top: "-8px" }} number={activeFilter} className="absolute" />
                }
            </Button>
            <Filtering isOpen={openFilters} >
                <div>
                    <div className="flex mb25" ><Text size={24} weight="med" color="gray-1" >Filters</Text><IconStyle className="ml-auto pointer" onClick={() => setOpenFilters(false)} >close</IconStyle></div>
                    <div className="mb3" id="folderFilterStatus">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Status</Text>
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.online}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, online: !prevState.status.online } } }) }}
                            id='folderFilterOnline' label="Online" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.offline}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, offline: !prevState.status.offline } } }) }}
                            id='folderFilterOffline' label="Offline" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.processing}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, processing: !prevState.status.processing } } }) }}
                            id='folderFilterProcessing' label="Processing" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.deleted}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, deleted: !prevState.status.deleted } } }) }}
                            id='folderFilterDeleted' label="Deleted" labelWeight="reg" />
                    </div>
                    <div className="mb3" id="folderFilterFeatures">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Features</Text>
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.paywall}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, paywall: !prevState.features.paywall } } }) }}
                            id='folderFilterPaywall' label="Paywall" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.ads}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, ads: !prevState.features.ads } } }) }}
                            id='folderFilterAdvertising' label="Advertising" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.playlists}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, playlists: !prevState.features.playlists } } }) }}
                            id='folderFilterPlaylists' label="Playlists" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.rewind}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, rewind: !prevState.features.rewind } } }) }}
                            id='folderFilterRewind' label="30 Minutes Rewind" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.features.recording}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, recording: !prevState.features.recording } } }) }}
                            id='folderFilterRecording' label="Recording" labelWeight="reg" />
                    </div>
                    <div className="mb3" id="folderFilterAfter">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created After</Text>
                        <DateSinglePickerWrapper id='startDateFolderFilter' date={!filteringState.afterDate ? null : new Date(filteringState.afterDate as number) } allowOustsideDate callback={(date: Date) => { setFilteringState(prevState => { return { ...prevState, afterDate: date.getTime() } }) }} />
                    </div>
                    <div className="mb3" id="folderFilterBefore">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created Before</Text>
                        <DateSinglePickerWrapper id='endDateFolderFilter' date={!filteringState.beforedate ? null : new Date(filteringState.beforedate as number)} allowOustsideDate callback={(date) => { setFilteringState(prevState => { return { ...prevState, beforedate: date.getTime() } }) }} />
                    </div>
                    <div className="mb3" id="folderFilterType">
                    <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Type</Text>
                        <InputCheckbox className="mb2" defaultChecked={filteringState["content-types"].folder}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState,["content-types"]: { ...prevState["content-types"], folder: !prevState["content-types"].folder } } }) }}
                            id='folderFilterFolder' label="Folder" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState["content-types"].channel}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState,["content-types"]: { ...prevState["content-types"], channel: !prevState["content-types"].channel } } }) }}
                            id='folderFilterLiveStream' label="Live Stream" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState["content-types"].vod}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState,["content-types"]: { ...prevState["content-types"], vod: !prevState["content-types"].vod } } }) }}
                            id='folderFilterVideo' label="Video" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState["content-types"].playlist}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState,["content-types"]: { ...prevState["content-types"], playlist: !prevState["content-types"].playlist } } }) }}
                            id='folderFilterPlaylist' label="Playlist" labelWeight="reg" />
                    </div>
                </div>
                
                <div className="flex" id="folderFilterbuttons">
                    <Button onClick={() => { setOpenFilters(false); props.setSelectedFilter(filteringState) }} className="mr1" typeButton="primary">
                        Apply
                    </Button>
                    <Button onClick={() => { props.setSelectedFilter(null); setFilteringState(filteringDefault) }} typeButton="tertiary">
                        Reset
                    </Button>
                </div>
            </Filtering>
        </>
    )
}
