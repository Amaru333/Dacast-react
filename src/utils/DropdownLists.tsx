import { DropdownSingleListItem } from '../components/FormsComponents/Dropdown/DropdownTypes'

var moment = require('moment-timezone');

export const timezoneDropdownList = moment.tz.names().map((item: string) => {
    let timezoneDropdownItem: DropdownSingleListItem = {title: null}
    timezoneDropdownItem.title = item + ' (' + moment.tz(item).format('Z z') + ')'
    return timezoneDropdownItem
})