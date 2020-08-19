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

    const EditPlanContent = () => {
        return (
            <div className='flex flex-column'>
                <Text size={14}>Editing Plan for Account </Text>
                <div className='my2 col col-2 flex flex-column center border'>
                    <Text size={14}>Current Plan</Text>
                    <Text size={14} weight="med">{props.accountPlan.name}</Text>
                    <Button className='mb1 mx2' onClick={() => setShowSwitchPlan(true)} sizeButton='large' typeButton='primary' buttonColor='blue'>Switch</Button>
                </div>
                <Input className='my1 col col-2' id='uploadSizeInput' placeholder='100' label='Upload Size (GB)' defaultValue={props.accountPlan.uploadSize ? props.accountPlan.uploadSize.toString() : '0'} onChange={(event) => setPlanData({privileges: [...planData.privileges, {key: 'uploadSize', value: parseInt(event.currentTarget.value)}]})} />
                <Input className='my1 col col-2' id='itemLimitInput' placeholder='100' label='Item Limit' defaultValue={props.accountPlan.itemLimit ? props.accountPlan.itemLimit.toString() : '0'} onChange={(event) => setPlanData({privileges: [...planData.privileges, {key: 'itemLimit', value: parseInt(event.currentTarget.value)}]})}  />
                <Input className='my1 col col-2' id='folderDepthInput' placeholder='5' label='Folder Depth' defaultValue={props.accountPlan.folderDepth ? props.accountPlan.folderDepth.toString(): '0'} onChange={(event) => setPlanData({privileges: [...planData.privileges, {key: 'folderDepth', value: parseInt(event.currentTarget.value)}]})}  />
                <Input className='my1 col col-2' id='recipeRenditionInput' placeholder='6' label='Renditions per Recipes' defaultValue={props.accountPlan.renditionsPerRecipe ? props.accountPlan.renditionsPerRecipe.toString() : '0'} onChange={(event) => setPlanData({privileges: [...planData.privileges, {key: 'renditionsPerRecipe', value: parseInt(event.currentTarget.value)}]})}  />
                
                <Text className='py1' size={14} weight='med'>Live Streams</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.liveStream.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'liveStream', value: value === 'On' ? true : false}]})} />
                <Text className='py1' size={14} weight='med'>Compatible Streams</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.compatibleStreams.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'compatibleStreams', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>China Streams</Text>
                <Tab className='my1 col col-2'  orientation='horizontal' list={[makeRoute(props.accountPlan.chinaStreams.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'chinaStreams', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>DVR</Text>
                <Tab className='my1 col col-2'  orientation='horizontal' list={[makeRoute(props.accountPlan.dvr.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'dvr', value: value === 'On' ? true : false}]})} />
                <Text className='py1' size={14} weight='med'>Recording</Text>
                <Tab className='my1 col col-2'  orientation='horizontal' list={[makeRoute(props.accountPlan.recording.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'recording', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>VOD</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.vod.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'vod', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>Folders</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.folders.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'folders', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>Playlists</Text>
                <Tab className='my1 col col-2'  orientation='horizontal' list={[makeRoute(props.accountPlan.playlists.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'playlists', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>AES</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.aes.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'aes', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>Signed Keys</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.signedKeys.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'signedKeys', value: value === 'On' ? true : false}]})} />
                <Text className='py1' size={14} weight='med'>API</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.api.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'api', value: value === 'On' ? true : false}]})} />
                <Text className='py1' size={14} weight='med'>Web Download</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.webDownload.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'webDownload', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>Player Download</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.playerDownload.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'playerDownload', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>Paywall</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.paywall.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'paywall', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>Advertising</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.advertising.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'advertising', value: value === 'On' ? true : false}]})}  />
                <Text className='py1' size={14} weight='med'>Email Catcher</Text>
                <Tab className='my1 col col-2' orientation='horizontal' list={[makeRoute(props.accountPlan.emailCatcher.planValue ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => setPlanData({privileges: [...planData.privileges, {key: 'emailCatcher', value: value === 'On' ? true : false}]})}  />
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