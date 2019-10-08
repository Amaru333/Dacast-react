import { List } from 'material-ui';

type DropdownType = "Single" | "Multiple" | "Search";


interface DropdownCustomProps {
    dropdownType: DropdownType;
    title: string;
    list: Array<string>
}

export type DropdownProps = DropdownCustomProps & React.HtmlHTMLAttributes<HTMLDivElement>;

