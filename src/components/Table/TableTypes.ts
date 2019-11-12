import { ReactElement } from 'react';

interface TableSpecificProps {
    header: Array<ReactElement>;
    body: Array<Array<ReactElement>>;
    id: string;
}

export type TableProps = TableSpecificProps & React.HTMLAttributes<HTMLTableElement>;
