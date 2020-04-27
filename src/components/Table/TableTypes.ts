import { ReactElement } from 'react';
import { ColorsApp } from '../../styled/types';

interface TableRow {
    Cells: ReactElement[];
    isCollapsable: boolean;
}

interface BodyTable {
    data: ReactElement[];
    callback?: Function;
    callbackData?: any;
}

interface HeaderCell {
    cell: ReactElement;
    sort?: string;
}

interface HeaderRow {
    data: HeaderCell[];
    defaultSort?: string;
    sortCallback?: Function;
}

interface TableSpecificProps {
    header?: HeaderRow;
    body?: BodyTable[];
    footer?: ReactElement[];
    id: string;
    hasContainer?: boolean;
    headerBackgroundColor: ColorsApp;
    customClassName?: string;
    tableHeight? : number;
}

export type TableProps = TableSpecificProps & React.HTMLAttributes<HTMLTableElement>;
