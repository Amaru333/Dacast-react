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
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes'
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { ContentPricePresetsModal } from './ContentPricePresetModal';
import { ContentPromoPresetsModal } from './ContentPromoPresetModal';
import { Preset, Promo, ContentPaywallPageInfos, PresetsPageInfos } from '../../redux-flow/store/Paywall/Presets/types'
import { GroupsPageInfos } from '../../redux-flow/store/Paywall/Groups/types'
import { PaywallThemingData } from '../../redux-flow/store/Paywall/Theming/types'
import { emptyContentListBody } from '../List/emptyContentListState';
import { userToken } from '../../utils/token'
import { NotificationType, Size } from '../../../components/Toast/ToastTypes'
import { Divider } from '../Common/MiscStyle';

export interface ContentPaywallComponentProps {
    contentId: string;
    contentType: 'vod' | 'live' | 'playlist';
    contentPaywallInfos: ContentPaywallPageInfos;
    groupsInfos: GroupsPageInfos;
    theming: PaywallThemingData;
    globalPresets: PresetsPageInfos;
    customPricePresetList: Preset[];
    customPromoPresetList: Promo[];
    saveContentPaywallInfos: (data: ContentPaywallPageInfos, contentId: string, contentType: string) => Promise<void>;
    getContentPrices: (contentId: string, contentType: string) => Promise<void>;
    createContentPricePreset: (data: Preset, contentId: string, contentType: string) => Promise<void>;
    saveContentPricePreset: (data: Preset, contentId: string, contentType: string) => Promise<void>;
    deleteContentPricePreset: (data: Preset, contentId: string, contentType: string) => Promise<void>;
    getContentPromos: (contentId: string, contentType: string) => Promise<void>;
    createContentPromoPreset: (data: Promo, contentId: string, contentType: string) => Promise<void>;
    saveContentPromoPreset: (data: Promo, contentId: string, contentType: string) => Promise<void>;
    deleteContentPromoPreset: (data: Promo, contentId: string, contentType: string) => Promise<void>;
    createPromoPreset: (data: Promo) => Promise<void>;
    createPricePreset: (data: Preset) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

export const ContentPaywallPage = (props: ContentPaywallComponentProps) => {

    const userId = userToken.getUserInfoItem('custom:dacast_user_id')

    const [priceModalOpened, setPriceModalOpened] = React.useState<boolean>(false);
    const [promoModalOpened, setPromoModalOpened] = React.useState<boolean>(false);
    const [selectedPrice, setSelectedPrice] = React.useState<Preset>(null);
    const [selectedPromo, setSelectedPromo] = React.useState<Promo>(null);
    const [contentPaywallSettings, setContentPaywallSettings] = React.useState<ContentPaywallPageInfos>(props.contentPaywallInfos);
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [hasChanged, setHasChanged] = React.useState<boolean>(false)

    React.useEffect(() => {
        setContentPaywallSettings(props.contentPaywallInfos)
    }, [props.contentPaywallInfos])

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
                    <Text key={'pricesTableBodyDuration' + key} size={14} weight='reg'>{price.settings.recurrence ? price.settings.recurrence.unit : price.settings.duration.value + ' ' + price.settings.duration.unit}</Text>,
                    <Text key={'pricesTableBodyMethod' + key} size={14} weight='reg'>{price.settings.startMethod}</Text>,
                    <IconContainer className="iconAction" key={'pricesTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPrice" + price.id}>
                            <IconStyle onClick={() =>  {props.deleteContentPricePreset(price, props.contentId, props.contentType)}}>delete</IconStyle>
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
            {cell: <Text key='promosTableHeaderCode' size={14} weight='med'>Code</Text>},
            {cell: <Text key='promosTableHeaderDiscount' size={14} weight='med'>Discount</Text>},
            {cell: <Text key='promosTableHeaderLimit' size={14} weight='med'>Limit</Text>},
            {cell: <Button key='promosTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoModalOpened(true)}} className='right mr2  sm-show '  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo</Button>}

        ]}
    }

