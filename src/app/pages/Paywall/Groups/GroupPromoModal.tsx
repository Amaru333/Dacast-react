import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Text } from '../../../../components/Typography/Text';
import { GroupPromo, GroupPrice } from '../../../redux-flow/store/Paywall/Groups/types';
import { GroupPromoDateContainer } from './GroupsStyle';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { discountAppliedDropdownList, timezoneDropdownList } from '../../../../utils/DropdownLists';
import { DateTimePicker } from '../../../../components/FormsComponents/Datepicker/DateTimePicker';
import { tsToUtc } from '../../../../utils/services/date/dateService';
import { useTranslation } from 'react-i18next';

const defaultPromo: GroupPromo = {
    id: '-1',
    alphanumericCode: '',
    discount: 0,
    limit: 0,
    startDate: 0,
    endDate: 0,
    timezone: null,
    discountApplied: 'Once',
    assignedContentIds: [],
    assignedGroupIds: []
}

export const GroupPromoModal = (props: { action: (p: GroupPromo) => Promise<void>; toggle: React.Dispatch<React.SetStateAction<boolean>>; groupPromo: GroupPromo; groupList: GroupPrice[] }) => {

    const [groupPromo, setGroupPromo] = React.useState<GroupPromo>(props.groupPromo ? props.groupPromo : defaultPromo)

    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const [startDate, setStartDate] = React.useState<number>(groupPromo.startDate);
    const [endDate, setEndDate] = React.useState<number>(groupPromo.endDate);
    const { t } = useTranslation()

    const associatedGroupDropdownList = props.groupList.map((item: GroupPrice) => {
        let associatedGroupItem: DropdownSingleListItem = { title: null, data: null }
        associatedGroupItem.title = item.name
        associatedGroupItem.data = item
        return associatedGroupItem
    })


    React.useEffect(() => {
        setGroupPromo(props.groupPromo ? props.groupPromo : defaultPromo);
    }, [props.groupPromo])
    const [modalValid, setModalValid] = React.useState<boolean>(false)

    React.useEffect(() => {
        setModalValid((groupPromo.alphanumericCode && groupPromo.alphanumericCode.length > 4) && (groupPromo.discount && groupPromo.discount !== null) && (groupPromo.limit && groupPromo.limit !== null) && (groupPromo.assignedGroupIds.length > 0))
    }, [groupPromo])

    const handleSubmit = () => {
        setButtonLoading(true)
        props.action({ ...groupPromo, startDate: tsToUtc(startDate, groupPromo.timezone, new Date(startDate * 1000)), endDate:  tsToUtc(endDate, groupPromo.timezone, new Date(endDate * 1000)) })
            .then(() => {
                props.toggle(false)
                setButtonLoading(false)
            })
            .catch(() => setButtonLoading(false))
    }

    return (
        <div>
            <div className="'col col-12 mb2 clearfix">
                {/* <Input className={ ClassHalfXsFullMd + 'pr2 xs-mb2'} value={groupPromo.name} label='Preset name' onChange={(event) => setGroupPromo({...groupPromo, name: event.currentTarget.value})} /> */}
                <Input className={ClassHalfXsFullMd + ''} disabled={props.groupPromo ? true : false} value={groupPromo.alphanumericCode} label={t('common_paywall_promo_modal_alphanumericode_title')} tooltip="Minimum 5 characters. You can use both letters and numerals. Every code must be unique." onChange={(event) => setGroupPromo({ ...groupPromo, alphanumericCode: event.currentTarget.value })} />
            </div>
            <div className='col col-12 clearfix mb2'>
                <DropdownSingle
                    id='associatedGroupDropdown'
                    className={ClassHalfXsFullMd + 'pr2 xs-mb2'}
                    dropdownTitle={t('paywall_groups_promo_table_associated_group_dropdown_title')}
                    dropdownDefaultSelect={props.groupList.filter(g => g.id === groupPromo.assignedGroupIds[0]).length > 0 ? props.groupList.filter(g => g.id === groupPromo.assignedGroupIds[0])[0].name : ''}
                    list={associatedGroupDropdownList}
                    callback={(item: DropdownSingleListItem) => setGroupPromo({ ...groupPromo, assignedGroupIds: [item.data.id] })}
                />
            </div>
            <div className='col col-12 mb2 clearfix'>
                <Input className='col sm-col-3 col-6 pr2' value={groupPromo.discount ? groupPromo.discount.toString() : ''} label={t('common_paywall_promo_table_header_discount')} onChange={(event) => setGroupPromo({ ...groupPromo, discount: parseInt(event.currentTarget.value) })} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col sm-col-3 col-6 pr2' value={groupPromo.limit ? groupPromo.limit.toString() : ''} label='Limit' tooltip="The maximum number of times the promo code can be redeemed" onChange={(event) => setGroupPromo({ ...groupPromo, limit: parseInt(event.currentTarget.value) })} />
            </div>
            <GroupPromoDateContainer className='col col-12 mb2 flex flex-end'>
                <DateTimePicker
                    fullLineTz
                    showTimezone={false}
                    defaultTs={startDate}
                    callback={(ts: number) => setStartDate(ts)}
                    hideOption={t('common_paywall_promo_modal__available_dropdown_always_option')}
                    id="startDate"
                    dropdownTitle={t('common_paywall_promo_modal__available_dropdown_title')}
                />
            </GroupPromoDateContainer>
            <GroupPromoDateContainer className='col col-12 mb2 flex flex-end'>
                <DateTimePicker
                    fullLineTz
                    showTimezone={false}
                    defaultTs={endDate}
                    minDate={startDate}
                    callback={(ts: number) => setEndDate(ts)}
                    hideOption={t('common_paywall_promo_modal__available_dropdown_forever_option')}
                    id="endDate"
                    dropdownTitle={t('common_paywall_promo_modal__available_dropdown_until_option')}
                />
            </GroupPromoDateContainer>
            <div className=' col col-12 mb2'>
                {
                    (endDate > 0 || startDate > 0) &&
                    <DropdownSingle
                        hasSearch
                        id='groupPromoTimezoneDropdown'
                        dropdownDefaultSelect={groupPromo.timezone || null}
                        className='col col-6 pr2'
                        dropdownTitle='Timezone'
                        callback={(value: DropdownSingleListItem) => { setGroupPromo({ ...groupPromo, timezone: value.title.split(' ')[0] }) }}
                        list={timezoneDropdownList}
                        tooltip={"The time saved will be converted to Coordinated Universal Time (UTC), UTC +0"}
                    />
                }
                <DropdownSingle id='groupPromoDiscountAppliedDropdown' dropdownDefaultSelect={t(discountAppliedDropdownList.find(f => f.data.id === groupPromo.discountApplied).title)} className='col col-6' dropdownTitle={t('common_paywall_promo_modal_discount_applied_dropdown_title')} callback={(item: DropdownSingleListItem) => setGroupPromo({ ...groupPromo, discountApplied: item.data.id })} list={discountAppliedDropdownList.map(p => {return {title: t(p.title), data: {...p.data}}})} />
            </div>
            <div className='col col-12 py2'>
                <Button isLoading={buttonLoading} onClick={() => handleSubmit()} disabled={!modalValid} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>{props.groupPromo ? t('common_button_text_save') : t('common_button_text_create')}</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>{t('common_button_text_cancel')}</Button>
            </div>
        </div>

    )
}
