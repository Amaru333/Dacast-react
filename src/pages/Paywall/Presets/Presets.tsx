import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Table } from '../../../components/Table/Table';
import { BorderStyle } from './PresetsStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const PresetsPage = () => {

    const pricePresetsTableHeader = () => {
        return [
            <Text key='pricePresetsTableHeaderName' size={14} weight='med'>Name</Text>,
            <Text key='pricePresetsTableHeaderType' size={14} weight='med'>Type</Text>,
            <Text key='pricePresetsTableHeaderPrice' size={14} weight='med'>Price</Text>,
            <Text key='pricePresetsTableHeaderCurrency' size={14} weight='med'>Currency</Text>,
            <Text key='pricePresetsTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>,
            <Text key='pricePresetsTableHeaderMethod' size={14} weight='med'>Start Method</Text>,
            <Button className='right mr2' key='pricePresetsTableHeaderButton' typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price Preset</Button>

        ]
    }

    const promoPresetsTableHeader = () => {
        return [
            <Text key='promoPresetsTableHeaderName' size={14} weight='med'>Name</Text>,
            <Text key='promoPresetsTableHeaderType' size={14} weight='med'>Type</Text>,
            <Text key='promoPresetsTableHeaderCode' size={14} weight='med'>Code</Text>,
            <Text key='promoPresetsTableHeaderDiscount' size={14} weight='med'>Discount</Text>,
            <Text key='promoPresetsTableHeaderLimit' size={14} weight='med'>Limit</Text>,
            <Button className='right mr2' key='promoPresetsTableHeaderButton' typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo Preset</Button>

        ]
    }

    return (

        <Card>
            <Text size={20} weight='med'>Price Presets</Text>
            <Text size={14} weight='reg' color='gray-3'>Presets allow you to apply a set of prices to your content in one action.</Text>
            <Text size={14} weight='reg' color='gray-3'>Need help setting up a Price Presets ? Visit the Knowledge Base</Text>
            <Table className='my2' id='pricePresetsTable' header={pricePresetsTableHeader()} />
            <BorderStyle className='my2' />

            <Text size={20} weight='med'>Promo Presets</Text>
            <Text size={14} weight='reg' color='gray-3'>Presets allow you to apply a set of prices to your content in one action.</Text>
            <Text size={14} weight='reg' color='gray-3'>Need help setting up a Promo Presets ? Visit the Knowledge Base</Text>
            <Table className='my2' id='promoPresetsTable' header={promoPresetsTableHeader()} />
        </Card>
    )
}