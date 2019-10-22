export interface MainMenuSpecificProps {
    routes: Routes[]; 
    history: any;
    isOpen: boolean;
    setOpen: Function
}
​
export type MainMenuProps = MainMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export interface ElementMenuSpecificProps {
    icon: string;
    active?: boolean;
    isOpen: boolean;
}
​
export type ElementMenuProps = ElementMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export interface Routes {
    path: string;
    name: string;
    iconName?: string;
    component?: React.FC<any>;
    slug?: Routes[];
}

