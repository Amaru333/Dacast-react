import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { AccountAllowancesComponentProps } from '../../containers/Accounts/Allowances'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { Allowances } from '../../redux-flow/store/Accounts/Allowances/types'
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { getUrlParam } from '../../../utils/utils'

export const AccountAllowancesPage = (props: AccountAllowancesComponentProps & {accountId: string}) => {

    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [selectedAllowance, setSelectedAllowance] = React.useState<string>('Data')
    const [allowanceValue, setAllowanceValue] = React.useState<string>(null)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [allowances, setAllowances] = React.useState<Allowances>(props.accountAllowances)
    const salesforceId = getUrlParam('salesforceId') || null


    const allowancesDropdownList = [{title: "Data"}, {title: "Encoding"}, {title: "Storage"}]

    React.useEffect(() => setAllowances(props.accountAllowances), [props.accountAllowances])


    const handleSubmit =() => {
        setButtonLoading(true)
        props.saveAccountAllowances({amount: parseInt(allowanceValue)* 1000000000, type: selectedAllowance.toLowerCase() as 'data' | 'storage' | 'encoding'}, props.accountId)
        .then(() => {
            setButtonLoading(false)
            setOpenConfirmationModal(false)
            props.getAccountAllowances(props.accountId)

        })
        .catch(() => setButtonLoading(false))
    }

    return (
        <div className='flex flex-column'>
            <Text size={16} weight='med'>Allowances for BID: {salesforceId}</Text>
            <div className='flex my1'>
                <Text className='pr2' size={14} weight='reg'>Data</Text>
                <Text size={14} weight='reg'>{allowances ? (allowances.data.allocated - allowances.data.consumed) / 1000000000  : ''} GB</Text>
            </div>
            <div className='flex my1'>
                <Text className='pr2' size={14} weight='reg'>Storage</Text>
                <Text size={14} weight='reg'>{allowances ? (allowances.storage.allocated - allowances.storage.consumed) / 1000000000 : ''} GB</Text>
            </div>
            <DropdownSingle className='my1 col col-3' id='accountAllowancesDropdown' dropdownDefaultSelect={'Data'} callback={(item: DropdownSingleListItem) => setSelectedAllowance(item.title)} dropdownTitle='Allowance' list={allowancesDropdownList} />
            <Input className='my1 col col-3' onChange={(event) => setAllowanceValue(event.currentTarget.value)} id='accountAllowanceInput' placeholder='Enter Amount' label='Amount (GB)' />
            <Button className='my1 col col-1' onClick={() => setOpenConfirmationModal(true)} typeButton='primary' sizeButton='large' buttonColor='blue'>Submit</Button>
            <Text size={14}>A positive Amount adds the allowance</Text>
            <Text size={14}>whereas a negative Amount susbtracts from it.</Text>
            <ConfirmationModal modalButtonLoading={buttonLoading} submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
        </div>
    )
}