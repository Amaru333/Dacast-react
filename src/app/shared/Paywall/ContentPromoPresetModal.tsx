import React from 'react';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../..//components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../..//components/FormsComponents/Button/Button';
import { DropdownSingleListItem } from '../../..//components/FormsComponents/Dropdown/DropdownTypes';
import { Text } from '../../..//components/Typography/Text';
import { Promo } from '../../redux-flow/store/Paywall/Presets/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
import { ClassHalfXsFullMd } from '../General/GeneralStyle';
import { userToken } from '../../utils/services/token/tokenService';
import { timezoneDropdownList, discountAppliedDropdownList } from '../../../utils/DropdownLists';
import { DateTimePicker } from '../../../components/FormsComponents/Datepicker/DateTimePicker';
import { tsToUtc } from '../../../utils/services/date/dateService';
import { ContentType } from '../../redux-flow/store/Common/types';
import { useTranslation } from 'react-i18next';

const defaultPromo: Promo = {
    id: 'custom',
    name: '',
    alphanumericCode: '',
    discount: NaN,
    limit: NaN,
    startDate: 0,
    endDate: 0,
    timezone: null,
    discountApplied: 'Once',
    assignedContentIds: [],
    assignedGroupIds: []
}

export const ContentPromoPresetsModal = (props: { contentType: ContentType; contentId: string; actionButton: 'Create' | 'Save'; action: (p: Promo, contentId: string, contentType: ContentType) => Promise<void>; toggle: (b: boolean) => void; promo: Promo; presetList: Promo[]; savePresetGlobally: (p: Promo) => Promise<void> }) => {

    const [newPromoPreset, setNewPromoPreset] = React.useState<Promo>(props.promo ? props.promo : defaultPromo);
    const [savePreset, setSavePreset] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [startDate, setStartDate] = React.useState<number>(newPromoPreset.startDate);
    const [endDate, setEndDate] = React.useState<number>(newPromoPreset.endDate);
    const { t } = useTranslation()

    const presetDropdownList = props.presetList.map((item) => {
        return {
            title: item.name === 'Custom Promo' ? t('common_paywall_promo_modal_preset_dropdown_custom_promo_option') : item.name,
            data: item
        }
    })



    const handleSubmit = () => {
        setButtonLoading(true)
        if (savePreset) {
            props.savePresetGlobally({ ...newPromoPreset, startDate: tsToUtc(startDate, newPromoPreset.timezone, new Date(startDate * 1000)), endDate: tsToUtc(endDate, newPromoPreset.timezone, new Date(endDate * 1000)) })
        }
        const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
        props.action(
            {
                ...newPromoPreset,
                startDate: tsToUtc(startDate, newPromoPreset.timezone, new Date(startDate * 1000)),
                endDate: tsToUtc(endDate, newPromoPreset.timezone, new Date(endDate * 1000)),
                discountApplied: newPromoPreset.discountApplied,
                assignedContentIds: [`${accountId}-${props.contentType}-${props.contentId}`],
                assignedGroupIds: [],
                name: null,
                id: props.actionButton === 'Create' ? null : newPromoPreset.id
            }, props.contentId, props.contentType)
            .then(() => {
                setButtonLoading(false)
                props.toggle(false)
            }).catch(() => {
                setButtonLoading(false)
            })
    }

    return (
        <div>
            <PresetSelectRow className='col col-12 mb2'>
                <DropdownSingle
                    id='pricePresetSelectDropdown'
                    className='col col-6'
                    dropdownTitle={t('common_paywall_price_modal_preset_dropdown_title')}
                    dropdownDefaultSelect={t('common_paywall_promo_modal_preset_dropdown_custom_promo_option')}
                    list={props.presetList ? presetDropdownList : []}
                    callback={(item: DropdownSingleListItem) => { return setNewPromoPreset({ ...item.data, alphanumericCode: '' }) }}
                />
                {
                    newPromoPreset.id === "custom" &&
                    <InputCheckbox defaultChecked={savePreset} className="ml2 mt25" id='pricePresetSaveCheckbox' label={t('common_paywall_promo_modal_save_as_preset_checkbox')} onChange={() => setSavePreset(!savePreset)} />
                }

            </PresetSelectRow>
            <div className={'col col-12 clearfix ' + (savePreset ? 'sm-py1' : '')}>
                {savePreset &&
                    <Input className='col mb2 col-12 sm-col-6 sm-pr1' value={newPromoPreset.name} label='Preset name' onChange={(event) => setNewPromoPreset({ ...newPromoPreset, name: event.currentTarget.value })} />
                }

                <Input className={'col col-12 sm-col-6 mb2 ' + (savePreset ? 'sm-pl1' : '')} disabled={props.actionButton === 'Save'} value={newPromoPreset.alphanumericCode} label={t('common_paywall_promo_modal_alphanumericode_title')} onChange={(event) => setNewPromoPreset({ ...newPromoPreset, alphanumericCode: event.currentTarget.value })} tooltip={t('common_paywall_promo_modal_alphanumericode_tooltip_text')} />
            </div>
            <div className='col col-12 mb2'>
                <Input className='col sm-col-3 col-6 pr1 xs-mb2' value={newPromoPreset.discount ? newPromoPreset.discount.toString() : ''} label={t('common_paywall_promo_table_header_discount')} onChange={(event) => setNewPromoPreset({ ...newPromoPreset, discount: parseInt(event.currentTarget.value) })} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col sm-col-3 col-6 px1' value={newPromoPreset.limit ? newPromoPreset.limit.toString() : ''} label='Limit' onChange={(event) => setNewPromoPreset({ ...newPromoPreset, limit: parseInt(event.currentTarget.value) })} />
            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker
                    fullLineTz
                    defaultTs={startDate}
                    callback={(ts: number) => setStartDate(ts)}
                    hideOption={t('common_paywall_promo_modal__available_dropdown_always_option')}
                    id="startDate"
                    dropdownTitle={t('common_paywall_promo_modal__available_dropdown_title')}
                />
            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker
                    fullLineTz
                    minDate={startDate}
                    defaultTs={endDate}
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
                        id='newPromoPresetTimezoneDropdown'
                        dropdownDefaultSelect={null}
                        className={ClassHalfXsFullMd + ' pr1'}
                        dropdownTitle='Timezone'
                        tooltip={"The time saved will be converted to Coordinated Universal Time (UTC), UTC +0"}
                        callback={(item: DropdownSingleListItem) => setNewPromoPreset({ ...newPromoPreset, timezone: item.title.split(' ')[0] })} list={timezoneDropdownList} />
                }

                <DropdownSingle id='newPromoPresetDiscountAppliedDropdown' dropdownDefaultSelect={t(discountAppliedDropdownList.find(f => f.data.id === newPromoPreset.discountApplied) ? discountAppliedDropdownList.find(f => f.data.id === newPromoPreset.discountApplied).title : discountAppliedDropdownList.find(f => f.data.id === 'Once').title)} className={ClassHalfXsFullMd} dropdownTitle={t('common_paywall_promo_modal_discount_applied_dropdown_title')} callback={(item: DropdownSingleListItem) => setNewPromoPreset({ ...newPromoPreset, discountApplied: item.data.id })} list={discountAppliedDropdownList.map(p => {return {title: t(p.title), data: {...p.data}}})} />
            </div>
            <div className='col col-12 mb2'>
                <Button
                    isLoading={buttonLoading}
                    disabled={(!newPromoPreset.name && newPromoPreset.id !== 'custom' && !props.promo) || Number.isNaN(newPromoPreset.discount) || newPromoPreset.alphanumericCode.length < 5 || Number.isNaN(newPromoPreset.limit)}
                    onClick={() => handleSubmit()}
                    className='mr2'
                    typeButton='primary'
                    sizeButton='large' buttonColor='blue'>{props.actionButton}</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>{t('common_button_text_cancel')}</Button>
            </div>
        </div>

    )
}

const PresetSelectRow = styled.div`
    display: flex;
    align-items: center;
`
