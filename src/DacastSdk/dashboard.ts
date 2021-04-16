import { AccountPlan } from "./account";

interface CreditInfo {
    limit: number
    consumed: number
    remaining: number
}

interface DashboardGeneralInfoEndpoint {
    bandwidth: CreditInfo
    storage: CreditInfo
}

interface PlaybackProtection {
    amount: number
    enabled: boolean
    price: number
}

export interface DashboardLiveEndpoint {
    activeChannels: number
    errors: boolean
    totalChannels: number
    liveViewers?: number
    topChannels?: {name: string; viewers: number}[]
}

export interface DashboardVodEndpoint {
    errors: boolean
    totalVideos: number
    videoPlays?: number
    topVideos?: {name: string; viewers: number}[]
}

export interface DashboardPaywallEndpoint {
    balance: number
    revenue: {currency: string; total: number}[] | null
}

export interface GetDashboardInfoOutput {
    generalInfos: DashboardGeneralInfoEndpoint
    currentPlan: AccountPlan
    playbackProtection: PlaybackProtection
    live: DashboardLiveEndpoint
    vod: DashboardVodEndpoint
    paywall: DashboardPaywallEndpoint
}

export interface GetDashboardGeneralInfoOutput {
    generalInfos: DashboardGeneralInfoEndpoint
    currentPlan: AccountPlan
    playbackProtection: PlaybackProtection
}

export interface GetDashboardLiveOutput {
    live: DashboardLiveEndpoint
}

export interface GetDashboardVodOutput {
    vod: DashboardVodEndpoint
}

export interface GetDashboardPaywallOutput {
    paywall: DashboardPaywallEndpoint
}