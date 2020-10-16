type CheckboxStatus = 'unchecked' | 'checked' | 'undeterminate'
export interface DropdownListType {[key: string]: boolean}

export interface SingleDropdownListItem {
    title: string
}

export const dropdownIcons = {
    opened: "arrow_drop_up",
    closed: "arrow_drop_down"
}

interface DropdownCustomProps {
    id: string;
    dropdownTitle: string;
    list: SingleDropdownListItem[];
    isNavigation?: boolean;
    ref?: React.Ref<HTMLDivElement>;
    callback?: Function;
    hasSearch?: boolean;
    dropdownDefaultSelect?: string;
    isInModal?: boolean;
    disabled?: boolean;
    isWhiteBackground?: boolean;
    tooltip?: string
}

export interface ContinentListType {
    [key: string]: {
        countries: {[key: string]: {isChecked: boolean; isFiltered: boolean}};
        checked: CheckboxStatus;
        key: string;
    };
}

interface DropdownCountriesSpecificProps {
    list: string[];
    id: string;
    dropdownTitle: string;
    isNavigation?: boolean;
    ref?: React.Ref<HTMLDivElement>;
    callback?: Function;
    hasSearch?: boolean;
}

interface DropdownButtonSpecificProps {
    list: string[];
    id: string;
    callback: Function;
    dropdownDefaultSelect?: string;
    backgroundColor?: string;
    disabled?: boolean
}

interface DropdownSelectSpecificProps {
    dropdownTitle: string;
    dataRecurly?: string;
    setValue?: Function;
}


export type DropdownProps = DropdownCustomProps & React.HtmlHTMLAttributes<HTMLDivElement> & { defaultSelected?: string; direction?: 'up' | 'down' };

export type DropdownCountriesProps =  DropdownCountriesSpecificProps & React.HtmlHTMLAttributes<HTMLDivElement>;

export type DropdownButtonProps = DropdownButtonSpecificProps & React.HtmlHTMLAttributes<HTMLDivElement>;

export type DropdownSelectProps = DropdownSelectSpecificProps & React.HtmlHTMLAttributes<HTMLSelectElement>;
