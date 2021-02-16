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
import { defaultPaywallTimezone } from '../../../../utils/services/date/dateService';

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
        startMethod: 'Upon Purchase',
        timezone: null,
        startDate: 0,
    }
}

export const PricePresetsModal = (props: {action: (p: Preset) => Promise<void>; toggle: (b: boolean) => void; preset: Preset}) => {
    
    const [presetsList, setPresetsList] = React.useState<Preset>(props.preset ? {...props.preset, settings: { ...props.preset.settings, timezone: defaultPaywallTimezone }} : defaultPreset)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

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
                        <Input type='number' className={"col sm-col-3 col-5 pr1"} value={price.value > 0 ? price.value.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? 'Price' : ''} /> 
                        <DropdownSingle className={'col sm-col-3 col-5 pl1 ' + (key === 0 ? 'mt-auto' : '')} callback={(item: DropdownSingleListItem) => handlePriceChange(item.title, key, 'currency')} id={'pricePresetCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={currencyDropdownList }  />

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
                <Input className={ ClassHalfXsFullMd+'pr1 mb2'} label='Preset Name' defaultValue={presetsList.name} onChange={(event) => setPresetsList({...presetsList, name: event.currentTarget.value})} />
                <DropdownSingle 
                    id='pricePresetTypeDropdown' 
                    className={ClassHalfXsFullMd+'pl1 mb2'} 
                    dropdownTitle='Preset Type' 
                    dropdownDefaultSelect={presetsList.priceType}
                    callback={(item: DropdownSingleListItem) => setPresetsList({...presetsList, priceType: item.title, settings:{...presetsList.settings, startMethod: item.title === 'Subscription' ? 'Upon Purchase' : presetsList.settings.startMethod, recurrence: item.title == 'Pay Per View' ? null: {unit: 'Weekly'}, duration: item.title === 'Pay Per View' ? {value: NaN, unit: 'Hours'} : null}})} 
                    list={presetTypeDropdownList} 
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
                            callback={(item: DropdownSingleListItem) => setPresetsList({...presetsList, settings:{...presetsList.settings, recurrence: {unit: item.title}}})}
                            list={recurrenceDropdownList} 
                        />
                        :
                        <>
                            <Input className='col col-6 pr2'  label='Duration' defaultValue={presetsList.settings.duration.value ? presetsList.settings.duration.value.toString() : ''} onChange={(event) => setPresetsList({...presetsList, settings: {...presetsList.settings, duration: {...presetsList.settings.duration, value: parseInt(event.currentTarget.value)}}})} />
                            <DropdownSingle id='pricePresetDurationDropdown' className='col col-6 pr1 mt-auto' dropdownDefaultSelect={presetsList.settings.duration.unit} callback={(item: DropdownSingleListItem) => setPresetsList({...presetsList, settings:{ ...presetsList.settings, duration: {...presetsList.settings.duration, unit: item.title}}})} dropdownTitle='' list={durationDropdownList} />
                        </>
                }

            </div>
            <div className='col col-12 mb2 flex items-end'>
                <DateTimePicker
                    fullLineTz
                    showTimezone={true}
                    defaultTs={presetsList.settings.startDate}
                    timezone={presetsList.settings.timezone}
                    callback={(ts: number, timezone: string) => setPresetsList({...presetsList, settings:{ ...presetsList.settings, startMethod: ts === 0 ? 'Upon Purchase' : "Schedule", startDate: ts,  timezone: timezone}}) }
                    hideOption="Upon Purchase"
                    id="endDate"
                    dropdownTitle="Start Method"
                    disabled={presetsList.priceType === 'Subscription'}
                />
            </div>
            <div className='col col-12 mt3'>
        <Button isLoading={buttonLoading} disabled={!presetsList.name || (presetsList.priceType === 'Pay Per View' && Number.isNaN(presetsList.settings.duration.value)) || presetsList.prices.some(price => Number.isNaN(price.value))} onClick={() => {handleSubmit()}} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>{props.preset ? "Save" : "Create"}</Button>
                <Button onClick={() => {props.toggle(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}