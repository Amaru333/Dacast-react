import React from 'react'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { EditStatusComponentProps } from '../../containers/Withdrawals/EditStatus'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Link, useHistory } from 'react-router-dom'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { Text } from '../../../components/Typography/Text'
import { tsToLocaleDate } from '../../../utils/formatUtils'
import { capitalizeFirstLetter, getUrlParam } from '../../../utils/utils'
import { DateTime } from 'luxon'
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Divider } from '../../../shared/MiscStyles'
import { Card } from '../../../components/Card/Card'
import { Table } from '../../../components/Table/Table'
import { WithdrawalStatusAdmin } from '../../redux-flow/store/Withdrawals/EditStatus/types'

export const EditStatusPage = (props: EditStatusComponentProps & {withdrawalId: string}) => {

    let history = useHistory()
    const salesforceId = getUrlParam('salesforceId') || null

    const [selectedStatus, setSelectedStatus] = React.useState<WithdrawalStatusAdmin>(props.withdrawal.status)
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const statusDropdownList = [{title: "Pending"}, {title: "Completed"}, {title: "Cancelled"}]

    const handleSubmit = () => {
        setButtonLoading(true)
        props.saveWithdrawalStatus(selectedStatus, props.withdrawalId)
        .then(() => {
            setOpenConfirmationModal(false)
            setButtonLoading(false)
        }).catch(() => setButtonLoading(false))
    }

    const withdrawalDetailsTableHeader = () => {
        return {data: [
            {cell: <Text key='withdrawalsTableHeaderAccountCell' size={14} weight='med'>Account</Text>},
            {cell: <Text key='withdrawalsTableHeaderAmountCell' size={14} weight='med'>Amount</Text>},
            {cell: <Text key='withdrawalsTableHeaderRequestedDateCell' size={14} weight='med'>Requested Date</Text>},
            {cell: <Text key='withdrawalsTableHeaderCompletedDateCell' size={14} weight='med'>Completed date</Text>},
            {cell: <Text key='withdrawalsTableHeaderMethodCell' size={14} weight='med'>Method</Text>},
        ]}
    }

    const withdrawalDetailsTableBody = () => {
        if(props.withdrawal) {
            return [
                {
                    data: [
                        <Text key='withdrawalsTableBodyAccountIdCell' size={14}>{salesforceId}</Text>,
                        <Link key='withdrawalsTableBodyAmountCell' to={`/balances?&page=1&perPage=10&salesforceId=${salesforceId}`}>{props.withdrawal.currency + props.withdrawal.amount.toLocaleString()}</Link>,
                        <Text key='withdrawalsTableBodyRequestedDateCell'size={14}>{tsToLocaleDate(props.withdrawal.requestedDate, DateTime.DATETIME_SHORT)}</Text>,
                        <Text key='withdrawalsTableBodyCompletedDateCell' size={14}>{props.withdrawal.transferDate > 0 ? tsToLocaleDate(props.withdrawal.transferDate, DateTime.DATETIME_SHORT) : ''}</Text>,
                        <Text key='withdrawalsTableBodyMethodCell' size={14}>{capitalizeFirstLetter(props.withdrawal.method)}</Text>,
                    ]
                }
            ]
        }
    }

    const renderPaymentMethodDetails = () => {
        return Object.values(props.withdrawal.paymentMethod).filter(f => f.value).map(item => {
            return (
                <div className='flex my1'>
                <Text size={14} weight='med'>{item.label}:&emsp;</Text>
                <Text size={14} weight='reg'>{item.value}</Text>
            </div>
            )
        })
    }

    const renderBankDetails = () => {
        return Object.values(props.withdrawal.bankInfo).filter(f => f.value).map(item => {
            return (
                <div className='flex my1'>
                <Text size={14} weight='med'>{item.label}:&emsp;</Text>
                <Text size={14} weight='reg'>{item.value}</Text>
            </div>
            )
        })
    }

    return (
        <div className='flex flex-column'>
            <Table  id='withdrawalDetailsTable' headerBackgroundColor='gray-8' header={withdrawalDetailsTableHeader()} body={withdrawalDetailsTableBody()} />
            <Card>
                <div className='flex items-end my1'>
                    <DropdownSingle className='col col-3' dropdownDefaultSelect={props.withdrawal ? capitalizeFirstLetter(props.withdrawal.status) : ''} callback={(item: DropdownSingleListItem) => setSelectedStatus(item.title as WithdrawalStatusAdmin)} id='withdrawalStatusDropdown' dropdownTitle='Status' list={statusDropdownList} />
                    <div className='mx2'>
                    <Button onClick={() => setOpenConfirmationModal(true)} typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                    </div>
                    <div>
                        <Button onClick={() => {history.push('/withdrawals')}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
                    </div>
                </div>
                <Divider className='my2' />
                <Text className='pb2' size={20} weight='med'>Payment Method Details</Text>
                {renderPaymentMethodDetails()}
            { props.withdrawal.bankInfo && 
                    <React.Fragment>
                        <Divider className='my2' />
                        <Text className='pb2' size={20} weight='med'>Bank Details</Text>
                        {renderBankDetails()}
                    </React.Fragment>
                }
                <ConfirmationModal modalButtonLoading={buttonLoading} submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
            </Card> 
        </div>
 
    )
}