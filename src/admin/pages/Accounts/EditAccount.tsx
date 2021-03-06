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
import { Toggle } from '../../../components/Toggle/toggle'
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { dacastSdk } from '../../utils/services/axios/adminAxiosClient'
import { getUrlParam } from '../../../utils/utils'
import { countries } from 'countries-list'

export const EditAccountPage = (props: EditAccountComponentProps & {accountId: string}) => {

    let history = useHistory()
    const [accountInfo, setAccountInfo] = React.useState<PutAccountInfo>({})
    const [accountDetails, setAccountDetails] = React.useState<AccountInfo>(props.accountInfo)
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [createPlatformLoading, setCreatePlatformLoading] = React.useState<boolean>(false)
    const [forceInplayerLoading, setForceInplayerLoading] = React.useState<boolean>(false)
    const [selectedCountry, setSelectedCountry] = React.useState<string>(null)

    const salesforceId = getUrlParam('salesforceId') || null
    const verifyEmailDropdownList = [{title: "Yes"}, {title: "No"}]
    const preferredPlatformDropdownList = [{title: "Unified App"}, {title: "Legacy"}]
    const playbackProtectionDropdownList = [{title: "Off"}, {title: "50 GB", data: 50}, {title: "100 GB", data: 100}, {title: "250 GB", data: 250}, {title: "500 GB", data: 500}, {title: "1 TB", data: 1000}, {title: "2 TB", data: 2000}, {title: "5 TB", data: 5000}]
    const countryDropdownList = Object.keys(countries).map((item) => {
        let countryItem: DropdownSingleListItem = {title: null}
        countryItem.title = countries[item].name
        return countryItem
    })

    const handleSubmit = () => {
        setButtonLoading(true)
        props.saveAccountInfo(selectedCountry ?  {...accountInfo, country: selectedCountry} : accountInfo, props.accountId)
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

    const handleCreateLegacy = () => {
        setCreatePlatformLoading(true)
        dacastSdk.postCreateLegacyAccount(props.accountId)
        .then(() => {
            setCreatePlatformLoading(false)
        }).catch(() => setCreatePlatformLoading(false))
    }

    const handleForceInplayer = () => {
        setForceInplayerLoading(true)
        dacastSdk.postForceInplayerSetup(salesforceId)
        .then(() => {
            setForceInplayerLoading(false)
        }).catch(() => setForceInplayerLoading(false))
    }

    return (
        <div className='flex flex-column'>

            <Text size={16} weight='med'>Editing BID: {salesforceId}</Text>
            <div className='flex'>
                <Input backgroundColor="white" className='col col-3 pr1 py1' id='userFirstNameInput' defaultValue={accountDetails.firstName} placeholder='User First Name' label=' User First Name' onChange={(event) => setAccountInfo({...accountInfo, firstName: event.currentTarget.value})} />
                <Input backgroundColor="white" className='col col-3 pl1 py1' id='userLastNameInput' defaultValue={accountDetails.lastName} placeholder='User Last Name' label='User Last Name' onChange={(event) => setAccountInfo({...accountInfo, lastName: event.currentTarget.value})} />

            </div>

            <div className='flex'>
                <Input backgroundColor="white" className='col col-3 pr1 py1' id='companyNameInput' defaultValue={accountDetails.companyName} placeholder='Company Name' label='Company' onChange={(event) => setAccountInfo({...accountInfo, companyName: event.currentTarget.value})} />
                <Input backgroundColor="white" className='col col-3 pl1 py1' id='websiteInput' defaultValue={accountDetails.website} placeholder='Website' label='Website' onChange={(event) => setAccountInfo({...accountInfo, website: event.currentTarget.value})} />
            </div>
            <div className='flex'>
                <Input backgroundColor="white" className='col col-3 pr1 py1' id='phoneInput' defaultValue={accountDetails.phone} placeholder='Phone' label='Phone' onChange={(event) => setAccountInfo({...accountInfo, phone: event.currentTarget.value})} />
                <Input backgroundColor="white" className='col col-3 pl1 py1' id='emailInput' defaultValue={accountDetails.email} placeholder='Email' label='Email' onChange={(event) => setAccountInfo({...accountInfo, email: event.currentTarget.value})} />
            </div>

            <div className='flex'>
             <Input backgroundColor="white" className='col col-3 pr1 py1' id='passwordInput' defaultValue={''} placeholder='Password' label='Change Password' onChange={(event) => setAccountInfo({...accountInfo, newPassword: event.currentTarget.value})} />
             <DropdownSingle
                    className='col col-3 pl1 my1'
                    id='emailVerifiedDropdown'
                    isWhiteBackground
                    list={verifyEmailDropdownList}
                    dropdownTitle='Email Verified'
                    disabled={accountDetails.emailVerified}
                    dropdownDefaultSelect={props.accountInfo.emailVerified ? 'Yes' : 'No'}
                    callback={(item: DropdownSingleListItem) => setAccountInfo({...accountInfo, forceVerifyEmail: item.title == 'Yes' ? true : false})}
                />

            </div>

            <div className="flex">
                <DropdownSingle
                    hasSearch
                    callback={(item: DropdownSingleListItem) => {setSelectedCountry(item.title)}}
                    dropdownDefaultSelect={!props.accountInfo.country ? "" : props.accountInfo.country} className="col col-3 pr1 my1"
                    id='countryDropdown' dropdownTitle='Country'
                    list={countryDropdownList}
                />
            </div>

            <div className='flex items-center'>
                <DropdownSingle
                    className='col col-3 pr1 my1'
                    id='playbackProtectionDropdown'
                    isWhiteBackground
                    list={playbackProtectionDropdownList}
                    dropdownTitle='Playback Protection'
                    dropdownDefaultSelect={accountDetails.playbackProtection.enabled ? accountDetails.playbackProtection.amountGb + ' GB' : 'Off'}
                    callback={(item: DropdownSingleListItem) => setAccountInfo({...accountInfo, playbackProtection: item.title === 'Off' ?{enabled: false, amountGb: NaN} : {enabled: true, amountGb: item.data}})}
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
                    isWhiteBackground
                    list={preferredPlatformDropdownList}
                    dropdownTitle='Preferred platform'
                    dropdownDefaultSelect={!accountDetails.preferredPlatform || accountDetails.preferredPlatform !== 'legacy' ? 'Unified App' : 'Legacy'}
                    callback={(item: DropdownSingleListItem) => {setAccountInfo({...accountInfo, preferredPlatform: item.title == 'Legacy' ? 'legacy' : 'unified-app'})}}
                />
                <div className='col col-1 pl1 mb2'>
                    <Button  isLoading={createPlatformLoading} onClick={() => handleCreateLegacy()} buttonColor='blue' typeButton='primary' sizeButton='small'>Create account on legacy</Button>
                </div>
                <div className='col col-1 pl1 mb2'>
                    <Button isLoading={forceInplayerLoading} onClick={() => handleForceInplayer()} buttonColor='blue' typeButton='primary' sizeButton='small'>Force inPlayer setup</Button>
                </div>

            </div>
            <div className='flex flex-column'>
                <Text className='pt2' size={20} weight='med'>Flags</Text>
                <div className='flex mb2 mt1'>
                <InputCheckbox
                    id='bannedFlag'
                    className='mx1'
                    defaultChecked={accountDetails.isBanned}
                    onChange={() => {setAccountDetails({...accountDetails, isBanned: !accountDetails.isBanned});setAccountInfo({...accountInfo, isBanned: Object.keys(accountInfo).indexOf('isBanned') > -1 ? !accountInfo.isBanned : !accountDetails.isBanned})}}
                    label='Banned'
                    disabled={props.accountInfo.isBanned}
                />
                <InputCheckbox
                    id='adultFlag'
                    className='mx1'
                    defaultChecked={accountDetails.isAdult}
                    onChange={() => {setAccountDetails({...accountDetails, isAdult: !accountDetails.isAdult});setAccountInfo({...accountInfo, isAdult: Object.keys(accountInfo).indexOf('isAdult') > -1 ? !accountInfo.isAdult : !accountDetails.isAdult})}}
                    label='Adult'
                />
                <InputCheckbox
                    id='testFlag'
                    className='mx1'
                    defaultChecked={accountDetails.isTest}
                    onChange={() => {setAccountDetails({...accountDetails, isTest: !accountDetails.isTest});setAccountInfo({...accountInfo, isTest: Object.keys(accountInfo).indexOf('isTest') > -1 ? !accountInfo.isTest : !accountDetails.isTest})}}
                    label='Test'
                />
                </div>

            </div>

            {
                props.accountInfo.migration && 
                <div className='flex flex-column my2'>
                    <Text size={20} weight='med'>Legacy Platform Info</Text>
                    <div className='flex my2'>
                        <Text size={16} weight='med'>Legacy User Id:&nbsp;</Text>
                        <Text size={14} weight='reg'>{props.accountInfo.migration.legacyUserId}</Text>
                        <Text className='pl2' size={16} weight='med'>Origin Platform:&nbsp;</Text>
                        <Text size={14} weight='reg'>{props.accountInfo.migration.originPlatform}</Text>
                        <Text className='pl2' size={16} weight='med'>status:&nbsp;</Text>
                        <Text size={14} weight='reg'>{props.accountInfo.migration.status}</Text>
                    </div>
                </div>
            }
            <div className='my1 flex'>
                <Button onClick={() => setOpenConfirmationModal(true)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {history.push('/accounts')}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
            <ConfirmationModal modalButtonLoading={buttonLoading} submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />

        </div>
    )
}