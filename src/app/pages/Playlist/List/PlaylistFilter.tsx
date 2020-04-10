import React from 'react';
import { Filtering } from '../../../../components/Filtering/Filtering';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Badge } from '../../../../components/Badge/Badge';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Text } from '../../../../components/Typography/Text';

export const PlaylistFiltering = (props: {setSelectedPlaylist: Function}) => {


    interface FilteringState {
        status: {
            online: boolean;
            offline: boolean;
        };
        features: {
            paywall: boolean;
            advertising: boolean;
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
            <div className="clearfix">
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
                <div>
                    <div className="flex mb25" ><Text size={24} weight="med" color="gray-1" >Filters</Text><IconStyle className="ml-auto pointer" onClick={() => setOpenFilters(false)} >close</IconStyle></div>
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
                    </div>
                    <div className="mb3" id="vodFilterAfter">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created After</Text>
                        <DateSinglePickerWrapper callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, createdAfter: ms } }) }} />
                    </div>
                    <div className="mb3" id="vodFilterBefore">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created Before</Text>
                        <DateSinglePickerWrapper callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, createdBefore: ms } }) }} />
                    </div>
                </div>
                <div className="flex" id="vodFilterbuttons">
                    <Button onClick={() => { setOpenFilters(false); props.setSelectedPlaylist([]) }} className="mr1" typeButton="primary">
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