import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox'
import { Flag } from '../../redux-flow/store/Accounts/List/types'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { EditAccountComponentProps } from '../../containers/Accounts/EditAccount'
import { AccountInfo } from '../../redux-flow/store/Accounts/EditAccount/types'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { useHistory } from 'react-router'

const flags: Flag[] = ['admin', 'adult', 'banned', 'cancelled', 'chipped', 'partner', 'paused', 'platinium', 'suspended', 'test']

export const EditAccountPage = (props: EditAccountComponentProps) => {

    let history = useHistory()
    const [accountInfo, setAccountInfo] = React.useState<AccountInfo>(props.accountInfo)
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    
    const handleSubmit = () => {
        props.saveAccountInfo(accountInfo)
        setOpenConfirmationModal(false)
    }

    React.useEffect(() => {
        setAccountInfo(props.accountInfo)
    }, [props])

    const handleCheckboxChange = (flag: Flag) => {
        if(accountInfo.accountFlags.indexOf(flag) > -1) {
            setAccountInfo({...accountInfo, accountFlags: accountInfo.accountFlags.filter(accountFlag => accountFlag !== flag)})
        } else {
            setAccountInfo({...accountInfo, accountFlags: [...accountInfo.accountFlags, flag]})
        }
    }

    const renderFlags = (flagList: Flag[]) => {
        return flagList.map(flag => {
            return  <InputCheckbox className='my1' key={flag} id={flag} defaultChecked={accountInfo.accountFlags.indexOf(flag) > -1} onChange={() => handleCheckboxChange(flag)} label={flag.charAt(0).toUpperCase() + flag.substring(1)} />
        })

    }

    return (
        <div className='flex flex-column'> 

            <Text size={20} weight='med'>Editing Account</Text>
            <div className='flex'>
                <Input className='col col-3 pr1 py1' id='companyNameInput' defaultValue={props.accountInfo.companyName} placeholder='Company Name' label='Company' onChange={(event) => setAccountInfo({...accountInfo, companyName: event.currentTarget.value})} />
                <Input className='col col-3 pl1 py1' id='userNameInput' defaultValue={props.accountInfo.userName} placeholder='User Name' label='Name' onChange={(event) => setAccountInfo({...accountInfo, userName: event.currentTarget.value})} />
            </div>

            <div className='flex'>
                <Input className='col col-3 pr1 py1' id='websiteInput' defaultValue={props.accountInfo.website} placeholder='Website' label='Website' onChange={(event) => setAccountInfo({...accountInfo, website: event.currentTarget.value})} />
                <Input className='col col-3 pl1 py1' id='passwordInput' defaultValue={props.accountInfo.newPassword} placeholder='Password' label='Change Password' onChange={(event) => setAccountInfo({...accountInfo, newPassword: event.currentTarget.value})} />
            </div>
            <div className='flex'>
                <Input className='col col-3 pr1 py1' id='phoneInput' defaultValue={props.accountInfo.phone} placeholder='Phone' label='Phone' onChange={(event) => setAccountInfo({...accountInfo, phone: event.currentTarget.value})} />
                <Input className='col col-3 pl1 py1' id='emailInput' defaultValue={props.accountInfo.email} placeholder='Email' label='Email' onChange={(event) => setAccountInfo({...accountInfo, email: event.currentTarget.value})} />
            </div>

            <div className='flex'>
                <DropdownSingle 
                    className='col col-3 pr1 my1' 
                    id='playbackProtectionDropdown' 
                    list={{'Off': false, '50 GB': false, '100 GB': false, '250 GB': false, '500 GB': false, '1 TB': false, '2 TB': false, '5 TB': false}} 
                    dropdownTitle='Playback Protection' 
                    dropdownDefaultSelect={props.accountInfo.playbackProtection} 
                    callback={(value: string) => setAccountInfo({...accountInfo, playbackProtection: value})}
                />
                <DropdownSingle 
                    className='col col-3 pl1 my1' 
                    id='emailVerifiedDropdown' 
                    list={{'Yes': false, 'No': false}} 
                    dropdownTitle='Email Verified' 
                    dropdownDefaultSelect={props.accountInfo.emailVerified ? 'Yes' : 'No'} 
                    callback={(value: string) => setAccountInfo({...accountInfo, emailVerified: value == 'Yes' ? true : false})}
                />
            </div>

            <Text className='py1' size={16} weight='med'>Account Flags</Text>
            <div className='flex flex-column mb1'>
                {renderFlags(flags)}
            </div>

            <div className='my1 flex'>
                <Button onClick={() => setOpenConfirmationModal(true)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {history.push('/accounts')}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
            <ConfirmationModal submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />

        </div>
    )
}