import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import { GroupsComponentProps } from '../../../containers/Paywall/Groups';
import { GroupPromoModal } from './GroupPromoModal'
import { GroupPromo, GroupPrice, GroupPriceCreation } from '../../../redux-flow/store/Paywall/Groups/types';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { FoldersInfos } from '../../../redux-flow/store/Folders/types';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { emptyContentListBody } from '../../../shared/List/emptyContentListState';
import { getKnowledgebaseLink } from '../../../constants/KnowledgbaseLinks';
import { Divider } from '../../../../shared/MiscStyles';
import { GroupDetailsStep } from './GroupDetailsStep';
import { GroupContentStep } from './GroupContentStep';
import { AccessPaywallGroupsModal } from './AccessPaywallGroupsModal';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { Trans, useTranslation } from 'react-i18next';

interface GroupStepperSecondStepProps {
    folderData: FoldersInfos;
    getFolderContent: (path: string) => Promise<void>;
    getGroupPriceContents: (path: string) => Promise<void>;
}

export interface GroupStepperDataCreate {
    firststep: GroupPriceCreation;
    secondStep: GroupStepperSecondStepProps;
}

export interface GroupStepperData {
    firststep: GroupPrice;
    secondStep: GroupStepperSecondStepProps;
}

export const GroupsPage = (props: GroupsComponentProps) => {
    const pricesList = {
        price: {
            value: NaN,
            currency: 'USD'
        },
        settings: {
            duration: {value: NaN, unit: 'Hours'},
            recurrence: {unit: 'Weekly'},
            startMethod: 'Available on Purchase',
            timezone: null,
            startDate: 0,
            type: 'Pay Per View',
        },
    }

    const defaultPrice: GroupPrice = {
        id: '-1',
        name: '',
        prices: [pricesList],
        contents: [],
        groupSettings: {
            duration: {value: NaN, unit: 'Hours'},
            recurrence: {unit: 'Weekly'},
            startMethod: 'Available on Purchase',
            timezone: null,
            startDate: 0,
            type: 'Pay Per View',
        }
    }
    const { t } = useTranslation()

    const [groupPricesStepperOpened, setGroupPricesStepperOpened] = React.useState<boolean>(false);
    const [groupPromosModalOpened, setGroupPromosModalOpened] = React.useState<boolean>(false);
    const [accessPaywallGroupsModalOpened, setAccessPaywallGroupsModalOpened] = React.useState<boolean>(false)
    const [selectedGroupPrice, setSelectedGroupPrice] = React.useState<GroupPrice>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [stepperLoading, setStepperLoading] = React.useState<boolean>(false)
    const [selectedGroupPromo, setSelectedGroupPromo] = React.useState<GroupPromo>(null);
    const [stepperData, setStepperData] = React.useState<GroupStepperData>({firststep: defaultPrice, secondStep: {...props}});
    const [priceList, setPriceList] = React.useState<GroupPrice[]>(props.groupsInfos.prices.packages || [])
    const [promoList, setPromoList] = React.useState<GroupPromo[]>(props.groupsInfos.promos.promos ? props.groupsInfos.promos.promos.filter(p => p.assignedContentIds.length === 0 && p.assignedGroupIds.length > 0) : [])
    const groupPriceSteps = [{title: t('paywall_groups_price_modal_label_step_1'), content: GroupDetailsStep}, {title: t('paywall_groups_price_modal_label_step_2'), content: GroupContentStep}]

    React.useEffect(() => {
        setStepperData({...stepperData, secondStep: {...props}})
    }, [props])

    React.useEffect(() => setPriceList(props.groupsInfos.prices.packages), [props.groupsInfos.prices])

    React.useEffect(() => setPromoList(props.groupsInfos.promos.promos ? props.groupsInfos.promos.promos.filter(p => p.assignedContentIds.length === 0 && p.assignedGroupIds.length > 0) : []), [props.groupsInfos.promos])


    const handlePriceGroupButtonFunction = () => {
        if(props.folderData.requestedContent && props.folderData.requestedContent.results.length > 0){
            setStepperData({...stepperData, firststep: defaultPrice});
            setSelectedGroupPrice(null);
            setGroupPricesStepperOpened(true)
        } else {
            setAccessPaywallGroupsModalOpened(true)
        }
    }

    const groupPricesTableHeader = () => {
        return {data: [
            {cell: <Text key='groupPricesTableHeaderName' size={14} weight='med'>{t('dashboard_top_live_channels_widget_column_title_1')}</Text>},
            {cell: <Text key='groupPricesTableHeaderType' size={14} weight='med'>{t('common_paywall_price_table_header_type')}</Text>},
            {cell: <Text key='groupPricesTableHeaderPrice' size={14} weight='med'>{t('common_paywall_price_table_header_price')}</Text>},
            {cell: <Text key='groupPricesTableHeaderCurrency' size={14} weight='med'>{t('common_paywall_price_table_header_currency')}</Text>},
            {cell: <Text key='groupPricesTableHeaderDuration' size={14} weight='med'>{t('common_paywall_price_table_header_duration')}</Text>},
            {cell: <Text key='groupPricesTableHeaderMethod' size={14} weight='med'>{t('common_security_content_scheduling_title')}</Text>},
            {cell: <Button key='groupPricesTableHeaderButton' className='right mr2 sm-show' onClick={() => {setStepperData({...stepperData, firststep: defaultPrice});setSelectedGroupPrice(null);setGroupPricesStepperOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>{t('paywall_groups_price_table_create_button')}</Button>}

        ]}
    }

    const emptyGroupPriceTableHeader = () => {
        return {data: [
            {cell: <Text key='groupPricesTableHeaderName' size={14} weight='med'>{t('common_paywall_price_table_table_body_placeholder')}</Text>},
            {cell: <Button key='groupPricesTableHeaderButton' className='right mr2 sm-show' onClick={() => handlePriceGroupButtonFunction()} typeButton='primary' sizeButton='xs' buttonColor='blue'>Create Price Group</Button>}
        ]}
    }

    const groupPricesTableBody = () => {
        if(priceList) {
            return priceList.map((price, key) => {
                return {
                    data: price.prices.length > 0 ? [
                        <Text key={'groupPricesTableBodyName' + key} size={14} weight='reg'>{price.name}</Text>,
                        <Text key={'groupPricesTableBodyType' + key} size={14} weight='reg'>{price.groupSettings.type}</Text>,
                        <Text key={'groupPricesTableBodyPrice' + key} size={14} weight='reg'>{price.prices.length === 1 ? price.prices[0].price.value : 'Multiple Prices'}</Text>,
                        <Text key={'groupPricesTableBodyCurrency' + key} size={14} weight='reg'>{price.prices.length === 1 ? price.prices[0].price.currency : 'Multiple Currencies'}</Text>,
                        <Text key={'groupPricesTableBodyDuration' + key} size={14} weight='reg'>{price.groupSettings.recurrence ? price.groupSettings.recurrence.unit : price.groupSettings.duration.value + ' ' + price.groupSettings.duration.unit}</Text>,
                        <Text key={'groupPricesTableBodyMethod' + key} size={14} weight='reg'>{price.groupSettings.startMethod === 'Available on Purchase' ? 'On Purchase' : 'Date & Time Set'}</Text>,
                    price.isDeleted ? 
                        <Label key={'groupPricesTableBodyActionButtons' + key} backgroundColor="red20" color="red" label='Deleted' />
                        :
                        <IconContainer className="iconAction" key={'groupPricesTableBodyActionButtons' + key}>
                            <ActionIcon id={"deleteTooltipPrice" + price.id}>
                                <IconStyle onClick={() =>  {props.deleteGroupPrice(price);setPriceList(priceList.map(p => {if(price.id ===p.id) {return {...p, isDeleted: true}} return p}))}}>delete</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"deleteTooltipPrice" + price.id}>Delete</Tooltip>
                            <ActionIcon id={"editTooltipPrice" + price.id}>
                                <IconStyle onClick={() =>  {setStepperData({...stepperData, firststep: price});setSelectedGroupPrice(price);setGroupPricesStepperOpened(true)}}>edit</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"editTooltipPrice" + price.id}>Edit</Tooltip>
                        </IconContainer>
                    ]
                    : [
                        <Text key={'groupPricesTableBodyName' + key} size={14} weight='reg'>{`Something went wrong with the group price: ${price.name}`}</Text>,
                        <span key='emptyspan1'></span>,
                        <span key='emptyspan2'></span>,
                        <span key='emptyspan3'></span>,
                        <span key='emptyspan4'></span>,
                        <span key='emptyspan5'></span>,
                        price.isDeleted ? 
                        <Label key={'groupPricesTableBodyActionButtons' + key} backgroundColor="red20" color="red" label='Deleted' />
                        :
                        <IconContainer className="iconAction" key={'groupPricesTableBodyActionButtons' + key}>
                            <ActionIcon id={"deleteTooltipPrice" + price.id}>
                                <IconStyle onClick={() =>  {props.deleteGroupPrice(price);setPriceList(priceList.map(p => {if(price.id ===p.id) {return {...p, isDeleted: true}} return p}))}}>delete</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"deleteTooltipPrice" + price.id}>Delete</Tooltip>
                        </IconContainer>
                    ],
                    isDisabled: price.isDeleted,
                }
            })
        }
    }

    const groupPromosTableHeader = () => {
        return {data: [
            {cell: <Text key='promoGroupsTableHeaderAssociatedGroupPrice' size={14} weight='med'>{t('paywall_groups_promo_table_associated_group_price')}</Text>},
            {cell: <Text key='promoGroupsTableHeaderCode' size={14} weight='med'>{t('common_paywall_promo_modal_alphanumericode_title')}</Text>},
            {cell: <Text key='promoGroupsTableHeaderDiscount' size={14} weight='med'>{t('common_paywall_promo_table_header_discount')}</Text>},
            {cell: <Text key='promoGroupsTableHeaderLimit' size={14} weight='med'>{t('common_paywall_promo_table_header_limit')}</Text>},
            {cell: <Button key='promoGroupsTableHeaderButton' onClick={() => {setSelectedGroupPromo(null);setGroupPromosModalOpened(true)}} className='right mr2 sm-show'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>{t('paywall_groups_promo_table_create_button')}</Button>}

        ]}
    }

    const emptyGroupPromoTableHeader = () => {
        return {data: [
            {cell: <Text key='groupPromosTableHeaderName' size={14} weight='med'>{t('common_paywall_promo_table_table_body_placeholder')}</Text>},
            {cell: props.groupsInfos.prices.packages.length > 0 && <Button key='promoGroupsTableHeaderButton' onClick={() => {setSelectedGroupPromo(null);setGroupPromosModalOpened(true)}} className='right mr2 sm-show'  typeButton='primary' sizeButton='xs' buttonColor='blue'>{t('paywall_groups_promo_table_create_button')}</Button>}
        ]}
    }

    const groupPromosTableBody = () => {
        if(promoList) {
            return promoList.filter(p => p.assignedContentIds.length === 0 && p.assignedGroupIds.length > 0).map((promo, key) => {
                return {data: [
                    <Text key={'promoGroupsTableBodyType' + key} size={14} weight='reg'>{props.groupsInfos.prices.packages.filter(g => g.id === promo.assignedGroupIds[0]).length > 0 ? props.groupsInfos.prices.packages.filter(g => g.id === promo.assignedGroupIds[0])[0].name : ''}</Text>,
                    <Text key={'promoGroupsTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promoGroupsTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}%</Text>,
                    <Text key={'promoGroupsTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    promo.isDeleted ? 
                    <Label key={'promoGroupsTableBodyActionButtons' + key} backgroundColor="red20" color="red" label='Deleted' />
                    :
                    <IconContainer className="iconAction" key={'promoGroupsTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {props.deleteGroupPromo(promo);setPromoList(promoList.map(p => {if(promo.id ===p.id) {return {...p, isDeleted: true}} return p}))}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPromo" + promo.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {setSelectedGroupPromo(promo);setGroupPromosModalOpened(true)}}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltipPromo" + promo.id}>Edit</Tooltip>
                    </IconContainer>
                ],
                isDisabled: promo.isDeleted,
            }
            })
        }
    }

    const handleStepperSubmit = () => {
        if(selectedGroupPrice) {
            setStepperLoading(true)
            props.saveGroupPrice(stepperData.firststep).then(() => {
                setStepperLoading(false)
                setGroupPricesStepperOpened(false)
            })
        } else {
            setIsLoading(true)
            setStepperLoading(true)
            props.createGroupPrice(stepperData.firststep).then(() => {
                setStepperLoading(false)
                setGroupPricesStepperOpened(false)
                props.getGroupPrices().then(() => {setIsLoading(false)})
            })
        }
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>{t('paywall_groups_price_title')}</Text>
                <Text className="mt2" size={14} weight='reg' color='gray-3'>{t('paywall_groups_price_description')}</Text>
                <div className="flex col col-12 mt2">
                    <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                    <Text size={14} weight='reg' color='gray-3'><Trans i18nKey='paywall_groups_price_help_text'>Need help setting up a Group Price ? Visit the <a href={getKnowledgebaseLink('Group Price')} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Trans></Text>
                </div>
                <Button key='groupPricesTableHeaderButton' className='xs-show mt2 col col-12' onClick={() => {setStepperData({firststep: defaultPrice, secondStep: {...props}});setSelectedGroupPrice(null);setGroupPricesStepperOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>{t('paywall_groups_price_table_create_button')}</Button>
                <Table id='groupPricessTable' contentLoading={isLoading} headerBackgroundColor="gray-10" header={priceList.length > 0 ? groupPricesTableHeader() : emptyGroupPriceTableHeader()} body={groupPricesTableBody()} />
                <Divider className='my2' />

                <Text className="mt1" size={20} weight='med'>{t('paywall_groups_promo_title')}</Text>
                <Text className="mt2" size={14} weight='reg' color='gray-3'>{t('paywall_groups_promo_description')}</Text>
                <div className="flex col col-12 mt2">
                    <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                    <Text size={14} weight='reg' color='gray-3'><Trans i18nKey='paywall_groups_promo_help_text'>Need help setting up a Group Promo? Visit the <a href={getKnowledgebaseLink('Group Promo')} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Trans></Text>
                </div>
                <Button key='promoGroupsTableHeaderButton' onClick={() => {setSelectedGroupPromo(null);setGroupPromosModalOpened(true)}} className='xs-show mt2 col col-12'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>{t('paywall_groups_promo_table_create_button')}</Button>
                <Table id='groupPromosTable' headerBackgroundColor="gray-10" header={promoList.length > 0 ? groupPromosTableHeader() : emptyGroupPromoTableHeader()} body={groupPromosTableBody()} />
            </Card>
            <Modal hasClose={false} modalTitle={selectedGroupPromo ? 'Edit Promo Group' : t('paywall_groups_promo_table_create_button')} opened={groupPromosModalOpened} toggle={() => setGroupPromosModalOpened(false)}>
                {
                    groupPromosModalOpened && <GroupPromoModal action={selectedGroupPromo ? props.saveGroupPromo : props.createGroupPromo} groupPromo={selectedGroupPromo} toggle={setGroupPromosModalOpened} groupList={props.groupsInfos.prices.packages} />

                }
            </Modal>
            <Modal hasClose modalTitle="Access Paywall Groups" opened={accessPaywallGroupsModalOpened} toggle={() => {setAccessPaywallGroupsModalOpened(false)}} >
                <AccessPaywallGroupsModal />
            </Modal>

            {
                groupPricesStepperOpened &&
                <CustomStepper
                    opened={groupPricesStepperOpened}
                    stepperHeader={selectedGroupPrice ? 'Edit Price Group' : t('paywall_groups_price_table_create_button')}
                    stepList={groupPriceSteps}
                    lastStepButton={selectedGroupPrice ? t('common_button_text_save') : t('common_button_text_create')}
                    stepperData={stepperData}
                    widthSecondStep={60}
                    isLoading={stepperLoading}
                    updateStepperData={(value: GroupStepperData) => setStepperData(value)}
                    functionCancel={() => {setGroupPricesStepperOpened(false);setStepperData({firststep: defaultPrice, secondStep: {...props}})}}
                    finalFunction={() => handleStepperSubmit()}
                />
            }

        </div>

    )
}

