import React from 'react';
import { SettingsInteractionComponentProps } from '../../../containers/Settings/Interactions';
import { Ad } from '../../../redux-flow/store/Settings/Interactions/types';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { dataToTimeVideo, capitalizeFirstLetter, inputTimeVideoToTs } from '../../../../utils/utils';


export const NewAdModal = (props: SettingsInteractionComponentProps & {toggle: (b: boolean) => void; selectedAd: number}) => {

    const emptyAd: Ad = { 
        id: "-1",
        timestamp: NaN,
        "ad-type": "pre-roll",
        url: ""
    }

    const [adData, setAdData] = React.useState<Ad>(props.selectedAd === -1 ? emptyAd : props.interactionsInfos.adsSettings.ads[props.selectedAd])
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    React.useEffect(() => {
        setAdData(props.selectedAd === -1 ? emptyAd : props.interactionsInfos.adsSettings.ads[props.selectedAd])
    }, [props.selectedAd])

    const defineAdAction = () => {
        setButtonLoading(true)
        let tempArray: Ad[] = props.interactionsInfos.adsSettings.ads
        var newAdData: Ad = {...adData};
        newAdData.timestamp = adData["ad-type"] === 'mid-roll' ? inputTimeVideoToTs(adData.timestamp.toString()) : null;
        if(props.selectedAd === -1) {
            tempArray.push({...newAdData, id: newAdData.url + newAdData.timestamp + newAdData['ad-type']})
            props.createAd(tempArray).then(() => {
                setButtonLoading(false)
                props.toggle(false)
            })
        } else {
            tempArray = tempArray.map(ad => {
                return ad.id === adData.id ? newAdData : ad
            })
            props.saveAd(tempArray).then(() => {
                setButtonLoading(false)
                props.toggle(false)
            })
        }
    }

    return (
        <div>
            <Input className='col col-12 mt1' id='adUrl' label='Ad URL' value={adData.url} onChange={(event) => setAdData({...adData, url: event.currentTarget.value})} />
            <div className='my1 col col-12 flex'>
                <DropdownSingle className='mr1 mt1 col col-6' id='adPlacementDropdown' dropdownTitle='Ad Placement' callback={(value: string) => setAdData({...adData, "ad-type": value.toLocaleLowerCase()})} list={{'Pre-roll': false, 'Mid-roll': false, 'Post-roll': false}} dropdownDefaultSelect={adData["ad-type"] ? capitalizeFirstLetter(adData["ad-type"]) : 'Pre-roll'} /> 
                {
                    adData["ad-type"] === 'mid-roll' &&
                        <Input type='video-time' 
                            value={dataToTimeVideo(adData.timestamp).toString()}
                            placeholder="hh:mm:ss"
                            className='ml1 mt1 col col-6' id='adPosition' label='Position' 
                            onChange={(value) => setAdData({...adData, timestamp: value })}  />
                }             
            </div>
            <div className='mt2 col col-12'>
                <Button isLoading={buttonLoading} className='mr2' disabled={adData["ad-type"] === "" || adData.url === "" || (adData["ad-type"] === 'mid-roll' && !adData.timestamp)} typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {defineAdAction()}}>Save</Button>
                <Button onClick={() => {props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}