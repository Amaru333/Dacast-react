import { DropdownSingleListItem } from '../components/FormsComponents/Dropdown/DropdownTypes'
import { CURRENCY } from '../app/constants/Currencies';
import timezones from 'compact-timezone-list';
import { handleCurrencySymbol } from './utils';

export const timezoneDropdownList = timezones.map((item: { offset: string, label: string, tzCode: string }) => {
    let timezoneDropdownItem: DropdownSingleListItem = {title: null}
    timezoneDropdownItem.title = item.tzCode;   
    return timezoneDropdownItem
})

export const currencyDropdownList = CURRENCY.map((item): DropdownSingleListItem => {
    return {
        title: item.code,
        description: item.description + ' - ' + handleCurrencySymbol(item.code)
    }
})

//PRICE PRESETS
export const presetTypeDropdownList = [{title: "common_paywall_price_modal_preset_type_subscription_option", data: {id: 'Subscription'}}, {title: 'common_paywall_price_modal_preset_type_pay_per_view_option',data:{ id: "Pay Per View"}}]

export const recurrenceDropdownList = [{title: "Weekly", data: {id: "Weekly"}}, {title: "Monthly", data: {id: "Monthly"}}, {title: "Quarterly", data: {id: "Quaterly"}}, {title: "Biannual", data: {id: "Biannual"}}]

export const durationDropdownList = [{title: "common_paywall_price_modal_duration_dropdown_hours_option", data: {id: "Hours"}}, {title: "common_paywall_price_modal_duration_dropdown_days_option", data: {id: "Days"}}, {title: "common_paywall_price_modal_duration_dropdown_weeks_option", data: {id: "Weeks"}}, {title: "common_paywall_price_modal_duration_dropdown_months_option", data: {id: "Months"}}]

export const startMethodDropdownList = [{title: "common_paywall_price_modal_upon_purchase_dropdown_title", data: {id: "Upon Purchase"}}, {title: "Set Date & Time", data: {id:"Set Date & Time"}}]

//PROMO
export const availableStartDropdownList = [{title: "Always"}, {title: "Set Date and Time"}]

export const availableEndDropdownList = [{title: "Forever"}, {title: "Set Date and Time"}]

export const discountAppliedDropdownList = [{title: "common_paywall_promo_modal_discount_applied_dropdown_once_option", data: {id: "Once"}}, {title: "common_paywall_promo_modal__available_dropdown_forever_option", data: {id: "Forever"}}]

//ENGAGEMENT
export const imagePlacementDropdownList: DropdownSingleListItem[] = [{title: "common_engagement_brand_image_image_placement_dropdown_option_1", data: {id: "Top Left"}}, {title: "common_engagement_brand_image_image_placement_dropdown_option_2", data: {id: "Top Right"}}, {title: "common_engagement_brand_image_image_placement_dropdown_option_3", data: {id: "Bottom Left"}}, {title: "common_engagement_brand_image_image_placement_dropdown_option_4", data: {id: "Bottom Right"}}]

export const adPlacementDropdownList = [{title: "common_engagement_ads_modal_ad_placement_dropdown_pre_roll_option", data: {id: "Pre-roll"}}, {title: "common_engagement_ads_modal_ad_placement_dropdown_mid_roll_option", data: {id: "Mid-roll"}}, {title: "common_engagement_ads_modal_ad_placement_dropdown_post_roll_option", data: {id: "Post-roll"}}]

export const languageDropdownList = [{title: 'English', data: {id: 'en'}}, {title: 'French', data: {id: 'fr'}}, {title: 'Spanish', data: {id: 'es'}}, {title: 'Portuguese', data: {id: 'pt'}}, {title: 'Italian', data: {id: 'it'}}, {title: 'German', data: {id: 'de'}}]