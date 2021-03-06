import { BillingPageInfos } from '../../redux-flow/store/Account/Plan';
import { Plans } from '../../redux-flow/store/Account/Upgrade/types';
import { Privilege } from "../../../utils/services/token/token";
import { DashboardInfos } from '../../redux-flow/store/Dashboard';

export interface MainMenuSpecificProps {
    routes: Routes[];
    history: any;
    isOpen: boolean;
    setOpen: (b: boolean) => void;
    isMobile: boolean;
    navWidth: string;
    menuLocked: boolean;
    setMenuLocked: (b: boolean) => void;
    openAddStream?: (b: boolean) => void;
    openPlaylist?: (b: boolean) => void;
    openExpoCreate?: (b: boolean) => void;
    infos: DashboardInfos;
    getBillingPageInfos: () => Promise<void>;
    getDashboardDetails: () => Promise<void>;
    billingInfo: BillingPageInfos;
}
​
export type MainMenuProps = MainMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export interface ElementMenuSpecificProps {
    icon: string;
    active?: boolean;
    isOpen: boolean;
    isLocked: boolean;
    isMobile: boolean;
    arrowIcon?: string;
    hasSlugs?: boolean;
}
​
export type ElementMenuProps = ElementMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export interface Routes {
    path: string;
    name: string;
    contentType?: string;
    iconName?: string;
    arrowIcon?: string;
    component?: any;
    slug?: Routes[];
    isExact?: boolean;
    isPublic?: boolean;
    associatePrivilege?: Privilege[];
    notDisplayedInNavigation?: boolean;
}

export interface UserAccountPrivileges {
    standard: boolean;
    compatible: boolean;
    premium: boolean;
    rewind: boolean;
}

export interface StreamSetupOptions {
    title: string;
    rewind?: boolean;
    streamType?: string;
    region: string;
    renditionCount: number;
}
