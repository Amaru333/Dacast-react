import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { IconStyle } from '../../../../shared/Common/Icon';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Text } from '../../../../components/Typography/Text';
import { GroupStepperData } from './Groups';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { currencyDropdownList, presetTypeDropdownList, recurrenceDropdownList, durationDropdownList } from '../../../../utils/DropdownLists';

import { DateTimePicker } from '../../../../components/FormsComponents/Datepicker/DateTimePicker';
import { useTranslation } from 'react-i18next';

export const GroupDetailsStep = (props: { stepperData: GroupStepperData; updateStepperData: React.Dispatch<React.SetStateAction<GroupStepperData>>; setStepValidated: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const { t } = useTranslation()

    React.useEffect(() => {
        props.setStepValidated(props.stepperData.firststep.name && (props.stepperData.firststep.groupSettings.type === 'Pay Per View' && props.stepperData.firststep.groupSettings.duration && props.stepperData.firststep.groupSettings.duration.value || props.stepperData.firststep.groupSettings.type === 'Subscription') && !props.stepperData.firststep.prices.some(price => !price.price.value))
    }, [props.stepperData])

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = props.stepperData.firststep.prices;
        if (inputChange === 'amount') {
            tempPrices[key].price.value = parseFloat(value);
        }
        else {
            tempPrices[key].price.currency = value;
        }
        props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, price: tempPrices } });
    }

    const renderPrices = () => {
        return props.stepperData.firststep.prices.map((price, key) => {
            return (
                <div key={'groupPriceSection' + key} className={'col col-12 flex items-center ' + (key === props.stepperData.firststep.prices.length - 1 ? '' : 'mb2')}>
                    <div className='col sm-col-6 col-12 clearfix mxn1 flex'>
                        <Input type='number' className={"col sm-col-4 col-6 px1"} value={price.price.value > 0 ? price.price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? t('common_paywall_price_table_header_price') : ''} />
                        <DropdownSingle hasSearch className={'col sm-col-8 col-6 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(item: DropdownSingleListItem) => handlePriceChange(item.title, key, 'currency')} id={'groupPriceCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.price.currency} list={currencyDropdownList.map(item => {if(item.title === price.price.currency) {return {...item, featureItem: true}} return item})} />
                    </div>
                    {
                        key === props.stepperData.firststep.prices.length - 1 ?
                            <div onClick={() => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, prices: [...props.stepperData.firststep.prices, { price: { value: "", currency: 'USD' } }] } })} className={'pointer sm-ml2 col col-2 sm-col-6 px1 flex ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')}><IconStyle style={{ borderRadius: 4, backgroundColor: '#284CEB' }} coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show' size={14} color='dark-violet' weight='med'>{t('common_paywall_price_modal_add_price_button_text')}</Text></div>

                            : <div className={'pointer sm-ml2 col col-2 sm-col-6 px1 ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')} ><IconStyle onClick={() => { var newList = props.stepperData.firststep.prices.filter((item, index) => { return index !== key }); props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, prices: newList } }) }}  >close</IconStyle></div>
                    }
                </div>
            )
        })
    }

    return (
        <div>
            <div className='col col-12'>
                <Input className={ClassHalfXsFullMd + 'pr1 mb2'} label={t('paywall_groups_price_modal_price_group_name')} defaultValue={props.stepperData.firststep.name} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, name: event.currentTarget.value } })} />
                <DropdownSingle id='groupPriceTypeDropdown' className={ClassHalfXsFullMd + 'pl1 mb2'} dropdownTitle={t('common_paywall_price_modal_preset_type_dropdown')} dropdownDefaultSelect={t(presetTypeDropdownList.find(f => f.data.id ===props.stepperData.firststep.groupSettings.type).title)} callback={(item: DropdownSingleListItem) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, type: item.data.id, startMethod: item.data.id === 'Subscription' ? 'Available on Purchase' : props.stepperData.firststep.groupSettings.startMethod } } })} list={presetTypeDropdownList} />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    props.stepperData.firststep.groupSettings.type === 'Subscription' ?
                        <DropdownSingle id='groupPriceRecurrenceDropdown' className="col col-6" dropdownDefaultSelect={props.stepperData.firststep.groupSettings.recurrence ? props.stepperData.firststep.groupSettings.recurrence.unit : 'Weekly'} dropdownTitle='Recurrence' list={recurrenceDropdownList.map(i => {return {title: t(i.title), data: {...i.data}}})} callback={(item: DropdownSingleListItem) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, recurrence: { unit: item.data.id } } } })} />
                        :
                        <>
                            <Input className='col col-6 sm-col-4 pr2' label={t('common_paywall_price_modal_duration_dropdown_title')} defaultValue={props.stepperData.firststep.groupSettings.duration && props.stepperData.firststep.groupSettings.duration.value > 0 ? props.stepperData.firststep.groupSettings.duration.value.toString() : ''} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, duration: { ...props.stepperData.firststep.groupSettings.duration, value: parseInt(event.currentTarget.value) } } } })} />
                            <DropdownSingle id='groupPriceDurationDropdown' className='col col-6 sm-col-8 pr1 mt-auto' dropdownDefaultSelect={t(durationDropdownList.find(f => f.data.id === props.stepperData.firststep.groupSettings.duration.unit) ? durationDropdownList.find(f => f.data.id === props.stepperData.firststep.groupSettings.duration.unit).title : durationDropdownList[0].title)} callback={(item: DropdownSingleListItem) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, duration: { ...props.stepperData.firststep.groupSettings.duration, unit: item.data.id } } } })} dropdownTitle='' list={durationDropdownList.map(i => {return {title: t(i.title), data: {...i.data}}})} />
                        </>
                }

            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker
                    isConvertedToUtc
                    fullLineTz
                    showTimezone={true}
                    defaultTs={props.stepperData.firststep.groupSettings.startDate}
                    callback={(ts: number, timezone: string) =>  props.updateStepperData( { ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: { ...props.stepperData.firststep.groupSettings, startMethod: ts === 0 ? 'Available on Purchase' : "Subscription", startDate: ts, timezone: timezone && timezone.split(' ')[0] }  }  })}
                    hideOption="Available on Purchase"
                    id="endDate"
                    dropdownTitle="Content Scheduling"
                    displayTimezoneFirst
                />
            </div>
        </div>
    )
}
