import React from 'react';
import { Ad } from '../../../redux-flow/store/Settings/Interactions/types';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { VodEngagementComponentProps } from '../../../containers/Videos/Engagement';


export const VodNewAdModal = (props: VodEngagementComponentProps & {toggle: Function; selectedAd: Ad}) => {

    const [adData, setAdData] = React.useState<Ad>(props.selectedAd)

    React.useEffect(() => {
        setAdData(props.selectedAd)
    }, [props.selectedAd])

    const defineAdAction = () => {
        props.selectedAd.id === "-1" ?
            props.createVodAd(adData) : props.saveVodAd(adData)
    }

    return (
        <div>
            <Input className='my1 col col-12' id='adUrl' label='Ad URL' value={adData.url} onChange={(event) => setAdData({...adData, ["url"]: event.currentTarget.value})} />
            <div className='my1 col col-12 flex'>
                <DropdownSingle className='mr1 my1 col col-6' id='adPlacementDropdown' dropdownTitle='Ad Placement' list={{'Pre-roll': false, 'Mid-roll': false, 'Post-roll': false}} dropdownDefaultSelect={adData.placement} />              
                <Input className='ml1 col col-6' id='adPosition' label='Position' value={adData.position} />
            </div>
            <div className='my2 col col-12'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {defineAdAction();props.toggle(false)}}>Save</Button>
                <Button onClick={() => {setAdData(props.selectedAd);props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}