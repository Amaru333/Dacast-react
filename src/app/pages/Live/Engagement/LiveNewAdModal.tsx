import React from 'react';
import { Ad } from '../../../redux-flow/store/Settings/Interactions/types';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { LiveEngagementComponentProps } from '../../../containers/Live/Engagement';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';


export const LiveNewAdModal = (props: LiveEngagementComponentProps & {toggle: Function; selectedAd: Ad}) => {

    const [adData, setAdData] = React.useState<Ad>(props.selectedAd)

    React.useEffect(() => {
        setAdData(props.selectedAd)
    }, [props.selectedAd])

    const defineAdAction = () => {
        props.selectedAd.id === "-1" ?
            props.createLiveAd(adData) : props.saveLiveAd(adData)
    }

    return (
        <div>
            <Input className='mb2 mt1 col col-12' id='adUrl' label='Ad URL' value={adData.url} onChange={(event) => setAdData({...adData, ["url"]: event.currentTarget.value})} />
            <div className='mb2 col col-12 clearfix'>
                <DropdownSingle className={'pr1 xs-mb2 '+ClassHalfXsFullMd} id='adPlacementDropdown' dropdownTitle='Ad Placement' list={{'Pre-roll': false, 'Mid-roll': false, 'Post-roll': false}} dropdownDefaultSelect={adData.placement} callback={(value: string) => setAdData({...adData, placement: value})} /> 
                {
                    adData.placement === 'Mid-roll' ?
                        <Input type="time" className={'ml2 mt1' +ClassHalfXsFullMd} id='adPosition' label='Position' value={adData.position} onChange={(event) => setAdData({...adData, position: event.currentTarget.value})} /> : null
                }              
                
            </div>
            <div className='mt2 col col-12'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {defineAdAction();props.toggle(false)}}>Save</Button>
                <Button onClick={() => {setAdData(props.selectedAd);props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}