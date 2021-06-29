import { Routes } from '../../containers/Navigation/NavigationTypes';

interface TabSpecificProps {
    list: Routes[];
    orientation: 'vertical' | 'horizontal';
    callback?: (name: string) => void;
    label?: string;
    tabDefaultValue?: number
}

export interface SmallTabItem {
    title: string
    data?: any
}
interface TabSmallSpecificProps {
    list: SmallTabItem[]
    callback: React.Dispatch<React.SetStateAction<SmallTabItem>>
    defaultTabSelected?: string
}

export type TabProps = TabSpecificProps & React.HTMLAttributes<HTMLDivElement>;
export type TabSmallProps = TabSmallSpecificProps & React.HTMLAttributes<HTMLDivElement>