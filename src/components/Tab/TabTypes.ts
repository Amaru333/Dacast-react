import { Routes } from '../../containers/Navigation/NavigationTypes';

interface TabSpecificProps {
    list: Routes[];
    orientation: string;
    history: any;
    callback?: Function;
    label?: string;
}

export type TabProps = TabSpecificProps & React.HTMLAttributes<HTMLDivElement>;