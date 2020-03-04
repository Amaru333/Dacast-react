import React from 'react';
import { Filtering } from '../../../components/Filtering/Filtering';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Badge } from '../../../components/Badge/Badge';
import { Icon } from '@material-ui/core';
import { Text } from '../../../components/Typography/Text';

export const InvoicesFiltering = (props: {}) => {


    interface FilteringState {
        status: {
            paid: boolean;
            pending: boolean;
            failed: boolean;
        };
        afterDate: number | boolean;
        beforedate: number | boolean;
    }

    var filteringDefault = {
        status: {
            paid: false,
            pending: false,
            failed: false,
        },
        afterDate: false,
        beforedate: false
    }

    const [filteringState, setFilteringState] = React.useState<FilteringState>(filteringDefault);
    const [activeFilter, setActiveFilter] = React.useState<number>(0);
    const [openFilters, setOpenFilters] = React.useState<boolean>(false);

    const checkActiveFilter = () => {
        var counter = 0;
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
                <Button buttonColor="blue" className="relative right" onClick={() => setOpenFilters(!openFilters)} sizeButton="small" typeButton="secondary" >
                    Filter
                    <Badge color="dark-violet" style={{ top: "-8px" }} number={activeFilter} className="absolute" />
                </Button>
            </div>
            <Filtering isOpen={openFilters} >
                <div className="flex mb25" ><Text size={24} weight="med" color="gray-1" >Filters</Text><Icon className="ml-auto pointer" onClick={() => setOpenFilters(false)} >close</Icon></div>
                <div className="mb3" id="folderFilterStatus">
                    <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Status</Text>
                    <InputCheckbox className="mb2" defaultChecked={filteringState.status.paid}
                        onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, online: !prevState.status.paid } } }) }}
                        id='folderFilterPaid' label="Paid" labelWeight="reg" />
                    <InputCheckbox className="mb2" defaultChecked={filteringState.status.pending}
                        onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, offline: !prevState.status.pending } } }) }}
                        id='folderFilterPending' label="Pending" labelWeight="reg" />
                    <InputCheckbox className="mb2" defaultChecked={filteringState.status.failed}
                        onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, processing: !prevState.status.failed } } }) }}
                        id='folderFilterFailed' label="Failed" labelWeight="reg" />
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
