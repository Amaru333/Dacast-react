import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Tab } from '../../../components/Tab/Tab'
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio'
import { PlanInfo, PlanInfoPut } from '../../redux-flow/store/Accounts/EditPlan/types'
import { EditPlanComponentProps } from '../../containers/Accounts/EditPlan'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { useHistory } from 'react-router'
import { makeRoute } from '../../utils/utils'
import { handleFeatures } from '../../../app/shared/Common/Features'

const Plans = [
    'Developer',
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
    const [changes, setChanges] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        props.saveAccountPlan(props.accountId, planData)
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
                <Text size={14}>Editing Plan for Account </Text>
                <div className='my2 col col-2 flex flex-column center border'>
                    <Text size={14}>Current Plan</Text>
                    <Text size={14} weight="med">{props.accountPlan.name}</Text>
                    <Button className='mb1 mx2' onClick={() => setShowSwitchPlan(true)} sizeButton='large' typeButton='primary' buttonColor='blue'>Switch</Button>
                </div>
                <Input className='my1 col col-2' id='uploadSizeInput' placeholder='100' label='Upload Size (GB)' defaultValue={props.accountPlan.uploadSize ? props.accountPlan.uploadSize.toString() : '0'} onChange={(event) => handleKeyChange('uploadSize', parseInt(event.currentTarget.value))} />
                <Input className='my1 col col-2' id='itemLimitInput' placeholder='100' label='Item Limit' defaultValue={props.accountPlan.itemLimit ? props.accountPlan.itemLimit.toString() : '0'} onChange={(event) => handleKeyChange('itemLimit', parseInt(event.currentTarget.value))}  />
                <Input className='my1 col col-2' id='folderDepthInput' placeholder='5' label='Folder Depth' defaultValue={props.accountPlan.folderDepth ? props.accountPlan.folderDepth.toString(): '0'} onChange={(event) => handleKeyChange('folderDepth', parseInt(event.currentTarget.value))}  />
                <Input className='my1 col col-2' id='recipeRenditionInput' placeholder='6' label='Renditions per Recipes' defaultValue={props.accountPlan.renditionsPerRecipe ? props.accountPlan.renditionsPerRecipe.toString() : '0'} onChange={(event) => handleKeyChange('renditionsPerRecipe', parseInt(event.currentTarget.value))}  />
                
                <Text className='py1' size={14} weight='med'>Live Streams</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.liveStream.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.liveStream.planValue || props.accountPlan.liveStream.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('liveStream', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>Compatible Streams (M3U8)</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.compatibleStreams.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.compatibleStreams.planValue || props.accountPlan.compatibleStreams.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('compatibleStreams', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>China Streams</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.chinaStreams.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.chinaStreams.planValue || props.accountPlan.chinaStreams.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('chinaStreams', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>DVR</Text>

                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.dvr.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.dvr.planValue || props.accountPlan.dvr.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('dvr', value === 'On' ? true : false)} />
                </div>                
                <Text className='py1' size={14} weight='med'>Recording</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.recording.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.recording.planValue || props.accountPlan.recording.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('recording', value === 'On' ? true : false)} />
                </div>

                <Text className='py1' size={14} weight='med'>VOD</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.vod.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.vod.planValue || props.accountPlan.vod.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('vod', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>Folders</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.folders.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.folders.planValue || props.accountPlan.folders.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('folders', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>Playlists</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.playlists.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.playlists.planValue || props.accountPlan.playlists.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('playlists', value === 'On' ? true : false)} />
                </div>
                {/* <Text className='py1' size={14} weight='med'>Analytics</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.analytics.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.analytics.planValue || props.accountPlan.analytics.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('analytics', value === 'On' ? true : false)} />
                </div> */}
                <Text className='py1' size={14} weight='med'>AES</Text>
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
                <Text className='py1' size={14} weight='med'>Web Download</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.webDownload.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.webDownload.planValue || props.accountPlan.webDownload.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('webDownload', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>Player Download</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.playerDownload.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.playerDownload.planValue || props.accountPlan.playerDownload.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('playerDownload', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>Paywall</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.paywall.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.paywall.planValue || props.accountPlan.paywall.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('paywall', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>Advertising</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.advertising.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.advertising.planValue || props.accountPlan.advertising.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('advertising', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>Email Catcher</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.emailCatcher.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.emailCatcher.planValue || props.accountPlan.emailCatcher.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('emailCatcher', value === 'On' ? true : false)} />
                </div>
                <Text className='py1' size={14} weight='med'>Admin</Text>
                <div className='flex items-center my1'>
                    <Text className='pr2' size={14} weight='med'>{props.accountPlan.admin.planValue ? 'Plan: On' : 'Plan: Off'}</Text>
                    <Tab className='my1 col col-12' orientation='horizontal' list={[makeRoute('On'), makeRoute('Off')]} tabDefaultValue={props.accountPlan.admin.planValue || props.accountPlan.admin.userValue ? 0 : 1} callback={(value: string) => handleKeyChange('admin', value === 'On' ? true : false)} />
                </div>
                <div className='my1 flex'>
                    <Button onClick={() => setOpenConfirmationModal(true)} className='mr2' sizeButton='large' typeButton='primary' buttonColor='blue'>Save</Button>
                    <Button onClick={() => {history.push('/accounts')}}  sizeButton='large' typeButton='tertiary' buttonColor='blue'>Cancel</Button>
                </div>
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