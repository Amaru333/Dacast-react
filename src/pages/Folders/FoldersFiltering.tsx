import React from 'react';
import { Filtering } from '../../components/Filtering/Filtering';
import { Button } from '../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../components/FormsComponents/Input/InputCheckbox';
import { DateSinglePickerWrapper } from '../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Badge } from '../../components/Badge/Badge';
import { IconStyle } from '../../shared/Common/Icon';
import { Text } from '../../components/Typography/Text';

export const FoldersFiltering = (props: {}) => {


    interface FilteringState {
        status: {
            online: boolean;
            offline: boolean;
            processing: boolean;
            deleted: boolean;
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
    }

    var filteringDefault = {
        status: {
            online: false,
            offline: false,
            processing: false,
            deleted: false
        },
        features: {
            paywall: false,
            advertising: false,
            playlists: false,
            rewind: false,
            recording: false
        },
        afterDate: false,
        beforedate: false
    }

    const [filteringState, setFilteringState] = React.useState<FilteringState>(filteringDefault);
    const [activeFilter, setActiveFilter] = React.useState<number>(0);
    const [openFilters, setOpenFilters] = React.useState<boolean>(false);

    const checkActiveFilter = () => {
        var counter = 0;
        Object.entries(filteringState.features).map(item => item[1] !== false ? counter++ : null);
        Object.entries(filteringState.status).map(item => item[1] !== false ? counter++ : null)
        filteringState.afterDate ? counter++ : null;
        filteringState.beforedate ? counter++ : null;
        setActiveFilter(counter);
    }

    React.useEffect(() => {
        checkActiveFilter();
    }, [filteringState])


    return (
        <>
            <div className="right">
                <Button buttonColor="gray" className="relative right" onClick={() => setOpenFilters(!openFilters)} sizeButton="small" typeButton="secondary" >
                    Filter
                    {
                        activeFilter > 0 ?
                            <Badge color="dark-violet" style={{ top: "-8px" }} number={activeFilter} className="absolute" />
                            : null
                    }
                </Button>
            </div>
            <Filtering isOpen={openFilters} >
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
                    <InputCheckbox className="mb2" defaultChecked={filteringState.features.advertising}
                        onChange={() => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, advertising: !prevState.features.advertising } } }) }}
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
                    <DateSinglePickerWrapper callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, createdAfter: ms } }) }} />
                </div>
                <div className="mb3" id="folderFilterBefore">
                    <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created Before</Text>
                    <DateSinglePickerWrapper callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, createdBefore: ms } }) }} />
                </div>
                <div className="flex" id="folderFilterbuttons">
                    <Button onClick={() => { setOpenFilters(false) }} className="mr1" typeButton="primary">
                        Apply
                    </Button>
                    <Button onClick={() => { setFilteringState(filteringDefault) }} typeButton="tertiary">
                        Reset
                    </Button>
                </div>
            </Filtering>
        </>
    )
}
