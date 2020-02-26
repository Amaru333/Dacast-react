import { ReactElement } from 'react';

interface TableRow {
    Cells: ReactElement[];
    isCollapsable: boolean;
}

interface TableSpecificProps {
    header?: ReactElement[];
    body?: ReactElement[][];
    footer?: ReactElement[];
    id: string;
    hasContainer?: boolean;
}

export type TableProps = TableSpecificProps & React.HTMLAttributes<HTMLTableElement>;
