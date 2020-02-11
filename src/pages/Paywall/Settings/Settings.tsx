import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Card } from '../../../components/Card/Card';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { PaywallSettingsComponentProps } from '../../../containers/Paywall/Settings';
import { PaywallSettingsInfos } from '../../../redux-flow/store/Paywall/Settings/types';

export const PaywallSettingsPage = (props: PaywallSettingsComponentProps) => {
    const [settingsInfos, setSettingsInfos] = React.useState<PaywallSettingsInfos>(props.paywallSettingsInfos);

    React.useEffect(() => {
        setSettingsInfos(props.paywallSettingsInfos);
    }, [props.paywallSettingsInfos])

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>Paywall Settings</Text>
                <div className='my2'>
                    <Toggle  id='creditCardPurchasesToggle' label="Credit Card Purchases" defaultChecked={props.paywallSettingsInfos.creditCardPurchases} onChange={() => setSettingsInfos({...settingsInfos, creditCardPurchases: !settingsInfos.creditCardPurchases})} />
                    <div className="mt1">
                        <Text size={14} weight='reg'>Videos won't be displayed publicy on your website</Text>  
                    </div>
                </div>
                <div className='my2'>
                    <Toggle id='paypalPurchasesToggle' label='PayPal Purchases' defaultChecked={props.paywallSettingsInfos.paypalPurchases} onChange={() => setSettingsInfos({...settingsInfos, paypalPurchases: !settingsInfos.paypalPurchases})} />
                    {
                        settingsInfos.paypalPurchases ? 
                            <>
                                <Text size={14} weight='reg'>Viewers must enter a password before viewing your content. You can edit the prompt time to let the viewer preview some of the video before being prompted by a password.</Text>
                                <InputCheckbox className='py1' id='paypalTCCheckbox' label='Agree to PayPal User Agreement' defaultChecked={props.paywallSettingsInfos.paypalTC} onChange={() => setSettingsInfos({...settingsInfos, paypalTC: !settingsInfos.paypalTC})} />
                            </>
                            : null
                    }

                </div>
                {
                    settingsInfos.paypalPurchases ?
                        <>
                            <Text size={16} weight='med'>Custom Terms of Services</Text>
                            <Text size={14} weight='reg'>Some text about the text of the customer thing</Text>
                            <Input  className='col col-2 py1' id='CustomTOSUrl' placeholder='URL' label='Custom T.O.S URL' defaultValue={props.paywallSettingsInfos.customUrl} onChange={(event) => setSettingsInfos({...settingsInfos, customUrl: event.currentTarget.value})} />
                        </>
                        : null
                }

            </Card>
            <Button onClick={() => {props.savePaywallSettingsInfos(settingsInfos)}} className='my2 mr2' sizeButton='large' typeButton='primary' buttonColor='blue'>Save</Button>
            <Button onClick={() => {setSettingsInfos(props.paywallSettingsInfos)}} className='my2' sizeButton='large' typeButton='tertiary' buttonColor='blue'>Discard</Button>
        </div>
    )
}