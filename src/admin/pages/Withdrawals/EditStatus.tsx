import React from 'react'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { EditStatusComponentProps } from '../../containers/Withdrawals/EditStatus'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { useHistory } from 'react-router-dom'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { Text } from '../../../components/Typography/Text'
import { tsToLocaleDate } from '../../../utils/utils'
import { DateTime } from 'luxon'

export const EditStatusPage = (props: EditStatusComponentProps & {withdrawalId: string}) => {

    let history = useHistory()


    const [selectedStatus, setSelectedStatus] = React.useState<string>(props.withdrawal.status.charAt(0).toUpperCase() + props.withdrawal.status.slice(1))
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        props.saveWithdrawalStatus(props.withdrawalId, selectedStatus.toLowerCase())
        .then(() => {
            setOpenConfirmationModal(false)
            setButtonLoading(false)
        }).catch(() => setButtonLoading(false))
    }

    const renderWithdrawalInfo = () => {
        if(props.withdrawal) {
            return Object.keys(props.withdrawal).map((key, i) => {
                return (
                    key === 'paymentMethod' ? 
                    <div key={'paymentMethod' + i}>
                        <div  className='flex  col col-12'>
                            <Text size={14} weight='reg'>&quot;{key}&quot;{': {'}</Text>
                        </div>
                        {
                            Object.keys(props.withdrawal.paymentMethod).filter(p => props.withdrawal.paymentMethod[p]).map((dataKey, index) => {
                                return (
                                    <div key={dataKey + index} className='pl4 flex col col-12'>
                                        <Text size={14} weight='reg'>&quot;{dataKey}&quot;{': ' + props.withdrawal.paymentMethod[dataKey] + ','}</Text>
                                    </div>
                                )
                            })
                        }
                        <div className='flex  col col-12'>
                            <Text size={14} weight='reg'>{'},'}</Text>
                        </div>
                        </div>
                        :
                        <div key={key + i} className='flex  col col-12'>
                            <Text size={14} weight='reg'>&quot;{key}&quot;{': ' + (key.indexOf('Date') > -1 ? props.withdrawal[key] : tsToLocaleDate(parseInt(props.withdrawal[key]), DateTime.DATETIME_SHORT)) + ','}</Text>
                        </div>
                )
            })
        }
         
    }

    return (
        <div className='flex flex-column'>
            <DropdownSingle className='col col-3 my1' dropdownDefaultSelect={props.withdrawal ? props.withdrawal.status.charAt(0).toUpperCase() + props.withdrawal.status.slice(1) : ''} callback={(value: string) => setSelectedStatus(value)} id='withdrawalStatusDropdown' dropdownTitle='Status' list={{'Pending': false, 'Completed': false, 'Cancelled': false}} />
            <div className='p1 border center col col-6'>
                {renderWithdrawalInfo()}
            </div>
            <div className='my1 flex'>
                <Button onClick={() => setOpenConfirmationModal(true)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {history.push('/withdrawals')}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
            <ConfirmationModal modalButtonLoading={buttonLoading} submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
        </div>  
    )
}