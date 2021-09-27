import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { IconStyle } from '../../../../shared/Common/Icon';
import { getKnowledgebaseLink } from '../../../constants/KnowledgbaseLinks';
import { BandWidthProduct, BandwidthProductCurrency, Extras } from '../../../redux-flow/store/Account/Plan';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { MultiCurrencyDropdown } from '../../../shared/Billing/MultiCurrencyDropdown';
import { handleCurrencySymbol } from '../../../../utils/utils';

interface PurchaseDataCartStepProps {
    stepperData: Extras;
    bandwidthProduct: BandWidthProduct;
    selectedCurrency: DropdownSingleListItem;
    updateStepperData: React.Dispatch<React.SetStateAction<Extras>>;
    setStepValidated: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedCurrency: React.Dispatch<React.SetStateAction<DropdownSingleListItem>>;
}

export const PurchaseDataCartStep = (props: PurchaseDataCartStepProps) => {

    const [dataAmount, setDataAmount] = React.useState<number>(props.stepperData.quantity || 1000)

    React.useEffect(() => {
        props.setStepValidated(dataAmount && dataAmount < 100000 && dataAmount > 999)
    }, [props.stepperData])

    const handleInputError = (dataAmount: number) => {
        if(dataAmount > 99999) {
            return "Contact us for purchases over 100,000 GB"
        }
        if (dataAmount < 1000) {
            return "Purchases must be over 1,000 GB"
        }

        return null
    }

    const cartTableBodyElement = () => {
        return [
            {
                data: [
                    <Text size={14}>Price per GB</Text>,
                    <Text className="right pr2" size={14}>{(dataAmount && dataAmount < 100000) && `${handleCurrencySymbol(props.selectedCurrency.data.id)} ${props.bandwidthProduct[props.stepperData.code].unitPrice[props.selectedCurrency.data.id as BandwidthProductCurrency]}`}</Text>
                ]
            }
        ]
    }

    const cartTableFooterElement = () => {
        return [
            <Text size={14} weight="med">Total Pay Now</Text>,
            <Text className="right pr2" weight="med" size={14}>{(dataAmount && dataAmount < 100000) && `${handleCurrencySymbol(props.selectedCurrency.data.id)} ${(props.stepperData.totalPrice).toFixed(2)}`}</Text>
        ]
    }

    const handleDataPrice = (data: number) => {
        setDataAmount(data)
        if(data <= 2400){
            props.updateStepperData({...props.stepperData, code: "eventBw1to4TB", quantity: data, totalPrice: (props.bandwidthProduct['eventBw1to4TB'].unitPrice[props.selectedCurrency.data.id as BandwidthProductCurrency] * data)})
        } else if(data <= 4999) {
            props.updateStepperData({...props.stepperData, code: "eventBw1to4TB", quantity: data, totalPrice: (props.bandwidthProduct['eventBw5to10TB'].unitPrice[props.selectedCurrency.data.id as BandwidthProductCurrency] * 5000)})
        } else if(data >= 5000 && data <= 9999){
            props.updateStepperData({...props.stepperData, code: "eventBw5to10TB", quantity: data, totalPrice: (props.bandwidthProduct['eventBw5to10TB'].unitPrice[props.selectedCurrency.data.id as BandwidthProductCurrency] * data)})
        } else {
            props.updateStepperData({...props.stepperData, code: "eventBw10to100TB", quantity: data, totalPrice: (props.bandwidthProduct['eventBw10to100TB'].unitPrice[props.selectedCurrency.data.id as BandwidthProductCurrency] * data)})
        }
    }

    return (
        <div className="col col-12 flex flex-column">
            <div style={{position: 'absolute', right: 24, top: 24}}>
                {/* <MultiCurrencyDropdown

                    defaultCurrency={props.selectedCurrency}
                    currenciesList={props.bandwidthProduct.eventBw10to100TB.unitPrice}
                    callback={(value: DropdownSingleListItem) => {props.setSelectedCurrency(value);props.updateStepperData({...props.stepperData, totalPrice: props.bandwidthProduct[props.stepperData.code].unitPrice[value.data.id as BandwidthProductCurrency] * dataAmount})}}
                /> */}
            </div>
            <Input
                defaultValue={dataAmount && dataAmount.toString()}
                type="number"
                className="col col-6 mb1"
                label="Amount in Gigabytes (GB)"
                isError={dataAmount !== null && (dataAmount > 99999 || dataAmount < 1000)}
                help={handleInputError(dataAmount)}
                onChange={(event) => {handleDataPrice(parseInt(event.currentTarget.value))}}
            />
            <div className="col col-12">
            <Table id="PurchaseDataCart" headerBackgroundColor="gray-10" body={cartTableBodyElement()} footer={cartTableFooterElement()} />
            </div>
            <div className="flex mt1">
                <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                <Text size={14} weight="reg">Need help with purchasing additional data? Visit the <a href={getKnowledgebaseLink("Data")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
            </div>
        </div>
    )
}
