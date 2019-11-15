import { DropdownList } from './DropdownStyle';

type CheckboxStatus = 'unchecked' | 'checked' | 'undeterminate'
export interface DropdownListType {[key: string]: boolean}

export const dropdownIcons = {
    opened: "arrow_drop_up",
    closed: "arrow_drop_down"
}

interface DropdownCustomProps {
    id: string;
    dropdownTitle: string;
    list: DropdownListType;
    isNavigation?: boolean;
    ref?: any;
    callback?: Function;
    hasSearch?: boolean;
}

export interface ContinentListType {
    [key: string]: {
        countries: DropdownListType,
        checked: CheckboxStatus
    }
}

interface DropdownCountriesSpecificProps {
    list: ContinentListType
}


export type DropdownProps = DropdownCustomProps & React.HtmlHTMLAttributes<HTMLDivElement>;


