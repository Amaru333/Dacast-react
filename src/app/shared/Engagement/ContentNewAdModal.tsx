import React from 'react';
import { Ad } from '../../redux-flow/store/Settings/Interactions/types';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { ContentEngagementComponentProps } from './ContentEngagement';
import { dataToTimeVideo, capitalizeFirstLetter } from '../../../utils/utils';


export const ContentNewAdModal = (props: ContentEngagementComponentProps & {toggle: Function; selectedAd: Ad}) => {

    const [adData, setAdData] = React.useState<Ad>(props.selectedAd)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        setAdData(props.selectedAd)
    }, [props.selectedAd])

    const defineAdAction = () => {
        let tempArray: Ad[] = props.contentEngagementSettings.engagementSettings.ads
        setButtonLoading(true)
        if(props.selectedAd.id === '-1') {
            tempArray.push(adData)
            props.createContentAd(tempArray, props.contentEngagementSettings.engagementSettings.adsId, props.contentId, () => setButtonLoading(false))
        } else {
            tempArray = props.contentEngagementSettings.engagementSettings.ads.map((ad) => {
                return ad.id === adData.id ? adData : ad
            })
            props.saveContentAd(tempArray, props.contentEngagementSettings.engagementSettings.adsId, props.contentId, () => setButtonLoading(false))
        }
        
    }

    return (
        <div>
            <Input className='col col-12 mt1' id='adUrl' label='Ad URL' value={adData.url} onChange={(event) => setAdData({...adData, url: event.currentTarget.value})} />
            <div className='my1 col col-12 flex'>
                <DropdownSingle className='mr1 my1 col col-6' id='adPlacementDropdown' callback={(value: string) => setAdData({...adData, "ad-type": value.toLowerCase()})} dropdownTitle='Ad Placement' list={{'Pre-roll': false, 'Mid-roll': false, 'Post-roll': false}} dropdownDefaultSelect={capitalizeFirstLetter(adData["ad-type"])} />              
                {
                    adData["ad-type"] === 'mid-roll' &&
                        <Input className='ml1 mt1 col col-6' id='adPosition' placeholder="hh:mm:ss" label='Position' type='video-time' 
                            value={dataToTimeVideo(adData.timestamp)} 
                            onChange={(value) => setAdData({...adData, timestamp: value})} />
                }
            </div>
            <div className='mt2 col col-12'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue' isLoading={buttonLoading} onClick={() => {defineAdAction();props.toggle(false)}}>Save</Button>
                <Button onClick={() => {setAdData(props.selectedAd);props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}