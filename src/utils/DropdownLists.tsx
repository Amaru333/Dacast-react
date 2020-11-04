import { DropdownSingleListItem } from '../components/FormsComponents/Dropdown/DropdownTypes'
import { CURRENCY } from '../app/constants/Currencies';

var moment = require('moment-timezone');

export const timezoneDropdownList = moment.tz.names().map((item: string) => {
    let timezoneDropdownItem: DropdownSingleListItem = {title: null}
    timezoneDropdownItem.title = item + ' (' + moment.tz(item).format('Z z') + ')'
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

export const adPlacementDropdownList = [{title: "Pre-Roll"}, {title: "Mid-Roll"}, {title: "Post-Roll"}]