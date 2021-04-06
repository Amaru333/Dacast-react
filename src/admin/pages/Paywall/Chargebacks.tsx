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

    const chargebackTypeDropdownList = [{title: 'Credit'}, {title: 'Debit'}, {title: 'Payment by balance'}, {title: 'Bank transfer fee'}, {title: 'Viewer refund'}, {title: 'Dispute/chargeback fee'}]

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
            <Text size={14} weight='reg'>Manual debits create a line item on an Account's paywall balance</Text>
            <Input backgroundColor="white" onChange={(event) => setSubmittedData({...submittedData, salesforceId: event.currentTarget.value})} className='my1 col col-2' id='accountIdInput' placeholder='Account ID' label='Account ID' />
            <div className='flex items-center'>
                <Text className='pt25 pr2' size={32} weight='med'>{submittedData.type === 'Credit' ? '+' : '-'}</Text>
                <Input type='number' min="0.01" step="0.01" backgroundColor="white" onChange={(event) => setSubmittedData({...submittedData, amount: parseFloat(event.currentTarget.value)})} className='my1 col col-2' id='amountInput' placeholder='Amount' label='Amount (USD)' />
            </div>
            <DropdownSingle
                isWhiteBackground 
                id='typeDropdown' 
                className='mt1 mb25 col col-2'
                dropdownTitle='Type' 
                list={chargebackTypeDropdownList}
                callback={(item: DropdownSingleListItem) => setSubmittedData({...submittedData, type: item.title})}
            />
            <Button disabled={(!submittedData.amount || !submittedData.salesforceId || !submittedData.type)} onClick={() => setOpenConfirmationModal(true)} className='mt25 col col-1' sizeButton='large' typeButton='primary' buttonColor='blue'>Submit</Button>
            <ConfirmationModal modalButtonLoading={buttonLoading}  submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
        </div>
    )
}