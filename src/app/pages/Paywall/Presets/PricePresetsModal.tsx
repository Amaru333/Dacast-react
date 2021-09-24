import React from 'react';
import {Input} from '../../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Preset } from '../../../redux-flow/store/Paywall/Presets/types';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Text } from '../../../../components/Typography/Text';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { currencyDropdownList, presetTypeDropdownList, recurrenceDropdownList, durationDropdownList, startMethodDropdownList, timezoneDropdownList } from '../../../../utils/DropdownLists';
import { DateTimePicker } from '../../../../components/FormsComponents/Datepicker/DateTimePicker';
import { useTranslation } from 'react-i18next';

const pricesList = [
    {
        value: NaN,
        currency: 'USD'
    }
]

const defaultPreset: Preset = {
    id: '-1',
    name: '',
    type: '',
    priceType: 'Pay Per View',
    prices: pricesList,
    settings: {
        duration: {value: NaN, unit: 'Hours'},
        recurrence: null,
        startMethod: 'Available on Purchase',
        timezone: null,
        startDate: 0,
    }
}

export const PricePresetsModal = (props: {action: (p: Preset) => Promise<void>; toggle: (b: boolean) => void; preset: Preset}) => {
    
    const [presetsList, setPresetsList] = React.useState<Preset>(props.preset ? {...props.preset, settings: {...props.preset.settings, timezone: null}} : defaultPreset)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const { t } = useTranslation()

    React.useEffect(() => {
        setPresetsList(props.preset ? props.preset : {...defaultPreset, prices: [{value: NaN, currency: 'USD'}]});
    }, [])

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = presetsList.prices;
        if(inputChange === 'amount') {
            tempPrices[key].value = parseFloat(value);
        }
        else {
            tempPrices[key].currency = value;
        }
        setPresetsList({...presetsList, prices: tempPrices});
    }

    const renderPrices = () => {
        return presetsList.prices.map((price, key) => {
            return( 
                <div key={'pricePresetPriceSection' + key} className={'col col-12 flex items-center '+(key === presetsList.prices.length - 1 ? '' : 'mb2' )}>
                    <div className='col col-12 sm-col-12 clearfix flex'>
                        <Input type='number' className={"col sm-col-2 col-5 pr1"} value={price.value > 0 ? price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? t('common_paywall_price_table_header_price') : ''} /> 
                        <DropdownSingle hasSearch className={'col sm-col-4 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(item: DropdownSingleListItem) => handlePriceChange(item.title, key, 'currency')} id={'pricePresetCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={currencyDropdownList.map(item => {if(item.title === price.currency) {return {...item, featureItem: true}} return item})} />

                        {
                            key === presetsList.prices.length - 1 ? 
                                <div onClick={() => setPresetsList({...presetsList, prices: [...presetsList.prices, {value: NaN, currency: 'USD'}]})} className={'pointer sm-ml2 col col-2 sm-col-6 px1 flex items-center xs-justify-center ' + (key === 0 ? 'mt3' : '')}><IconStyle style={{borderRadius: 4, backgroundColor:'#284CEB'}}coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show ' size={14} color='dark-violet' weight='med'>{t('common_paywall_price_modal_add_price_button_text')}</Text></div> 
                                : <div className={'pointer col col-2 sm-col-6 sm-ml2 px1 flex items-center xs-justify-center ' + (key === 0 ? 'mt3' : '')} ><IconStyle onClick={() => { var newList= presetsList.prices.filter((item, index) => {return index !== key}); setPresetsList({...presetsList, prices: newList})}} >close</IconStyle></div>
                        }
                    </div>
                </div>
            )
        })
    }

    const handleSubmit = () => {
        setButtonLoading(true)

        props.action({...presetsList, settings: {...presetsList.settings}}).then(() => {
            setButtonLoading(false)
            props.toggle(false)
        }).catch(() => {
            setButtonLoading(false)
        })
    }

    return (
        <div>
            <div className='col col-12 clearfix'>
                <Input className={ ClassHalfXsFullMd+'pr1 mb2'} label={t('paywall_presets_preset_name_input_title')} defaultValue={presetsList.name} onChange={(event) => setPresetsList({...presetsList, name: event.currentTarget.value})} />
                <DropdownSingle 
                    id='pricePresetTypeDropdown' 
                    className={ClassHalfXsFullMd+'pl1 mb2'} 
                    dropdownTitle={t('common_paywall_price_modal_preset_type_dropdown')}
                    dropdownDefaultSelect={t(presetTypeDropdownList.find(f => f.data.id === presetsList.priceType).title)}
                    callback={(item: DropdownSingleListItem) => setPresetsList({...presetsList, priceType: item.data.id, settings:{...presetsList.settings, startMethod: item.data.id === 'Subscription' ? 'Available on Purchase' : presetsList.settings.startMethod, recurrence: item.data.id == 'Pay Per View' ? null: {unit: 'Weekly'}, duration: item.data.id === 'Pay Per View' ? {value: NaN, unit: 'Hours'} : null}})} 
                    list={presetTypeDropdownList.map(i => {return {title: t(i.title), data: {...i.data}}})} 
                />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    presetsList.priceType === 'Subscription' ?
                        <DropdownSingle id='pricePresetRecurrenceDropdown' 
                            dropdownDefaultSelect={presetsList.settings.recurrence ? presetsList.settings.recurrence.unit : 'Weekly'} 
                            dropdownTitle='Recurrence' 
                            callback={(item: DropdownSingleListItem) => setPresetsList({...presetsList, settings:{...presetsList.settings, recurrence: {unit: item.data.id}}})}
                            list={recurrenceDropdownList.map(i => {return {title: t(i.title), data: {...i.data}}})}
                        />
                        :
                        <>
                            <Input className='col col-6 sm-col-4 pr1' label={t('common_paywall_price_modal_duration_dropdown_title')} defaultValue={presetsList.settings.duration.value ? presetsList.settings.duration.value.toString() : ''} onChange={(event) => setPresetsList({...presetsList, settings: {...presetsList.settings, duration: {...presetsList.settings.duration, value: parseInt(event.currentTarget.value)}}})} />
                            <DropdownSingle id='pricePresetDurationDropdown' className='col col-6 sm-col-8 px1 mt-auto' dropdownDefaultSelect={t(durationDropdownList.find(f => f.data.id === presetsList.settings.duration.unit).title)} callback={(item: DropdownSingleListItem) => setPresetsList({...presetsList, settings:{ ...presetsList.settings, duration: {...presetsList.settings.duration, unit: item.data.id}}})} dropdownTitle='' list={durationDropdownList.map(i => {return {title: t(i.title), data: {...i.data}}})} />
                        </>
                }

            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker
                    isConvertedToUtc
                    fullLineTz
                    showTimezone={true}
                    defaultTs={presetsList.settings.startMethod === 'Available on Purchase' ? 0 : presetsList.settings.startDate}
                    timezone={presetsList.settings.timezone}
                    callback={(ts: number, timezone: string) => setPresetsList({...presetsList, settings:{ ...presetsList.settings, startMethod: ts === 0 ? 'Available on Purchase' : "Set Date & Time", startDate: ts,  timezone: timezone}}) }
                    hideOption="Available on Purchase"
                    id="endDate"
                    dropdownTitle="Content Scheduling"
                    disabled={presetsList.priceType === 'Subscription'}
                    displayTimezoneFirst
                />
            </div>
            <div className='col col-12 mt3'>
                <Button isLoading={buttonLoading} disabled={!presetsList.name || (presetsList.priceType === 'Pay Per View' && Number.isNaN(presetsList.settings.duration.value)) || presetsList.prices.some(price => Number.isNaN(price.value))} onClick={() => {handleSubmit()}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>{props.preset ? t('common_button_text_save') : t("common_button_text_create")}</Button>
                <Button onClick={() => {props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>{t('common_button_text_cancel')}</Button>
            </div>
        </div>
    )
}