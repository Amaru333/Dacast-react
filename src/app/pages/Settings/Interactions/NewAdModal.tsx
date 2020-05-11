import React from 'react';
import { SettingsInteractionComponentProps } from '../../../containers/Settings/Interactions';
import { Ad } from '../../../redux-flow/store/Settings/Interactions/types';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';


export const NewAdModal = (props: SettingsInteractionComponentProps & {toggle: Function; selectedAd: number}) => {

    const emptyAd: Ad = { 
        id: "-1",
        timestamp: NaN,
        "ad-type": "pre-roll",
        url: ""
    }

    const [adData, setAdData] = React.useState<Ad>(props.selectedAd === -1 ? emptyAd : props.interactionsInfos.ads[props.selectedAd])

    React.useEffect(() => {
        setAdData(props.selectedAd === -1 ? emptyAd : props.interactionsInfos.ads[props.selectedAd])
    }, [props.selectedAd])

    React.useEffect(() => console.log("modal props", props.interactionsInfos), [props.interactionsInfos])

    const defineAdAction = () => {
        let tempArray: Ad[] = []
        if(props.selectedAd === -1) {
            tempArray.push(adData)
            props.createAd(tempArray)
        } else {
            tempArray = props.interactionsInfos.ads
            tempArray[props.selectedAd] = adData
            props.saveAd(tempArray)
        }
    }

    return (
        <div>
            <Input className='col col-12 mt1' id='adUrl' label='Ad URL' value={adData.url} onChange={(event) => setAdData({...adData, url: event.currentTarget.value})} />
            <div className='my1 col col-12 flex'>
                <DropdownSingle className='mr1 mt1 col col-6' id='adPlacementDropdown' dropdownTitle='Ad Placement' callback={(value: string) => setAdData({...adData, "ad-type": value.toLocaleLowerCase()})} list={{'Pre-roll': false, 'Mid-roll': false, 'Post-roll': false}} dropdownDefaultSelect={adData["ad-type"] ? adData["ad-type"] : 'Pre-roll'} /> 
                {
                    adData["ad-type"] === 'Mid-roll' ?
                        <Input type='time' className='ml1 mt1 col col-6' id='adPosition' label='Position' onChange={(event) => setAdData({...adData, timestamp: parseInt(event.currentTarget.value)})}  />
                        : null
                }             
            </div>
            <div className='mt2 col col-12'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {defineAdAction();props.toggle(false)}}>Save</Button>
                <Button onClick={() => {props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}