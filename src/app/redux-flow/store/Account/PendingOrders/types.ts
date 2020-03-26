export enum ActionTypes {
    GET_PENDING_ORDERS = "@@account_pendingOrders/GET_PENDING_ORDERS",
    UPDATE_PENDING_ORDER = "@@account_pendingOrders/UPDATE_PENDING_ORDER"
}

export interface PendingOrder {
    id: string;
    items: PendingOrderItem[];
    dateCreated: number;
    price: number;
    currency: string;
    status: string;
    type: string;
}

export interface PendingOrderItem {
    id: string;
    description: string;
    price: number;
}

export interface PendingOrdersList {
    pendingOrders: PendingOrder[];
}

export const pendingOrdersInitialState: PendingOrdersList = 
{ 
    pendingOrders: [
        {   id: "-1", 
            items: [{id: "-1", price: 0, description: ""}], 
            dateCreated: "", 
            price: 0, 
            currency: "", 
            status: "", 
            type: ""
        }
    ]
}