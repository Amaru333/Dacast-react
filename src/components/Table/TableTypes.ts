interface TableSpecificProps {
    header: Array<any>;
    body: Array<any>;
    id: string;
}

export type TableProps = TableSpecificProps & React.HTMLAttributes<HTMLTableElement>;