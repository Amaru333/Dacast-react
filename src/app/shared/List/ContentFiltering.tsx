import React from 'react';
import { Filtering } from '../../../components/Filtering/Filtering';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Badge } from '../../../components/Badge/Badge';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { userToken } from '../../utils/services/token/tokenService';
var moment = require('moment');

export interface FilteringContentState {
    status: {
        online: boolean;
        offline: boolean;
        processing?: boolean;
    };
    features: {
        paywall: boolean;
        advertising: boolean;
        playlists?: boolean;
        rewind?: boolean;
        recording?: boolean;
    };
    afterDate?: number | boolean;
    beforeDate?: number | boolean;
    sizeStart?: string;
    sizeEnd?: string;
}

export const ContentFiltering = (props: {defaultFilters: FilteringContentState; setSelectedFilter: (filters: FilteringContentState) => void, contentType: string}) => {

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
        beforeDate: false,
        sizeStart: '',
        sizeEnd: ''
    }

    const [filteringState, setFilteringState] = React.useState<FilteringContentState>(props.defaultFilters);
    const [activeFilter, setActiveFilter] = React.useState<number>(0);
    const [openFilters, setOpenFilters] = React.useState<boolean>(false);

    const checkActiveFilter = () => {
        var counter = 0;
        Object.entries(filteringState.features).map(item => item[1] !== false ? counter++ : null);
        Object.entries(filteringState.status).map(item => item[1] !== false ? counter++ : null)
        filteringState.afterDate ? counter++ : null;
        filteringState.beforeDate ? counter++ : null;
        filteringState.sizeStart ? counter++ : null;
        filteringState.sizeEnd ? counter++ : null;
        setActiveFilter(counter);
    }

    React.useEffect(() => {
        checkActiveFilter();
    }, [filteringState])

    const handleNumberInputChange = (event: React.FormEvent<HTMLInputElement>, key: string) => {
        let value = event.currentTarget.value
        setFilteringState(prevState => { return { ...prevState, [key]: value } })

    }


    return (
        <>
            <div className="clearfix">
                <Button buttonColor="gray" className="relative right" onClick={() => setOpenFilters(!openFilters)} sizeButton="small" typeButton="secondary" >
                    Filter
                    {
                        activeFilter > 0 &&
                            <Badge color="dark-violet" style={{ top: "-8px" }} number={activeFilter} className="absolute" />
                    }
                </Button>
            </div>
            <Filtering isOpen={openFilters} >
                <div>
                    <div className="flex mb25" ><Text size={24} weight="med" color="gray-1" >Filters</Text><IconStyle className="ml-auto pointer" onClick={() => setOpenFilters(false)} >close</IconStyle></div>
                    <div className="mb3" id="contentFilterStatus">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Status</Text>
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.online}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, online: !prevState.status.online } } }) }}
                            id='contentFilterOnline' label="Online" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.offline}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, offline: !prevState.status.offline } } }) }}
                            id='contentFilterOffline' label="Offline" labelWeight="reg" />
                        {
                            props.contentType === "videos" &&
                                <InputCheckbox className="mb2" defaultChecked={filteringState.status.processing}
                                onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, processing: !prevState.status.processing } } }) }}
                                id='contentFilterProcessing' label="Processing" labelWeight="reg" />
                        }
                    </div>
                    {
                        props.contentType != 'expo' && 
                        <div className="mb3" id="contentFilterFeatures">
                            <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Features</Text>
                            {userToken.getPrivilege('privilege-paywall') &&  <InputCheckbox className="mb2" defaultChecked={filteringState.features.paywall}
                                onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, paywall: !prevState.features.paywall } } }) }}
                                id='contentFilterPaywall' label="Paywall" labelWeight="reg" />}
                            {userToken.getPrivilege('privilege-advertising') &&  <InputCheckbox className="mb2" defaultChecked={filteringState.features.advertising}
                                onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, advertising: !prevState.features.advertising } } }) }}
                                id='contentFilterAdvertising' label="Advertising" labelWeight="reg" />}
                            {(userToken.getPrivilege('privilege-playlists') && props.contentType !== "playlists") &&  <InputCheckbox className="mb2" defaultChecked={filteringState.features.playlists}
                                onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, playlists: !prevState.features.playlists } } }) }}
                                id='contentFilterPlaylists' label="Playlists" labelWeight="reg" />}
                            {
                                props.contentType === "livestreams" &&
                                    <InputCheckbox className="mb2" defaultChecked={filteringState.features.rewind}
                                        onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, rewind: !prevState.features.rewind } } }) }}
                                        id='contentFilterRewind' label="30 Minutes Rewind" labelWeight="reg" />
                            }
                            {(userToken.getPrivilege('privilege-recording') && props.contentType === "livestreams") && <InputCheckbox className="mb2" defaultChecked={filteringState.features.recording}
                                onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, recording: !prevState.features.recording } } }) }}
                                id='contentFilterRecording' label="Recording" labelWeight="reg" />}   
                        </div>
                    }
                    
                    <div className="mb3" id="contentFilterAfter">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created After</Text>
                        <DateSinglePickerWrapper id='startDate' date={filteringState.afterDate == false ? null : moment.unix(filteringState.afterDate)} allowOustsideDate callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, afterDate: ms } }) }} />
                    </div>
                    <div className="mb3" id="contentFilterBefore">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created Before</Text>
                        <DateSinglePickerWrapper id='endDate' date={filteringState.beforeDate == false ? null : moment.unix(filteringState.beforeDate)} allowOustsideDate callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, beforeDate: ms } }) }} />
                    </div>
                    {
                        props.contentType === "vod" && 
                            <div className="mb3" id="contentFilterSize">
                            <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Size</Text>
                                <div className="mxn2 clearfix">
                                    <Input className="col col-6 px2" label="Min (MB)" type="number" min='0' value={filteringState.sizeStart} onChange={(event) => {handleNumberInputChange(event, 'sizeStart')}} />
                                    <Input className="col col-6 px2" label="Max (MB)" type="number" min='0' value={filteringState.sizeEnd} onChange={(event) => {handleNumberInputChange(event, 'sizeEnd')}} />
                                </div>
                            </div>
                    }
                </div>
                <div className="flex" id="contentFilterbuttons">
                    <Button onClick={() => { setOpenFilters(false); props.setSelectedFilter(filteringState) }} className="mr1" typeButton="primary">
                        Apply
                    </Button>
                    <Button onClick={() => { setFilteringState(filteringDefault); props.setSelectedFilter(null) }} typeButton="tertiary">
                        Reset
                    </Button>
                </div>
            </Filtering>
        </>
    )
}