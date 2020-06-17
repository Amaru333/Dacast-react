import React from 'react'
import { Card } from '../../../components/Card/Card'
import { Text } from '../../../components/Typography/Text'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Toggle } from '../../../components/Toggle/toggle'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Table } from '../../../components/Table/Table'
import { Modal } from '../../../components/Modal/Modal'
import { IconStyle, IconContainer , ActionIcon} from '../../../shared/Common/Icon'
import { BorderStyle } from '../../pages/Paywall/Presets/PresetsStyle'
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes'
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { ContentPricePresetsModal } from './ContentPricePresetModal';
import { ContentPromoPresetsModal } from './ContentPromoPresetModal';
import { Preset, Promo, ContentPaywallPageInfos, PresetsPageInfos } from '../../redux-flow/store/Paywall/Presets/types'
import { GroupsPageInfos } from '../../redux-flow/store/Paywall/Groups/types'
import { PaywallThemingData } from '../../redux-flow/store/Paywall/Theming/types'
import { emptyContentListBody } from '../List/emptyContentListState';

export interface ContentPaywallComponentProps {
    contentId: string;
    contentPaywallInfos: ContentPaywallPageInfos;
    getContentPrices: Function;
    saveContentPaywallInfos: Function;
    createContentPricePreset: Function;
    saveContentPricePreset: Function;
    deleteContentPricePreset: Function;
    getContentPromos: Function;
    createContentPromoPreset: Function;
    saveContentPromoPreset: Function;
    deleteContentPromoPreset: Function;
    groupsInfos: GroupsPageInfos;
    theming: PaywallThemingData;
    globalPresets: PresetsPageInfos;
    customPricePresetList: Preset[];
    customPromoPresetList: Promo[];
    createPromoPreset: Function;
    createPricePreset: Function;
    showToast: Function;
}

