import { Routes } from '../../containers/Navigation/NavigationTypes';

interface TabSpecificProps {
    list: Routes[];
    orientation: 'vertical' | 'horizontal';
    callback?: (name: string) => void;
    label?: string;
    tabDefaultValue?: number
}

export type TabProps = TabSpecificProps & React.HTMLAttributes<HTMLDivElement>;