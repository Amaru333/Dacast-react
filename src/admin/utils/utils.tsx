export interface Routes {
    path: string;
    name: string;
    iconName?: string;
    arrowIcon?: string;
    component?: any;
    slug?: Routes[];
    exactPath?: boolean;
    isPublic?: boolean;
    displayedInHeadertab?: boolean;
}


export const makeRoute = (name: string, path?: string, component?: any): Routes => {
    return {
        path: path,
        name: name,
        component: component
    }
}
