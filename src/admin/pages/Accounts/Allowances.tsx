import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { AccountAllowancesComponentProps } from '../../containers/Accounts/Allowances'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'

export const AccountAllowancesPage = (props: AccountAllowancesComponentProps & {accountId: string}) => {

    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [selectedAllowance, setSelectedAllowance] = React.useState<'Data' | 'Storage' | 'Encoding'>('Data')
    const [allowanceValue, setAllowanceValue] = React.useState<string>(null)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit =() => {
        setButtonLoading(true)
        props.saveAccountAllowances({amount: parseInt(allowanceValue), type: selectedAllowance.toLowerCase() as 'data' | 'storage' | 'encoding'}, props.accountId)
        .then(() => {
            setButtonLoading(false)
            setOpenConfirmationModal(false)

        })
        .catch(() => setButtonLoading(false))
    }

    return (
        <div className='flex flex-column'>
            <Text size={16} weight='med'>Allowances for Account</Text>
            <div className='flex my1'>
                <Text size={14} weight='reg'>Data</Text>
                <Text size={14} weight='reg'>{props.accountAllowances ? props.accountAllowances.data.allocated - props.accountAllowances.data.consumed : ''} GB</Text>
            </div>
            <div className='flex my1'>
                <Text size={14} weight='reg'>Storage</Text>
                <Text size={14} weight='reg'>{props.accountAllowances ? props.accountAllowances.storage.allocated - props.accountAllowances.storage.consumed : ''} GB</Text>
            </div>
            <DropdownSingle className='my1 col col-3' id='accountAllowancesDropdown' dropdownDefaultSelect={'Data'} callback={(value: 'Data' | 'Storage' | 'Encoding') => setSelectedAllowance(value)} dropdownTitle='Allowance' list={{'Data': false, 'Encoding': false, 'Storage': false}} />
            <Input className='my1 col col-3' onChange={(event) => setAllowanceValue(event.currentTarget.value)} id='accountAllowanceInput' placeholder='Enter Amount' label='Amount (GB)' />
            <Button className='my1 col col-1' onClick={() => setOpenConfirmationModal(true)} typeButton='primary' sizeButton='large' buttonColor='blue'>Submit</Button>
            <Text size={14}>A positive Amount adds the allowance</Text>
            <Text size={14}>whereas a negative Amount susbtracts from it.</Text>
            <ConfirmationModal modalButtonLoading={buttonLoading} submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
        </div>
    )
}