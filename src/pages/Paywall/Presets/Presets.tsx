import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Table } from '../../../components/Table/Table';
import { BorderStyle, IconContainer } from './PresetsStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { PricePresetsModal } from './PricePresetsModal';
import { PromoPresetsModal } from './PromoPresetsModal';
import { Preset, Promo } from '../../../redux-flow/store/Paywall/Presets';
import { PresetsComponentProps } from '../../../containers/Paywall/Presets';
import { Icon } from '@material-ui/core';

export const PresetsPage = (props: PresetsComponentProps) => {

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
        if(props.presetsInfos.presets) {
            return props.presetsInfos.presets.map((preset, key) => {
                return [
                    <Text key={'pricePresetsTableBodyName' + key} size={14} weight='reg'>{preset.name}</Text>,
                    <Text key={'pricePresetsTableBodyType' + key} size={14} weight='reg'>{preset.type}</Text>,
                    <Text key={'pricePresetsTableBodyPrice' + key} size={14} weight='reg'>{preset.price[0].amount}</Text>,
                    <Text key={'pricePresetsTableBodyCurrency' + key} size={14} weight='reg'>{preset.price[0].currency}</Text>,
                    <Text key={'pricePresetsTableBodyDuration' + key} size={14} weight='reg'>{preset.recurrence ? preset.recurrence : preset.duration.amount + ' ' + preset.duration.type}</Text>,
                    <Text key={'pricePresetsTableBodyMethod' + key} size={14} weight='reg'>{preset.startMethod}</Text>,
                    <IconContainer className="iconAction" key={'pricePresetsTableBodyActionButtons' + key}><Icon onClick={() =>  {props.deletePricePreset(preset)}}>delete</Icon><Icon onClick={() =>  {setSelectedPreset(preset);setPricePresetsModalOpened(true)}}>edit</Icon></IconContainer>
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
        if(props.presetsInfos.promos) {
            return props.presetsInfos.promos.map((promo, key) => {
                return [
                    <Text key={'promoPresestTableBodyName' + key} size={14} weight='reg'>{promo.name}</Text>,
                    <Text key={'promoPresetsTableBodyType' + key} size={14} weight='reg'>{promo.rateType}</Text>,
                    <Text key={'promoPresetsTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promoPresetsTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}</Text>,
                    <Text key={'promoPresetsTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    <IconContainer className="iconAction" key={'promoPresetsTableBodyActionButtons' + key}><Icon onClick={() =>  {props.deletePromoPreset(promo)}}>delete</Icon><Icon onClick={() =>  {setSelectedPromo(promo);setPromoPresetsModalOpened(true)}}>edit</Icon></IconContainer>
                ]
            })
        }
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>Price Presets</Text>
                <Text size={14} weight='reg' color='gray-3'>Presets allow you to apply a set of prices to your content in one action.</Text>
                <Text size={14} weight='reg' color='gray-3'>Need help setting up a Price Presets ? Visit the Knowledge Base</Text>
                <Table className='my2' id='pricePresetsTable' header={pricePresetsTableHeader()} body={pricePresetsTableBody()} />
                <BorderStyle className='my2' />

                <Text size={20} weight='med'>Promo Presets</Text>
                <Text size={14} weight='reg' color='gray-3'>Presets allow you to apply a set of prices to your content in one action.</Text>
                <Text size={14} weight='reg' color='gray-3'>Need help setting up a Promo Presets ? Visit the Knowledge Base</Text>
                <Table className='my2' id='promoPresetsTable' header={promoPresetsTableHeader()} body={promoPresetsTableBody()} />
            </Card>
            <Modal hasClose={false} title='Create Price Preset' opened={pricePresetsModalOpened} toggle={() => setPricePresetsModalOpened(false)}>
                <PricePresetsModal action={selectedPreset ? props.savePricePreset : props.createPricePreset} preset={selectedPreset} toggle={setPricePresetsModalOpened} />
            </Modal>
            <Modal hasClose={false} title='Create Promo Code Preset' opened={promoPresetsModalOpened} toggle={() => setPromoPresetsModalOpened(false)}>
                <PromoPresetsModal action={selectedPromo ? props.savePromoPreset : props.createPromoPreset} promo={selectedPromo} toggle={setPromoPresetsModalOpened} />
            </Modal>
        </div>

    )
}

