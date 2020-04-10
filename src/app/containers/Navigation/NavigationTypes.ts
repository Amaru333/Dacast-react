export interface MainMenuSpecificProps {
    routes: Routes[]; 
    history: any;
    isOpen: boolean;
    setOpen: Function;
    isMobile: boolean;
    navWidth: string;
    menuLocked: boolean;
    setMenuLocked: Function;
}
​
export type MainMenuProps = MainMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export interface ElementMenuSpecificProps {
    icon: string;
    active?: boolean;
    isOpen: boolean;
    isMobile: boolean;
    arrowIcon?: string;
    hasSlugs?: boolean;
}
​
export type ElementMenuProps = ElementMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export interface Routes {
    path: string;
    name: string;
    iconName?: string;
    arrowIcon?: string;
    component?: any;
    slug?: Routes[];
    isExact?: boolean;
    isPublic?: boolean;
    notDisplayedInNavigation?: boolean;
}

export interface UserAccountPrivileges {
    standard: boolean;
    compatible: boolean;
    premium: boolean;
    rewind: boolean;
}

export interface StreamSetupOptions {
    streamType: string;
    rewind?: boolean;
}