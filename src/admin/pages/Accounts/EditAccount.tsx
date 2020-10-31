import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox'
import { Flag } from '../../redux-flow/store/Accounts/List/types'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { EditAccountComponentProps } from '../../containers/Accounts/EditAccount'
import { PutAccountInfo, AccountInfo } from '../../redux-flow/store/Accounts/EditAccount/types'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { useHistory } from 'react-router'
import { AccountServices } from '../../redux-flow/store/Accounts/EditAccount/service'
import { Toggle } from '../../../components/Toggle/toggle'

const flags: Flag[] = ['admin', 'adult', 'banned', 'cancelled', 'chipped', 'partner', 'paused', 'platinium', 'suspended', 'test']

export const EditAccountPage = (props: EditAccountComponentProps) => {

    let history = useHistory()
    const [accountInfo, setAccountInfo] = React.useState<PutAccountInfo>({})
    const [accountDetails, setAccountDetails] = React.useState<AccountInfo>(props.accountInfo)
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [preferredPlatform, setPreferredPlatform] = React.useState<string>(props.accountInfo.preferredPlatform)
    const [createPlatformLoading, setCreatePlatformLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        props.saveAccountInfo(accountInfo, props.accountInfo.accountId)
        .then(() => {
            setButtonLoading(false)
            setOpenConfirmationModal(false)
        }).catch(() => {
            setButtonLoading(false)
        })
    }

    React.useEffect(() => {
        setAccountDetails(props.accountInfo)
    }, [props])

    React.useEffect(() => console.log('account info ', accountInfo))

    const handleCreateLegacy = () => {
        setCreatePlatformLoading(true)
        AccountServices.createLegacyAccount(props.accountInfo.accountId)
        .then(() => {
            setCreatePlatformLoading(false)
        }).catch(() => setCreatePlatformLoading(false))
    }

    return (
        <div className='flex flex-column'> 

            <Text size={20} weight='med'>Editing Account</Text>
            <div className='flex'>
                <Input className='col col-3 pr1 py1' id='userFirstNameInput' defaultValue={accountDetails.firstName} placeholder='User First Name' label=' User First Name' onChange={(event) => setAccountInfo({...accountInfo, firstName: event.currentTarget.value})} />
                <Input className='col col-3 pl1 py1' id='userLastNameInput' defaultValue={accountDetails.lastName} placeholder='User Last Name' label='User Last Name' onChange={(event) => setAccountInfo({...accountInfo, lastName: event.currentTarget.value})} />

            </div>

            <div className='flex'>
                <Input className='col col-3 pr1 py1' id='companyNameInput' defaultValue={accountDetails.companyName} placeholder='Company Name' label='Company' onChange={(event) => setAccountInfo({...accountInfo, companyName: event.currentTarget.value})} />
                <Input className='col col-3 pl1 py1' id='websiteInput' defaultValue={accountDetails.website} placeholder='Website' label='Website' onChange={(event) => setAccountInfo({...accountInfo, website: event.currentTarget.value})} />
            </div>
            <div className='flex'>
                <Input className='col col-3 pr1 py1' id='phoneInput' defaultValue={accountDetails.phone} placeholder='Phone' label='Phone' onChange={(event) => setAccountInfo({...accountInfo, phone: event.currentTarget.value})} />
                <Input className='col col-3 pl1 py1' id='emailInput' defaultValue={accountDetails.email} placeholder='Email' label='Email' onChange={(event) => setAccountInfo({...accountInfo, email: event.currentTarget.value})} />
            </div>

            <div className='flex'>
             <Input className='col col-3 pr1 py1' id='passwordInput' defaultValue={''} placeholder='Password' label='Change Password' onChange={(event) => setAccountInfo({...accountInfo, newPassword: event.currentTarget.value})} />
             <DropdownSingle 
                    className='col col-3 pl1 my1' 
                    id='emailVerifiedDropdown' 
                    list={{'Yes': false, 'No': false}} 
                    dropdownTitle='Email Verified' 
                    disabled={accountDetails.emailVerified}
                    dropdownDefaultSelect={props.accountInfo.emailVerified ? 'Yes' : 'No'} 
                    callback={(value: string) => setAccountInfo({...accountInfo, forceVerifyEmail: value == 'Yes' ? true : false})}
                />

            </div>

            <div className='flex items-center'>
                <DropdownSingle 
                    className='col col-3 pr1 my1' 
                    id='playbackProtectionDropdown' 
                    list={{'Off': false, '50 GB': false, '100 GB': false, '250 GB': false, '500 GB': false, '1 TB': false, '2 TB': false, '5 TB': false}} 
                    dropdownTitle='Playback Protection' 
                    dropdownDefaultSelect={accountDetails.playbackProtection.enabled ? accountDetails.playbackProtection.amountGb + ' GB' : 'No'} 
                    callback={(value: string) => setAccountInfo({...accountInfo, playbackProtection: value === 'No' ?{enabled: false, amountGb: NaN} : {enabled: true, amountGb: parseInt(value)}})}
                />
                <Toggle
                    id='isPayingToggle'
                    className='col col-3 pl1 mt3'
                    defaultChecked={accountDetails.isPaying}
                    onChange={() => setAccountInfo({ ...accountInfo, isPaying: accountInfo.isPaying ? !accountInfo.isPaying : !accountDetails.isPaying})} 
                    label='Is Paying'
                /> 


            </div>

            <div className='flex items-end'>
            <DropdownSingle 
                    className='col col-3 pr1 my1' 
                    id='preferredDropdown' 
                    list={{'Unified App': false, 'Legacy': false}} 
                    dropdownTitle='Preferred platform' 
                    dropdownDefaultSelect={!accountDetails.preferredPlatform || accountDetails.preferredPlatform !== 'legacy' ? 'Unified App' : 'Legacy'} 
                    callback={(value: string) => {setPreferredPlatform(value); setAccountInfo({...accountInfo, preferredPlatform: value == 'Legacy' ? 'legacy' : 'unified-app'})}}
                />
                <div className='col col-3 pl1 mb2'>
                    <Button  isLoading={createPlatformLoading} onClick={() => handleCreateLegacy()} buttonColor='blue' typeButton='primary' sizeButton='small'>Create account on legacy</Button>
                </div>

            </div>
            <div className='flex flex-column'>
                <Text className='pt2' size={20} weight='med'>Flags</Text>
                <InputCheckbox 
                    id='bannedFlag' 
                    className='mb2 mt1'
                    defaultChecked={accountDetails.isBanned} 
                    onChange={() => {setAccountDetails({...accountDetails, isBanned: !accountDetails.isBanned});setAccountInfo({...accountInfo, isBanned: Object.keys(accountInfo).indexOf('isBanned') > -1 ? !accountInfo.isBanned : !accountDetails.isBanned})}}
                    label='Banned'
                    disabled={props.accountInfo.isBanned}
                />
            </div>

            {/* <Text className='py1' size={16} weight='med'>Account Flags</Text>
            <div className='flex flex-column mb1'>
                {renderFlags(flags)}
            </div> */}

            <div className='my1 flex'>
                <Button onClick={() => setOpenConfirmationModal(true)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {history.push('/accounts')}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
            <ConfirmationModal modalButtonLoading={buttonLoading} submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />

        </div>
    )
}