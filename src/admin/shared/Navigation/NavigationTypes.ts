
export interface MainMenuSpecificProps {
    routes: Routes[]; 
    history: any;
    isOpen: boolean;
    isMobile: boolean;
    navWidth: string;
    menuLocked: boolean;
    setMenuLocked: (b: boolean) => void;
    setOpen: (b: boolean) => void;
}
​
export type MainMenuProps = MainMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export interface ElementMenuSpecificProps {
    icon: string;
    active?: boolean;
    isOpen: boolean;
    isMobile: boolean;
    arrowIcon?: string;
}
​
export type ElementMenuProps = ElementMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export interface Routes {
    path: string;
    name: string;
    iconName?: string;
    arrowIcon?: string;
    component?: any;
    exactPath?: boolean;
    isPublic?: boolean;
    notDisplayedInNavigation?: boolean;
}