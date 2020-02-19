import React from 'react'
import { Card } from '../../../components/Card/Card'
import { Text } from '../../../components/Typography/Text'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Toggle } from '../../../components/Toggle/toggle'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Table } from '../../../components/Table/Table'
import { PricePresetsModal } from '../../Paywall/Presets/PricePresetsModal'
import { Modal } from '../../../components/Modal/Modal'
import { PromoPresetsModal } from '../../Paywall/Presets/PromoPresetsModal'
import { Icon } from '@material-ui/core'
import { Preset, Promo } from '../../../redux-flow/store/VOD/Paywall'
import { VodPaywallComponentProps } from '../../../containers/Videos/Paywall'
import { BorderStyle, IconContainer } from '../../Paywall/Presets/PresetsStyle'

export const VodPaywallPage = (props: VodPaywallComponentProps) => {

    const [pricePresetsModalOpened, setPricePresetsModalOpened] = React.useState<boolean>(false);
    const [promoPresetsModalOpened, setPromoPresetsModalOpened] = React.useState<boolean>(false);
    const [selectedPreset, setSelectedPreset] = React.useState<Preset>(null);
    const [selectedPromo, setSelectedPromo] = React.useState<Promo>(null);

    const pricePresetsTableHeader = () => {
        return [
            <Text key='pricePresetsTableHeaderName' size={14} weight='med'>Name</Text>,
            <Text key='pricePresetsTableHeaderType' size={14} weight='med'>Type</Text>,
            <Text key='pricePresetsTableHeaderPrice' size={14} weight='med'>Price</Text>,
            <Text key='pricePresetsTableHeaderCurrency' size={14} weight='med'>Currency</Text>,
            <Text key='pricePresetsTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>,
            <Text key='pricePresetsTableHeaderMethod' size={14} weight='med'>Start Method</Text>,
            <Button key='pricePresetsTableHeaderButton' className='right mr2' onClick={() => {setSelectedPreset(null);setPricePresetsModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price Preset</Button>

        ]
    }

    const pricePresetsTableBody = () => {
        if(props.VodPaywallInfos.presets) {
            return props.VodPaywallInfos.presets.map((preset, key) => {
                return [
                    <Text key={'pricePresetsTableBodyName' + key} size={14} weight='reg'>{preset.name}</Text>,
                    <Text key={'pricePresetsTableBodyType' + key} size={14} weight='reg'>{preset.type}</Text>,
                    <Text key={'pricePresetsTableBodyPrice' + key} size={14} weight='reg'>{preset.price[0].amount}</Text>,
                    <Text key={'pricePresetsTableBodyCurrency' + key} size={14} weight='reg'>{preset.price[0].currency}</Text>,
                    <Text key={'pricePresetsTableBodyDuration' + key} size={14} weight='reg'>{preset.recurrence ? preset.recurrence : preset.duration.amount + ' ' + preset.duration.type}</Text>,
                    <Text key={'pricePresetsTableBodyMethod' + key} size={14} weight='reg'>{preset.startMethod}</Text>,
                    <IconContainer className="iconAction" key={'pricePresetsTableBodyActionButtons' + key}><Icon onClick={() =>  {props.deleteVodPricePreset(preset)}}>delete</Icon><Icon onClick={() =>  {setSelectedPreset(preset);setPricePresetsModalOpened(true)}}>edit</Icon></IconContainer>
                ]
            })
        }
    }

    const promoPresetsTableHeader = () => {
        return [
            <Text key='promoPresetsTableHeaderName' size={14} weight='med'>Name</Text>,
            <Text key='promoPresetsTableHeaderType' size={14} weight='med'>Type</Text>,
            <Text key='promoPresetsTableHeaderCode' size={14} weight='med'>Code</Text>,
            <Text key='promoPresetsTableHeaderDiscount' size={14} weight='med'>Discount</Text>,
            <Text key='promoPresetsTableHeaderLimit' size={14} weight='med'>Limit</Text>,
            <Button key='promoPresetsTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoPresetsModalOpened(true)}} className='right mr2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo Preset</Button>

        ]
    }

    const promoPresetsTableBody = () => {
        if(props.VodPaywallInfos.promos) {
            return props.VodPaywallInfos.promos.map((promo, key) => {
                return [
                    <Text key={'promoPresestTableBodyName' + key} size={14} weight='reg'>{promo.name}</Text>,
                    <Text key={'promoPresetsTableBodyType' + key} size={14} weight='reg'>{promo.rateType}</Text>,
                    <Text key={'promoPresetsTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promoPresetsTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}</Text>,
                    <Text key={'promoPresetsTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    <IconContainer className="iconAction" key={'promoPresetsTableBodyActionButtons' + key}><Icon onClick={() =>  {props.deleteVodPromoPreset(promo)}}>delete</Icon><Icon onClick={() =>  {setSelectedPromo(promo);setPromoPresetsModalOpened(true)}}>edit</Icon></IconContainer>
                ]
            })
        }
    }

    const groupPricesTableHeader = () => {
        return [
            <Text key='groupPricesTableHeaderName' size={14} weight='med'>Name</Text>,
            <Text key='groupPricesTableHeaderType' size={14} weight='med'>Type</Text>,
            <Text key='groupPricesTableHeaderPrice' size={14} weight='med'>Price</Text>,
            <Text key='groupPricesTableHeaderCurrency' size={14} weight='med'>Currency</Text>,
            <Text key='groupPricesTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>,
            <Text key='groupPricesTableHeaderMethod' size={14} weight='med'>Start Method</Text>,
        ]
    }

    const groupPricesTableBody = () => {
        if(props.groupsInfos.prices) {
            return props.groupsInfos.prices.map((price, key) => {
                return [
                    <Text key={'groupPricesTableBodyName' + key} size={14} weight='reg'>{price.name}</Text>,
                    <Text key={'groupPricesTableBodyType' + key} size={14} weight='reg'>{price.type}</Text>,
                    <Text key={'groupPricesTableBodyPrice' + key} size={14} weight='reg'>{price.price[0].amount}</Text>,
                    <Text key={'groupPricesTableBodyCurrency' + key} size={14} weight='reg'>{price.price[0].currency}</Text>,
                    <Text key={'groupPricesTableBodyDuration' + key} size={14} weight='reg'>{price.recurrence ? price.recurrence : price.duration.amount + ' ' + price.duration.type}</Text>,
                    <Text key={'groupPricesTableBodyMethod' + key} size={14} weight='reg'>{price.startMethod}</Text>,
                ]
            })
        }
    }

    const emptyPricePresetTableHeader = () => {
        return [
            <span key={"emptyPricePresetTableHeader"}></span>,
            <Button key='pricePresetsTableHeaderButton' className='right mr2' onClick={() => {setSelectedPreset(null);setPricePresetsModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price Preset</Button>
        ]
    }

    const emptyPromoPresetTableHeader = () => {
        return [
            <span key={"emptyPromoPresetTableHeader"}></span>,
            <Button key='promoPresetsTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoPresetsModalOpened(true)}} className='right mr2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo Preset</Button>
        ]
    }


    const emptyGroupPriceTableHeader = () => {
        return [
            <span key={"emptygroupPriceTableHeader"}></span>,
            
        ]
    }

    const emptyGroupTableBody = (text: string) => {
        return [[
            <div key='emptyGroupPriceTableBody' className='center'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>
        ]]
    }


    const emptyPresetTableBody = (text: string) => {
        return [[
            <span key={'emptyPresetTableBody'}></span>,
            <div className='center'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>
        ]]
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>Settings</Text>
                <Toggle id='vodPaywallEnabledToggle' className='mt2' label='Paywall Enabled' />
                <Text size={14}>Quickly enable or disable paywall for this content</Text>
                <DropdownSingle id='vodPaywallThemesDropdown' className='col col-2 my2' dropdownTitle='Paywall Theme' list={{'theme1': false, 'theme2': false}} />
                <Text size={16} weight='med'>Intro Video ID</Text>
                <Text size={14}>If provided, this video can be watched before the content is purchased.</Text>
                <Input id='VodPaywallIntroVideoIdInput' className='col col-2 my2' placeholder='Video ID' />
                
                <BorderStyle className='my2' />

                <Text size={20} weight='med'>Prices</Text>
                {props.VodPaywallInfos.presets.length === 0 ? 
                    <Table className='my2' id='pricePresetsEmptyTable' header={emptyPricePresetTableHeader()} body={emptyPresetTableBody('You have no Price Presets')} />
                    :
                    <Table className='my2' id='pricePresetsTable' header={pricePresetsTableHeader()} body={pricePresetsTableBody()} />
                   
                }
                 <BorderStyle className='my2' />

                <Text className="mt1" size={20} weight='med'>Promos</Text>
                { props.VodPaywallInfos.promos.length === 0 ?
                    <Table className='my2' id='promoPresetsEmptyTable' header={emptyPromoPresetTableHeader()} body={emptyPresetTableBody('You have no Promo Presets')} />
                    :
                    <Table className='my2' id='promoPresetsTable' header={promoPresetsTableHeader()} body={promoPresetsTableBody()} />
                }

                 <BorderStyle className='my2' />

                <Text size={20} weight='med'>Associated Group Prices</Text>

                { props.groupsInfos.prices.length === 0 ?
                    <Table className='my2' id='associatedGroupPricesEmptyTable' header={emptyGroupPriceTableHeader()} body={emptyGroupTableBody('No associated group prices')} />
                    :
                    <Table className='my2' id='groupPricesTable' header={groupPricesTableHeader()} body={groupPricesTableBody()} />
                }
                
            </Card>
            <Modal hasClose={false} title='Create Price Preset' opened={pricePresetsModalOpened} toggle={() => setPricePresetsModalOpened(false)}>
                <PricePresetsModal action={selectedPreset ? props.saveVodPricePreset : props.createVodPricePreset} preset={selectedPreset} toggle={setPricePresetsModalOpened} />
            </Modal>
            <Modal hasClose={false} title='Create Promo Code Preset' opened={promoPresetsModalOpened} toggle={() => setPromoPresetsModalOpened(false)}>
                <PromoPresetsModal action={selectedPromo ? props.saveVodPromoPreset : props.createVodPromoPreset} promo={selectedPromo} toggle={setPromoPresetsModalOpened} />
            </Modal>
        </div>
    )
}