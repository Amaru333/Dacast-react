import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { ChargebackComponentProps } from '../../containers/Paywall/Chargebacks'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { Chargeback } from '../../redux-flow/store/Paywall/Chargebacks/types'
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';

export const ChargebacksPage = (props: ChargebackComponentProps) => {

    const [submittedData, setSubmittedData] = React.useState<Chargeback>({amount: NaN, salesforceId: null, type: null})
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const chargebackTypeDropdownList = [{title: 'Credit'}, {title: 'Debit'}, {title: 'Special credit'}, {title: 'Special debit'}, {title: 'Payment by balance'}, {title: 'Bank transfer fee'}, {title: 'Viewer refund'}, {title: 'Dispute/chargeback fee'}]

    const handleSubmit = () => {
        setButtonLoading(true)
        props.submitChargeback(submittedData)
        .then(() => {
            setButtonLoading(false)
            setOpenConfirmationModal(false)
        })
        .catch(() => setButtonLoading(false))
    }

    return (
        <div className='flex flex-column'>
            <Text size={16} weight='med'>Manuel debits create a line item on an Account's paywall balance</Text>
            <Input onChange={(event) => setSubmittedData({...submittedData, salesforceId: event.currentTarget.value})} className='my1 col col-2' id='accountIdInput' placeholder='Account ID' label='Account ID' />
            <Input onChange={(event) => setSubmittedData({...submittedData, amount: parseFloat(event.currentTarget.value)})} className='my1 col col-2' id='amountInput' placeholder='Amount' label='Amount (USD)' />
            <DropdownSingle 
                id='typeDropdown' 
                className='my1 col col-2'
                dropdownTitle='Type' 
                list={chargebackTypeDropdownList}
                callback={(item: DropdownSingleListItem) => setSubmittedData({...submittedData, type: item.title})}
            />
            <Text size={16} weight='med'>Regardless of Type, a positive Amount will take a payment</Text>
            <Text size={16} weight='med'>and a negative Amount will issue a refund</Text>
            <Button disabled={(!submittedData.amount || !submittedData.salesforceId || !submittedData.type)} onClick={() => setOpenConfirmationModal(true)} className='my2 col col-1' sizeButton='large' typeButton='primary' buttonColor='blue'>Submit</Button>
            <ConfirmationModal modalButtonLoading={buttonLoading}  submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
        </div>
    )
}