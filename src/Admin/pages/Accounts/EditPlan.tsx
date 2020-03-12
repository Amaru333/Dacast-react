import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Tab } from '../../../components/Tab/Tab'
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio'
import { PlanInfo } from '../../redux-flow/store/Accounts/EditPlan/types'

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


export const EditPlanPage = () => {

    const makeRoute = (name: string): Routes => {
        return {
            path: null,
            name: name
        }
    }

    const [showSwitchPlan, setShowSwitchPlan] = React.useState<boolean>(false)

    const [planData, setPlanData] = React.useState<PlanInfo>(null)

    const EditPlanContent = () => {
        return (
            <div className='flex flex-column'>
                <Text size={14}>Editing Plan for Account </Text>
                <div className='my2 col col-2 flex flex-column center border'>
                    <Text size={14}>Current Plan</Text>
                    <Text size={14} weight="med">Annual Scale</Text>
                    <Button className='mb1' onClick={() => setShowSwitchPlan(true)} sizeButton='large' typeButton='primary' buttonColor='blue'>Switch</Button>
                </div>
                <Input className='my1 col col-2' id='uploadSizeInput' placeholder='100' label='Upload Size (GB)' />
                <Input className='my1 col col-2' id='itemLimitInput' placeholder='100' label='Item Limit' />
                <Input className='my1 col col-2' id='folderDepthInput' placeholder='5' label='Folder Depth' />
                <Input className='my1 col col-2' id='recipeRenditionInput' placeholder='6' label='Renditions per Recipes' />
                
                <Text className='py1' size={14} weight='med'>Live Streams</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Compatible Streams</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>China Streams</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>DVR</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Recording</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>VOD</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Folders</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Playlists</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>AES</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Signed Keys</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>API</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Web Download</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Player Download</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Paywall</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Advertising</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <Text className='py1' size={14} weight='med'>Email Catcher</Text>
                <Tab className='my1 col col-2' history={null} orientation='horizontal' list={[makeRoute('Plan: On'), makeRoute('On'), makeRoute('Off')]} callback={() => {}} />
                <div className='my1 flex'>
                    <Button className='mr2' sizeButton='large' typeButton='primary' buttonColor='blue'>Save</Button>
                    <Button sizeButton='large' typeButton='tertiary' buttonColor='blue'>Cancel</Button>
                </div>
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