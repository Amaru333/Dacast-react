import { List } from 'material-ui';

type DropdownType = "Single" | "Multiple" | "Search";

export type DropdownListType = {[key: string]: boolean};

interface DropdownCustomProps {
    dropdownType: DropdownType;
    title: string;
    list: DropdownListType;
}

export type DropdownProps = DropdownCustomProps & React.HtmlHTMLAttributes<HTMLDivElement>;

