import * as React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input'
import { GeoRestriction } from '../../../redux-flow/store/Settings/Security/types';
import { DropdownCountries } from '../../../../components/FormsComponents/Dropdown/DropdownCountries';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';

export const GeoRestrictionForm = (props: {item: GeoRestriction; toggle: (b: boolean) => void; submit: (geoRestriction: GeoRestriction) => Promise<void>}) => {

    const [geoRestrictionItem, setGeoRestrictionItem] = React.useState<GeoRestriction>(null);
    const [enableSubmit, setEnableSubmit] = React.useState<boolean>((props.item.name.length > 0 && props.item.values.length > 0));
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        setGeoRestrictionItem(props.item)
    }, [props.item])

    React.useEffect(() => {
        if(geoRestrictionItem) {
            setEnableSubmit((geoRestrictionItem.name.length > 0 && geoRestrictionItem.values.length > 0))
        }
    }, [geoRestrictionItem])

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setButtonLoading(true)
        props.submit(geoRestrictionItem).then(() => {
            setButtonLoading(false)
            props.toggle(false)
        }).catch(() => setButtonLoading(false))
    }
    return (
        geoRestrictionItem &&

            <form onSubmit={event => submitForm(event)}>
                <Input 
                    value={geoRestrictionItem.name}
                    disabled={false}
                    onChange={(event) => setGeoRestrictionItem({...geoRestrictionItem, name: event.currentTarget.value})}
                    required={false}
                    id='geoRestrictionName'
                    type='text'
                    className='col col-12 pb1'
                    label='Group Name'
                    placeholder='Group Name'
                />
                <InputCheckbox 
                    className='col col-12 pb1'
                    id='geoRestrictionDefautChecked'
                    label='Make as Default Group'
                    onChange={(event) => {event.preventDefault;setGeoRestrictionItem({...geoRestrictionItem, isDefault: event.currentTarget.checked})}}
                    defaultChecked={geoRestrictionItem.isDefault}
                />
                <div className='col col-12 py1'>
                    <DropdownCountries
                        className="mb1"
                        id="geoRestrictionCountriesDropdown"
                        dropdownTitle="Countries"
                        list={geoRestrictionItem.values}
                        callback={(value: string[]) => setGeoRestrictionItem({...geoRestrictionItem, values: value})}
                    />
                    <Text size={12}>Selected countries will have access to your content</Text>
                </div>
               
                <div className='col col-12 py1'>
                    <Button isLoading={buttonLoading} sizeButton="large" type='submit' disabled={!enableSubmit} typeButton="primary" buttonColor="blue" >{props.item.name.length > 0 ? "Save" : "Create"}</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>
            </form>
    )
}