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
import { Preset, Promo, PlaylistPaywallPageInfos } from '../../../redux-flow/store/Playlists/Paywall'
import { PlaylistPaywallComponentProps } from '../../../containers/Playlists/Paywall'
import { BorderStyle } from '../../Paywall/Presets/PresetsStyle'
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes'
import { IconContainer, ActionIcon } from '../../../shared/ActionIconStyle';
import { Tooltip } from '../../../components/Tooltip/Tooltip';

export const PlaylistPaywallPage = (props: PlaylistPaywallComponentProps) => {

    const [pricePresetsModalOpened, setPricePresetsModalOpened] = React.useState<boolean>(false);
    const [promoPresetsModalOpened, setPromoPresetsModalOpened] = React.useState<boolean>(false);
    const [selectedPreset, setSelectedPreset] = React.useState<Preset>(null);
    const [selectedPromo, setSelectedPromo] = React.useState<Promo>(null);
    const [playlistPaywallSettings, setPlaylistPaywallSettings] = React.useState<PlaylistPaywallPageInfos>(props.playlistPaywallInfos);

    React.useEffect(() => {
        setPlaylistPaywallSettings(props.playlistPaywallInfos)
    }, [props.playlistPaywallInfos])

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
        if(props.playlistPaywallInfos.presets) {
            return props.playlistPaywallInfos.presets.map((preset, key) => {
                return [
                    <Text key={'pricePresetsTableBodyName' + key} size={14} weight='reg'>{preset.name}</Text>,
                    <Text key={'pricePresetsTableBodyType' + key} size={14} weight='reg'>{preset.type}</Text>,
                    <Text key={'pricePresetsTableBodyPrice' + key} size={14} weight='reg'>{preset.price[0].amount}</Text>,
                    <Text key={'pricePresetsTableBodyCurrency' + key} size={14} weight='reg'>{preset.price[0].currency}</Text>,
                    <Text key={'pricePresetsTableBodyDuration' + key} size={14} weight='reg'>{preset.recurrence ? preset.recurrence : preset.duration.amount + ' ' + preset.duration.type}</Text>,
                    <Text key={'pricePresetsTableBodyMethod' + key} size={14} weight='reg'>{preset.startMethod}</Text>,
                    <IconContainer className="iconAction" key={'pricePresetsTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPrice" + preset.id}>
                            <Icon onClick={() =>  {props.deletePlaylistPricePreset(preset)}}>delete</Icon>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPrice" + preset.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + preset.id}>
                            <Icon onClick={() =>  {setSelectedPreset(preset);setPricePresetsModalOpened(true)}}>edit</Icon>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + preset.id}>Edit</Tooltip>    
                    </IconContainer>
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
        if(props.playlistPaywallInfos.promos) {
            return props.playlistPaywallInfos.promos.map((promo, key) => {
                return [
                    <Text key={'promoPresestTableBodyName' + key} size={14} weight='reg'>{promo.name}</Text>,
                    <Text key={'promoPresetsTableBodyType' + key} size={14} weight='reg'>{promo.rateType}</Text>,
                    <Text key={'promoPresetsTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promoPresetsTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}</Text>,
                    <Text key={'promoPresetsTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    <IconContainer className="iconAction" key={'promoPresetsTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPromo" + promo.id}>
                            <Icon onClick={() =>  {props.deletePlaylistPromoPreset(promo)}}>delete</Icon>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPromo" + promo.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltipPromo" + promo.id}>
                            <Icon onClick={() =>  {setSelectedPromo(promo);setPromoPresetsModalOpened(true)}}>edit</Icon>
                        </ActionIcon>
                        <Tooltip target={"editTooltipPromo" + promo.id}>Edit</Tooltip> 
                    </IconContainer>
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
                <Toggle id='PlaylistPaywallEnabledToggle' defaultChecked={playlistPaywallSettings.enabled} onChange={() => setPlaylistPaywallSettings({...playlistPaywallSettings, enabled: !playlistPaywallSettings.enabled})} className='mt2' label='Paywall Enabled' />
                <Text size={14}>Quickly enable or disable paywall for this content</Text>
                {   playlistPaywallSettings.enabled ? 
                    <>
                        <DropdownSingle 
                            id='PlaylistPaywallThemesDropdown' 
                            className='col col-2 my2' 
                            dropdownTitle='Paywall Theme' 
                            dropdownDefaultSelect={props.playlistPaywallInfos.selectedTheme}
                            list={props.theming.themes.reduce((reduced: DropdownListType, theme) => {return {...reduced, [theme.name]: false}}, {})} 
                            callback={(value: string) => setPlaylistPaywallSettings({...playlistPaywallSettings, selectedTheme: value})}
                        />
                        <Text size={16} weight='med'>Intro Video ID</Text>
                        <Text size={14}>If provided, this video can be watched before the content is purchased.</Text>
                        <Input id='PlaylistPaywallIntroVideoIdInput' className='col col-2 my2' placeholder='Video ID' />
                        
                        <BorderStyle className='my2' />

                        <Text size={20} weight='med'>Prices</Text>
                        {props.playlistPaywallInfos.presets.length === 0 ? 
                            <Table className='my2' id='pricePresetsEmptyTable' header={emptyPricePresetTableHeader()} body={emptyPresetTableBody('You have no Price Presets')} />
                            :
                            <Table className='my2' id='pricePresetsTable' header={pricePresetsTableHeader()} body={pricePresetsTableBody()} />
                        
                        }
                        <BorderStyle className='my2' />

                        <Text className="mt1" size={20} weight='med'>Promos</Text>
                        { props.playlistPaywallInfos.promos.length === 0 ?
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
                    </>
                    : null
                }
            </Card>
            <div className={'mt2' + (props.playlistPaywallInfos === playlistPaywallSettings ? ' hide' : '')}>
                <Button onClick={() => props.savePlaylistPaywallInfos(playlistPaywallSettings)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => setPlaylistPaywallSettings(props.playlistPaywallInfos)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Discard</Button>
            </div>
            <Modal hasClose={false} title='Create Price Preset' opened={pricePresetsModalOpened} toggle={() => setPricePresetsModalOpened(false)}>
                <PricePresetsModal action={selectedPreset ? props.savePlaylistPricePreset : props.createPlaylistPricePreset} preset={selectedPreset} toggle={setPricePresetsModalOpened} />
            </Modal>
            <Modal hasClose={false} title='Create Promo Code Preset' opened={promoPresetsModalOpened} toggle={() => setPromoPresetsModalOpened(false)}>
                <PromoPresetsModal action={selectedPromo ? props.savePlaylistPromoPreset : props.createPlaylistPromoPreset} promo={selectedPromo} toggle={setPromoPresetsModalOpened} />
            </Modal>
        </div>
    )
}