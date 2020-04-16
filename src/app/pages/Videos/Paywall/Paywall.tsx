import React from 'react'
import { Card } from '../../../../components/Card/Card'
import { Text } from '../../../../components/Typography/Text'
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle'
import { Input } from '../../../../components/FormsComponents/Input/Input'
import { Toggle } from '../../../../components/Toggle/toggle'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { Table } from '../../../../components/Table/Table'
import { Modal } from '../../../../components/Modal/Modal'
import { PromoPresetsModal } from '../../Paywall/Presets/PromoPresetsModal'
import { IconStyle, IconContainer , ActionIcon} from '../../../../shared/Common/Icon'
import { Preset, Promo, VodPaywallPageInfos } from '../../../redux-flow/store/VOD/Paywall'
import { VodPaywallComponentProps } from '../../../containers/Videos/Paywall'
import { BorderStyle } from '../../Paywall/Presets/PresetsStyle'
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes'
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { ContentPricePresetsModal } from '../../../shared/Paywall/ContentPricePresetModal';
import { PricePresetsModal } from '../../Paywall/Presets/PricePresetsModal';
import { ContentPromoPresetsModal } from '../../../shared/Paywall/ContentPromoPresetModal';

export const VodPaywallPage = (props: VodPaywallComponentProps) => {

    const [editPricePresetsModalOpened, setEditPricePresetsModalOpened] = React.useState<boolean>(false);
    const [newPricePresetsModalOpened, setNewPricePresetsModalOpened] = React.useState<boolean>(false);
    const [editPromoPresetsModalOpened, setEditPromoPresetsModalOpened] = React.useState<boolean>(false);
    const [newPromoPresetsModalOpened, setNewPromoPresetsModalOpened] = React.useState<boolean>(false);
    const [selectedPreset, setSelectedPreset] = React.useState<Preset>(null);
    const [selectedPromo, setSelectedPromo] = React.useState<Promo>(null);
    const [vodPaywallSettings, setVodPaywallSettings] = React.useState<VodPaywallPageInfos>(props.vodPaywallInfos);

    React.useEffect(() => {
        setVodPaywallSettings(props.vodPaywallInfos)
    }, [props.vodPaywallInfos])

    const pricePresetsTableHeader = () => {
        return {data: [
            {cell: <Text key='pricePresetsTableHeaderName' size={14} weight='med'>Name</Text>},
            {cell: <Text key='pricePresetsTableHeaderType' size={14} weight='med'>Type</Text>},
            {cell: <Text key='pricePresetsTableHeaderPrice' size={14} weight='med'>Price</Text>},
            {cell: <Text key='pricePresetsTableHeaderCurrency' size={14} weight='med'>Currency</Text>},
            {cell: <Text key='pricePresetsTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>},
            {cell: <Text key='pricePresetsTableHeaderMethod' size={14} weight='med'>Start Method</Text>},
            {cell: <Button key='pricePresetsTableHeaderButton' className='right mr2' onClick={() => {setSelectedPreset(null);setNewPricePresetsModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price</Button>}

        ]}
    }

    const pricePresetsTableBody = () => {
        if(props.vodPaywallInfos.presets) {
            return props.vodPaywallInfos.presets.map((preset, key) => {
                return {data: [
                    <Text key={'pricePresetsTableBodyName' + key} size={14} weight='reg'>{preset.name}</Text>,
                    <Text key={'pricePresetsTableBodyType' + key} size={14} weight='reg'>{preset.type}</Text>,
                    <Text key={'pricePresetsTableBodyPrice' + key} size={14} weight='reg'>{preset.price[0].amount}</Text>,
                    <Text key={'pricePresetsTableBodyCurrency' + key} size={14} weight='reg'>{preset.price[0].currency}</Text>,
                    <Text key={'pricePresetsTableBodyDuration' + key} size={14} weight='reg'>{preset.recurrence ? preset.recurrence : preset.duration.amount + ' ' + preset.duration.type}</Text>,
                    <Text key={'pricePresetsTableBodyMethod' + key} size={14} weight='reg'>{preset.startMethod}</Text>,
                    <IconContainer className="iconAction" key={'pricePresetsTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPrice" + preset.id}>
                            <IconStyle onClick={() =>  {props.deleteVodPricePreset(preset)}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPrice" + preset.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + preset.id}>
                            <IconStyle onClick={() =>  {setSelectedPreset(preset);setEditPricePresetsModalOpened(true)}}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + preset.id}>Edit</Tooltip>
                    </IconContainer>
                ]}
            })
        }
    }

    const promoPresetsTableHeader = () => {
        return {data: [
            {cell: <Text key='promoPresetsTableHeaderName' size={14} weight='med'>Name</Text>},
            {cell: <Text key='promoPresetsTableHeaderType' size={14} weight='med'>Type</Text>},
            {cell: <Text key='promoPresetsTableHeaderCode' size={14} weight='med'>Code</Text>},
            {cell: <Text key='promoPresetsTableHeaderDiscount' size={14} weight='med'>Discount</Text>},
            {cell: <Text key='promoPresetsTableHeaderLimit' size={14} weight='med'>Limit</Text>},
            {cell: <Button key='promoPresetsTableHeaderButton' onClick={() => {setSelectedPromo(null);setNewPromoPresetsModalOpened(true)}} className='right mr2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo</Button>}

        ]}
    }

    const promoPresetsTableBody = () => {
        if(props.vodPaywallInfos.promos) {
            return props.vodPaywallInfos.promos.map((promo, key) => {
                return {data: [
                    <Text key={'promoPresestTableBodyName' + key} size={14} weight='reg'>{promo.name}</Text>,
                    <Text key={'promoPresetsTableBodyType' + key} size={14} weight='reg'>{promo.rateType}</Text>,
                    <Text key={'promoPresetsTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promoPresetsTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}</Text>,
                    <Text key={'promoPresetsTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    <IconContainer className="iconAction" key={'promoPresetsTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {props.deleteVodPromoPreset(promo)}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPromo" + promo.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {setSelectedPromo(promo);setEditPromoPresetsModalOpened(true)}}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltipPromo" + promo.id}>Edit</Tooltip>
                    </IconContainer>
                ]}
            })
        }
    }

    const groupPricesTableHeader = () => {
        return {data: [
            {cell: <Text key='groupPricesTableHeaderName' size={14} weight='med'>Name</Text>},
            {cell: <Text key='groupPricesTableHeaderType' size={14} weight='med'>Type</Text>},
            {cell: <Text key='groupPricesTableHeaderPrice' size={14} weight='med'>Price</Text>},
            {cell: <Text key='groupPricesTableHeaderCurrency' size={14} weight='med'>Currency</Text>},
            {cell: <Text key='groupPricesTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>},
            {cell: <Text key='groupPricesTableHeaderMethod' size={14} weight='med'>Start Method</Text>},
        ]}
    }

    const groupPricesTableBody = () => {
        if(props.groupsInfos.prices) {
            return props.groupsInfos.prices.map((price, key) => {
                return {data: [
                    <Text key={'groupPricesTableBodyName' + key} size={14} weight='reg'>{price.name}</Text>,
                    <Text key={'groupPricesTableBodyType' + key} size={14} weight='reg'>{price.type}</Text>,
                    <Text key={'groupPricesTableBodyPrice' + key} size={14} weight='reg'>{price.price[0].amount}</Text>,
                    <Text key={'groupPricesTableBodyCurrency' + key} size={14} weight='reg'>{price.price[0].currency}</Text>,
                    <Text key={'groupPricesTableBodyDuration' + key} size={14} weight='reg'>{price.recurrence ? price.recurrence : price.duration.amount + ' ' + price.duration.type}</Text>,
                    <Text key={'groupPricesTableBodyMethod' + key} size={14} weight='reg'>{price.startMethod}</Text>,
                ]}
            })
        }
    }

    const emptyPricePresetTableHeader = () => {
        return {data: [
            {cell: <span key={"emptyPricePresetTableHeader"}></span>},
            {cell: <Button key='pricePresetsTableHeaderButton' className='right mr2' onClick={() => {setSelectedPreset(null);setNewPricePresetsModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price Preset</Button>}
        ]}
    }

    const emptyPromoPresetTableHeader = () => {
        return {data: [
            {cell: <span key={"emptyPromoPresetTableHeader"}></span>},
            {cell: <Button key='promoPresetsTableHeaderButton' onClick={() => {setSelectedPromo(null);setNewPromoPresetsModalOpened(true)}} className='right mr2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo Preset</Button>}
        ]}
    }


    const emptyGroupPriceTableHeader = () => {
        return {data: [
            {cell: <span key={"emptygroupPriceTableHeader"}></span>}
            
        ]}
    }

    const emptyGroupTableBody = (text: string) => {
        return [{data: [
            <div key='emptyGroupPriceTableBody' className='center'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>
        ]}]
    }


    const emptyPresetTableBody = (text: string) => {
        return [{data: [
            <span key={'emptyPresetTableBody'}></span>,
            <div className='center'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>
        ]}]
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>Settings</Text>
                <Toggle id='vodPaywallEnabledToggle' defaultChecked={vodPaywallSettings.enabled} onChange={() => setVodPaywallSettings({...vodPaywallSettings, enabled: !vodPaywallSettings.enabled})} className='mt2' label='Paywall Enabled' />
                <Text size={14}>Quickly enable or disable paywall for this content</Text>
                
                <DropdownSingle 
                    id='vodPaywallThemesDropdown' 
                    className='col col-2 my2' 
                    dropdownTitle='Paywall Theme' 
                    dropdownDefaultSelect={props.vodPaywallInfos.selectedTheme}
                    list={props.theming.themes.reduce((reduced: DropdownListType, theme) => {return {...reduced, [theme.name]: false}}, {})} 
                    callback={(value: string) => setVodPaywallSettings({...vodPaywallSettings, selectedTheme: value})}
                />
                <Text size={16} weight='med'>Intro Video ID</Text>
                <Text size={14}>If provided, this video can be watched before the content is purchased.</Text>
                <Input id='VodPaywallIntroVideoIdInput' className='col col-2 my2' placeholder='Video ID' />
                        
                <BorderStyle className='my2' />

                <Text size={20} weight='med'>Prices</Text>
                {props.vodPaywallInfos.presets.length === 0 ? 
                    <Table id='pricePresetsEmptyTable' headerBackgroundColor="gray-10" header={emptyPricePresetTableHeader()} body={emptyPresetTableBody('You have no Price Presets')} />
                    :
                    <Table id='pricePresetsTable' headerBackgroundColor="gray-10" header={pricePresetsTableHeader()} body={pricePresetsTableBody()} />
                        
                }
                <BorderStyle className='my2' />

                <Text className="mt1" size={20} weight='med'>Promos</Text>
                { props.vodPaywallInfos.promos.length === 0 ?
                    <Table id='promoPresetsEmptyTable' headerBackgroundColor="gray-10" header={emptyPromoPresetTableHeader()} body={emptyPresetTableBody('You have no Promo Presets')} />
                    :
                    <Table id='promoPresetsTable' headerBackgroundColor="gray-10" header={promoPresetsTableHeader()} body={promoPresetsTableBody()} />
                }

                <BorderStyle className='my2' />

                <Text size={20} weight='med'>Associated Group Prices</Text>

                { props.groupsInfos.prices.length === 0 ?
                    <Table id='associatedGroupPricesEmptyTable' headerBackgroundColor="gray-10" header={emptyGroupPriceTableHeader()} body={emptyGroupTableBody('No associated group prices')} />
                    :
                    <Table id='groupPricesTable' headerBackgroundColor="gray-10" header={groupPricesTableHeader()} body={groupPricesTableBody()} />
                }
                   
            </Card>
            <div className={'mt2' + (props.vodPaywallInfos === vodPaywallSettings ? ' hide' : '')}>
                <Button onClick={() => props.saveVodPaywallInfos(vodPaywallSettings)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => setVodPaywallSettings(props.vodPaywallInfos)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Discard</Button>
            </div>
            <Modal hasClose={false} modalTitle='Create Price Preset' opened={newPricePresetsModalOpened} toggle={() => setNewPricePresetsModalOpened(false)}>
                <ContentPricePresetsModal action={ props.createVodPricePreset} preset={selectedPreset} toggle={setNewPricePresetsModalOpened} presetList={props.customPricePresetList} savePresetGlobally={props.createPricePreset} />
            </Modal>
            <Modal hasClose={false} modalTitle='Edit Price Preset' opened={editPricePresetsModalOpened} toggle={() => setEditPricePresetsModalOpened(false)}>
                <PricePresetsModal action={props.saveVodPricePreset} preset={selectedPreset} toggle={setEditPricePresetsModalOpened} />
            </Modal>
            <Modal hasClose={false} modalTitle='Create Promo Preset' opened={newPromoPresetsModalOpened} toggle={() => setNewPromoPresetsModalOpened(false)}>
                <ContentPromoPresetsModal action={ props.createVodPromoPreset} promo={selectedPromo} toggle={setNewPromoPresetsModalOpened} presetList={props.customPromoPresetList} savePresetGlobally={props.createPromoPreset} />
            </Modal>
            <Modal hasClose={false} modalTitle='Edit Promo Code Preset' opened={editPromoPresetsModalOpened} toggle={() => setEditPromoPresetsModalOpened(false)}>
                <PromoPresetsModal action={props.saveVodPromoPreset} promo={selectedPromo} toggle={setEditPromoPresetsModalOpened} />
            </Modal>
            <Prompt when={vodPaywallSettings !== props.vodPaywallInfos} message='' />
        </div>
    )
}