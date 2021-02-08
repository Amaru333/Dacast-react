import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Tab } from '../../../components/Tab/Tab'
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio'
import { PlanInfoPut } from '../../redux-flow/store/Accounts/EditPlan/types'
import { EditPlanComponentProps } from '../../containers/Accounts/EditPlan'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { useHistory } from 'react-router'
import { makeRoute } from '../../utils/utils'
import { Card } from '../../../components/Card/Card'
import { Divider } from '../../../shared/MiscStyles'
import { getUrlParam } from '../../../utils/utils'

const Plans = [
    'Starter',
    'Event',
    'Scale',
    'Custom'
]

export const EditPlanPage = (props: EditPlanComponentProps & {accountId: string}) => {
    
    let history = useHistory()
    const [showSwitchPlan, setShowSwitchPlan] = React.useState<boolean>(false)
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [planData, setPlanData] = React.useState<PlanInfoPut>({privileges: []})
    const [selectedPlan, setSelectedPlan] = React.useState<string>(props.accountPlan.name)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const salesforceId = getUrlParam('salesforceId') || null

    const handleSubmit = () => {
        setButtonLoading(true)
        props.saveAccountPlan(planData, props.accountId)
        .then(() => {
            setButtonLoading(false)
            setOpenConfirmationModal(false)
        })
        .catch(() => {
            setButtonLoading(false)
        })
    }

    const handleKeyChange = (key:string, value: boolean | number) => {
        let tempPlanData = planData
        if(tempPlanData.privileges.findIndex(obj => obj.key === key) > -1) {
            tempPlanData.privileges[tempPlanData.privileges.findIndex(obj => obj.key === key)] = {key: key, value: value}
        } else {
            tempPlanData.privileges = [...tempPlanData.privileges, {key: key, value: value}]
        }
        setPlanData(tempPlanData)
    }

    const EditPlanContent = () => {
        return (
            <div className='flex flex-column'>
                <div style={{justifyContent: "space-between", alignItems: "center"}} className="col col-12 mb2 flex">
                    <Text size={16} weight='med'>Editing Plan for BID: {salesforceId} </Text>
                </div>
                
                <Card className='my1'>
                    <Text size={20} color='gray-3' weight='med'>Manage Plan </Text>
                    <Text className='pt25' size={16} weight='med'>Current Plan</Text>
                    <div style={{border: ' 1px dashed #C8D1E0'}} className='mb2 col col-3 flex items-center p1'>
                        <Text className='flex-auto' size={14}>{props.accountPlan.name}</Text>
                        <Button className='' onClick={() => setShowSwitchPlan(true)} sizeButton='xs' typeButton='primary' buttonColor='blue'>Switch</Button>
                    </div>
                </Card>
                <Card className='my1'>
                    <Text className='pb2' size={20} weight='med' color='gray-3'>Manage Limits</Text>

                    <Input className='my1 col col-2' id='uploadSizeInput' placeholder='100' label='Upload Size (GB)' defaultValue={props.accountPlan.uploadSize ? props.accountPlan.uploadSize.toString() : '0'} onChange={(event) => handleKeyChange('uploadSize', parseInt(event.currentTarget.value))} />
                    {/* <Input className='my1 col col-2' id='itemLimitInput' placeholder='100' label='Item Limit' defaultValue={props.accountPlan.itemLimit ? props.accountPlan.itemLimit.toString() : '0'} onChange={(event) => handleKeyChange('itemLimit', parseInt(event.currentTarget.value))}  /> */}
                    {/* <Input className='my1 col col-2' id='folderDepthInput' placeholder='5' label='Folder Depth' defaultValue={props.accountPlan.folderDepth ? props.accountPlan.folderDepth.toString(): '0'} onChange={(event) => handleKeyChange('folderDepth', parseInt(event.currentTarget.value))}  /> */}
                    <Input className='my1 col col-2' id='recipeRenditionInput' placeholder='6' label='Renditions per Recipes' defaultValue={props.accountPlan.renditionsPerRecipe ? props.accountPlan.renditionsPerRecipe.toString() : '0'} onChange={(event) => handleKeyChange('renditionsPerRecipe', parseInt(event.currentTarget.value))}  />
                    
                    <Divider className='pt2' />

                    <Text className='py2' size={20} weight='med' color='gray-3'>Manage Modules</Text>

                    <Text className='py1' size={14} weight='med'>Live Streams</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.liveStream.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.liveStream.planValue || props.accountPlan.liveStream.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('liveStream', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Videos</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.vod.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.vod.planValue || props.accountPlan.vod.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('vod', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Folders</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.folders.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.folders.planValue || props.accountPlan.folders.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('folders', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Playlists</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.playlists.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.playlists.planValue || props.accountPlan.playlists.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('playlists', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Analytics</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.analytics.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.analytics.planValue || props.accountPlan.analytics.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('analytics', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Paywall</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.paywall.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.paywall.planValue || props.accountPlan.paywall.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('paywall', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Expos</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.expo && props.accountPlan.expo.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.expo && (props.accountPlan.expo.planValue || props.accountPlan.expo.userValue) ? 0 : 1} callback={(value: string) => handleKeyChange('expo', value === 'On' ? true : false)} />
                    </div>

                    <Divider className='pt2' />
                    <Text className='py2' size={20} weight='med' color='gray-3'>Manage Features</Text>

                    <Text className='py1' size={14} weight='med'>DVR</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.dvr.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.dvr.planValue || props.accountPlan.dvr.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('dvr', value === 'On' ? true : false)} />
                    </div> 
                    <Text className='py1' size={14} weight='med'>Advertising</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.advertising.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.advertising.planValue || props.accountPlan.advertising.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('advertising', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Live Recording</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.recording.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.recording.planValue || props.accountPlan.recording.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('recording', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Download: Web</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.webDownload.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.webDownload.planValue || props.accountPlan.webDownload.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('webDownload', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Download: Player</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.playerDownload.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.playerDownload.planValue || props.accountPlan.playerDownload.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('playerDownload', value === 'On' ? true : false)} />
                    </div>

                    <Divider className='pt2' /> 

                    <Text className='py2' size={20} weight='med' color='gray-3'>Special</Text>
                    <Text className='py1' size={14} weight='med'>Admin</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.admin.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.admin.planValue || props.accountPlan.admin.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('admin', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>China Streams</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.chinaStreams.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.chinaStreams.planValue || props.accountPlan.chinaStreams.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('chinaStreams', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Compatible Streams (M3U8)</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.compatibleStreams.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.compatibleStreams.planValue || props.accountPlan.compatibleStreams.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('compatibleStreams', value === 'On' ? true : false)} />
                    </div>
                    <Text className='py1' size={14} weight='med'>Ultra Secure Streams</Text>
                    <div className='flex items-center my1'>
                        <Text className='pr2' size={14} weight='reg'>{props.accountPlan.ultraSecureChannel.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                        <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.ultraSecureChannel.planValue || props.accountPlan.ultraSecureChannel.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('ultraSecureChannel', value === 'On' ? true : false)} />
                    </div>
                </Card>
                <div className='flex mt2'>
                    <Button onClick={() => setOpenConfirmationModal(true)} className='mr2' sizeButton='large' typeButton='primary' buttonColor='blue'>Save</Button>
                    <Button onClick={() => {history.push('/accounts')}}  sizeButton='large' typeButton='tertiary' buttonColor='blue'>Cancel</Button>
                </div>
             {/* Not implemented yet */}
                {/* <Text className='py1' size={14} weight='med'>AES</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.aes.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.aes.planValue || props.accountPlan.aes.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('aes', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>Signed Keys</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.signedKeys.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.signedKeys.planValue || props.accountPlan.signedKeys.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('signedKeys', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>API</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.api.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.api.planValue || props.accountPlan.api.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('api', value === 'On' ? true : false)} />
                </div>



                <Text className='py1' size={14} weight='med'>Email Catcher</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.emailCatcher.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.emailCatcher.planValue || props.accountPlan.emailCatcher.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('emailCatcher', value === 'On' ? true : false)} />
                </div> */}
            </div>
        )
    }
    
    const handleSwitchPlan = () => {
        props.switchAccountPlan(selectedPlan)
        setShowSwitchPlan(false)
    }

    const SwitchPlanContent = () => {
        const renderPlans = () => {
            return Plans.map(plan => {
                return <InputRadio key={plan} className='col col-12 my1' defaultChecked={plan === selectedPlan} onChange={() => setSelectedPlan(plan)} label={plan} name='plan' value={plan} />
            })
        }
        return (
            <div className='flex flex-column'>
                <Text size={14} weight='med'>Switching Plan for Account </Text>
                {renderPlans()}
                <div className='my1 flex'>
                    <Button onClick={() => setOpenConfirmationModal(true)} className='mr2' sizeButton='large' typeButton='primary' buttonColor='blue'>Save</Button>
                    <Button onClick={() => setShowSwitchPlan(false)} sizeButton='large' typeButton='tertiary' buttonColor='blue'>Cancel</Button>
                </div>
            </div>
        )
    }

    return(
        <div>
            {showSwitchPlan ? 
                SwitchPlanContent()
                : EditPlanContent()
            }
            <ConfirmationModal modalButtonLoading={buttonLoading} submit={showSwitchPlan ? handleSwitchPlan : handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
        </div>
    ) 
}