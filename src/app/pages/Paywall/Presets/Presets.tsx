import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { BorderStyle } from './PresetsStyle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { PricePresetsModal } from './PricePresetsModal';
import { PromoPresetsModal } from './PromoPresetsModal';
import { Preset, Promo } from '../../../redux-flow/store/Paywall/Presets';
import { PresetsComponentProps } from '../../../containers/Paywall/Presets';
import { IconStyle, IconContainer } from '../../../../shared/Common/Icon';
import { ActionIcon } from '../../../shared/ActionIconStyle';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';

export const PresetsPage = (props: PresetsComponentProps) => {

    const [pricePresetsModalOpened, setPricePresetsModalOpened] = React.useState<boolean>(false);
    const [promoPresetsModalOpened, setPromoPresetsModalOpened] = React.useState<boolean>(false);
    const [selectedPreset, setSelectedPreset] = React.useState<Preset>(null);
    const [selectedPromo, setSelectedPromo] = React.useState<Promo>(null);

    const pricePresetsTableHeader = () => {
        return {data: [
            {cell: <Text key='pricePresetsTableHeaderName' size={14} weight='med'>Name</Text>},
            {cell: <Text key='pricePresetsTableHeaderType' size={14} weight='med'>Type</Text>},
            {cell: <Text key='pricePresetsTableHeaderPrice' size={14} weight='med'>Price</Text>},
            {cell: <Text key='pricePresetsTableHeaderCurrency' size={14} weight='med'>Currency</Text>},
            {cell: <Text key='pricePresetsTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>},
            {cell: <Text key='pricePresetsTableHeaderMethod' size={14} weight='med'>Start Method</Text>},
            {cell: <Button key='pricePresetsTableHeaderButton' className='right mr2' onClick={() => {setSelectedPreset(null);setPricePresetsModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Price Preset</Button>}

        ]}
    }

    const pricePresetsTableBody = () => {
        if(props.presetsInfos.presets) {
            return props.presetsInfos.presets.map((preset, key) => {
                return {data: [
                    <Text key={'pricePresetsTableBodyName' + key} size={14} weight='reg'>{preset.name}</Text>,
                    <Text key={'pricePresetsTableBodyType' + key} size={14} weight='reg'>{preset.type}</Text>,
                    <Text key={'pricePresetsTableBodyPrice' + key} size={14} weight='reg'>{preset.price[0].amount}</Text>,
                    <Text key={'pricePresetsTableBodyCurrency' + key} size={14} weight='reg'>{preset.price[0].currency}</Text>,
                    <Text key={'pricePresetsTableBodyDuration' + key} size={14} weight='reg'>{preset.recurrence ? preset.recurrence : preset.duration.amount + ' ' + preset.duration.type}</Text>,
                    <Text key={'pricePresetsTableBodyMethod' + key} size={14} weight='reg'>{preset.startMethod}</Text>,
                    <IconContainer className="iconAction" key={'pricePresetsTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltip" + preset.id}>
                            <IconStyle onClick={() =>  {props.deletePricePreset(preset)}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + preset.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + preset.id}>
                            <IconStyle onClick={() =>  {setSelectedPreset(preset);setPricePresetsModalOpened(true)}}>edit</IconStyle>
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
            {cell: <Button key='promoPresetsTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoPresetsModalOpened(true)}} className='right mr2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Promo Preset</Button>}

        ]}
    }

    const promoPresetsTableBody = () => {
        if(props.presetsInfos.promos) {
            return props.presetsInfos.promos.map((promo, key) => {
                return {data: [
                    <Text key={'promoPresestTableBodyName' + key} size={14} weight='reg'>{promo.name}</Text>,
                    <Text key={'promoPresetsTableBodyType' + key} size={14} weight='reg'>{promo.rateType}</Text>,
                    <Text key={'promoPresetsTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promoPresetsTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}</Text>,
                    <Text key={'promoPresetsTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    <IconContainer className="iconAction" key={'promoPresetsTableBodyActionButtons' + key}>
                        <ActionIcon id={"deleteTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {props.deletePromoPreset(promo)}}>delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltipPromo" + promo.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltipPromo" + promo.id}>
                            <IconStyle onClick={() =>  {setSelectedPromo(promo);setPromoPresetsModalOpened(true)}}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltipPromo" + promo.id}>Edit</Tooltip>   
                    </IconContainer>
                ]}
            })
        }
    }

    const emptyPricePresetTableHeader = () => {
        return {data: [
            {cell: <span key={"emptyPricePresetTableHeader"}></span>},
            {cell: <Button key='pricePresetsTableHeaderButton' className='right mr2' onClick={() => {setSelectedPreset(null);setPricePresetsModalOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Price Preset</Button>}
        ]}
    }

    const emptyPromoPresetTableHeader = () => {
        return {data: [
            {cell: <span key={"emptyPromoPresetTableHeader"}></span>},
            {cell: <Button key='promoPresetsTableHeaderButton' onClick={() => {setSelectedPromo(null);setPromoPresetsModalOpened(true)}} className='right mr2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>Create Promo Preset</Button>}
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
                <div className="flex col col-12 mt2">
                    <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                    <Text  size={14} weight="reg">Need help setting up a Price Preset? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                {props.presetsInfos.presets.length === 0 ? 
                    <Table id='pricePresetsEmptyTable' headerBackgroundColor="gray-10" header={emptyPricePresetTableHeader()} body={emptyPresetTableBody('You have no Price Presets')} />
                    :
                    <Table id='pricePresetsTable' headerBackgroundColor="gray-10" header={pricePresetsTableHeader()} body={pricePresetsTableBody()} />
                   
                }
                <BorderStyle className='my2' />

                <Text className="mt1" size={20} weight='med'>Promo Presets</Text>
                <Text className="mt2" size={14} weight='reg' color='gray-3'>Presets allow you to apply a set of prices to your content in one action.</Text>
                <div className="flex col col-12 mt2">
                    <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                    <Text  size={14} weight="reg">Need help setting up a Promo Preset? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                { props.presetsInfos.promos.length === 0 ?
                    <Table id='promoPresetsEmptyTable' headerBackgroundColor="gray-10" header={emptyPromoPresetTableHeader()} body={emptyPresetTableBody('You have no Promo Presets')} />
                    :
                    <Table id='promoPresetsTable' headerBackgroundColor="gray-10" header={promoPresetsTableHeader()} body={promoPresetsTableBody()} />
                }
                
            </Card>
            <Modal hasClose={false} title={selectedPreset ? 'Edit Price Preset' : 'Create Price Preset'} opened={pricePresetsModalOpened} toggle={() => setPricePresetsModalOpened(false)}>
                {
                    pricePresetsModalOpened ?
                        <PricePresetsModal action={selectedPreset ? props.savePricePreset : props.createPricePreset} preset={selectedPreset} toggle={setPricePresetsModalOpened} />
                        : null
                }
            </Modal>
            <Modal hasClose={false} title={selectedPromo ? 'Edit Promo Preset' : 'Create Promo Preset'} opened={promoPresetsModalOpened} toggle={() => setPromoPresetsModalOpened(false)}>
                {
                    promoPresetsModalOpened ?
                        <PromoPresetsModal action={selectedPromo ? props.savePromoPreset : props.createPromoPreset} promo={selectedPromo} toggle={setPromoPresetsModalOpened} />
                        : null
                }
            </Modal>
        </div>

    )
}

