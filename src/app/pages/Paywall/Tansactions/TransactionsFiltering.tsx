import React from 'react';
import { Filtering } from '../../../../components/Filtering/Filtering';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Badge } from '../../../../components/Badge/Badge';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Text } from '../../../../components/Typography/Text';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';

export interface FilteringTransactionsState {
    type: string;
    currency: {
        aud: boolean;
        gbp: boolean;
        usd: boolean;
        eur: boolean;
    };
    startDate: number | boolean;
    endDate: number | boolean;
}

export const TransactionsFiltering = (props: {defaultFilters: FilteringTransactionsState; setSelectedFilter: (filters: FilteringTransactionsState) => void}) => {




    var filteringDefault: FilteringTransactionsState = {
        type: null,
        currency: {
            aud: false,
            gbp: false,
            usd: false,
            eur: false
        },
        startDate: false,
        endDate: false,
    }

    const [filteringState, setFilteringState] = React.useState<FilteringTransactionsState>(props.defaultFilters);
    const [activeFilter, setActiveFilter] = React.useState<number>(0);
    const [openFilters, setOpenFilters] = React.useState<boolean>(false);

    const filterDropdownList = [{title: "Pay Per View"}, {title: "Subscription"}, {title: "External Payment"}, {title: "Special Chargeback"}, {title: "Viewer Refund"}, {title: "Request Payment"}, {title: "Payment With Balance"}]

    const checkActiveFilter = () => {
        var counter = 0;
        filteringState.type? counter++ : null;
        Object.entries(filteringState.currency).map(item => item[1] !== false ? counter++ : null)
        filteringState.startDate ? counter++ : null;
        filteringState.endDate ? counter++ : null;
        setActiveFilter(counter);
    }

    React.useEffect(() => {
        checkActiveFilter();
    }, [filteringState])


    return (
        <>
            <div className="right clearfix">
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
                    <div className="mb3" id="transactionsFilterType">
                        {/* <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Type</Text> */}
                        <DropdownSingle id='filterType' 
                            dropdownTitle='Type'
                            dropdownDefaultSelect={filteringState.type}
                            list={filterDropdownList}
                            callback={(item: DropdownSingleListItem) => setFilteringState({...filteringState, type: item.title})}
                        />
                    </div>
                    <div className="mb3" id="transactionFilterCurrency">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Features</Text>
                        <InputCheckbox className="mb2" defaultChecked={filteringState.currency.aud}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, currency: { ...prevState.currency, aud: !prevState.currency.aud } } }) }}
                            id='transactionFilterAUD' label="AUD" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.currency.gbp}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, currency: { ...prevState.currency, gbp: !prevState.currency.gbp } } }) }}
                            id='transactionFilterGBP' label="GBP" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.currency.usd}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, currency: { ...prevState.currency, usd: !prevState.currency.usd } } }) }}
                            id='transactionFilterUSD' label="USD" labelWeight="reg" />
                        <InputCheckbox className="mb2" defaultChecked={filteringState.currency.eur}
                            onChange={() => { setFilteringState(prevState => { return { ...prevState, currency: { ...prevState.currency, eur: !prevState.currency.eur } } }) }}
                            id='transactionFilterEUR' label="EUR" labelWeight="reg" />
                    </div>
                    <div className="mb3" id="transactionFilterStartDate">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Start Date</Text>
                        <DateSinglePickerWrapper allowOustsideDate callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, startDate: ms } }) }} />
                    </div>
                    <div className="mb3" id="transactionFilterEndDate">
                        <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >End Date</Text>
                        <DateSinglePickerWrapper allowOustsideDate callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, endDate: ms } }) }} />
                    </div>
                </div>
                
                <div className="flex" id="transactionFilterbuttons">
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
