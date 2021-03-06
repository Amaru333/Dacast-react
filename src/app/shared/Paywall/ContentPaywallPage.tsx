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
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes'
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { ContentPricePresetsModal } from './ContentPricePresetModal';
import { ContentPromoPresetsModal } from './ContentPromoPresetModal';
import { Preset, Promo, ContentPaywallPageInfos, PresetsPageInfos } from '../../redux-flow/store/Paywall/Presets/types'
import { GroupsPageInfos } from '../../redux-flow/store/Paywall/Groups/types'
import { PaywallThemingData } from '../../redux-flow/store/Paywall/Theming/types'
import { emptyContentListBody } from '../List/emptyContentListState';
import { userToken } from '../../utils/services/token/tokenService'
import { NotificationType, Size } from '../../../components/Toast/ToastTypes'
import { Divider } from '../../../shared/MiscStyles';
import { ContentType } from '../../redux-flow/store/Common/types'
import { Label } from '../../../components/FormsComponents/Label/Label'

export interface ContentPaywallComponentProps {
    contentId: string;
    contentType: 'vod' | 'live' | 'playlist';
    contentPaywallInfos: ContentPaywallPageInfos;
    groupsInfos: GroupsPageInfos;
    theming: PaywallThemingData;
    globalPresets: PresetsPageInfos;
    customPricePresetList: Preset[];
    customPromoPresetList: Promo[];
    saveContentPaywallInfos: (data: ContentPaywallPageInfos, contentId: string, contentType: ContentType) => Promise<void>;
    getContentPrices: (contentId: string, contentType: ContentType) => Promise<void>;
    createContentPricePreset: (data: Preset, contentId: string, contentType: ContentType) => Promise<void>;
    saveContentPricePreset: (data: Preset, contentId: string, contentType: ContentType) => Promise<void>;
    deleteContentPricePreset: (data: Preset, contentId: string, contentType: ContentType) => Promise<void>;
    getContentPromos: (contentId: string, contentType: ContentType) => Promise<void>;
    createContentPromoPreset: (data: Promo, contentId: string, contentType: ContentType) => Promise<void>;
    saveContentPromoPreset: (data: Promo, contentId: string, contentType: ContentType) => Promise<void>;
    deleteContentPromoPreset: (data: Promo, contentId: string, contentType: ContentType) => Promise<void>;
    createPromoPreset: (data: Promo) => Promise<void>;
    createPricePreset: (data: Preset) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

export const ContentPaywallPage = (props: ContentPaywallComponentProps) => {

    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')

    const [priceModalOpened, setPriceModalOpened] = React.useState<boolean>(false);
    const [promoModalOpened, setPromoModalOpened] = React.useState<boolean>(false);
    const [selectedPrice, setSelectedPrice] = React.useState<Preset>(null);
    const [selectedPromo, setSelectedPromo] = React.useState<Promo>(null);
    const [contentPaywallSettings, setContentPaywallSettings] = React.useState<ContentPaywallPageInfos>(props.contentPaywallInfos);
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [hasChanged, setHasChanged] = React.useState<boolean>(false)
    const [priceList, setPriceList] = React.useState<Preset[]>(props.contentPaywallInfos.prices ? props.contentPaywallInfos.prices.filter(p => p.type === 'individual') : [])
    const [promoList, setPromoList] = React.useState<Promo[]>(props.contentPaywallInfos.promos ? props.contentPaywallInfos.promos.filter(p => p.assignedContentIds.indexOf(`${accountId}-${props.contentType}-${props.contentId}`) !== -1) : [])

    const associatedGroupPrices = props.contentPaywallInfos.prices ? props.contentPaywallInfos.prices.filter(p => p.type === 'package') : []
    const themeDropdownList = props.theming.themes.map((item) => {
        let themeDropdownListItem: DropdownSingleListItem = {title: null, data: null}
        themeDropdownListItem.title = item.name
        themeDropdownListItem.data = item
        return themeDropdownListItem
    })

    React.useEffect(() => {
        setContentPaywallSettings(props.contentPaywallInfos)
    }, [props.contentPaywallInfos])

    React.useEffect(() => setPriceList(props.contentPaywallInfos.prices ? props.contentPaywallInfos.prices.filter(p => p.type === 'individual') : []), [props.contentPaywallInfos.prices])

    React.useEffect(() => setPromoList(props.contentPaywallInfos.promos ? props.contentPaywallInfos.promos.filter(p => p.assignedContentIds.indexOf(`${accountId}-${props.contentType}-${props.contentId}`) !== -1) : []), [props.contentPaywallInfos.promos])

    const pricesTableHeader = () => {
        return {data: [
            {cell: <Text key='pricesTableHeaderType' size={14} weight='med'>Type</Text>},
            {cell: <Text key='pricesTableHeaderPrice' size={14} weight='med'>Price</Text>},
            {cell: <Text key='pricesTableHeaderCurrency' size={14} weight='med'>Currency</Text>},
            {cell: <Text key='pricesTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>},
            {cell: <Text key='pricesTableHeaderMethod' size={14} weight='med'>Content Scheduling</Text>},
            {cell: <Button key='pricesTableHeaderButton' className='right mr2  sm-show ' onClick={() => {setSelectedPrice(null);setPriceModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price</Button>}

        ]}
    }

    const pricesTableBody = () => {
        if(priceList) {
            return priceList.map((price, key) => {
                return {data: [
                    <Text key={'pricesTableBodyType' + key} size={14} weight='reg'>{price.priceType}</Text>,
                    <Text key={'pricesTableBodyPrice' + key} size={14} weight='reg'>{price.prices ? price.prices[0].value : price.price}</Text>,
                    <Text key={'pricesTableBodyCurrency' + key} size={14} weight='reg'>{price.prices ? price.prices[0].currency : price.currency}</Text>,
                    <Text key={'pricesTableBodyDuration' + key} size={14} weight='reg'>{price.settings.recurrence ? price.settings.recurrence.unit : price.settings.duration.value + ' ' + price.settings.duration.unit}</Text>,
                    <Text key={'pricesTableBodyMethod' + key} size={14} weight='reg'>{price.settings.startMethod === 'Available on Purchase' ? 'On Purchase' : 'Date & Time Set'}</Text>,
                    price.isDeleted ? 
                    <Label key={'pricesTableBodyActionButtons' + key} backgroundColor="red20" color="red" label='Deleted' />
                    :
                    <IconContainer className="iconAction" key={'pricesTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPrice" + price.id}>
                            <IconStyle onClick={() =>  {props.deleteContentPricePreset(price, props.contentId, props.contentType);setPriceList(priceList.map(p => {if(price.id ===p.id) {return {...p, isDeleted: true}} return p}))}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPrice" + price.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + price.id}>
                            <IconStyle onClick={() =>  {setSelectedPrice(price);setPriceModalOpened(true)}}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + price.id}>Edit</Tooltip>
                    </IconContainer>
                ],
                isDisabled: price.isDeleted
            }
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
        if(promoList) {
            return promoList.map((promo, key) => {
                return {data: [
                    <Text key={'promosTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promosTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}%</Text>,
                    <Text key={'promosTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    promo.isDeleted ? 
                    <Label key={'promosTableBodyActionButtons' + key} backgroundColor="red20" color="red" label='Deleted' />
                    :
                    <IconContainer className="iconAction" key={'promosTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {props.deleteContentPromoPreset(promo, props.contentId, props.contentType);setPromoList(promoList.map(p => {if(promo.id ===p.id) {return {...p, isDeleted: true}} return p}))}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPromo" + promo.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {setSelectedPromo(promo);setPromoModalOpened(true)}}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltipPromo" + promo.id}>Edit</Tooltip>
                    </IconContainer>
                ],
                isDisabled: promo.isDeleted
            }
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
            {cell: <Text key='groupPricesTableHeaderMethod' size={14} weight='med'>Content Scheduling</Text>},
        ]}
    }

    const groupPricesTableBody = () => {
        if(associatedGroupPrices) {
            return associatedGroupPrices.map((price, key) => {
                return {data: [
                    <Text key={'groupPricesTableBodyName' + key} size={14} weight='reg'>{price.description}</Text>,
                    <Text key={'groupPricesTableBodyType' + key} size={14} weight='reg'>{price.priceType}</Text>,
                    <Text key={'groupPricesTableBodyPrice' + key} size={14} weight='reg'>{price.prices ? price.prices[0].value : price.price}</Text>,
                    <Text key={'groupPricesTableBodyCurrency' + key} size={14} weight='reg'>{price.prices ? price.prices[0].currency : price.currency}</Text>,
                    <Text key={'groupPricesTableBodyDuration' + key} size={14} weight='reg'>{price.settings.recurrence ? price.settings.recurrence.unit : price.settings.duration.value + ' ' + price.settings.duration.unit}</Text>,
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
                    list={themeDropdownList}
                    callback={(item: DropdownSingleListItem) => {setContentPaywallSettings({...contentPaywallSettings, selectedTheme: item.data.id});setHasChanged(true)}}
                />
                <div className='flex items-center'>
                    <Text size={16} weight='med'>Intro Video ID</Text>
                    <IconStyle className='pl1' id='videoIntroTooltip'>info_outlined</IconStyle>
                    <Tooltip target='videoIntroTooltip'>Preview video must not have a paywall or password applied.</Tooltip>
                </div>
                <Text size={14}>This video will play before the content is purchased. Provide the Content ID, which can be found in the General tab of your Video on Demand asset.</Text>
                <Input id='VodPaywallIntroVideoIdInput' defaultValue={props.contentPaywallInfos.introVodId} className='col col-12 sm-col-3 my2' placeholder='Video ID' onChange={(event) => {setContentPaywallSettings({...contentPaywallSettings, introVodId: event.currentTarget.value});setHasChanged(true)}} />
                        
                <Divider className='my2' />

                <Text size={20} weight='med'>Prices</Text>
                <Button className='right mt2 xs-show col col-12' onClick={() => {setSelectedPrice(null);setPriceModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price</Button>
                {priceList.length > 0 ? 
                    <Table id='pricesTable' headerBackgroundColor="gray-10" header={pricesTableHeader()} body={pricesTableBody()} />
                    :
                    <Table id='pricesEmptyTable' headerBackgroundColor="gray-10" header={emptyPriceTableHeader()} body={emptyContentListBody('You have no Prices')} />

                }
                <Divider className='my2' />

                <Text className="mt1" size={20} weight='med'>Promos</Text>
                <Button onClick={() => {setSelectedPromo(null);setPromoModalOpened(true)}} className='right xs-show mt2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo</Button>
                { promoList.length > 0 ?
                    <Table id='promosTable' headerBackgroundColor="gray-10" header={promosTableHeader()} body={promosTableBody()} />
                    :
                    <Table id='promosEmptyTable' headerBackgroundColor="gray-10" header={emptyPromoTableHeader()} body={emptyContentListBody('You have no Promos')} />

                }

                <Divider className='my2' />

                <Text size={20} weight='med'>Associated Group Prices</Text>

                { associatedGroupPrices.length > 0 ?
                    <Table id='groupPricesTable' headerBackgroundColor="gray-10" header={groupPricesTableHeader()} body={groupPricesTableBody()} />
                    : <Table id='associatedGroupPricesEmptyTable' headerBackgroundColor="gray-10" header={emptyGroupPriceTableHeader()} body={emptyContentListBody('No associated group prices')} />
                }
                   
            </Card>
            {
                hasChanged &&
                <div className='mt2'>
                    <Button isLoading={buttonLoading} onClick={() => handleSubmit()} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                    <Button onClick={() => {setContentPaywallSettings(props.contentPaywallInfos);props.showToast("Changes have been discarded", 'fixed', "success");setHasChanged(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Discard</Button>
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