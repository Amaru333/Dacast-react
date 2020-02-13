export enum ActionTypes {
    GET_PENDING_ORDERS = "@@account_pendingOrders/GET_PENDING_ORDERS"
}

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

export const pendingOrdersInitialState: PendingOrder[] = []