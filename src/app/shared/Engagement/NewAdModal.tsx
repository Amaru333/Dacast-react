import React from 'react';
import { Ad, AdType, EngagementInfo } from '../../redux-flow/store/Settings/Engagement/types';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { dataToTimeVideo, inputTimeVideoToTs } from '../../../utils/formatUtils';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { adPlacementDropdownList } from '../../../utils/DropdownLists';
import { useTranslation } from 'react-i18next';


export const NewAdModal = (props: {localEngagementSettings: EngagementInfo, toggle: (b: boolean) => void; selectedAd: number, createAd: (data: Ad[], contentId?: string, contentType?: string) => Promise<void>, saveAd: (data: Ad[], contentId?: string, contentType?: string) => Promise<void>, contentType?: string, contentId?: string}) => {

    const emptyAd: Ad = { 
        id: "-1",
        timestamp: NaN,
        type: "Pre-roll",
        url: ""
    }

    const [adData, setAdData] = React.useState<Ad>(props.selectedAd === -1 ? emptyAd : props.localEngagementSettings.adsSettings.ads[props.selectedAd])
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const { t } = useTranslation()

    React.useEffect(() => {
        setAdData(props.selectedAd === -1 ? emptyAd : props.localEngagementSettings.adsSettings.ads[props.selectedAd])
    }, [props.selectedAd])

    const defineAdAction = () => {

        setButtonLoading(true)
        let tempArray: Ad[] = props.localEngagementSettings.adsSettings.ads
        var newAdData: Ad = {...adData};
        newAdData.timestamp = adData.type === 'Mid-roll' ? inputTimeVideoToTs(adData.timestamp.toString()) : null;
        if(props.selectedAd === -1) {
            tempArray.push({...newAdData, id: newAdData.url + newAdData.timestamp + newAdData.type})
            props.createAd(tempArray, props.contentId, props.contentType).then(() => {
                setButtonLoading(false)
                props.toggle(false)
            }).catch(() => setButtonLoading(false))
        } else {
            tempArray = tempArray.map(ad => {
                return ad.id === adData.id ? newAdData : ad
            })
            props.saveAd(tempArray, props.contentId, props.contentType).then(() => {
                setButtonLoading(false)
                props.toggle(false)
            }).catch(() => setButtonLoading(false))
        }
    }

    return (
        <div>
            <Input className='col col-12 mt1' id='adUrl' label={t('common_engagement_ads_modal_ad_url_title')} value={adData.url} onChange={(event) => setAdData({...adData, url: event.currentTarget.value})} />
            <div className='my1 col col-12 flex'>
                <DropdownSingle className='mr1 mt1 col col-6' id='adPlacementDropdown' dropdownTitle={t('common_engagement_ads_modal_ad_placement_dropdown_title')} callback={(item: DropdownSingleListItem) => setAdData({...adData, type: item.data.id as AdType})} list={adPlacementDropdownList.map(i => {return {title: t(i.title), data: {...i.data}}})} dropdownDefaultSelect={adData.type || 'Pre-roll'} /> 
                {
                    adData.type === 'Mid-roll' &&
                        <Input type='video-time' 
                            value={dataToTimeVideo(adData.timestamp).toString()}
                            placeholder="hh:mm:ss"
                            className='ml1 mt1 col col-6' id='adPosition' label='Position' 
                            onChange={(value) => setAdData({...adData, timestamp: value })}  />
                }             
            </div>
            <div className='mt2 col col-12'>
                <Button isLoading={buttonLoading} className='mr2' disabled={adData.url === "" || (adData.type === 'Mid-roll' && !adData.timestamp)} typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {defineAdAction()}}>{t('common_button_text_save')}</Button>
                <Button onClick={() => {props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>{t('common_button_text_cancel')}</Button>
            </div>
        </div>
    )
}