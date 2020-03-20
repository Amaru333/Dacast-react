import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { AccountAllowancesComponentProps } from '../../containers/Accounts/Allowances'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'

export const AccountAllowancesPage = (props: AccountAllowancesComponentProps & {accountId: string}) => {

    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [selectedAllowance, setSelectedAllowance] = React.useState<string>('Data')
    const [allowanceValue, setAllowanceValue] = React.useState<string>(null)

    const handleSubmit =() => {
        props.saveAccountAllowances({[selectedAllowance]: allowanceValue}, props.accountId)
        setOpenConfirmationModal(false)
    }

    return (
        <div>
            <Text size={16} weight='med'>Allowances for Account</Text>
            <div className='flex my1'>
                <Text size={14} weight='reg'>Data</Text>
                <Text size={14} weight='reg'>{props.accountAllowances.data} GB</Text>
            </div>
            <div className='flex my1'>
                <Text size={14} weight='reg'>Encoding</Text>
                <Text size={14} weight='reg'>{props.accountAllowances.encoding} GB</Text>
            </div>
            <div className='flex my1'>
                <Text size={14} weight='reg'>Storage</Text>
                <Text size={14} weight='reg'>{props.accountAllowances.storage} GB</Text>
            </div>
            <DropdownSingle className='my1' id='accountAllowancesDropdown' dropdownDefaultSelect={'Data'} callback={(value: string) => setSelectedAllowance(value)} dropdownTitle='Allowance' list={{'Data': false, 'Encoding': false, 'Storage': false}} />
            <Input className='my1' onChange={(event) => setAllowanceValue(event.currentTarget.value)} id='accountAllowanceInput' placeholder='Enter Amount' label='Amount (GB)' />
            <Button className='my1' onClick={() => setOpenConfirmationModal(true)} typeButton='primary' sizeButton='large' buttonColor='blue'>Submit</Button>
            <Text size={14}>A positive Amount adds the allowance</Text>
            <Text size={14}>whereas a negative Amount susbtracts from it.</Text>
            <ConfirmationModal submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
        </div>
    )
}