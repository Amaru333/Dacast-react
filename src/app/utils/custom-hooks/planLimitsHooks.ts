import React from 'react'
import { BillingPageInfos } from '../../redux-flow/store/Account/Plan'
import { PlanLimitReachedModalType } from '../../containers/Navigation/PlanLimitReachedModal';

export interface PlanLimitsValidatorCallbacks {
    openAddStream?: () => void;
    openAddVod?: () => void;
    openExpoCreate?: () => void;
}

export const usePlanLimitsValidator = (billingInfo?: BillingPageInfos, callbacks?: PlanLimitsValidatorCallbacks) => {
    const [PlanLimitReachedModalOpen, setPlanLimitReachedModalOpen] = React.useState<boolean>(false)
    const [planLimitReachedModalType, setPlanLimitReachedModalType] = React.useState<PlanLimitReachedModalType>(null)

    const planIsTrial = () => {
        return billingInfo && billingInfo.currentPlan && billingInfo.currentPlan.displayName === "30 Day Trial"
    }

    const handleCreateStreamClick = () => {
        if(planIsTrial()) {
            if(billingInfo.currentPlan.trialExpiresIn <= 0) {
                setPlanLimitReachedModalType('upgrade_now')
                setPlanLimitReachedModalOpen(true)
                return
            }
            if(true){
                setPlanLimitReachedModalType('livestream_limit_reached_trial')
                setPlanLimitReachedModalOpen(true)
                return
            }
        }
        if(callbacks && callbacks.openAddStream) {
            callbacks.openAddStream();
        }
    }

    const handleUploadVideoClick = () => {
        if(planIsTrial()) {
            if(billingInfo.currentPlan.trialExpiresIn <= 0) {
                setPlanLimitReachedModalType('upgrade_now')
                setPlanLimitReachedModalOpen(true)
                return
            }
        }
        if(callbacks && callbacks.openAddVod) {
            callbacks.openAddVod();
        }
    }

    const handleCreateExpoClick = () => {
        if(planIsTrial()) {
            if(billingInfo.currentPlan.trialExpiresIn <= 0) {
                setPlanLimitReachedModalType('upgrade_now')
                setPlanLimitReachedModalOpen(true)
                return
            }
        }
        if(callbacks && callbacks.openExpoCreate) {
            callbacks.openExpoCreate();
        }
    }

    return {
        planIsTrial,
        PlanLimitReachedModalOpen,
        setPlanLimitReachedModalOpen,
        planLimitReachedModalType,
        setPlanLimitReachedModalType,
        handleCreateStreamClick,
        handleUploadVideoClick,
        handleCreateExpoClick,
    };
}
