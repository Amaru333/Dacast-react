interface GetPromoOutput {
    promos: {
        id: string;
        alphanumericCode: string;
        discount: number;
        limit: number;
        startDate?: number;
        endDate?: number;
        discountApplied: string;
        assignedContentIds: string[];
        assignedGroupIds: string[];
    }[];
    totalItems: number
}

interface PostPromoInput {
    alphanumericCode: string;
    discount: number;
    limit: number;
    startDate?: number;
    endDate?: number;
    discountApplied: string;
    assignedContentIds: string[];
    assignedGroupIds: string[];
}

interface PostPromoOutput {
    id: string;
}

interface PutPromoInput {
    id: string;
    alphanumericCode: string;
    discount: number;
    limit: number;
    startDate?: number;
    endDate?: number;
    discountApplied: string;
    assignedContentIds: string[];
    assignedGroupIds: string[];
}