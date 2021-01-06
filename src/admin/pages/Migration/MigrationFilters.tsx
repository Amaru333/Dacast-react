import React, { SetStateAction } from 'react';
import { Filtering } from '../../../components/Filtering/Filtering';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Badge } from '../../../components/Badge/Badge';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownCheckbox } from '../../../components/FormsComponents/Dropdown/DropdownCheckbox';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';

export interface FilteringMigrationState {
    status: {
        "Export In Progress": boolean;
        "Error Exporting": boolean;
        "Done Exporting": boolean;
        "Import In Progress": boolean;
        "Error Importing": boolean;
        "Migrated But Not Switched": boolean;
        "Migrated And Switched": boolean;
        "Error Switching": boolean;
    };
    platform: 'dacast' | 'vzaar' | 'uapp';
    userIds: string;
}

export const MigrationFiltering = (props: {defaultFilters: FilteringMigrationState; setSelectedFilter: React.Dispatch<SetStateAction<FilteringMigrationState>>}) => {

    var filteringDefault: FilteringMigrationState = {
        status: {
            "Export In Progress": false,
            "Error Exporting": false,
            "Done Exporting": false,
            "Import In Progress": false,
            "Error Importing": false,
            "Migrated But Not Switched": false,
            "Migrated And Switched": false,
            "Error Switching": false,
        },
        platform: 'dacast',
        userIds: null
    }

    const [filteringState, setFilteringState] = React.useState<FilteringMigrationState>(props.defaultFilters);
    const [activeFilter, setActiveFilter] = React.useState<number>(0);
    const [openFilters, setOpenFilters] = React.useState<boolean>(false);

    const checkActiveFilter = () => {
        var counter = 0;
        filteringState.platform ? counter++ : null;
        filteringState.userIds ? counter++ : null;
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
                    <div className="mb3" id="contentFilterFeatures">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Platform</Text>
                        <InputRadio className="mb2" name='platform' value='dacast' defaultChecked={filteringState.platform === 'dacast'}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, platform: 'dacast' }}) }}
                            id='contentFilterDacast' label="Dacast" labelWeight="reg" /> 
                        <InputRadio className="mb2" name='platform' value='vzaar' defaultChecked={filteringState.platform === 'vzaar'}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, platform: 'vzaar' } }) }}
                            id='contentFilterVzaar' label="Vzaar" labelWeight="reg" /> 
                        <InputRadio className="mb2" name='platform' value='uapp' defaultChecked={filteringState.platform === 'uapp'}
                            onChange={(e) => { setFilteringState(prevState => { return { ...prevState, platform: 'uapp' } }) }}
                            id='contentFilterVzaar' label="Uapp" labelWeight="reg" /> 
                    </div>
                    <div className="mb3" id="contentFilterStatus">
                        <DropdownCheckbox
                            id='statusesDropdown'
                            disabled={filteringState.platform === 'uapp'}
                            dropdownTitle='Status'
                            list={filteringState.status}
                            callback={(value) => setFilteringState({...filteringState, status: value})}
                        />
                    </div>
                        <div className="mb3" id="contentFilterSize">
                                <div className="mxn2 clearfix">
                                <Input className="col col-12 px2" label="User Ids" indicationLabel='Must be separated by ,'  type='textarea' value={filteringState.userIds} onChange={(event) => {handleNumberInputChange(event, 'userIds')}} />
                            </div>
                        </div>
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