import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { PricePresetsModal } from './PricePresetsModal';
import { PromoPresetsModal } from './PromoPresetsModal';
import { Preset, Promo } from '../../../redux-flow/store/Paywall/Presets';
import { PresetsComponentProps } from '../../../containers/Paywall/Presets';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { getKnowledgebaseLink } from '../../../constants/KnowledgbaseLinks';
import { Divider } from '../../../../shared/MiscStyles';
import { userToken } from '../../../utils/services/token/tokenService';
import { Label } from '../../../../components/FormsComponents/Label/Label';

export const PresetsPage = (props: PresetsComponentProps) => {

    const [pricePresetsModalOpened, setPricePresetsModalOpened] = React.useState<boolean>(false);
    const [promoPresetsModalOpened, setPromoPresetsModalOpened] = React.useState<boolean>(false);
    const [selectedPreset, setSelectedPreset] = React.useState<Preset>(null);
    const [selectedPromo, setSelectedPromo] = React.useState<Promo>(null);
    const [pricePresetPaginationInfo, setPricePresetPaginationInfo] = React.useState<{page: number; nbResults: number}>({page:1,nbResults:10})
    const [promoPresetPaginationInfo, setPromoPresetPaginationInfo] = React.useState<{page: number; nbResults: number}>({page:1,nbResults:10})
    const [pricePresetList, setPricePresetList] = React.useState<Preset[]>(props.presetsInfos.presets && props.presetsInfos.presets.prices ? props.presetsInfos.presets.prices : [])
    const [promoPresetList, setPromoPresetList] = React.useState<Promo[]>(props.presetsInfos.promos && props.presetsInfos.promos.promos ? props.presetsInfos.promos.promos : [])

    React.useEffect(() => {
        if (props.associatePrivilege.some(p => userToken.isUnauthorized(p))) {
            return
        }
        if(pricePresetPaginationInfo.nbResults && pricePresetPaginationInfo.page) {
            props.getPresetsInfos(`per-page=${pricePresetPaginationInfo.nbResults}&page=${pricePresetPaginationInfo.page}`)
        }
    }, [pricePresetPaginationInfo])

    React.useEffect(() => {
        if (props.associatePrivilege.some(p => userToken.isUnauthorized(p))) {
            return
        }
        if(promoPresetPaginationInfo.nbResults && promoPresetPaginationInfo.page) {
            props.getPromoPresets(`per-page=${promoPresetPaginationInfo.nbResults}&page=${promoPresetPaginationInfo.page}`)
        }
    }, [promoPresetPaginationInfo])

    React.useEffect(() => setPricePresetList(props.presetsInfos.presets.prices), [props.presetsInfos.presets])

    React.useEffect(() => setPromoPresetList(props.presetsInfos.promos.promos), [props.presetsInfos.promos])

    const pricePresetsTableHeader = () => {
        return {data: [
            {cell: <Text key='pricePresetsTableHeaderName' size={14} weight='med'>Name</Text>},
            {cell: <Text key='pricePresetsTableHeaderType' size={14} weight='med'>Type</Text>},
            {cell: <Text key='pricePresetsTableHeaderPrice' size={14} weight='med'>Price</Text>},
            {cell: <Text key='pricePresetsTableHeaderCurrency' size={14} weight='med'>Currency</Text>},
            {cell: <Text key='pricePresetsTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>},
            {cell: <Text key='pricePresetsTableHeaderMethod' size={14} weight='med'>Content Scheduling</Text>},
            {cell: <Button key='pricePresetsTableHeaderButton' className='right mr2 sm-show' onClick={() => {setSelectedPreset(null);setPricePresetsModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Price Preset</Button>}

        ]}
    }

    const pricePresetsTableBody = () => {
        if(pricePresetList) {
            return pricePresetList.map((preset, key) => {
                return {data: [
                    <Text key={'pricePresetsTableBodyName' + key} size={14} weight='reg'>{preset.name}</Text>,
                    <Text key={'pricePresetsTableBodyType' + key} size={14} weight='reg'>{preset.priceType}</Text>,
                    <Text key={'pricePresetsTableBodyPrice' + key} size={14} weight='reg'>{preset.prices ? preset.prices[0].value : 0}</Text>,
                    <Text key={'pricePresetsTableBodyCurrency' + key} size={14} weight='reg'>{preset.prices ? preset.prices[0].currency : 'USD'}</Text>,
                    <Text key={'pricePresetsTableBodyDuration' + key} size={14} weight='reg'>{preset.settings.recurrence ? preset.settings.recurrence.unit : preset.settings.duration.value + ' ' + preset.settings.duration.unit}</Text>,
                    <Text key={'pricePresetsTableBodyMethod' + key} size={14} weight='reg'>{preset.settings.startMethod === 'Available on Purchase' ? 'On Purchase' : 'Date & Time Set'}</Text>,
                    preset.isDeleted ? 
                    <Label key={'pricePresetsTableBodyActionButtons' + key} backgroundColor="red20" color="red" label='Deleted' />
                    :
                    <IconContainer className="iconAction" key={'pricePresetsTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltip" + preset.id}>
                            <IconStyle onClick={() =>  {props.deletePricePreset(preset);setPricePresetList(pricePresetList.map(p => {if(preset.id ===p.id) {return {...p, isDeleted: true}} return p}))}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + preset.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + preset.id}>
                            <IconStyle onClick={() =>  {setSelectedPreset(preset);setPricePresetsModalOpened(true)}}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + preset.id}>Edit</Tooltip>
                    </IconContainer>
                ],
                isDisabled: preset.isDeleted
            }
            })
        }
    }

    const promoPresetsTableHeader = () => {
        return {data: [
            {cell: <Text key='promoPresetsTableHeaderName' size={14} weight='med'>Name</Text>},
            {cell: <Text key='promoPresetsTableHeaderDiscount' size={14} weight='med'>Discount</Text>},
            {cell: <Text key='promoPresetsTableHeaderLimit' size={14} weight='med'>Limit</Text>},
            {cell: <Button key='promoPresetsTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoPresetsModalOpened(true)}} className='right mr2 sm-show'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Promo Preset</Button>}

        ]}
    }

    const promoPresetsTableBody = () => {
        if(promoPresetList) {
            return promoPresetList.map((promo, key) => {
                return {data: [
                    <Text key={'promoPresestTableBodyName' + key} size={14} weight='reg'>{promo.name}</Text>,
                    <Text key={'promoPresetsTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}%</Text>,
                    <Text key={'promoPresetsTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    promo.isDeleted ? 
                    <Label key={'promoPresetsTableBodyActionButtons' + key} backgroundColor="red20" color="red" label='Deleted' />
                    :
                    <IconContainer className="iconAction" key={'promoPresetsTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {props.deletePromoPreset(promo);setPromoPresetList(promoPresetList.map(p => {if(promo.id === p.id) {return {...p, isDeleted: true}} return p}))}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPromo" + promo.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {setSelectedPromo(promo);setPromoPresetsModalOpened(true)}}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltipPromo" + promo.id}>Edit</Tooltip>
                    </IconContainer>
                ],
                isDisabled: promo.isDeleted
            }
            })
        }
    }

    const emptyPricePresetTableHeader = () => {
        return {data: [
            {cell: <span key={"emptyPricePresetTableHeader"}></span>},
            {cell: <Button key='pricePresetsTableHeaderButton' className='right mr2 sm-show' onClick={() => {setSelectedPreset(null);setPricePresetsModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Price Preset</Button>}
        ]}
    }

    const emptyPromoPresetTableHeader = () => {
        return {data: [
            {cell: <span key={"emptyPromoPresetTableHeader"}></span>},
            {cell: <Button key='promoPresetsTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoPresetsModalOpened(true)}} className='right mr2 sm-show'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Promo Preset</Button>}
        ]}
    }


    const emptyPresetTableBody = (text: string) => {
        return [{data: [
            <span key={'emptyPresetTableBody'}></span>,
            <div className='left'><Text key={text} size={14} weight='reg' color='gray-3' >{text}</Text></div>
        ]}]
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>Price Presets</Text>
                <Text className="mt2" size={14} weight='reg' color='gray-3'>Presets allow you to apply a set of prices to your content in one action.</Text>
                <div className="flex col col-12 mt2 xs-mb2">
                    <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                    <Text  size={14} weight="reg">Need help setting up a Price Preset? Visit the <a href={getKnowledgebaseLink('Price Preset')} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                <Button key='pricePresetsTableHeaderButton' className='col col-12 xs-show' onClick={() => {setSelectedPreset(null);setPricePresetsModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Price Preset</Button>
                {!props.presetsInfos.presets || props.presetsInfos.presets.totalItems === 0 ?
                    <Table id='pricePresetsEmptyTable' headerBackgroundColor="gray-10" header={emptyPricePresetTableHeader()} body={emptyPresetTableBody('You have no Price Presets')} />
                    :
                    <>
                        <Table id='pricePresetsTable' headerBackgroundColor="gray-10" header={pricePresetsTableHeader()} body={pricePresetsTableBody()} />
                        <Pagination totalResults={props.presetsInfos.presets.prices ? props.presetsInfos.presets.totalItems : 0} displayedItemsOptions={[10, 20, 100]} callback={(page: number, nbResults: number) => {setPricePresetPaginationInfo({page:page,nbResults:nbResults})}} />

                   </>
                }
                <Divider className='my2' />

                <Text className="mt1" size={20} weight='med'>Promo Presets</Text>
                <Text className="mt2" size={14} weight='reg' color='gray-3'>Presets allow you to apply a set of prices to your content in one action.</Text>
                <div className="flex col col-12 mt2 xs-mb2">
                    <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                    <Text  size={14} weight="reg">Need help setting up a Promo Preset? Visit the <a href={getKnowledgebaseLink("Promo Preset")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                <Button key='promoPresetsTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoPresetsModalOpened(true)}} className='xs-show'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Promo Preset</Button>
                { !props.presetsInfos.promos || props.presetsInfos.promos.totalItems === 0 ?
                    <Table id='promoPresetsEmptyTable' headerBackgroundColor="gray-10" header={emptyPromoPresetTableHeader()} body={emptyPresetTableBody('You have no Promo Presets')} />
                    :
                    <>
                        <Table id='promoPresetsTable' headerBackgroundColor="gray-10" header={promoPresetsTableHeader()} body={promoPresetsTableBody()} />
                        <Pagination totalResults={props.presetsInfos.promos.promos ? props.presetsInfos.promos.totalItems : 0} displayedItemsOptions={[10, 20, 100]} callback={(page: number, nbResults: number) => {setPromoPresetPaginationInfo({page:page,nbResults:nbResults})}} />
                    </>
                }

            </Card>
            <Modal hasClose={false} modalTitle={selectedPreset ? 'Edit Price Preset' : 'Create Price Preset'} opened={pricePresetsModalOpened} toggle={() => setPricePresetsModalOpened(false)}>
                {
                    pricePresetsModalOpened &&
                        <PricePresetsModal action={selectedPreset ? props.savePricePreset : props.createPricePreset} preset={selectedPreset} toggle={setPricePresetsModalOpened} />
                }
            </Modal>
            <Modal hasClose={false} modalTitle={selectedPromo ? 'Edit Promo Preset' : 'Create Promo Preset'} opened={promoPresetsModalOpened} toggle={() => setPromoPresetsModalOpened(false)}>
                {
                    promoPresetsModalOpened &&
                        <PromoPresetsModal action={selectedPromo ? props.savePromoPreset : props.createPromoPreset} promo={selectedPromo} toggle={setPromoPresetsModalOpened} />
                }
            </Modal>
        </div>

    )
}

