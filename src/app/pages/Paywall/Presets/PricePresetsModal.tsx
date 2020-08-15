import React from 'react';
import {Input} from '../../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Preset } from '../../../redux-flow/store/Paywall/Presets/types';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Text } from '../../../../components/Typography/Text';
import { ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { CURRENCY } from '../../../constants/Currencies';
import { presets } from '../../../constants/DatepickerPresets';

var moment = require('moment-timezone');

const pricesList = [
    {
        value: NaN,
        currency: 'USD'
    }
]

const defaultPreset: Preset = {
    id: '-1',
    name: '',
    type: 'Pay Per View',
    prices: pricesList,
    settings: {
        duration: {value: NaN, unit: 'Hours'},
        recurrence: null,
        startMethod: 'Upon Purchase',
        timezone: 'Etc/UTC',
        startDate: 0,
    }
}

export const PricePresetsModal = (props: {action: (p: Preset) => Promise<void>; toggle: (b: boolean) => void; preset: Preset}) => {
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

    const [presetsList, setPresetsList] = React.useState<Preset>(props.preset ? props.preset : defaultPreset)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        setPresetsList(props.preset ? props.preset : {...defaultPreset, prices: [{value: NaN, currency: 'USD'}]});
    }, [])

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = presetsList.prices;
        if(inputChange === 'amount') {
            tempPrices[key].value = parseInt(value);
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
                        <Input className={"col sm-col-3 col-5 pr1"} value={price.value > 0 ? price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? 'Price' : ''} /> 
                        <DropdownSingle className={'col sm-col-3 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'pricePresetCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={CURRENCY.reduce((reduced: DropdownListType, item: string)=> {return {...reduced, [item]: false}},{}) }  />

                        {
                            key === presetsList.prices.length - 1 ? 
                                <div onClick={() => setPresetsList({...presetsList, prices: [...presetsList.prices, {value: NaN, currency: 'USD'}]})} className={'pointer sm-ml2 col col-2 sm-col-6 px1 flex items-center xs-justify-center ' + (key === 0 ? 'mt3' : '')}><IconStyle style={{borderRadius: 4, backgroundColor:'#284CEB'}}coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show ' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div> 
                                : <div className={'pointer col col-2 sm-col-6 sm-ml2 px1 flex items-center xs-justify-center ' + (key === 0 ? 'mt3' : '')} ><IconStyle onClick={() => { var newList= presetsList.prices.filter((item, index) => {return index !== key}); setPresetsList({...presetsList, prices: newList})}} >close</IconStyle></div>
                        }
                    </div>
                </div>
            )
        })
    }

    let startTimestamp = moment.tz((props.preset.settings.startDate || Math.floor(Date.now() / 1000))*1000, 'UTC')

    const [startDay, setStartDay] = React.useState<number>(startTimestamp.clone().startOf('day').valueOf()/1000)
    const [startTime, setStartTime] = React.useState<number>(startTimestamp.clone().valueOf()/1000 - startTimestamp.clone().startOf('day').valueOf()/1000)

    const handleSubmit = () => {
        setButtonLoading(true)
        let startDate = moment.utc((startDay + startTime)*1000).valueOf()/1000

        props.action({...presetsList, settings: {...presetsList.settings, startDate: startDate}}).then(() => {
            setButtonLoading(false)
            props.toggle(false)
        }).catch(() => {
            setButtonLoading(false)
        })
    }

    return (
        <div>
            <div className='col col-12 clearfix'>
                <Input className={ ClassHalfXsFullMd+'pr1 mb2'} label='Preset Name' defaultValue={presetsList.name} onChange={(event) => setPresetsList({...presetsList, name: event.currentTarget.value})} />
                <DropdownSingle 
                    id='pricePresetTypeDropdown' 
                    className={ClassHalfXsFullMd+'pl1 mb2'} 
                    dropdownTitle='Preset Type' 
                    dropdownDefaultSelect={presetsList.type}
                    callback={(value: string) => setPresetsList({...presetsList, type: value, settings:{...presetsList.settings, startMethod: value === 'Subscription' ? 'Upon Purchase' : presetsList.settings.startMethod, recurrence: value == 'Pay Per View' ? null: {unit: 'Weekly'}, duration: value === 'Pay Per View' ? {value: NaN, unit: 'Hours'} : null}})} 
                    list={{'Pay Per View': false, 'Subscription': false}} 
                />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    presetsList.type === 'Subscription' ?
                        <DropdownSingle id='pricePresetRecurrenceDropdown' 
                            dropdownDefaultSelect={presetsList.settings.recurrence.unit} 
                            dropdownTitle='Recurrence' 
                            callback={(value: string) => setPresetsList({...presetsList, settings:{...presetsList.settings, recurrence: {unit: value}}})}
                            list={{'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false}} 
                        />
                        :
                        <>
                            <Input className='col col-6 pr2'  label='Duration' defaultValue={presetsList.settings.duration.value ? presetsList.settings.duration.value.toString() : ''} onChange={(event) => setPresetsList({...presetsList, settings: {...presetsList.settings, duration: {...presetsList.settings.duration, value: parseInt(event.currentTarget.value)}}})} />
                            <DropdownSingle id='pricePresetDurationDropdown' className='col col-6 pr1 mt-auto' dropdownDefaultSelect={presetsList.settings.duration.unit} callback={(value: string) => setPresetsList({...presetsList, settings:{ ...presetsList.settings, duration: {...presetsList.settings.duration, unit: value}}})} dropdownTitle='' list={{'Hours': false, 'Days': false, 'Weeks': false, 'Months': false}} />
                        </>
                }

            </div>
            <div className='col col-12 mb2'>
                <DropdownSingle 
                    id='pricePresetStartMethodDropdown' 
                    dropdownDefaultSelect={presetsList.settings.startMethod} 
                    className={ClassHalfXsFullMd + ' pr1'} 
                    callback={(value: string) => setPresetsList({...presetsList, settings:{ ...presetsList.settings, startMethod: value, startDate: 0 }})} 
                    list={{'Upon Purchase': false, 'Schedule': false}} dropdownTitle='Start Method' disabled={presetsList.type === 'Subscription'}
                />
                {
                    (presetsList.settings.startMethod === 'Schedule' && presetsList.type === 'Pay Per View') &&
                        <DropdownSingle 
                            hasSearch 
                            id='pricePresetTimezoneDropdown' 
                            className={ClassHalfXsFullMd + ' px1'}
                            dropdownTitle='Timezone' 
                            callback={(value: string) => setPresetsList({...presetsList, settings: {...presetsList.settings, timezone: value.split(' ')[0]}})} 
                            dropdownDefaultSelect={moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')'}
                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})} 
                            
                        />
                }
            </div>
            {  
                (presetsList.settings.startMethod === 'Schedule' && presetsList.type === 'Pay Per View') &&
                    <div className='col col-12 mb2'>

                        <DateSinglePickerWrapper
                            date={moment.utc((startDay + startTime)*1000).tz(presetsList.settings.timezone || 'UTC')}
                            callback={(_, timestamp: string) => setStartDay(moment.tz(parseInt(timestamp)*1000, 'UTC').startOf('day').valueOf()/1000)}
                            className='col col-6 md-col-4 mr2' />
                        <Input
                            type='time'
                            value={moment.utc((startDay + startTime)*1000).tz(presetsList.settings.timezone || 'UTC').format('HH:mm')}
                            onChange={(event) => setStartTime(inputTimeToTs(event.currentTarget.value, presetsList.settings.timezone || 'UTC'))}
                            className='col col-6 md-col-3'
                            disabled={false}
                            id='endTime'
                            pattern="[0-9]{2}:[0-9]{2}"
                            
                        />
                    </div>
            }
            <div className='col col-12 mt3'>
                <Button isLoading={buttonLoading} disabled={!presetsList.name || (presetsList.type === 'Pay Per View' && Number.isNaN(presetsList.settings.duration.value)) || presetsList.prices.some(price => Number.isNaN(price.value))} onClick={() => {handleSubmit()}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Create</Button>
                <Button onClick={() => {props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}