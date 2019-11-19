import { ReactElement } from 'react';

interface TableSpecificProps {
    header: ReactElement[];
    body: ReactElement[][];
    id: string;
}

export type TableProps = TableSpecificProps & React.HTMLAttributes<HTMLTableElement>;
