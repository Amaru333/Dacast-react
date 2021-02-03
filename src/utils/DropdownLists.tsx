import { DropdownSingleListItem } from '../components/FormsComponents/Dropdown/DropdownTypes'
import { CURRENCY } from '../app/constants/Currencies';
import timezones from 'compact-timezone-list';

export const timezoneDropdownList = timezones.map((item: { offset: string, label: string, tzCode: string }) => {
    let timezoneDropdownItem: DropdownSingleListItem = {title: null}
    timezoneDropdownItem.title = item.label + ' (' + item.offset + ')'
    return timezoneDropdownItem
})

export const currencyDropdownList = CURRENCY.map((item: string) => {
    let currencyDropdownItem: DropdownSingleListItem = {title: null}
    currencyDropdownItem.title = item
    return currencyDropdownItem
})

//PRICE PRESETS
export const presetTypeDropdownList = [{title: "Subscription"}, {title: "Pay Per View"}]

export const recurrenceDropdownList = [{title: "Weekly"}, {title: "Monthly"}, {title: "Quarterly"}, {title: "Biannual"}]

export const durationDropdownList = [{title: "Hours"}, {title: "Days"}, {title: "Weeks"}, {title: "Months"}]

export const startMethodDropdownList = [{title: "Upon Purchase"}, {title: "Schedule"}]

//PROMO
export const availableStartDropdownList = [{title: "Always"}, {title: "Set Date and Time"}]

export const availableEndDropdownList = [{title: "Forever"}, {title: "Set Date and Time"}]

export const discountAppliedDropdownList = [{title: "Once"}, {title: "Forever"}]

//ENGAGEMENT
export const imagePlacementDropdownList: DropdownSingleListItem[] = [{title: "Top Left"}, {title: "Top Right"}, {title: "Bottom Left"}, {title: "Bottom Right"}]

export const adPlacementDropdownList = [{title: "Pre-roll"}, {title: "Mid-roll"}, {title: "Post-roll"}]