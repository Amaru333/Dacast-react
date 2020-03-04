import React from 'react';
import { Filtering } from '../../../components/Filtering/Filtering';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Badge } from '../../../components/Badge/Badge';
import { Icon } from '@material-ui/core';
import { Text } from '../../../components/Typography/Text';

export const TransactionsFiltering = (props: {}) => {


    interface FilteringState {
        type: {
            requestPayment: boolean;
            externalPayment: boolean;
            specialChargeback: boolean;
            charge: boolean;
        };
        currency: {
            aud: boolean;
            gbp: boolean;
            usd: boolean;
        };
        startDate: number | boolean;
        endDate: number | boolean;
    }

    var filteringDefault = {
        type: {
            requestPayment: false,
            externalPayment: false,
            specialChargeback: false,
            charge: false,
        },
        currency: {
            aud: false,
            gbp: false,
            usd: false,
        },
        startDate: false,
        endDate: false,
    }

    const [filteringState, setFilteringState] = React.useState<FilteringState>(filteringDefault);
    const [activeFilter, setActiveFilter] = React.useState<number>(0);
    const [openFilters, setOpenFilters] = React.useState<boolean>(false);

    const checkActiveFilter = () => {
        var counter = 0;
        Object.entries(filteringState.type).map(item => item[1] !== false ? counter++ : null);
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
                        activeFilter > 0 ?
                            <Badge color="dark-violet" style={{ top: "-8px" }} number={activeFilter} className="absolute" />
                            : null
                    }
                </Button>
            </div>
            <Filtering isOpen={openFilters} >
                <div className="flex mb25" ><Text size={24} weight="med" color="gray-1" >Filters</Text><Icon className="ml-auto pointer" onClick={() => setOpenFilters(false)} >close</Icon></div>
                <div className="mb3" id="transactionsFilterType">
                    <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Type</Text>
                    <InputCheckbox className="mb2" defaultChecked={filteringState.type.requestPayment}
                        onChange={() => { setFilteringState(prevState => { return { ...prevState, type: { ...prevState.type, requestPayment: !prevState.type.requestPayment } } }) }}
                        id='transactionFilterRequestPayment' label="Request Payment" labelWeight="reg" />
                    <InputCheckbox className="mb2" defaultChecked={filteringState.type.externalPayment}
                        onChange={() => { setFilteringState(prevState => { return { ...prevState, type: { ...prevState.type, externalPayment: !prevState.type.externalPayment } } }) }}
                        id='transactionsFilterExternalPayment' label="External Payment" labelWeight="reg" />
                    <InputCheckbox className="mb2" defaultChecked={filteringState.type.specialChargeback}
                        onChange={() => { setFilteringState(prevState => { return { ...prevState, status: { ...prevState.type, specialChargeback: !prevState.type.specialChargeback } } }) }}
                        id='transactionFilterSpecialChargeback' label="Special Chargeback" labelWeight="reg" />
                    <InputCheckbox className="mb2" defaultChecked={filteringState.type.charge}
                        onChange={() => { setFilteringState(prevState => { return { ...prevState, type: { ...prevState.type, charge: !prevState.type.charge } } }) }}
                        id='transactionFilterCharge' label="Charge" labelWeight="reg" />
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
                </div>
                <div className="mb3" id="transactionFilterStartDate">
                    <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >Start Date</Text>
                    <DateSinglePickerWrapper callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, startDate: ms } }) }} />
                </div>
                <div className="mb3" id="transactionFilterEndDate">
                    <Text className="mb2 inline-block" size={16} weight="med" color="gray-1" >End Date</Text>
                    <DateSinglePickerWrapper callback={(date: string, ms: number) => { setFilteringState(prevState => { return { ...prevState, endDate: ms } }) }} />
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
