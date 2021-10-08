import React from 'react';
import {Input} from '../../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Text } from '../../../../components/Typography/Text';
import { Promo } from '../../../redux-flow/store/Paywall/Presets/types';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { timezoneDropdownList, discountAppliedDropdownList } from '../../../../utils/DropdownLists';
import { DateTimePicker } from '../../../../components/FormsComponents/Datepicker/DateTimePicker';
import { tsToUtc } from '../../../../utils/services/date/dateService';
import { useTranslation } from 'react-i18next';

const defaultPromo: Promo = {
    id: '-1',
    name: '',
    alphanumericCode: '',
    discount: NaN,
    limit: NaN,
    startDate: 0,
    endDate: 0,
    timezone: null,
    discountApplied: 'Once',
    assignedGroupIds: [],
    assignedContentIds: []
}

export const PromoPresetsModal = (props: {action: (p: Promo) => Promise<void>; toggle: (b: boolean) => void; promo: Promo}) => {

    const [promoPreset, setPromoPreset] = React.useState<Promo>(props.promo ? props.promo : defaultPromo)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [startDate, setStartDate] = React.useState<number>(promoPreset.startDate);
    const [endDate, setEndDate] = React.useState<number>(promoPreset.endDate);
    const { t } = useTranslation()

    React.useEffect(() => {
        setPromoPreset(props.promo ? props.promo : defaultPromo);
    }, [props.promo])


    const handleSubmit = () => {
        setButtonLoading(true)
        props.action({...promoPreset, startDate: tsToUtc(startDate, promoPreset.timezone, new Date(startDate * 1000)), endDate:  tsToUtc(endDate, promoPreset.timezone, new Date(endDate * 1000))})
        .then(() => {
            props.toggle(false)
            setButtonLoading(false)
        }).catch(() => setButtonLoading(false))
    }

    return (
        <div>
            <div className='col col-12 mb2 clearfix'>
                <Input className={ ClassHalfXsFullMd + 'pr1 xs-mb2'} value={promoPreset.name} label={t('paywall_presets_preset_name_input_title')} onChange={(event) => setPromoPreset({...promoPreset, name: event.currentTarget.value})} />
                {/* <Input className={ ClassHalfXsFullMd + 'pl1'} value={promoPreset.alphanumericCode} label='Alphanumeric Code' onChange={(event) => setPromoPreset({...promoPreset, alphanumericCode: event.currentTarget.value})} tooltip="Minimum 5 Characters" /> */}
            </div>
            <div className='col col-12 mb2'>
                <Input className='col sm-col-3 col-6 pr1 xs-mb2' value={promoPreset.discount ? promoPreset.discount.toString() : ''} label={t('common_paywall_promo_table_header_discount')} onChange={(event) => setPromoPreset({...promoPreset, discount: parseInt(event.currentTarget.value)})} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col sm-col-3 col-6 px1' value={promoPreset.limit ? promoPreset.limit.toString() : ''} label='Limit' tooltip="The maximum number of times the promo code can be redeemed" onChange={(event) => setPromoPreset({...promoPreset, limit: parseInt(event.currentTarget.value)})} />
            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker
                    fullLineTz
                    showTimezone={false}
                    defaultTs={promoPreset.startDate}
                    callback={(ts: number) => setStartDate(ts)}
                    hideOption={t('common_paywall_promo_modal__available_dropdown_always_option')}
                    id="startDate"
                    dropdownTitle={t('common_paywall_promo_modal__available_dropdown_title')}
                />
            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker
                    fullLineTz
                    showTimezone={false}
                    minDate={startDate}
                    defaultTs={promoPreset.endDate}
                    callback={(ts: number) => setEndDate(ts)}
                    hideOption={t('common_paywall_promo_modal__available_dropdown_forever_option')}
                    id="endDate"
                    dropdownTitle={t('common_paywall_promo_modal__available_dropdown_until_option')}
                />
            </div>
            <div className=' col col-12 mb25'>
                {
                    (endDate >  0 || startDate > 0) &&
                    <DropdownSingle
                        hasSearch
                        id='promoPresetTimezoneDropdown'
                        className={ClassHalfXsFullMd + ' pr1'}
                        dropdownTitle='Timezone'
                        callback={(item: DropdownSingleListItem) => setPromoPreset({...promoPreset, timezone: item.title.split(' ')[0]})}
                        list={timezoneDropdownList}
                        tooltip={"The time saved will be converted to Coordinated Universal Time (UTC), UTC +0"}
                    />
                }
               <DropdownSingle id='promoPresetDiscountAppliedDropdown' dropdownDefaultSelect={t(discountAppliedDropdownList.find(f => f.data.id === promoPreset.discountApplied) ? discountAppliedDropdownList.find(f => f.data.id === promoPreset.discountApplied).title : discountAppliedDropdownList.find(f => f.data.id === 'Once').title)} className={ClassHalfXsFullMd} dropdownTitle={t('common_paywall_promo_modal_discount_applied_dropdown_title')} callback={(item: DropdownSingleListItem) => setPromoPreset({...promoPreset, discountApplied: item.title})} list={discountAppliedDropdownList} />
            </div>
            <div className='col col-12 mt1'>
                <Button isLoading={buttonLoading} disabled={!promoPreset.name || Number.isNaN(promoPreset.discount) || Number.isNaN(promoPreset.limit)} onClick={() => {handleSubmit()}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>{t('common_button_text_create')}</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>{t('common_button_text_cancel')}</Button>
            </div>
        </div>

    )
}
