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
import { userToken } from '../../utils/token';
var moment = require('moment-timezone');

const defaultPromo: Promo = {
    id: 'custom',
    name: '',
    alphanumericCode: '',
    discount: NaN,
    limit: NaN,
    startDate: 0,
    endDate: 0,
    timezone: 'Etc/UTC',
    discountApplied: 'Once',
    assignedContentIds: [],
    assignedGroupIds: []
}

export const ContentPromoPresetsModal = (props: { contentType: string; contentId: string; actionButton: 'Create' | 'Save'; action: (p: Promo, contentId: string, contentType: string) => Promise<void>; toggle: (b: boolean) => void; promo: Promo; presetList: Promo[]; savePresetGlobally: (p: Promo) => Promise<void> }) => {

    const inputTimeToTs = (value: string, timezoneName: string) => {
        let offset = moment.tz(timezoneName).utcOffset()*60
        let splitValue = value.split(':')
        let hours = parseInt(splitValue[0]) * 3600
        if(isNaN(hours)){
            hours = 0
        }
        let min = !splitValue[1] ? 0 : parseInt(splitValue[1]) * 60
        if(isNaN(min)){
            min = 0
        }
        let total = hours + min - offset
        return total
    }




    const [newPromoPreset, setNewPromoPreset] = React.useState<Promo>(props.promo ? props.promo : defaultPromo);
    const [savePreset, setSavePreset] = React.useState<boolean>(false)

    let startTimestamp = moment.tz((newPromoPreset.startDate && newPromoPreset.startDate > 0 ? newPromoPreset.startDate : Math.floor(Date.now() / 1000))*1000, 'UTC')
    let endTimestamp = moment.tz((props.promo.endDate && newPromoPreset.endDate > 0 ? newPromoPreset.endDate : Math.floor(Date.now() / 1000))*1000, 'UTC')

    const [startDay, setStartDay] = React.useState<number>(startTimestamp.clone().startOf('day').valueOf()/1000)
    const [endDay, setEndDay] = React.useState<number>(endTimestamp.clone().startOf('day').valueOf()/1000)
    const [startTime, setStartTime] = React.useState<number>(startTimestamp.clone().valueOf()/1000 - startTimestamp.clone().startOf('day').valueOf()/1000)
    const [endTime, setEndTime] = React.useState<number>(endTimestamp.clone().valueOf()/1000 - endTimestamp.clone().startOf('day').valueOf()/1000)
    const [startDateTime, setStartDateTime] = React.useState<string>(newPromoPreset.startDate > 0 ? 'Set Date and Time' : 'Always')
    const [endDateTime, setEndDateTime] = React.useState<string>(newPromoPreset.endDate > 0 ? 'Set Date and Time' : 'Forever')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)



    const handleSubmit = () => {

        let startDate = startDateTime === 'Set Date and Time' ? moment.utc((startDay + startTime)*1000).valueOf()/1000 : 0
        let endDate = endDateTime === 'Set Date and Time' ? moment.utc((endDay + endTime)*1000).valueOf()/1000 : 0
        
        setButtonLoading(true)
        if (savePreset) { 
            props.savePresetGlobally({...newPromoPreset, startDate: startDate, endDate: endDate}) 
        } 
        const userId = userToken.getUserInfoItem('custom:dacast_user_id')
        props.action(
            {...newPromoPreset, 
                startDate: startDate, 
                endDate: endDate,
                discountApplied: newPromoPreset.discountApplied.toLowerCase(),
                assignedContentIds:[`${userId}-${props.contentType}-${props.contentId}`],
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
            </div>
            <div className='col col-12 mb2 flex items-end'>
            <DropdownSingle className='col col-12 md-col-4 mr2' id="availableStart" dropdownTitle="Available" dropdownDefaultSelect={startDateTime} list={{ 'Always': false, "Set Date and Time": false }} callback={(value: string) => {setStartDateTime(value)}} />
                {startDateTime === "Set Date and Time" &&
                    <>
                        <DateSinglePickerWrapper
                            date={moment.utc((startDay + startTime)*1000).tz(newPromoPreset.timezone || 'UTC')}
                            callback={(_, timestamp: string) => setStartDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((startDay + startTime)*1000).tz(newPromoPreset.timezone || 'UTC').format('HH:mm')}
                            onChange={(event) => setStartTime(inputTimeToTs(event.currentTarget.value, newPromoPreset.timezone || 'UTC'))}
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
                            date={moment.utc((endDay + endTime)*1000).tz(newPromoPreset.timezone || 'UTC')}
                            callback={(_, timestamp: string) => setEndDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-4 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((endDay + endTime)*1000).tz(newPromoPreset.timezone || 'UTC').format('HH:mm')}
                            onChange={(event) => setEndTime(inputTimeToTs(event.currentTarget.value, newPromoPreset.timezone || 'UTC'))}
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
                <DropdownSingle id='newPromoPresetDiscountAppliedDropdown' dropdownDefaultSelect={newPromoPreset.discountApplied} className={ClassHalfXsFullMd + ' pl1'} dropdownTitle='Discount Applied' callback={(value: string) => setNewPromoPreset({ ...newPromoPreset, discountApplied: value })} list={{ 'Once': false, 'Forever': false }} />
            </div>
            <div className='col col-12 mb2'>
                <Button
                    isLoading={buttonLoading}
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