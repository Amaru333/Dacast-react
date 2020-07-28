import React from 'react';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../..//components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../..//components/FormsComponents/Button/Button';
import { DropdownListType } from '../../..//components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../..//components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Text } from '../../..//components/Typography/Text';
import { Promo } from '../../redux-flow/store/Paywall/Presets/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
import { ClassHalfXsFullMd } from '../General/GeneralStyle';
import { addTokenToHeader } from '../../utils/token';
var moment = require('moment-timezone');

const defaultPromo: Promo = {
    id: 'custom',
    name: '',
    alphanumericCode: '',
    discount: NaN,
    limit: NaN,
    rateType: 'Pay Per View',
    startDate: 0,
    endDate: 0,
    timezone: 'Etc/UTC',
    discountApplied: 'Once',
    assignedContentIds: [],
    assignedGroupIds: []
}

export const ContentPromoPresetsModal = (props: { contentType: 'vod' | 'live' | 'playlist'; contentId: string; actionButton: 'Create' | 'Save'; action: Function; toggle: Function; promo: Promo; presetList: Promo[]; savePresetGlobally: Function }) => {

    const initTimestampValues = (ts: number): {date: any; time: string} => {
        if(ts > 0 ) {
            return {date: moment(ts).format('YYYY-MM-DD hh:mm').split(' ')[0], time: moment(ts).format('YYYY-MM-DD hh:mm').split(' ')[1]}
        } 
        return {date: moment().format('YYYY-MM-DD hh:mm').split(' ')[0], time: '00:00'}
    }

    const [newPromoPreset, setNewPromoPreset] = React.useState<Promo>(props.promo ? props.promo : defaultPromo);
    const [savePreset, setSavePreset] = React.useState<boolean>(false)

    const [startDateTimeValue, setStartDateTimeValue] = React.useState<{date: string; time: string;}>({date: initTimestampValues(props.promo ? props.promo.startDate : defaultPromo.startDate).date, time: initTimestampValues(props.promo ? props.promo.startDate : defaultPromo.startDate).time})
    const [endDateTimeValue, setEndDateTimeValue] = React.useState<{date: string; time: string;}>({date: initTimestampValues(props.promo ? props.promo.endDate : defaultPromo.endDate).date, time: initTimestampValues(props.promo ? props.promo.endDate : defaultPromo.endDate).time})
    const [startDateTime, setStartDateTime] = React.useState<string>(newPromoPreset.startDate > 0 ? 'Set Date and Time' : 'Always')
    const [endDateTime, setEndDateTime] = React.useState<string>(newPromoPreset.endDate > 0 ? 'Set Date and Time' : 'Forever')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        let startDate = moment.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${newPromoPreset.timezone}`).utc().valueOf()
        let endDate = moment.tz(`${endDateTimeValue.date} ${endDateTimeValue.time}`, `${newPromoPreset.timezone}`).utc().valueOf()
        setStartDateTimeValue({date: initTimestampValues(startDate).date, time: initTimestampValues(startDate).time})
        setEndDateTimeValue({date: initTimestampValues(endDate).date, time: initTimestampValues(endDate).time})
        setNewPromoPreset({...newPromoPreset, startDate: startDate, endDate: endDate})
    }, [newPromoPreset.timezone])

    const handleSubmit = () => {
        if (savePreset) { 
            props.savePresetGlobally(newPromoPreset) 
        } 
        let {userId} = addTokenToHeader()
        let startDate = startDateTime === 'Set Date and Time' ? moment.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${newPromoPreset.timezone}`).valueOf() : 0
        let endDate = endDateTime === 'Set Date and Time' ? moment.tz(`${endDateTimeValue.date} ${endDateTimeValue.time}`, `${newPromoPreset.timezone}`).valueOf() : 0
        props.action(
            {...newPromoPreset, 
                startDate: startDate, 
                endDate: endDate,
                discountApplied: newPromoPreset.discountApplied ? newPromoPreset.discountApplied.toLowerCase() : 'once',
                assignedContentIds:[`${userId}-${props.contentType}-${props.contentId}`],
                assignedGroupIds: [],
                name: null,
                id: props.actionButton === 'Create' ? null : newPromoPreset.id
            }, props.contentId)
        props.toggle(false)
    }

    return (
        <div>
            <PresetSelectRow className='col col-12 mb2'>
                <DropdownSingle
                    id='pricePresetSelectDropdown'
                    className='col col-6'
                    dropdownTitle='Preset'
                    dropdownDefaultSelect='Custom Promo'
                    list={props.presetList ? props.presetList.reduce((reduced: DropdownListType, preset: Promo) => { return { ...reduced, [preset.name]: false } }, {}) : {}}
                    callback={(selectedPreset: string) => { return setNewPromoPreset({...props.presetList.find(preset => preset.name === selectedPreset), alphanumericCode: ''}) }}
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

                <Input className={'col col-12 sm-col-6 mb2 ' + (savePreset ? 'sm-pl1' : '')} disabled={props.actionButton === 'Save'} value={newPromoPreset.alphanumericCode} label='Alphanumeric Code' onChange={(event) => setNewPromoPreset({ ...newPromoPreset, alphanumericCode: event.currentTarget.value })} tooltip="Minimum 5 Characters" />
            </div>
            <div className='col col-12 mb2'>
                <Input className='col sm-col-3 col-6 pr1 xs-mb2' value={newPromoPreset.discount ? newPromoPreset.discount.toString() : ''} label='Discount' onChange={(event) => setNewPromoPreset({ ...newPromoPreset, discount: parseInt(event.currentTarget.value) })} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                <Input className='col sm-col-3 col-6 px1' value={newPromoPreset.limit ? newPromoPreset.limit.toString() : ''} label='Limit' onChange={(event) => setNewPromoPreset({ ...newPromoPreset, limit: parseInt(event.currentTarget.value) })} />
                <DropdownSingle id='newPromoPresetRateTypeDropdown' dropdownDefaultSelect={newPromoPreset.rateType} className='col sm-col-6 col-12 sm-pl1' dropdownTitle='Rate Type' callback={(value: string) => setNewPromoPreset({ ...newPromoPreset, rateType: value })} list={{ 'Pay Per View': false, 'Subscription': false }} />
            </div>
            <div className='col col-12 mb2 flex items-end'>
            <DropdownSingle className='col col-12 md-col-4 mr2' id="availableStart" dropdownTitle="Available" dropdownDefaultSelect={startDateTime} list={{ 'Always': false, "Set Date and Time": false }} callback={(value: string) => {setStartDateTime(value)}} />
                {startDateTime === "Set Date and Time" &&
                    <>
                        <DateSinglePickerWrapper
                            date={moment(startDateTimeValue.date)}
                            callback={(date: string) => { setStartDateTimeValue({...startDateTimeValue, date: date}) }}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            defaultValue={startDateTimeValue.time}
                            onChange={(event) =>{ setStartDateTimeValue({...startDateTimeValue, time: event.currentTarget.value})} }
                            className='col col-6 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </>
                }
            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DropdownSingle className='col col-4 md-col-4 mr2' id="availableEnd" dropdownTitle="Until" dropdownDefaultSelect={endDateTime} list={{ 'Forever': false, "Set Date and Time": false }} callback={(value: string) => {setEndDateTime(value)}} />
                {
                    endDateTime === "Set Date and Time" &&
                    <>
                        <DateSinglePickerWrapper
                            date={moment(endDateTimeValue.date)}
                            callback={(date: string) => {setEndDateTimeValue({...endDateTimeValue, date: date}) }}
                            className='col col-4 md-col-4 mr2' />
                        <Input
                            type='time'
                            defaultValue={endDateTimeValue.time}
                            onChange={(event) => {setEndDateTimeValue({...endDateTimeValue, time: event.currentTarget.value})}}
                            className='col col-3 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </>
                }
            </div>
            <div className=' col col-12 mb25'>
                <DropdownSingle 
                    hasSearch 
                    id='newPromoPresetTimezoneDropdown' 
                    dropdownDefaultSelect='Etc/UTC (+00:00 UTC)' 
                    className={ClassHalfXsFullMd + ' pr1'} 
                    dropdownTitle='Timezone' 
                    callback={(value: string) => setNewPromoPreset({ ...newPromoPreset, timezone: value.split(' ')[0] })} list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => { return { ...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false } }, {})} />
                {
                    newPromoPreset.rateType === 'Subscription' &&
                        <DropdownSingle id='newPromoPresetDiscountAppliedDropdown' dropdownDefaultSelect={newPromoPreset.discountApplied} className={ClassHalfXsFullMd + ' pl1'} dropdownTitle='Discount Applied' callback={(value: string) => setNewPromoPreset({ ...newPromoPreset, discountApplied: value })} list={{ 'Once': false, 'Forever': false }} />
                }
            </div>
            <div className='col col-12 mb2'>
                <Button
                    disabled={(!newPromoPreset.name && newPromoPreset.id !== 'custom' && !props.promo) || Number.isNaN(newPromoPreset.discount) || newPromoPreset.alphanumericCode.length < 5 || Number.isNaN(newPromoPreset.limit)}
                    onClick={() =>  handleSubmit()}
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