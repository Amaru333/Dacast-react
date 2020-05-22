import React from 'react';
import { Ad } from '../../redux-flow/store/Settings/Interactions/types';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { ContentEngagementComponentProps } from './ContentEngagement';


export const ContentNewAdModal = (props: ContentEngagementComponentProps & {toggle: Function; selectedAd: Ad}) => {

    const [adData, setAdData] = React.useState<Ad>(props.selectedAd)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        setAdData(props.selectedAd)
    }, [props.selectedAd])

    const defineAdAction = () => {
        setButtonLoading(true);
        props.selectedAd.id === "-1" ?
            props.createContentAd(adData, () => setButtonLoading(false)) : props.saveContentAd(adData, () => setButtonLoading(false))
    }

    return (
        <div>
            <Input className='col col-12 mt1' id='adUrl' label='Ad URL' value={adData.url} onChange={(event) => setAdData({...adData, url: event.currentTarget.value})} />
            <div className='my1 col col-12 flex'>
                <DropdownSingle className='mr1 my1 col col-6' id='adPlacementDropdown' callback={(value: string) => setAdData({...adData, "ad-type": value})} dropdownTitle='Ad Placement' list={{'Pre-roll': false, 'Mid-roll': false, 'Post-roll': false}} dropdownDefaultSelect={adData["ad-type"]} />              
                {
                    adData["ad-type"] === 'Mid-roll' ?
                        <Input type='time' className='ml1 mt1 col col-6' id='adPosition' label='Position' value={adData.timestamp} onChange={(event) => setAdData({...adData, timestamp: event.currentTarget.value})} />
                        : null
                }
            </div>
            <div className='mt2 col col-12'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue' isLoading={buttonLoading} onClick={() => {defineAdAction();props.toggle(false)}}>Save</Button>
                <Button onClick={() => {setAdData(props.selectedAd);props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}