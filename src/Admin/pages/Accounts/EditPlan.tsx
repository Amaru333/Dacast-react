import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Tab } from '../../../components/Tab/Tab'
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio'
import { PlanInfo } from '../../redux-flow/store/Accounts/EditPlan/types'
import { EditPlanComponentProps } from '../../containers/Accounts/EditPlan'
import { ConfirmationModal } from '../../shared/modal/ConfirmationModal'
import { useParams } from 'react-router-dom'

const Plans = [
    'Developer',
    'Event',
    'Scale',
    'Custom'
]

export interface Routes {
    path: string;
    name: string;
    iconName?: string;
    arrowIcon?: string;
    component?: any;
    slug?: Routes[];
    exactPath?: boolean;
}


export const EditPlanPage = (props: EditPlanComponentProps) => {

    const makeRoute = (name: string): Routes => {
        return {
            path: null,
            name: name
        }
    }
    let { accountId } = useParams()
    const [showSwitchPlan, setShowSwitchPlan] = React.useState<boolean>(false)
    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<boolean>(false)
    const [planData, setPlanData] = React.useState<PlanInfo>(props.accountPlan)

    React.useEffect(() => {
        setPlanData(props.accountPlan)
        console.log(planData)
    }, [props.accountPlan])

    const handleSubmit = () => {
        props.saveAccountPlan(accountId, planData)
        setOpenConfirmationModal(false)
    }

    const EditPlanContent = () => {
        return (
            <div className='flex flex-column'>
                <Text size={14}>Editing Plan for Account </Text>
                <div className='my2 col col-2 flex flex-column center border'>
                    <Text size={14}>Current Plan</Text>
                    <Text size={14} weight="med">Annual Scale</Text>
                    <Button className='mb1' onClick={() => setShowSwitchPlan(true)} sizeButton='large' typeButton='primary' buttonColor='blue'>Switch</Button>
                </div>
                <Input className='my1 col col-2' id='uploadSizeInput' placeholder='100' label='Upload Size (GB)' defaultValue={props.accountPlan.uploadSize.toString()} onChange={(event) => setPlanData({...planData, uploadSize: parseInt(event.currentTarget.value)})} />
                <Input className='my1 col col-2' id='itemLimitInput' placeholder='100' label='Item Limit' defaultValue={props.accountPlan.itemLimit.toString()} onChange={(event) => setPlanData({...planData, itemLimit: parseInt(event.currentTarget.value)})}  />
                <Input className='my1 col col-2' id='folderDepthInput' placeholder='5' label='Folder Depth' defaultValue={props.accountPlan.folderDepth.toString()} onChange={(event) => setPlanData({...planData, folderDepth: parseInt(event.currentTarget.value)})}  />
                <Input className='my1 col col-2' id='recipeRenditionInput' placeholder='6' label='Renditions per Recipes' defaultValue={props.accountPlan.renditions.toString()} onChange={(event) => setPlanData({...planData, renditions: parseInt(event.currentTarget.value)})}  />
                
                <Text className='py1' size={14} weight='med'>Live Streams</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.liveStreams ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, liveStreams: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.liveStreams})}} />
                <Text className='py1' size={14} weight='med'>Compatible Streams</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.compatibleStreams ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, compatibleStreams: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.compatibleStreams})}}  />
                <Text className='py1' size={14} weight='med'>China Streams</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.chinaStremas ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, chinaStremas: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.chinaStremas})}}  />
                <Text className='py1' size={14} weight='med'>DVR</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.dvr ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, dvr: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.dvr})}}  />
                <Text className='py1' size={14} weight='med'>Recording</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.recording ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, recording: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.recording})}}  />
                <Text className='py1' size={14} weight='med'>VOD</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.recording ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, recording: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.recording})}}  />
                <Text className='py1' size={14} weight='med'>Folders</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.folders ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, folders: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.folders})}}  />
                <Text className='py1' size={14} weight='med'>Playlists</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.playlists ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, playlists: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.playlists})}}  />
                <Text className='py1' size={14} weight='med'>AES</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.aes ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, aes: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.aes})}}  />
                <Text className='py1' size={14} weight='med'>Signed Keys</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.signedKeys ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, signedKeys: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.signedKeys})}}  />
                <Text className='py1' size={14} weight='med'>API</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.api ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, api: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.api})}} />
                <Text className='py1' size={14} weight='med'>Web Download</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.webDownload ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, webDownload: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.webDownload})}}  />
                <Text className='py1' size={14} weight='med'>Player Download</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.playerDownload ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, playerDownload: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.playerDownload})}}  />
                <Text className='py1' size={14} weight='med'>Paywall</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.paywall ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, paywall: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.paywall})}}  />
                <Text className='py1' size={14} weight='med'>Advertising</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.advertising ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, advertising: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.advertising})}}  />
                <Text className='py1' size={14} weight='med'>Email Catcher</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute(props.accountPlan.emailCatcher ? 'Plan: On' : 'Plan: Off'), makeRoute('On'), makeRoute('Off')]} callback={(value: string) => {setPlanData({...planData, emailCatcher: value === 'On' ? true : value === 'Off' ? false : props.accountPlan.emailCatcher})}}  />
                <div className='my1 flex'>
                    <Button onClick={() => setOpenConfirmationModal(true)} className='mr2' sizeButton='large' typeButton='primary' buttonColor='blue'>Save</Button>
                    <Button sizeButton='large' typeButton='tertiary' buttonColor='blue'>Cancel</Button>
                </div>
                <ConfirmationModal submit={handleSubmit} isOpened={openConfirmationModal} toggle={setOpenConfirmationModal} />
            </div>
        )
    }

    const SwitchPlanContent = () => {
        const renderPlans = () => {
            return Plans.map(plan => {
                return <InputRadio key={plan} className='col col-12 my1' label={plan} name='plan' value={plan} />
            })
        }
        return (
            <div className='flex flex-column'>
                <Text size={14} weight='med'>Switching Plan for Account </Text>
                {renderPlans()}
                <div className='my1 flex'>
                    <Button onClick={() => {setShowSwitchPlan(false)}} className='mr2' sizeButton='large' typeButton='primary' buttonColor='blue'>Save</Button>
                    <Button onClick={() => setShowSwitchPlan(false)} sizeButton='large' typeButton='tertiary' buttonColor='blue'>Cancel</Button>
                </div>
            </div>
        )
    }

    return showSwitchPlan ? 
        SwitchPlanContent()
        : EditPlanContent()
}