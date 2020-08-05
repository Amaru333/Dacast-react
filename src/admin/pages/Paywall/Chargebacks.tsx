import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { ChargebackComponentProps } from '../../containers/Paywall/Chargebacks'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { Chargeback } from '../../redux-flow/store/Paywall/Chargebacks/types'

export const ChargebacksPage = (props: ChargebackComponentProps) => {

    const [submittedData, setSubmittedData] = React.useState<Chargeback>({amount: NaN, accountId: null, type: null})
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        props.submitChargeback()
        setOpenConfirmationModal(false)
    }

    return (
        <div className='flex flex-column'>
            <Text size={16} weight='med'>Manuel debits create a line item on an Account's paywall balance</Text>
            <Input onChange={(event) => setSubmittedData({...submittedData, accountId: event.currentTarget.value})} className='my1 col col-2' id='accountIdInput' placeholder='Account ID' label='Account ID' />
            <Input onChange={(event) => setSubmittedData({...submittedData, amount: parseInt(event.currentTarget.value)})} className='my1 col col-2' id='amountInput' placeholder='Amount' label='Amount (USD)' />
            <DropdownSingle 
                id='typeDropdown' 
                className='my1 col col-2'
                dropdownTitle='Type' 
                list={{'Credit': false, 'Debit': false, 'Special credit': false, 'Special debit': false, 'Payment by balance': false, 'Bank transfer fee': false, 'Viewer refund':false, 'Dispute/chargeback fee': false}}
                callback={(value: string) => setSubmittedData({...submittedData, type: value})}
            />
            <Button disabled={(!submittedData.amount || !submittedData.accountId || !submittedData.type)} onClick={() => setOpenConfirmationModal(true)} className='my1 col col-1' sizeButton='large' typeButton='primary' buttonColor='blue'>Submit</Button>
            <Text size={14} weight='med'>Regardless of Type, a positive Amount will take a payment</Text>
            <Text size={14} weight='med'>and a negative Amount will issue a refund</Text>
            <ConfirmationModal modalButtonLoading={buttonLoading}  submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
        </div>
    )
}