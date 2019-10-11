export interface MainMenuSpecificProps {
    routes: Array<Routes> 
}
​
export type MainMenuProps = MainMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export interface ElementMenuSpecificProps {
    icon: string,
    active?: boolean
}
​
export type ElementMenuProps = ElementMenuSpecificProps & React.HTMLAttributes<HTMLDivElement>;

export type Routes =  {
    path: string,
    name: string,
    iconName?: string,
    component?: React.FC,
    slug?: Array<Routes>
}

