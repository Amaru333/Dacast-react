import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { IconStyle } from '../../../../shared/Common/Icon';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Text } from '../../../../components/Typography/Text';
import { GroupStepperData } from './Groups';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { timezoneDropdownList, currencyDropdownList, presetTypeDropdownList, recurrenceDropdownList, durationDropdownList, startMethodDropdownList } from '../../../../utils/DropdownLists';

var moment = require('moment-timezone');

export const GroupDetailsStep = (props: { stepperData: GroupStepperData; updateStepperData: React.Dispatch<React.SetStateAction<GroupStepperData>>; setStepValidated: React.Dispatch<React.SetStateAction<boolean>> }) => {

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

    const convertTimeToTimestamp = (value: string, timezoneName: string) => {
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

    let startTimestamp = moment.tz((props.stepperData.firststep.groupSettings.startDate && props.stepperData.firststep.groupSettings.startDate > 0 ? props.stepperData.firststep.groupSettings.startDate : Math.floor(Date.now() / 1000))*1000, moment.tz.guess())
    const [startDay, setStartDay] = React.useState<number>(startTimestamp.clone().startOf('day').valueOf()/1000)
    const [startTime, setStartTime] = React.useState<number>(startTimestamp.clone().valueOf()/1000 - startTimestamp.clone().startOf('day').valueOf()/1000)

    React.useEffect(() => {
        props.updateStepperData({...props.stepperData, firststep: {...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, startDate: moment.utc((startDay + startTime)*1000).valueOf()/1000}}})
    }, [startDay, startTime, props.stepperData.firststep.groupSettings.timezone])


    return (
        <div>
            <div className='col col-12'>
                <Input className={ ClassHalfXsFullMd+'pr1 mb2'} label='Price Group Name' defaultValue={props.stepperData.firststep.name} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, name: event.currentTarget.value } })} />
                <DropdownSingle id='groupPriceTypeDropdown' className={ClassHalfXsFullMd+'pl1 mb2'} dropdownTitle='Preset Type' dropdownDefaultSelect={props.stepperData.firststep.groupSettings.type} callback={(item: DropdownSingleListItem) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings:{ ...props.stepperData.firststep.groupSettings, type: item.title, startMethod: item.title === 'Subscription' ? 'Upon Purchase' : props.stepperData.firststep.groupSettings.startMethod }}})} list={presetTypeDropdownList} />
            </div>
            <div className="mb2 clearfix">
               { props.stepperData.firststep.prices.map((price, key) => {
                return (
                    <div key={'groupPriceSection' + key} className={'col col-12 flex items-center ' + (key === props.stepperData.firststep.prices.length - 1 ? '' : 'mb2')}>
                        <div className='col sm-col-6 col-12 clearfix mxn1 flex'>
                            <Input type='number' className={"col sm-col-6 col-5 px1"} value={price.price.value > 0 ? price.price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? 'Price' : ''} />
                            <DropdownSingle className={'col sm-col-6 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(item: DropdownSingleListItem) => handlePriceChange(item.title, key, 'currency')} id={'groupPriceCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.price.currency} list={currencyDropdownList} />
                        </div>
                        {
                            key === props.stepperData.firststep.prices.length - 1 ?
                                <div onClick={() => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, prices: [...props.stepperData.firststep.prices, {price: { value: "", currency: 'USD' }}] } })} className={'pointer sm-ml2 col col-2 sm-col-6 px1 flex ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')}><IconStyle style={{ borderRadius: 4, backgroundColor: '#284CEB' }} coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div>

                                : <div className={'pointer sm-ml2 col col-2 sm-col-6 px1 ' + (key === 0 ? 'mt3 flex items-center' : 'my-auto')} ><IconStyle onClick={() =>   {var newList = props.stepperData.firststep.prices.filter((item, index) => { return index !== key });props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, prices: newList} }) }}  >close</IconStyle></div>
                        }
                </div>
            )
        })}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    props.stepperData.firststep.groupSettings.type === 'Subscription' ?
                        <DropdownSingle id='groupPriceRecurrenceDropdown' className="col col-6" dropdownDefaultSelect={props.stepperData.firststep.groupSettings.recurrence ? props.stepperData.firststep.groupSettings.recurrence.unit : 'Weekly'} dropdownTitle='Recurrence' list={recurrenceDropdownList} callback={(item: DropdownSingleListItem) => props.updateStepperData({...props.stepperData, firststep:{...props.stepperData.firststep, groupSettings:{ ...props.stepperData.firststep.groupSettings, recurrence: {unit: item.title}}}})} />
                        :
                        <>
                            <Input className='col col-6 pr2' label='Duration' defaultValue={props.stepperData.firststep.groupSettings.duration && props.stepperData.firststep.groupSettings.duration.value > 0 ? props.stepperData.firststep.groupSettings.duration.value.toString() : ''} onChange={(event) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, duration: { ...props.stepperData.firststep.groupSettings.duration, value: parseInt(event.currentTarget.value) } }} })} />
                            <DropdownSingle id='groupPriceDurationDropdown' className='col col-6 pr1 mt-auto' dropdownDefaultSelect={props.stepperData.firststep.groupSettings.duration ? props.stepperData.firststep.groupSettings.duration.unit : null} callback={(item: DropdownSingleListItem) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, duration: { ...props.stepperData.firststep.groupSettings.duration, unit: item.title } } }})} dropdownTitle='' list={durationDropdownList} />
                        </>
                }

            </div>
            <div className='col col-12 mb2'>
                <DropdownSingle id='groupPriceStartMethodDropdown' dropdownDefaultSelect={props.stepperData.firststep.groupSettings.startMethod} className={ClassHalfXsFullMd + ' pr1'} callback={(item: DropdownSingleListItem) => props.updateStepperData({ ...props.stepperData, firststep: { ...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, startMethod: item.title, startDate: item.title === 'Upon Purchase' ? 0 : props.stepperData.firststep.groupSettings.startDate }} })} list={startMethodDropdownList} dropdownTitle='Start Method' disabled={props.stepperData.firststep.groupSettings.type === 'Subscription'} />
                {
                    props.stepperData.firststep.groupSettings.startMethod === 'Schedule' && props.stepperData.firststep.groupSettings.type === 'Pay Per View' &&
                        <DropdownSingle 
                            hasSearch 
                            id='groupPriceTimezoneDropdown' 
                            className='col col-6 pl1 mt-auto' 
                            dropdownTitle='Timezone' 
                            dropdownDefaultSelect={moment.tz.guess() + ' (' + moment.tz(moment.tz.guess()).format('Z z') + ')'} 
                            list={timezoneDropdownList}
                            callback={(item: DropdownSingleListItem) => props.updateStepperData({...props.stepperData, firststep: {...props.stepperData.firststep, groupSettings: {...props.stepperData.firststep.groupSettings, timezone: item.title.split(' ')[0]}}})}
                        />
                }
            </div>
            {
                props.stepperData.firststep.groupSettings.startMethod === 'Schedule' && props.stepperData.firststep.groupSettings.type === 'Pay Per View' &&
                    <div className='col col-12 mb2'>
                        <DateSinglePickerWrapper
                            date={moment.utc((startDay + startTime)*1000).tz(props.stepperData.firststep.groupSettings.timezone || moment.tz.guess())}
                            callback={(_, timestamp: string) => setStartDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((startDay + startTime)*1000).tz(props.stepperData.firststep.groupSettings.timezone || moment.tz.guess()).format('HH:mm')}
                            onChange={(event) => setStartTime(convertTimeToTimestamp(event.currentTarget.value, props.stepperData.firststep.groupSettings.timezone || 'UTC'))}
                            className='col col-6 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </div>
            }
        </div>
    )
}