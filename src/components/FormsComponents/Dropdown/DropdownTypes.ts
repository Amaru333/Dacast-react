import { List } from 'material-ui';

export type DropdownListType = {[key: string]: boolean};

export const dropdownIcons = {
    opened: "arrow_drop_up",
    closed: "arrow_drop_down"
}

interface DropdownCustomProps {
    id: string;
    dropdownTitle: string;
    list: DropdownListType;
}

export type DropdownProps = DropdownCustomProps & React.HtmlHTMLAttributes<HTMLDivElement>;

