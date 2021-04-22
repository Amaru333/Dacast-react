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


    const presetDropdownList = props.presetList.map((item) => {
        let presetDropdownListItem: DropdownSingleListItem = { title: null, data: null }
        presetDropdownListItem.title = item.name
        presetDropdownListItem.data = item
        return presetDropdownListItem
    })



    const handleSubmit = () => {
        setButtonLoading(true)
        if (savePreset) {
            props.savePresetGlobally({ ...newPromoPreset, startDate:  tsToUtc(startDate, newPromoPreset.timezone), endDate:  tsToUtc(endDate, newPromoPreset.timezone) })
        }
        const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
        props.action(
            {
                ...newPromoPreset,
                startDate: tsToUtc(startDate, newPromoPreset.timezone),
                endDate: tsToUtc(endDate, newPromoPreset.timezone),
                discountApplied: newPromoPreset.discountApplied.toLowerCase(),
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
                    dropdownTitle='Preset'
                    dropdownDefaultSelect='Custom Promo'
                    list={props.presetList ? presetDropdownList : []}
                    callback={(item: DropdownSingleListItem) => { return setNewPromoPreset({ ...item.data, alphanumericCode: '' }) }}
                />
                {
                    newPromoPreset.id === "custom" &&
                    <InputCheckbox defaultChecked={savePreset} className="ml2 mt25" id='pricePresetSaveCheckbox' label='Save as Promo Preset' onChange={() => setSavePreset(!savePreset)} />
                }

            </PresetSelectRow>
            <div className={'col col-12 clearfix ' + (savePreset ? 'sm-py1' : '')}>
                {savePreset &&
                    <Input className='col mb2 col-12 sm-col-6 sm-pr1' value={newPromoPreset.name} label='Preset name' onChange={(event) => setNewPromoPreset({ ...newPromoPreset, name: event.currentTarget.value })} />
                }

                <Input className={'col col-12 sm-col-6 mb2 ' + (savePreset ? 'sm-pl1' : '')} disabled={props.actionButton === 'Save'} value={newPromoPreset.alphanumericCode} label='Alphanumeric Code' onChange={(event) => setNewPromoPreset({ ...newPromoPreset, alphanumericCode: event.currentTarget.value })} tooltip="Minimum 5 characters. You can use both letters and numerals. Every code must be unique." />
            </div>
            <div className='col col-12 mb2'>
                <Input className='col sm-col-3 col-6 pr1 xs-mb2' value={newPromoPreset.discount ? newPromoPreset.discount.toString() : ''} label='Discount' onChange={(event) => setNewPromoPreset({ ...newPromoPreset, discount: parseInt(event.currentTarget.value) })} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col sm-col-3 col-6 px1' value={newPromoPreset.limit ? newPromoPreset.limit.toString() : ''} label='Limit' onChange={(event) => setNewPromoPreset({ ...newPromoPreset, limit: parseInt(event.currentTarget.value) })} />
            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker
                    fullLineTz
                    defaultTs={startDate}
                    callback={(ts: number) => setStartDate(ts)}
                    hideOption="Always"
                    id="startDate"
                    dropdownTitle="Available"
                />
            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker 
                    fullLineTz
                    minDate={startDate}
                    defaultTs={endDate}
                    callback={(ts: number) => setEndDate(ts)}
                    hideOption="Forever"
                    id="endDate"
                    dropdownTitle="Until"
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

                <DropdownSingle id='newPromoPresetDiscountAppliedDropdown' dropdownDefaultSelect={newPromoPreset.discountApplied} className={ClassHalfXsFullMd + ' pl1'} dropdownTitle='Discount Applied' callback={(item: DropdownSingleListItem) => setNewPromoPreset({ ...newPromoPreset, discountApplied: item.title })} list={discountAppliedDropdownList} />
            </div>
            <div className='col col-12 mb2'>
                <Button
                    isLoading={buttonLoading}
                    disabled={(!newPromoPreset.name && newPromoPreset.id !== 'custom' && !props.promo) || Number.isNaN(newPromoPreset.discount) || newPromoPreset.alphanumericCode.length < 5 || Number.isNaN(newPromoPreset.limit)}
                    onClick={() => handleSubmit()}
                    className='mr2'
                    typeButton='primary'
                    sizeButton='large' buttonColor='blue'>{props.actionButton}</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}

const PresetSelectRow = styled.div`
    display: flex;
    align-items: center;
`