import React from "react"
import { DropdownButton } from "../../../components/FormsComponents/Dropdown/DropdownButton"
import { DropdownSingleListItem } from "../../../components/FormsComponents/Dropdown/DropdownTypes"
import { handleCurrencySymbol } from "../../../utils/utils"
import { Price } from "../../redux-flow/store/Account/Upgrade/types"

interface MultiCurrencyDropdownProps {
    defaultCurrency: DropdownSingleListItem
    currenciesList: Price
    id: string
    callback: React.Dispatch<React.SetStateAction<DropdownSingleListItem>>
}

export const MultiCurrencyDropdown = (props: MultiCurrencyDropdownProps) => {

    return (
        <DropdownButton 
            id={props.id}
            style={{ maxHeight: 30, width: 110, zIndex: 100 }} 
            dropdownDefaultSelect={props.defaultCurrency} 
            list={Object.keys(props.currenciesList).map(key => {
                    return {
                        title: key.toUpperCase() + ' - ' + handleCurrencySymbol(key),
                        data: {
                            img: key,
                            id: key
                        }
                    }
            }).filter(f => f)} 
            callback={(value: DropdownSingleListItem) => props.callback(value)} 
        />
    )
}