import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Toggle } from '../../../../components/Toggle/toggle';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Card } from '../../../../components/Card/Card';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { PaywallSettingsComponentProps } from '../../../containers/Paywall/Settings';
import { PaywallSettingsInfos } from '../../../redux-flow/store/Paywall/Settings/types';
import { Prompt } from 'react-router';
import { Divider } from '../../../../shared/MiscStyles';
import { Trans, useTranslation } from 'react-i18next';

export const PaywallSettingsPage = (props: PaywallSettingsComponentProps) => {
    const [settingsInfos, setSettingsInfos] = React.useState<PaywallSettingsInfos>(props.paywallSettingsInfos)
    const [loadingSave, setLoadingSave] = React.useState<boolean>(false)
    const { t } = useTranslation()

    React.useEffect(() => {
        setSettingsInfos(props.paywallSettingsInfos)
    }, [props.paywallSettingsInfos])

    const handleSubmit = () => {
        setLoadingSave(true)
        props.savePaywallSettingsInfos(settingsInfos)
        .then(() => {
            setLoadingSave(false)
        }).catch(() => {
            setLoadingSave(false)
        })
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>{t('paywall_settings_title')}</Text>
                <div className=' mt25'>
                    <Toggle  id='creditCardPurchasesToggle' label={t('paywall_settings_card_purchase_title')} defaultChecked={props.paywallSettingsInfos.creditCardPurchases} onChange={() => setSettingsInfos({...settingsInfos, creditCardPurchases: !settingsInfos.creditCardPurchases})} />
                    <div className="mt1">
                        <Text size={14} weight='reg'>{t('paywall_settings_card_purchase_description')}</Text>  
                    </div>
                </div>
                <div className='mt25'>
                    <Toggle id='paypalPurchasesToggle' label={t('paywall_settings_paypal_title')} defaultChecked={props.paywallSettingsInfos.paypalPurchases} onChange={() => setSettingsInfos({...settingsInfos, paypalPurchases: !settingsInfos.paypalPurchases, paypalTC: settingsInfos.paypalPurchases ? false : settingsInfos.paypalTC})} />
                    {
                        settingsInfos.paypalPurchases &&
                            <>
                                <div className="mt1">
                                    <Text size={14} weight='reg'>{t('paywall_settings_paypal_description')}</Text>
                                </div>

                                <div className="clearfix mt1">
                                    <InputCheckbox className='left' id='paypalTCCheckbox' defaultChecked={settingsInfos.paypalTC} onChange={() => setSettingsInfos({...settingsInfos, paypalTC: !settingsInfos.paypalTC})} />
                                    <Text size={14} weight='reg' ><Trans i18nKey='paywall_settings_paypal_agreement'>Agree to <a target="_blank" rel="noopener noreferrer" href="https://www.paypal.com/us/webapps/mpp/ua/useragreement-full" > PayPal User Agreement</a></Trans></Text>
                                   
                                </div>
                                {
                                    (settingsInfos.paypalPurchases && !settingsInfos.paypalTC) &&
                                    <Text size={10} weight='reg' color='red'>{t('paywall_settings_paypal_required_field')}</Text>
                                }
                            </>
                    }

                </div>
                <Divider className='mt2' />

                <div className="mt3 mb1">
                    <Text size={16} weight='med'>{t('paywall_settings_custom_tos_title')}</Text>
                </div>
                <Text size={14} weight='reg'>{t('paywall_settings_custom_tos_description')}</Text>
                <Input  className='col col-2 py1' id='CustomTOSUrl' placeholder='URL' label={t('paywall_settings_cusom_tos_url_field')} defaultValue={props.paywallSettingsInfos.customUrl} onChange={(event) => setSettingsInfos({...settingsInfos, customUrl: event.currentTarget.value})} />
                
                <Divider className='mt2' />
                
                <div className="mt3 mb1">
                    <Text size={16} weight='med'>{t('paywall_settings_card_statement_title')}</Text>
                </div>
                <Text size={14} weight='reg'>{t('paywall_settings_card_statement_description')}</Text>
                <Input  className='col col-2 py1' id='banckStatement' placeholder='' label={t('paywall_settings_card_statement_seller_field')} defaultValue={props.paywallSettingsInfos.bankStatement} onChange={(event) => setSettingsInfos({...settingsInfos, bankStatement: event.currentTarget.value})} />
            </Card>
            { JSON.stringify(settingsInfos) !== JSON.stringify(props.paywallSettingsInfos) &&
                <div>
                    <Button isLoading={loadingSave} disabled={(settingsInfos.paypalPurchases && !settingsInfos.paypalTC) || (!settingsInfos.paypalPurchases && settingsInfos.paypalTC) || (!settingsInfos.paypalPurchases && !settingsInfos.creditCardPurchases)} onClick={() => {handleSubmit()}} className='my2 mr2' sizeButton='large' typeButton='primary' buttonColor='blue'>{t('common_button_text_save')}</Button>
                    <Button onClick={() => {setSettingsInfos(props.paywallSettingsInfos);props.showDiscardToast("Changes have been discarded", 'fixed', "success")}} className='my2' sizeButton='large' typeButton='tertiary' buttonColor='blue'>Discard</Button>
                </div>
            }
            <Prompt when={JSON.stringify(settingsInfos) !== JSON.stringify(props.paywallSettingsInfos) } message='' />
        </div>
    )
}