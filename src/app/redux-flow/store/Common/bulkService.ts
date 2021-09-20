import { BulkActionItem } from './types'
import { dacastSdk } from '../../../utils/services/axios/axiosClient'
import { formatPostBulkActionInput } from './viewModel'

export const bulkActionsService = async (data: BulkActionItem[], action: 'delete' | 'theme' | 'online' | 'paywall' | 'create', targetValue?: string | boolean) => {
    return await dacastSdk.postBulkAction(formatPostBulkActionInput({items: data, action: action, targetValue: targetValue}))
}