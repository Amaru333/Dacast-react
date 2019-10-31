import { Routes } from '../../containers/Navigation/NavigationTypes';

interface TabSpecificProps {
    list: Routes[];
    orientation: string;
    history: any;
}

export type TabProps = TabSpecificProps & React.HTMLAttributes<HTMLDivElement>;