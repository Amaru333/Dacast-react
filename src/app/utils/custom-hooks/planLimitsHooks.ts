import React from 'react'
import { DashboardInfos } from '../../redux-flow/store/Dashboard'
import { PlanLimitReachedModalType } from '../../containers/Navigation/PlanLimitReachedModal';

export interface PlanLimitsValidatorCallbacks {
    openAddStream?: () => void;
    openAddVod?: () => void;
    openExpoCreate?: () => void;
}

export const usePlanLimitsValidator = (infos: DashboardInfos, callbacks?: PlanLimitsValidatorCallbacks) => {
    const [PlanLimitReachedModalOpen, setPlanLimitReachedModalOpen] = React.useState<boolean>(false)
    const [planLimitReachedModalType, setPlanLimitReachedModalType] = React.useState<PlanLimitReachedModalType>(null)

    const planIsTrial = () => {
        return infos && infos.currentPlan && infos.currentPlan.displayName === "30 Day Trial"
    }

    const trialExpired = () => {
        return infos.currentPlan.trialExpiresIn <= 0
    }

    const bandwidthLimitReached = () => {
        return infos.generalInfos.bandwidth.remaining <= 0
    }

    const storageLimitReached = () => {
        return infos.generalInfos.storage.remaining <= 0
    }

    const handleCreateStreamClick = () => {
        let creationAllowed = true;
        if(planIsTrial()) {
            if(trialExpired()) {
                setPlanLimitReachedModalType('upgrade_now')
                creationAllowed = false;
            }
            if(infos.live.activeChannels > 0){
                setPlanLimitReachedModalType('livestream_limit_reached_trial')
                creationAllowed = false;
            }
        }
        if(bandwidthLimitReached()) {
            setPlanLimitReachedModalType('more_data_needed' + (planIsTrial() ? '_trial' : ''))
            creationAllowed = false;
        }
        if(storageLimitReached()) {
            setPlanLimitReachedModalType('more_storage_needed' + (planIsTrial() ? '_trial' : ''))
            creationAllowed = false;
        }
        if(!creationAllowed) {
            setPlanLimitReachedModalOpen(true)
            return
        }
        if(callbacks && callbacks.openAddStream) {
            callbacks.openAddStream();
        }
    }

    const handleUploadVideoClick = () => {
        let creationAllowed = true;
        if(planIsTrial()) {
            if(trialExpired()) {
                setPlanLimitReachedModalType('upgrade_now')
                creationAllowed = false;
            }
        }
        if(bandwidthLimitReached()) {
            setPlanLimitReachedModalType('more_data_needed' + (planIsTrial() ? '_trial' : ''))
            creationAllowed = false;
        }
        if(storageLimitReached()) {
            setPlanLimitReachedModalType('more_storage_needed' + (planIsTrial() ? '_trial' : ''))
            creationAllowed = false;
        }
        if(!creationAllowed) {
            setPlanLimitReachedModalOpen(true)
            return
        }
        if(callbacks && callbacks.openAddVod) {
            callbacks.openAddVod();
        }
    }

    const handleCreateExpoClick = () => {
        if(planIsTrial()) {
            if(trialExpired()) {
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
