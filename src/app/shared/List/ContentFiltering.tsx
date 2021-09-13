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
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation()

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
                    {t('common_content_list_filter_button_text')}
                    {
                        activeFilter > 0 &&
                            <Badge color="dark-violet" style={{ top: "-8px" }} number={activeFilter} className="absolute" />
                    }
                </Button>
            </div>
            <Filtering isOpen={openFilters} >
                <div>
                    <div className="flex mb25" ><Text size={24} weight="med" color="gray-1" >{t('common_content_list_filter_title')}</Text><IconStyle className="ml-auto pointer" onClick={() => setOpenFilters(false)} >close</IconStyle></div>
                    <div className="mb3" id="contentFilterStatus">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >{t('common_content_list_table_header_status')}</Text>
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.online}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, online: !prevState.status.online } } }) }}
                            id='contentFilterOnline' label={t('common_content_list_content_status_online')} labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.offline}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, offline: !prevState.status.offline } } }) }}
                            id='contentFilterOffline' label={t('common_content_list_content_status_offline')} labelWeight="reg" />
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
                            <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >{t('common_content_list_table_header_features')}</Text>
                            {userToken.getPrivilege('privilege-paywall') &&  <InputCheckbox className="mb2" defaultChecked={filteringState.features.paywall}
                                onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, paywall: !prevState.features.paywall } } }) }}
                                id='contentFilterPaywall' label={t('common_navigation_bar_menu_item_paywall')} labelWeight="reg" />}
                            {userToken.getPrivilege('privilege-advertising') &&  <InputCheckbox className="mb2" defaultChecked={filteringState.features.advertising}
                                onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, advertising: !prevState.features.advertising } } }) }}
                                id='contentFilterAdvertising' label={t('common_content_list_filter_advertising')} labelWeight="reg" />}
                            {(userToken.getPrivilege('privilege-playlists') && props.contentType !== "playlists") &&  <InputCheckbox className="mb2" defaultChecked={filteringState.features.playlists}
                                onChange={(e) => { setFilteringState(prevState => { return { ...prevState, features: { ...prevState.features, playlists: !prevState.features.playlists } } }) }}
                                id='contentFilterPlaylists' label={t('common_navigation_bar_menu_item_playlists')} labelWeight="reg" />}
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
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >{t('common_content_list_filter_created_after')}</Text>
                        <DateSinglePickerWrapper id='startDate' date={isNaN(filteringState.afterDate as number) || !filteringState.afterDate ?  null : new Date(filteringState.afterDate as number)} allowOustsideDate callback={(date: Date) => { setFilteringState(prevState => { return { ...prevState, afterDate: Math.round(date.getTime()/ 1000)  } }) }} />
                    </div>
                    <div className="mb3" id="contentFilterBefore">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >{t('common_content_list_filter_created_before')}</Text>
                        <DateSinglePickerWrapper id='endDate' date={isNaN(filteringState.beforeDate as number)  || !filteringState.beforeDate ? null: new Date(filteringState.beforeDate as number)} allowOustsideDate callback={(date: Date) => { setFilteringState(prevState => { return { ...prevState, beforeDate: Math.round(date.getTime()/ 1000)  } }) }} />
                    </div>
                    {
                        props.contentType === "vod" && 
                            <div className="mb3" id="contentFilterSize">
                            <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >{t('common_content_list_table_header_size')}</Text>
                                <div className="mxn2 clearfix">
                                    <Input className="col col-6 px2" label="Min (MB)" type="number" min='0' value={filteringState.sizeStart} onChange={(event) => {handleNumberInputChange(event, 'sizeStart')}} />
                                    <Input className="col col-6 px2" label="Max (MB)" type="number" min='0' value={filteringState.sizeEnd} onChange={(event) => {handleNumberInputChange(event, 'sizeEnd')}} />
                                </div>
                            </div>
                    }
                </div>
                <div className="flex" id="contentFilterbuttons">
                    <Button onClick={() => { setOpenFilters(false); props.setSelectedFilter(filteringState) }} className="mr1" typeButton="primary">
                        {t('common_content_list_filter_apply_button_text')}
                    </Button>
                    <Button onClick={() => { setFilteringState(filteringDefault); props.setSelectedFilter(null) }} typeButton="tertiary">
                        {t('common_content_list_filter_reset_button_text')}
                    </Button>
                </div>
            </Filtering>
        </>
    )
}