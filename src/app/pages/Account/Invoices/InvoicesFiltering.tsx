import React from 'react';
import { Filtering } from '../../../../components/Filtering/Filtering';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Badge } from '../../../../components/Badge/Badge';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Text } from '../../../../components/Typography/Text';

export interface FilteringInvoicesState {
    status: {
        paid: boolean;
        pending: boolean;
        failed: boolean;
    };
    startDate: number | boolean;
    endDate: number | boolean;
}

export const InvoicesFiltering = (props: {defaultFilters: FilteringInvoicesState; setSelectedFilter: (filters: FilteringInvoicesState) => void}) => {

    var filteringDefault: FilteringInvoicesState = {
        status: {
            paid: false,
            pending: false,
            failed: false,
        },
        startDate: false,
        endDate: false
    }

    const [filteringState, setFilteringState] = React.useState<FilteringInvoicesState>(props.defaultFilters);
    const [activeFilter, setActiveFilter] = React.useState<number>(0);
    const [openFilters, setOpenFilters] = React.useState<boolean>(false);

    const checkActiveFilter = () => {
        var counter = 0;
        Object.entries(filteringState.status).map(item => item[1] !== false ? counter++ : null)
        filteringState.startDate ? counter++ : null;
        filteringState.endDate ? counter++ : null;
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
                        activeFilter > 0 &&
                            <Badge color="dark-violet" style={{ top: "-8px" }} number={activeFilter} className="absolute" />
                    }
                </Button>
            </div>
            <Filtering isOpen={openFilters} >
                <div>
                    <div className="flex mb25" ><Text size={24} weight="med" color="gray-1" >Filters</Text><IconStyle className="ml-auto pointer" onClick={() => setOpenFilters(false)} >close</IconStyle></div>
                    <div className="mb3" id="folderFilterStatus">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Status</Text>
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.paid}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, paid: !prevState.status.paid } } }) }}
                            id='folderFilterPaid' label="Paid" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.pending}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, pending: !prevState.status.pending } } }) }}
                            id='folderFilterPending' label="Pending" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.status.failed}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.status, failed: !prevState.status.failed } } }) }}
                            id='folderFilterFailed' label="Failed" labelWeight="reg" />
                    </div>
                    <div className="mb3" id="folderFilterAfter">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created After</Text>
                        <DateSinglePickerWrapper callback={(date) => { setFilteringState(prevState => { return { ...prevState, startDate: date.getTime() } }) }} />
                    </div>
                    <div className="mb3" id="folderFilterBefore">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Created Before</Text>
                        <DateSinglePickerWrapper callback={(date) => { setFilteringState(prevState => { return { ...prevState, endDate: date.getTime() } }) }} />
                    </div>
                </div>
                
                <div className="flex" id="folderFilterbuttons">
                    <Button onClick={() => { setOpenFilters(false);props.setSelectedFilter(filteringState) }} className="mr1" typeButton="primary">
                        Apply
                    </Button>
                    <Button onClick={() => { setFilteringState(filteringDefault);props.setSelectedFilter(null) }} typeButton="tertiary">
                        Reset
                    </Button>
                </div>
            </Filtering>
        </>
    )
}