    const promosTableBody = () => {
        if(props.contentPaywallInfos.promos) {
            return props.contentPaywallInfos.promos.filter(p => p.assignedContentIds.indexOf(`${userId}-${props.contentType}-${props.contentId}`) !== -1).map((promo, key) => {
                return {data: [
                    <Text key={'promosTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promosTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}</Text>,
                    <Text key={'promosTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    <IconContainer className="iconAction" key={'promosTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {props.deleteContentPromoPreset(promo, props.contentId, props.contentType)}}>delete</IconStyle>
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
            let tempArray: {
                data: JSX.Element[];
            }[] = []
            props.groupsInfos.prices.packages.filter(p => p.contents.indexOf(`${userId}-${props.contentType}-${props.contentId}`) !== -1).map((item, key) => {
                item.prices.map((price) => {
                    tempArray.push({data: [
                        <Text key={'groupPricesTableBodyName' + key} size={14} weight='reg'>{item.name}</Text>,
                        <Text key={'groupPricesTableBodyType' + key} size={14} weight='reg'>{price.settings.type}</Text>,
                        <Text key={'groupPricesTableBodyPrice' + key} size={14} weight='reg'>{price.price.value}</Text>,
                        <Text key={'groupPricesTableBodyCurrency' + key} size={14} weight='reg'>{price.price.currency}</Text>,
                        <Text key={'groupPricesTableBodyDuration' + key} size={14} weight='reg'>{price.settings.recurrence ? price.settings.recurrence.unit : price.settings.duration.value + ' ' + price.settings.duration.unit}</Text>,
                        <Text key={'groupPricesTableBodyMethod' + key} size={14} weight='reg'>{price.settings.startMethod}</Text>,
                    ]})
                })
            })
            return tempArray
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

    const handleSubmit = () => {
        setButtonLoading(true)
        props.saveContentPaywallInfos(contentPaywallSettings, props.contentId, props.contentType)
        .then(() => {
            setButtonLoading(false)
            setHasChanged(false)
        }).catch(() => {
            setButtonLoading(false)
        })
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>Settings</Text>
                <Toggle id='vodPaywallEnabledToggle' defaultChecked={contentPaywallSettings.paywallEnabled} onChange={() => {setContentPaywallSettings({...contentPaywallSettings, paywallEnabled: !contentPaywallSettings.paywallEnabled});setHasChanged(true)}} className='mt2' label='Paywall Enabled' />
                <Text size={14}>Quickly enable or disable the paywall for this content.</Text>
                
                <DropdownSingle 
                    id='vodPaywallThemesDropdown'
                    className='col col-12 sm-col-3 my2'
                    dropdownTitle='Paywall Theme'
                    dropdownDefaultSelect={props.contentPaywallInfos.selectedTheme ? props.theming.themes.filter(f => f.id === props.contentPaywallInfos.selectedTheme)[0].name : 'Standard'}
                    list={props.theming.themes.reduce((reduced: DropdownListType, theme) => {return {...reduced, [theme.name]: false}}, {})}
                    callback={(value: string) => {setContentPaywallSettings({...contentPaywallSettings, selectedTheme: props.theming.themes.filter(f => f.name === value)[0].id});setHasChanged(true)}}
                />
                <Text size={16} weight='med'>Intro Video ID</Text>
                <Text size={14}>This video will play before the content is purchased. Provide the Content ID, which can be found in the General tab of your Video on Demand asset.</Text>
                <Input id='VodPaywallIntroVideoIdInput' defaultValue={props.contentPaywallInfos.introVodId} className='col col-12 sm-col-3 my2' placeholder='Video ID' onChange={(event) => {setContentPaywallSettings({...contentPaywallSettings, introVodId: event.currentTarget.value});setHasChanged(true)}} />
                        
                <Divider className='my2' />

                <Text size={20} weight='med'>Prices</Text>
                <Button className='right mt2 xs-show col col-12' onClick={() => {setSelectedPrice(null);setPriceModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price</Button>
                {props.contentPaywallInfos.prices && props.contentPaywallInfos.prices.length > 0 ? 
                    <Table id='pricesTable' headerBackgroundColor="gray-10" header={pricesTableHeader()} body={pricesTableBody()} />
                    :
                    <Table id='pricesEmptyTable' headerBackgroundColor="gray-10" header={emptyPriceTableHeader()} body={emptyContentListBody('You have no Prices')} />

                }
                <Divider className='my2' />

                <Text className="mt1" size={20} weight='med'>Promos</Text>
                <Button onClick={() => {setSelectedPromo(null);setPromoModalOpened(true)}} className='right xs-show mt2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo</Button>
                { props.contentPaywallInfos.promos && props.contentPaywallInfos.promos.filter(p => p.assignedContentIds.indexOf(`${userId}-${props.contentType}-${props.contentId}`) !== -1).length > 0 ?
                    <Table id='promosTable' headerBackgroundColor="gray-10" header={promosTableHeader()} body={promosTableBody()} />
                    :                    
                    <Table id='promosEmptyTable' headerBackgroundColor="gray-10" header={emptyPromoTableHeader()} body={emptyContentListBody('You have no Promos')} />

                }

                <Divider className='my2' />

                <Text size={20} weight='med'>Associated Group Prices</Text>

                { !props.groupsInfos.prices || props.groupsInfos.prices.packages.filter(p => p.contents.indexOf(`${userId}-${props.contentType}-${props.contentId}`) !== -1).length === 0 ?
                    <Table id='associatedGroupPricesEmptyTable' headerBackgroundColor="gray-10" header={emptyGroupPriceTableHeader()} body={emptyContentListBody('No associated group prices')} />
                    :
                    <Table id='groupPricesTable' headerBackgroundColor="gray-10" header={groupPricesTableHeader()} body={groupPricesTableBody()} />
                }
                   
            </Card>
            {
                hasChanged &&
                <div className='mt2'>
                    <Button isLoading={buttonLoading} onClick={() => handleSubmit()} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                    <Button onClick={() => {setContentPaywallSettings(props.contentPaywallInfos);props.showToast("Changes have been discarded", 'flexible', "success");setHasChanged(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Discard</Button>
                </div>
            }

            <Modal hasClose={false} modalTitle={(selectedPrice ? 'Edit' : 'Create') + ' Price'} opened={priceModalOpened} toggle={() => setPriceModalOpened(false)}>
                {
                    priceModalOpened && <ContentPricePresetsModal fetchContentPrices={props.getContentPrices} contentType={props.contentType} contentId={props.contentId} action={ selectedPrice ? props.saveContentPricePreset : props.createContentPricePreset} preset={selectedPrice} toggle={setPriceModalOpened} presetList={props.customPricePresetList} savePresetGlobally={props.createPricePreset} />
                }
            </Modal>
            <Modal hasClose={false} modalTitle={(selectedPromo ? 'Edit' : 'Create') + ' Promo'} opened={promoModalOpened} toggle={() => setPromoModalOpened(false)}>
                {
                    promoModalOpened && <ContentPromoPresetsModal actionButton={selectedPromo ? 'Save' : 'Create'} contentType={props.contentType} action={selectedPromo ? props.saveContentPromoPreset : props.createContentPromoPreset} contentId={props.contentId} promo={selectedPromo} toggle={setPromoModalOpened} presetList={props.customPromoPresetList} savePresetGlobally={props.createPromoPreset} />
                }
            </Modal>
            <Prompt when={hasChanged} message='' />
        </div>
    )
}