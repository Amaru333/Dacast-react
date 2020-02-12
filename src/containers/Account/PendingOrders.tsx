import React from 'react';
import { LoadingSpinner} from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { PendingOrdersPage } from '../../pages/Account/PendingOrders/PendingOrders';

export interface PendingOrder {
    id: string,
    items: PendingOrderItem[]
    dateCreated: string,
    price: number,
    currency: string,
    status: string,
    type: string
}

export interface PendingOrderItem {
    id: string,
    description: string,
    price: number,
}

export const PendingOrders = () => {
    return (
        <PendingOrdersPage />
    )
}