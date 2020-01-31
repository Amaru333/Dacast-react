import React from 'react';
import { Filtering } from '../../../components/Filtering/Filtering';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { DateSinglePicker } from '../../../components/FormsComponents/Datepicker/DateSinglePicker';
import { Badge } from '../../../components/Badge/Badge';
import { Icon } from '@material-ui/core';
import { Text } from '../../../components/Typography/Text';
import { Input } from '../../../components/FormsComponents/Input/Input';

export const LivesFiltering = (props: {}) => {


    interface FilteringState {
        status: {
            online: boolean;
            offline: boolean;
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
            offline: false
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
            <div className="mb2 clearfix">
                <Button buttonColor="blue" className="relative right" onClick={() => setOpenFilters(!openFilters)} sizeButton="small" typeButton="secondary" >
                    Filter
                    <Badge color="dark-violet" style={{ top: "-8px" }} number={activeFilter} className="absolute" />
                </Button>
            </div>
            <Filtering isOpen={openFilters} >
                <div className="flex mb25" ><Text size={24} weight="med" color="gray-1" >Filters</Text><Icon className="ml-auto pointer" onClick={() => setOpenFilters(false)} >close</Icon></div>
                <div className="mb3" id="vodFilterStatus">
                    <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Status</Text>
                    <InputCheckbox className="mb2" defaultChecked={filteringState.status.online}
                        onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, online: !prevState.status.online } } }) }}
                        id='vodFilterOnline' label="Online" labelWeight="reg" />
                    <InputCheckbox className="mb2" defaultChecked={filteringState.status.offline}
                        onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, offline: !prevState.status.offline } } }) }}
                        id='vodFilterOffline' label="Offline" labelWeight="reg" />
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
                <div className="flex" id="vodFilterbuttons">
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
