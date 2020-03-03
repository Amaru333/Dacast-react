import { ReactElement } from 'react';
import { ColorsApp } from '../../styled/types';

interface TableRow {
    Cells: ReactElement[];
    isCollapsable: boolean;
}

interface bodyTable {
    data: ReactElement[];
    callback?: Function
    callbackData?: any;
}

interface headerCell {
    cell: ReactElement;
    sort?: string;
}

interface headerRow {
    data: headerCell[];
    defaultSort?: string;
}

interface TableSpecificProps {
    header?: headerRow;
    body?: bodyTable[];
    footer?: ReactElement[];
    id: string;
    hasContainer?: boolean;
    headerBackgroundColor: ColorsApp;
}

export type TableProps = TableSpecificProps & React.HTMLAttributes<HTMLTableElement>;
