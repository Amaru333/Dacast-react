import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import styled, { css } from 'styled-components';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { isMobile } from 'react-device-detect';
import { UpgradeContainerProps } from '../../../containers/Account/Upgrade';
import { Currency, Plan } from '../../../redux-flow/store/Account/Upgrade/types';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { PlansName } from './FeaturesConst';
import { getUrlParam, handleCurrencySymbol } from '../../../../utils/utils';
import { useHistory } from 'react-router'
import { PaymentSuccessModal } from '../../../shared/Billing/PaymentSuccessModal';
import { PaymentFailedModal } from '../../../shared/Billing/PaymentFailedModal';
import EventHooker from '../../../../utils/services/event/eventHooker';
import { segmentService } from '../../../utils/services/segment/segmentService';
import { userToken } from '../../../utils/services/token/tokenService';
import { dacastSdk } from '../../../utils/services/axios/axiosClient';
import { formatPostPlanInput } from '../../../redux-flow/store/Account/Upgrade/viewModel';
import { UpgradeFeaturesStep } from './UpgradeFeaturesStep';
import { UpgradeCartStep } from './UpgradeCartStep';
import { UpgradePaymentStep } from './UpgradePaymentStep';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { countries } from 'countries-list';
import { ContactOwnerModal } from '../Users/ContactOwnerModal';
import { isStaging } from '../../../utils/services/player/stage';