export const ContentPaywallPage = (props: ContentPaywallComponentProps) => {

    const [priceModalOpened, setPriceModalOpened] = React.useState<boolean>(false);
    const [promoModalOpened, setPromoModalOpened] = React.useState<boolean>(false);
    const [selectedPrice, setSelectedPrice] = React.useState<Preset>(null);
    const [selectedPromo, setSelectedPromo] = React.useState<Promo>(null);
    const [contentPaywallSettings, setContentPaywallSettings] = React.useState<ContentPaywallPageInfos>(props.contentPaywallInfos);

    React.useEffect(() => {
        setContentPaywallSettings(props.contentPaywallInfos)
    }, [props.contentPaywallInfos])

    React.useEffect(() => {
        props.getContentPrices(props.contentId)
        props.getContentPromos(props.contentId)
    }, [])

    const pricesTableHeader = () => {
        return {data: [
            {cell: <Text key='pricesTableHeaderType' size={14} weight='med'>Type</Text>},
            {cell: <Text key='pricesTableHeaderPrice' size={14} weight='med'>Price</Text>},
            {cell: <Text key='pricesTableHeaderCurrency' size={14} weight='med'>Currency</Text>},
            {cell: <Text key='pricesTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>},
            {cell: <Text key='pricesTableHeaderMethod' size={14} weight='med'>Start Method</Text>},
            {cell: <Button key='pricesTableHeaderButton' className='right mr2  sm-show ' onClick={() => {setSelectedPrice(null);setPriceModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price</Button>}

        ]}
    }

    const pricesTableBody = () => {
        if(props.contentPaywallInfos.prices) {
            return props.contentPaywallInfos.prices.map((price, key) => {
                return {data: [
                    <Text key={'pricesTableBodyType' + key} size={14} weight='reg'>{price.type}</Text>,
                    <Text key={'pricesTableBodyPrice' + key} size={14} weight='reg'>{price.prices ? price.prices[0].value : price.price}</Text>,
                    <Text key={'pricesTableBodyCurrency' + key} size={14} weight='reg'>{price.prices ? price.prices[0].currency : price.currency}</Text>,
                    <Text key={'pricesTableBodyDuration' + key} size={14} weight='reg'>{price.settings.recurrence ? price.settings.recurrence.recurrence : price.settings.duration.value + ' ' + price.settings.duration.unit}</Text>,
                    <Text key={'pricesTableBodyMethod' + key} size={14} weight='reg'>{price.settings.startMethod}</Text>,
                    <IconContainer className="iconAction" key={'pricesTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPrice" + price.id}>
                            <IconStyle onClick={() =>  {props.deleteContentPricePreset(price, props.contentId)}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPrice" + price.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + price.id}>
                            <IconStyle onClick={() =>  {setSelectedPrice(price);setPriceModalOpened(true)}}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + price.id}>Edit</Tooltip>
                    </IconContainer>
                ]}
            })
        }
    }

    const promosTableHeader = () => {
        return {data: [
            {cell: <Text key='promosTableHeaderType' size={14} weight='med'>Type</Text>},
            {cell: <Text key='promosTableHeaderCode' size={14} weight='med'>Code</Text>},
            {cell: <Text key='promosTableHeaderDiscount' size={14} weight='med'>Discount</Text>},
            {cell: <Text key='promosTableHeaderLimit' size={14} weight='med'>Limit</Text>},
            {cell: <Button key='promosTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoModalOpened(true)}} className='right mr2  sm-show '  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo</Button>}

        ]}
    }

    const promosTableBody = () => {
        if(props.contentPaywallInfos.promos) {
            return props.contentPaywallInfos.promos.map((promo, key) => {
                return {data: [
                    <Text key={'promosTableBodyType' + key} size={14} weight='reg'>{promo.rateType}</Text>,
                    <Text key={'promosTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promosTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}</Text>,
                    <Text key={'promosTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    <IconContainer className="iconAction" key={'promosTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {props.deleteContentPromoPreset(promo, props.contentId)}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPromo" + promo.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {setSelectedPromo(promo);setPromoModalOpened(true)}}>edit</IconStyle>
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
            return props.groupsInfos.prices.prices.map((price, key) => {
                return {data: [
                    <Text key={'groupPricesTableBodyName' + key} size={14} weight='reg'>{price.name}</Text>,
                    <Text key={'groupPricesTableBodyType' + key} size={14} weight='reg'>{price.type}</Text>,
                    <Text key={'groupPricesTableBodyPrice' + key} size={14} weight='reg'>{price.prices[0].value}</Text>,
                    <Text key={'groupPricesTableBodyCurrency' + key} size={14} weight='reg'>{price.prices[0].currency}</Text>,
                    <Text key={'groupPricesTableBodyDuration' + key} size={14} weight='reg'>{price.settings.recurrence ? price.settings.recurrence.recurrence : price.settings.duration.value + ' ' + price.settings.duration.unit}</Text>,
                    <Text key={'groupPricesTableBodyMethod' + key} size={14} weight='reg'>{price.settings.startMethod}</Text>,
                ]}
            })
        }
    }

    const emptyPriceTableHeader = () => {
        return {data: [
            {cell: <Button key='pricesTableHeaderButton' className='right mr2' onClick={() => {setSelectedPrice(null);setPriceModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price</Button>}
        ]}
    }

    const emptyPromoTableHeader = () => {
        return {data: [
            {cell: <Button key='promosTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoModalOpened(true)}} className='right mr2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo</Button>}
        ]}
    }


    const emptyGroupPriceTableHeader = () => {
        return {data: [
            {cell: <span key={"emptygroupPriceTableHeader"}></span>}
            
        ]}
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>Settings</Text>
                <Toggle id='vodPaywallEnabledToggle' defaultChecked={contentPaywallSettings.paywallEnabled} onChange={() => setContentPaywallSettings({...contentPaywallSettings, paywallEnabled: !contentPaywallSettings.paywallEnabled})} className='mt2' label='Paywall Enabled' />
                <Text size={14}>Quickly enable or disable paywall for this content</Text>
                
                <DropdownSingle 
                    id='vodPaywallThemesDropdown' 
                    className='col col-12 sm-col-3 my2' 
                    dropdownTitle='Paywall Theme' 
                    dropdownDefaultSelect={props.contentPaywallInfos.selectedTheme}
                    list={props.theming.themes.reduce((reduced: DropdownListType, theme) => {return {...reduced, [theme.name]: false}}, {})} 
                    callback={(value: string) => setContentPaywallSettings({...contentPaywallSettings, selectedTheme: value})}
                />
                <Text size={16} weight='med'>Intro Video ID</Text>
                <Text size={14}>If provided, this video can be watched before the content is purchased.</Text>
                <Input id='VodPaywallIntroVideoIdInput' defaultValue={props.contentPaywallInfos.introVodId} className='col col-12 sm-col-3 my2' placeholder='Video ID' onChange={(event) => {setContentPaywallSettings({...contentPaywallSettings, introVodId: event.currentTarget.value})}} />
                        
                <BorderStyle className='my2' />

                <Text size={20} weight='med'>Prices</Text>
                <Button className='right mt2 xs-show col col-12' onClick={() => {setSelectedPrice(null);setPriceModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price</Button>
                {props.contentPaywallInfos.prices && props.contentPaywallInfos.prices.length > 0 ? 
                    <Table id='pricesTable' headerBackgroundColor="gray-10" header={pricesTableHeader()} body={pricesTableBody()} />
                    :
                    <Table id='pricesEmptyTable' headerBackgroundColor="gray-10" header={emptyPriceTableHeader()} body={emptyContentListBody('You have no Prices')} />

                }
                <BorderStyle className='my2' />

                <Text className="mt1" size={20} weight='med'>Promos</Text>
                <Button onClick={() => {setSelectedPromo(null);setPromoModalOpened(true)}} className='right xs-show mt2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo</Button>
                { props.contentPaywallInfos.promos && props.contentPaywallInfos.promos.length > 0 ?
                    <Table id='promosTable' headerBackgroundColor="gray-10" header={promosTableHeader()} body={promosTableBody()} />
                    :                    
                    <Table id='promosEmptyTable' headerBackgroundColor="gray-10" header={emptyPromoTableHeader()} body={emptyContentListBody('You have no Promos')} />

                }

                <BorderStyle className='my2' />

                <Text size={20} weight='med'>Associated Group Prices</Text>

                { !props.groupsInfos.prices || props.groupsInfos.prices.prices.length === 0 ?
                    <Table id='associatedGroupPricesEmptyTable' headerBackgroundColor="gray-10" header={emptyGroupPriceTableHeader()} body={emptyContentListBody('No associated group prices')} />
                    :
                    <Table id='groupPricesTable' headerBackgroundColor="gray-10" header={groupPricesTableHeader()} body={groupPricesTableBody()} />
                }
                   
            </Card>
            <div className={'mt2' + (props.contentPaywallInfos === contentPaywallSettings ? ' hide' : '')}>
                <Button onClick={() => props.saveContentPaywallInfos(contentPaywallSettings, props.contentId)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {setContentPaywallSettings(props.contentPaywallInfos);props.showToast("Changes have been discarded", 'flexible', "success")}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Discard</Button>
            </div>
            <Modal hasClose={false} modalTitle={(selectedPrice ? 'Edit' : 'Create') + ' Price'} opened={priceModalOpened} toggle={() => setPriceModalOpened(false)}>
                {
                    priceModalOpened && <ContentPricePresetsModal contentId={props.contentId} action={ selectedPrice ? props.saveContentPricePreset : props.createContentPricePreset} preset={selectedPrice} toggle={setPriceModalOpened} presetList={props.customPricePresetList} savePresetGlobally={props.createPricePreset} />
                }
            </Modal>
            <Modal hasClose={false} modalTitle={(selectedPromo ? 'Edit' : 'Create') + ' Promo'} opened={promoModalOpened} toggle={() => setPromoModalOpened(false)}>
                {
                    promoModalOpened && <ContentPromoPresetsModal action={selectedPromo ? props.saveContentPromoPreset : props.createContentPromoPreset} contentId={props.contentId} promo={selectedPromo} toggle={setPromoModalOpened} presetList={props.customPromoPresetList} savePresetGlobally={props.createPromoPreset} />
                }
            </Modal>
            <Prompt when={contentPaywallSettings !== props.contentPaywallInfos} message='' />
        </div>
    )
}