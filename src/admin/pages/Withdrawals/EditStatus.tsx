import React from 'react'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { EditStatusComponentProps } from '../../containers/Withdrawals/EditStatus'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { useHistory } from 'react-router-dom'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { Text } from '../../../components/Typography/Text'

export const EditStatusPage = (props: EditStatusComponentProps & {withdrawalId: string}) => {

    let history = useHistory()


    const [selectedStatus, setSelectedStatus] = React.useState<string>(null)
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    
    const handleSubmit = () => {
        props.saveWithdrawalStatus(props.withdrawalId, selectedStatus)
        setOpenConfirmationModal(false)
    }

    const renderWithdrawalInfo = () => {
        if(props.withdrawal) {
            return Object.keys(props.withdrawal).map((key, i) => {
                return (
                    key === 'data' ? 
                        Object.keys(props.withdrawal.data).map((dataKey, index) => {
                            return (
                                <div key={dataKey + index} className='flex col col-12'>
                                    <Text size={14} weight='reg'>&quot;{dataKey}&quot;{': ' + props.withdrawal.data[dataKey] + ','}</Text>
                                </div>
                            )
                        })
                        :
                        <div key={key + i} className='flex  col col-12'>
                            <Text size={14} weight='reg'>&quot;{key}&quot;{': ' + props.withdrawal[key] + ','}</Text>
                        </div>
                )
            })
        }
         
    }

    return (
        <div className='flex flex-column'>
            <DropdownSingle className='col col-3 my1' dropdownDefaultSelect={props.withdrawal ? props.withdrawal.status : ''} callback={(value: string) => setSelectedStatus(value)} id='withdrawalStatusDropdown' dropdownTitle='Status' list={{'Pending': false, 'Completed': false, 'Cancelled': false}} />
            <div className='p1 border center col col-6'>
                {renderWithdrawalInfo()}
            </div>
            <div className='my1 flex'>
                <Button onClick={() => setOpenConfirmationModal(true)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {history.push('/withdrawals')}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
            <ConfirmationModal submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
        </div>  
    )
}