export const UpgradePage = (props: UpgradeContainerProps) => {
    const env = process.env.NODE_ENV || 'development'
    const displayCalculator = !!getUrlParam('calculator')
    const defaultCurrency: string = localStorage.getItem('currency') ? localStorage.getItem('currency') : (props.companyInfo && props.companyInfo.country && countries[props.companyInfo.country]) ? countries[props.companyInfo.country].currency : 'USD'
    const defaultCurrentPlan = Object.values(props.planDetails).find(plan => plan.isActive)
    const upgradeStepList = [{title: 'Features', content: UpgradeFeaturesStep}, {title: 'Cart', content: UpgradeCartStep}, {title: 'Payment', content: UpgradePaymentStep}];
    const [stepperPlanOpened, setStepperPlanOpened] = React.useState<boolean>(false);
    const [stepperData, setStepperData] = React.useState<Plan>(null);
    const [currentPlan, setCurrentPlan] = React.useState<string>(defaultCurrentPlan && defaultCurrentPlan.name)
    const [paymentSuccessfulModalOpened, setPaymentSuccessfulModalOpened] = React.useState<boolean>(false)
    const [paymentDeclinedModalOpened, setPaymentDeclinedModalOpened] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const initialSelectedCurrency = { title: defaultCurrency.toUpperCase() + ' - ' + handleCurrencySymbol(defaultCurrency), data: {img: defaultCurrency.toLowerCase(), id: defaultCurrency.toLowerCase()} }
    const [selectedCurrency, setSelectedCurrency] = React.useState<DropdownSingleListItem>(initialSelectedCurrency)
    const [contactOwnerModalOpened, setContactOwnerModalOpened] = React.useState<boolean>(false)
    const history = useHistory()
    const pricingIframeRef = React.useRef(null)
    const pricingIframeUrl = env === 'production' && !isStaging() ? 'https://unified-pricing.dacast.com' : 'https://singularity-unified-pricing.dacast.com'
    const [iframeHeight, setIframeHeight] = React.useState<number>(0)
    const [idleSeconds, setIdleSeconds] = React.useState(0)
    const [upgradeToastShown, setUpgradeToastShown] = React.useState(false)
    const upgradeToast = React.useRef(null)

    React.useEffect(() => {
        localStorage.setItem('currency', selectedCurrency.data.id)
    }, [selectedCurrency])

    const purchasePlan = (recurlyToken: string, threeDSecureToken: string, callback: React.Dispatch<React.SetStateAction<string>>) => {
        setIsLoading(true);
        dacastSdk.postAccountPlan(formatPostPlanInput({
            code: stepperData.code,
            currency: selectedCurrency.data.id as Currency,
            allowanceCode: stepperData.allowanceCode,
            privileges: stepperData.privileges,
            token: recurlyToken,
            token3Ds: threeDSecureToken
        }))
            .then((response) => {
                setIsLoading(false);
                if (response && response.tokenID) {
                    callback(response.tokenID)
                } else {
                    setStepperPlanOpened(false)
                    setPaymentSuccessfulModalOpened(true)
                    setCurrentPlan(stepperData.name)
                    EventHooker.dispatch('EVENT_FORCE_TOKEN_REFRESH', undefined)
                    segmentService.track('Upgrade Form Completed', {
                        action: 'Payment Form Submitted',
                        'user_id': userToken.getUserInfoItem('user-id'),
                        'plan_name': stepperData.name,
                        step: 4,
                    })
                }
            })
            .catch(() => {
                setIsLoading(false);
                setPaymentDeclinedModalOpened(true)
            })
    }

    const purchasePlan3Ds = async (recurlyToken: string, threeDSecureResultToken: string) => {
        setIsLoading(true);
        dacastSdk.postAccountPlan(formatPostPlanInput({
            code: stepperData.code,
            currency: selectedCurrency.data.id as Currency,
            allowanceCode: stepperData.allowanceCode,
            privileges: stepperData.privileges,
            token: recurlyToken,
            token3Ds: threeDSecureResultToken
        }))
            .then(() => {
                setStepperPlanOpened(false)
                setIsLoading(false);
                setPaymentSuccessfulModalOpened(true)
                setCurrentPlan(stepperData.name)
                EventHooker.dispatch('EVENT_FORCE_TOKEN_REFRESH', undefined)
                segmentService.track('Upgrade Form Completed', {
                    action: 'Payment Form Submitted',
                    'user_id': userToken.getUserInfoItem('user-id'),
                    'plan_name': stepperData.name,
                    step: 4,
                })
            })
            .catch(() => {
                setIsLoading(false);
                setPaymentDeclinedModalOpened(true)
            })
    }

    const handleThreeDSecureFail = () => {
        setPaymentDeclinedModalOpened(true)
    }

    const handleSteps = (plan: string) => {
        segmentService.track('Upgrade Form Completed', {
            action: 'Upgrade Clicked',
            'user_id': userToken.getUserInfoItem('user-id'),
            'plan_name': plan,
            step: 1,
        })
        if(userToken.getPrivilege('privilege-billing')) {
            setStepperPlanOpened(true)
        } else {
            setContactOwnerModalOpened(true)
        }
    }

    const handleContactUsButtonClick = () => {
        segmentService.track('Upgrade Form Completed', {
            action: 'Contact Us Clicked',
            'user_id': userToken.getUserInfoItem('user-id'),
            step: 1,
        })
        history.push('/help')
    }

    const handlePlanSelected = (planName: string, billingFrequency: 'Annually' | 'Monthly') => {
        if (planName === 'custom') {
            handleContactUsButtonClick()
        } else {
            const planFrequencyText = planName === 'scale' ? { Annually: 'Annual', Monthly: 'Monthly' }[billingFrequency] : ''
            const selectedPlanDetails = props.planDetails[`${planName}Plan${planFrequencyText}`]
            const stepperData = { ...selectedPlanDetails }
            if (planName === 'scale') {
                Object.assign(stepperData, { selectedScalePlan: selectedPlanDetails.allowances[0], paymentTerm: billingFrequency === 'Annually' ? 12 : 1 })
            }
            setStepperData(stepperData)
            handleSteps(planName)
        }
    }

    const handlePricingIframeResize = (width, height) => {
        setIframeHeight(height)
    }

    const handleScrollRequested = offset => {
        const top = offset + pricingIframeRef.current.offsetTop - 24 - 56
        window.scrollTo({ top, behavior: 'smooth' })
    }

    const sendIframeOptions = () => {
        const options = {
            currentPlan: currentPlan && currentPlan.toLowerCase(),
            selectedCurrency: selectedCurrency && selectedCurrency.data.id,
            displayCalculator: displayCalculator,
            isUpgradePage: true
        }
        const event = { type: 'IFRAME_OPTIONS_UPDATED', params: { options } }
        pricingIframeRef.current.contentWindow.postMessage(JSON.stringify(event), '*')
    }

    React.useEffect(() => {
        sendIframeOptions()
    }, [currentPlan])

    React.useEffect(() => {
        const isOwner = userToken.getPrivilege('privilege-billing') && userToken.getUserInfoItem('parent-id') !== userToken.getUserInfoItem('user-id')
        if (idleSeconds === 20 && !upgradeToastShown && isOwner) {
            const text = <Text size={16} weight="reg" color="white">
                Not sure which plan to upgrade to? <ToastLink onClick={handleContactUsButtonClick}>Contact Us</ToastLink>
            </Text>
            const toast = props.showToast(text, 'fixed', 'notification', true, 'right')
            upgradeToast.current = toast
            setUpgradeToastShown(true)
        }
    }, [idleSeconds])

    React.useEffect(() => {
        return () => props.hideToast(upgradeToast.current)
    }, [])

    React.useEffect(() => {
        let interval = setInterval(() => {
            setIdleSeconds(currentIdleSeconds => currentIdleSeconds + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const handleUserActivityDetected = () => {
        setIdleSeconds(0)
    }

    const handleSelectedCurrencyChanged = currency => {
        setSelectedCurrency({
            title: currency.toUpperCase() + ' - ' + handleCurrencySymbol(currency.toUpperCase()),
            data: { img: currency, id: currency }
        })
    }

    const handlePricingIframeEvents = event => {
        if (env === 'production' && event.origin !== pricingIframeUrl) {
            return
        }
        try {
            const { type, params } = JSON.parse(event.data);
            switch (type) {
                case 'PLAN_SELECTED':
                    handlePlanSelected(params.planName, params.planBillingFrequency as 'Annually' | 'Monthly')
                    break
                case 'CONTENT_RESIZED':
                    handlePricingIframeResize(params.width, params.height)
                    break
                case 'SCROLL_REQUESTED':
                    handleScrollRequested(params.offset)
                    break
                case 'USER_ACTIVITY_DETECTED':
                    handleUserActivityDetected()
                    break
                case 'SELECTED_CURRENCY_CHANGED':
                    handleSelectedCurrencyChanged(params.selectedCurrency)
            }
        } catch {}
    }

    React.useEffect(() => {
        window.addEventListener('message', handlePricingIframeEvents, false)
        return () => window.removeEventListener('message', handlePricingIframeEvents)
    }, [])

    return (
        <div onClick={handleUserActivityDetected}>
            <Text size={24} weight="med" className="mt1 mb35 block">Find yourself a better plan. Upgrade now.</Text>

            <div className="relative">
                <UpgradePageContainer isMobile={isMobile}>
                    <PricingIframe
                        ref={pricingIframeRef}
                        src={pricingIframeUrl}
                        iframeHeight={iframeHeight}
                        frameBorder="none"
                        scrolling="no"
                        onLoad={sendIframeOptions}
                    />

                    <RecurlyProvider publicKey={process.env.RECURLY_TOKEN}>
                        <Elements>
                            {
                                stepperPlanOpened &&
                                <CustomStepper
                                    opened={stepperPlanOpened}
                                    stepperHeader='Upgrade Plan'
                                    stepList={upgradeStepList}
                                    lastStepButton="Purchase"
                                    stepperData={stepperData}
                                    updateStepperData={(value: Plan) => setStepperData(value)}
                                    functionCancel={setStepperPlanOpened}
                                    isLoading={isLoading}
                                    finalFunction={() => {}}
                                    handleThreeDSecureFail={handleThreeDSecureFail}
                                    purchasePlan={purchasePlan}
                                    billingInfo={props.billingInfos}
                                    planDetails={props.planDetails}
                                    purchasePlan3Ds={purchasePlan3Ds}
                                    selectedCurrency={selectedCurrency}
                                    setSelectedCurrency={setSelectedCurrency}
                                />
                            }
                            {
                                contactOwnerModalOpened &&
                                <ContactOwnerModal title="Access restricted" specificText='upgrade.' toggle={setContactOwnerModalOpened} opened={contactOwnerModalOpened} />
                            }

                        </Elements>
                    </RecurlyProvider>
                    <PaymentSuccessModal toggle={() => setPaymentSuccessfulModalOpened(!paymentSuccessfulModalOpened)} opened={paymentSuccessfulModalOpened}>
                        <Text size={14}>Welcome to the {stepperData && PlansName[stepperData.name]}!</Text>
                    </PaymentSuccessModal>
                    <PaymentFailedModal toggle={() => setPaymentDeclinedModalOpened(!paymentDeclinedModalOpened)} opened={paymentDeclinedModalOpened}>
                        <Text size={14}>Something went wrong during your upgrade. Your payment may have been declined. Please try again or <a href="/help">Contact Us</a> if you believe this is a mistake.</Text>
                    </PaymentFailedModal>
                </UpgradePageContainer>
            </div>
        </div>
    )
}

const UpgradePageContainer = styled.div<{ isMobile: boolean }>`
    ${props => !props.isMobile && css`
        display: flex;
        padding-right: 8px;
        padding-bottom: 60px;
    `}
    ${props => props.isMobile && css`
        padding: 0 0 0 8px;
        margin-right: -9px;
    `}
`
export const PricingIframe = styled.iframe<{ iframeHeight: number }>`
    ${props => css`
        transition: none;
        height: ${props.iframeHeight}px;
        width: 100%;
    `}
`
export const ToastLink = styled.span`
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.colors['blue-2']};
    }
`
