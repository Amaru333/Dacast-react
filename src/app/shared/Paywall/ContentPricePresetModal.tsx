import React from 'react';
import {Input} from '../../../components/FormsComponents/Input/Input';
import {DropdownSingle} from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Preset, PresetsPageInfos } from '../../redux-flow/store/Paywall/Presets/types';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
import { ClassHalfXsFullMd } from '../General/GeneralStyle';

var moment = require('moment-timezone');

const pricesList = [
    {
        amount: NaN,
        currency: 'USD'
    }
]

const defaultPreset: Preset = {
    id: '-1',
    name: '',
    type: 'Pay Per View',
    price: pricesList,
    duration: {amount: NaN, type: 'Hours'},
    recurrence: 'Weekly',
    startMethod: 'Upon Purchase',
    timezone: null,
    startDate: null,
    startTime: '00:00'

}

export const ContentPricePresetsModal = (props: {action: Function; toggle: Function; preset: Preset; presetList: Preset[]; savePresetGlobally: Function}) => {

    const [newPricePreset, setNewPricePreset] = React.useState<Preset>(defaultPreset);
    const [savePreset, setSavePreset] = React.useState<boolean>(false)

    const handlePriceChange = (value: string, key: number, inputChange: string) => {
        let tempPrices = newPricePreset.price;
        if(inputChange === 'amount') {
            tempPrices[key].amount = parseInt(value);
        }
        else {
            tempPrices[key].currency = value;
        }
        setNewPricePreset({...newPricePreset, price: tempPrices});
    }   

    const renderPrices = () => {
        return newPricePreset.price.map((price, key) => {
            return( 
                <div key={'pricePresetPriceSection' + key} className={'col col-12 flex items-center '+(key === newPricePreset.price.length - 1 ? '' : 'mb2' )}>
                    <div className='col col-12 clearfix mxn1 flex'>
                        <Input className={"col sm-col-3 col-5 px1"} value={price.amount > 0 ? price.amount.toString() : ''} onChange={(event) => handlePriceChange(event.currentTarget.value, key, 'amount')} label={key === 0 ? 'Price' : ''} />
                        <DropdownSingle className={'col sm-col-3 col-5 px1 ' + (key === 0 ? 'mt-auto' : '')} callback={(value: string) => handlePriceChange(value, key, 'currency')} id={'pricePresetCurrencyDropdown' + key} dropdownTitle='' dropdownDefaultSelect={price.currency} list={{'USD': false, 'AUD': false, 'GBP': false}} />
                        {
                            key === newPricePreset.price.length - 1 ? 
                                <div onClick={() => setNewPricePreset({...newPricePreset, price: [...newPricePreset.price, {amount: NaN, currency: 'USD'}]})} className={'pointer col col-2 sm-col-6 px1 flex '+(key===0 ? 'mt3 flex items-center' : 'my-auto')}><IconStyle style={{borderRadius: 4, backgroundColor:'#284CEB'}}coloricon='white'>add_box</IconStyle><Text className='pl1 sm-show' size={14} color='dark-violet' weight='med'>Add Another Price</Text></div> 
                                : <div className={'pointer col col-2 sm-col-6 px1 '+(key===0 ? 'mt3 flex items-center' : 'my-auto')} ><IconStyle onClick={() => { var newList= newPricePreset.price.filter((item, index) => {return index !== key}); setNewPricePreset({...newPricePreset, price: newList})}} >close</IconStyle></div>
                        }
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <PresetSelectRow className='col col-12 mb2'>
                <DropdownSingle 
                    id='pricePresetSelectDropdown' 
                    className='col col-6' 
                    dropdownTitle='Preset' 
                    list={props.presetList ? props.presetList.reduce((reduced: DropdownListType, preset: Preset)=> {return {...reduced, [preset.name]: false }},{}) : {}} 
                    callback={(selectedPreset: string) => {return setNewPricePreset(props.presetList.find(preset => preset.name === selectedPreset));}}
                />
                {
                    newPricePreset.id === "custom" ?
                        <InputCheckbox  className="ml2 mt-auto" id='pricePresetSaveCheckbox' label='Save as Price Preset' onChange={() => setSavePreset(!savePreset)} />
                        : null
                }
               
            </PresetSelectRow>
            <div className={'col col-12 clearfix '+ (savePreset ? 'sm-py1' : '')}>
                { savePreset ? 
                    <Input className='col mb2 col-12 sm-col-6 sm-pr1' label='Preset Name' onChange={(event) => setNewPricePreset({...newPricePreset, name: event.currentTarget.value})} /> : null
                }
                
                <DropdownSingle 
                    id='pricePresetTypeDropdown' 
                    className={'col col-12 sm-col-6 mb2 '+ (savePreset ? 'sm-pl1' : '')} 
                    dropdownTitle='Preset Type'
                    dropdownDefaultSelect={newPricePreset.type} 
                    list={{'Pay Per View': false, 'Subscription': false}}
                    callback={(value: string) => setNewPricePreset({...newPricePreset, type: value, startMethod: value === 'Subscription' ? 'Upon Purchase' : newPricePreset.startMethod})} 
                />
            </div>
            <div className="mb2 clearfix">
                {renderPrices()}
            </div>
            <div className='col col-12 sm-col-6 mb2 flex'>
                {
                    newPricePreset.type === 'Subscription' ?
                        <DropdownSingle 
                            id='pricePresetRecurrenceDropdown' dropdownDefaultSelect={newPricePreset.recurrence} dropdownTitle='Recurrence' 
                            list={{'Weekly': false, 'Monthly': false, 'Quaterly': false, 'Biannual': false}} 
                        />
                        :
                        <>
                            <Input 
                                className='col col-6 pr1' 
                                label='Duration' 
                                defaultValue={newPricePreset.duration.amount ? newPricePreset.duration.amount.toString() : ''} onChange={(event) => setNewPricePreset({...newPricePreset, duration: {...newPricePreset.duration, amount: parseInt(event.currentTarget.value)}})} 
                            />
                            <DropdownSingle 
                                id='pricePresetDurationDropdown' className='col col-6 pl1 mt-auto' dropdownDefaultSelect={newPricePreset.duration.type} callback={(value: string) => setNewPricePreset({...newPricePreset, duration: {...newPricePreset.duration, type: value}})} dropdownTitle='' 
                                list={{'Hours': false, 'Days': false, 'Weeks': false, 'Month': false}} 
                            />
                        </>
                }

            </div>
            <div className='col col-12 mb2'>
                <DropdownSingle 
                    id='pricePresetStartMethodDropdown' dropdownDefaultSelect={newPricePreset.startMethod} className={ClassHalfXsFullMd + ' pr1'}
                    callback={(value: string) => setNewPricePreset({...newPricePreset, startMethod: value})} 
                    list={{'Upon Purchase': false, 'Schedule': false}} dropdownTitle='Start Method' 
                    disabled={newPricePreset.type === 'Subscription'}
                />
                {
                    newPricePreset.startMethod === 'Schedule' && newPricePreset.type === 'Pay Per View' ?
                        <DropdownSingle 
                            hasSearch 
                            id='pricePresetTimezoneDropdown' 
                            className={ClassHalfXsFullMd + ' px1'}
                            dropdownTitle='Timezone' 
                            dropdownDefaultSelect={moment.tz.guess()+ ' (' +moment.tz(moment.tz.guess()).format('Z z') + ')'}
                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})}    
                        />
                        : null
                }
            </div>
            {  
                newPricePreset.startMethod === 'Schedule' && newPricePreset.type === 'Pay Per View' ?  
                    <div className='col col-12 mb2'>
                        <DateSinglePickerWrapper openDirection='up' className='col col-8 pr1' datepickerTitle='Start Date' />
                        <Input className='col col-4 pl1' type='time' defaultValue={newPricePreset.startTime} label='Start Time' />
                    </div>
                    : null
            }
            <div className='col col-12 mt3'>
                <Button 
                    disabled={!newPricePreset.name || (newPricePreset.type === 'Pay Per View' && Number.isNaN(newPricePreset.duration.amount)) || newPricePreset.price.some(price => Number.isNaN(price.amount))} 
                    onClick={() => {if (savePreset) {props.savePresetGlobally(newPricePreset)}; props.action(newPricePreset);props.toggle(false)}} className='mr2' 
                    typeButton='primary' 
                    sizeButton='large' 
                    buttonColor='blue'>
                        Create
                </Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}

const PresetSelectRow = styled.div`
    display: flex;
    align-items: center;
`