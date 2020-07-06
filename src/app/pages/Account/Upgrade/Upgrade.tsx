import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import styled, { css } from 'styled-components';
import { Card } from '../../../../components/Card/Card';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { PlanStepperFirstStep, PlanStepperSecondStep, PlanStepperThirdStep, PlanStepperFourthStep } from './PlanStepper';
import {isMobile} from 'react-device-detect';
//import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import { UpgradeContainerProps } from '../../../containers/Account/Upgrade';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Plan, Plans } from '../../../redux-flow/store/Account/Upgrade/types';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { DropdownButton } from '../../../../components/FormsComponents/Dropdown/DropdownButton';
import { FeaturesDeveloperPlan, FeaturesScalePlan, FeaturesEventPlan, FeaturesCustomPlan, MainFeatures, PlansName } from './FeaturesConst';
import { calculateDiscount } from '../../../../utils/utils';
import { isTokenExpired, addTokenToHeader } from '../../../utils/token';
import axios from 'axios'
import { Modal, ModalFooter } from '../../../../components/Modal/Modal';
import { useHistory } from 'react-router'

export const UpgradePage = (props: UpgradeContainerProps) => {
    const textClassName = 'py1';
    const marginBlocks = 'mx1';
    const customInfoIconSize = 16;
    const fullSteps = [PlanStepperFirstStep, PlanStepperSecondStep, PlanStepperThirdStep, PlanStepperFourthStep];
    const developerPlanSteps = [PlanStepperThirdStep, PlanStepperFourthStep];
    const eventPlanSteps = [PlanStepperSecondStep, PlanStepperThirdStep, PlanStepperFourthStep]
    const [stepperPlanOpened, setStepperPlanOpened] = React.useState<boolean>(false);
    const [allFeaturesOpen, setAllFeaturesOpen] = React.useState<boolean>(false);
    const [stepperData, setStepperData] = React.useState<Plan>(null);
    const [stepList, setStepList] = React.useState(fullSteps);
    const [currentPlan, setCurrentPlan] = React.useState<string>()
    const [planBillingFrequency, setPlanBillingFrequency] = React.useState<'Annually' | 'Monthly'>('Annually')
    const [stepTitles, setStepTitles] = React.useState<string[]>(['Allowances', 'Features', 'Cart', 'Payment'])
    const [paymentSuccessfulModalOpened, setPaymentSuccessfulModalOpened] = React.useState<boolean>(false)
    const [paymentDeclinedModalOpened, setPaymentDeclinedModalOpened] = React.useState<boolean>(false)
    const [threeDSecureActive, setThreeDSecureActive] = React.useState<boolean>(false)

    let history = useHistory()

    const purchasePlan = async (recurlyToken: string, threeDSecureToken: string, callback: Function) => {
        await isTokenExpired()
        
        let {token, userId} = addTokenToHeader();
        return await axios.post(process.env.API_BASE_URL + '/accounts/' + userId + '/plans/purchase', 
            {
                planCode: stepperData.code,
                token: recurlyToken,
                currency: 'USD',
                couponCode: '',
                allowances: stepperData.allownaceCode,
                paidPrivileges: stepperData.privileges.map((privilege) => {return privilege.checked ? {code: privilege.code, quantity: 1} : null}).filter(f => f)
                },
            {
                headers: {
                    Authorization: token
                }
            }
            
        ).then(response => {
            debugger
            if(response.data.data.tokenID) {
                callback(response.data.data.tokenID)
                setThreeDSecureActive(true)
            } else {
                setStepperPlanOpened(false)
                console.log(`${stepperData.name} plan purchased successfully`)
                setPaymentSuccessfulModalOpened(true)
            }
            
        }).catch((error) => {
            setStepperPlanOpened(false)
            setPaymentDeclinedModalOpened(true)
        })
        
    }

    const purchasePlan3Ds = async (recurlyToken: string, threeDSecureToken: string) => {
        await isTokenExpired()
        
        let {token, userId} = addTokenToHeader();
        return await axios.post(process.env.API_BASE_URL + '/accounts/' + userId + '/plans/purchase', 
            {
                planCode: stepperData.code,
                token: recurlyToken,
                threeDSecureToken: threeDSecureToken,
                currency: 'USD',
                couponCode: '',
                allowances: stepperData.allownaceCode,
                paidPrivileges: stepperData.privileges.map((privilege) => {return privilege.checked ? {code: privilege.code, quantity: 1} : null}).filter(f => f)
                },
            {
                headers: {
                    Authorization: token
                }
            }
            
        ).then(response => {
            debugger
                setStepperPlanOpened(false)
                console.log(`3DS authentication successful. ${stepperData.name} plan purchased successfully`)
                setPaymentSuccessfulModalOpened(true)
                setThreeDSecureActive(false)
            }
            
        ).catch((error) => {
            
        })
        
    }

    const handleThreeDSecureFail = () => {
        setStepperPlanOpened(false)
        setPaymentDeclinedModalOpened(true)
    }

    const handleSteps = (plan: string) => {
        switch (plan) {
            case 'developer':
                setStepList(developerPlanSteps);
                setStepTitles(['Cart', 'Payment'])
                break;
            case 'event':
                setStepList(eventPlanSteps);
                setStepTitles(['Features', 'Cart', 'Payment'])
                break;
            case 'scale':
                setStepList(fullSteps);
                setStepTitles(['Allowances', 'Features', 'Cart', 'Payment'])
        }
        setStepperPlanOpened(true)
    }

    return (
        <ScrollContainer>
            <UpgradePageContainer className='col col-12' isMobile={isMobile}>
                {
                    !isMobile ?
                        <AllowancesList className={marginBlocks}>
                            {
                                MainFeatures.map( (element => {
                                    return (
                                        <AllowanceElement className='flex items-center'>
                                            <IconStyle customsize={customInfoIconSize} className="mr1"  id={'icon'+element.name} coloricon='gray-5'>info_outlined</IconStyle>
                                            <Tooltip target={'icon'+element.name}>{element.tooltip}</Tooltip>
                                            <Text className={textClassName} size={14} weight='med' color='gray-1'>{element.name}</Text>
                                        </AllowanceElement>
                                    );
                                }))
                            }
                        </AllowancesList>
                        : null
                }

                {
                    !isMobile ? 
                        <>
                            <PlanContainer className={marginBlocks}>
                                <Text size={16} weight='med' color='gray-1'>Developer</Text>
                                <PlanCard className='mt1' isSelected={currentPlan === 'Developer'}>
                                    <PlanInfosContainer isMobile={isMobile}>
                                        <div className='flex items-end'>
                                            <Text className={textClassName} size={32} weight='med' color='gray-1'>${((props.planDetails.developerPlan.price.usd/100)/12).toFixed(0)}</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-5'> /mo</Text>
                                        </div>                                    
                                        <Text className={textClassName+' mb1'} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                        <div className='flex items-center'>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.developerPlan.allowances[0].bandwidth/10} GB&nbsp;</Text>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'> every month</Text>
                                        </div>                
                                        <Text className={textClassName} lineHeight={24} size={12} weight='reg' color='gray-1'>{props.planDetails.developerPlan.allowances[0].storage} GB</Text>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <Text className={textClassName} lineHeight={24} size={12} weight='reg' color='gray-1'>Trial *</Text>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <Text className={textClassName} lineHeight={24} size={12}  weight='reg' color='gray-1'>Trial *</Text>
                                        <Text className={textClassName} lineHeight={24} size={12} weight='reg' color='gray-1'>Trial *</Text>
                                        
                                        <div className='absolute bottom-0 flex flex-column'>
                                            <Label className="pt4 mb1" color='green' backgroundColor='green20' label='Feature Trial'></Label>
                                            <Text className='center col col-10' size={10} weight='reg' color='gray-5'>* Feature available for first 6 months</Text>
                                            {currentPlan === 'Event' || currentPlan === 'Annual Scale' ? 
                                                <ButtonStyle className="mt25 col col-12"  disabled typeButton='secondary' sizeButton='large' buttonColor='blue'>Contact us</ButtonStyle>  :
                                                <ButtonStyle className="mt25 col col-12"  disabled={currentPlan === 'Developer'} typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.developerPlan});handleSteps('developer')}}>{currentPlan === 'Developer' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                            }
                                        </div>
                                        
                                    </PlanInfosContainer>
                                </PlanCard>
                                <ContainerAllFeatures isOpen={allFeaturesOpen || isMobile}>
                                    {
                                        FeaturesDeveloperPlan.map(( (feature: string) => <Text size={10} weight="reg" className="mb1" color="gray-1">{feature}</Text>))
                                    }
                                </ContainerAllFeatures>
                            </PlanContainer>
                            <PlanContainer className={marginBlocks} style={{width: "30%"}}>
                                <Text size={16} weight='med' color='gray-1'>Scale</Text>
                                <PlanCard className='mt1' isSelected={currentPlan === "scale"}>
                                    <PlanInfosContainer isMobile={isMobile}>
                                        <div className='flex items-end'>
                                            <Text className={textClassName} size={32} weight='med' color='gray-1'>{planBillingFrequency === 'Annually' ? '$' +(calculateDiscount(props.planDetails.scalePlanAnnual.price.usd/100)/12).toFixed(0) : '$' + (props.planDetails.scalePlanMonthly.price.usd/100)}</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-5'> /mo</Text>
                                        </div>
                                        <div className='flex flex-baseline mb1'>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed </Text>
                                            <DropdownButton style={{maxHeight:30, width: 'auto'}} className="ml1" id='scalePlanDropdown' list={['Annually', 'Monthly']} callback={(value: 'Annually' | 'Monthly') => setPlanBillingFrequency(value)} dropdownDefaultSelect={planBillingFrequency}  />
                                        </div>
                                        <div className='flex items-center'>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>up to&nbsp;</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.scalePlanAnnual.allowances[1].bandwidth} GB</Text>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>&nbsp;every month</Text>
                                        </div>
                                        <div className='flex items-center'>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>up to&nbsp;</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.scalePlanAnnual.allowances[2].storage} GB</Text>
                                        </div>                
                                        
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <Text className={textClassName} size={12} lineHeight={24} weight='reg' color='gray-1'>Add-On</Text>
                                        
                                        <div className='flex flex-column absolute bottom-0 col col-12 items-center'>
                                            {planBillingFrequency === 'Annually' ?
                                                <div className="flex flex-column mb25 col col-8 ">
                                                    <Label className="mb1" color='green' backgroundColor='green20' label='25% Discount' />
                                                    <Text className='center' size={10} color='gray-5'>When billed Annually compared to Monthly</Text>
                                                </div>
                                                : 
                                                <div className="flex flex-column mb25 col col-8 ">
                                                <Text className='center' size={10} color='gray-5'>3 Month Minimum</Text>
                                            </div>}
                                            {/* <Button className='' typeButton='tertiary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.scalePlan, action: 'custom'});setStepList(fullSteps);setStepperPlanOpened(true)}}>Customize</Button> */}
                                            <ButtonStyle className='mt1 col col-12' typeButton='primary' disabled={currentPlan === 'Annual Scale'} sizeButton='large' buttonColor='blue' onClick={() => {{planBillingFrequency === "Annually" ? setStepperData({...props.planDetails.scalePlanAnnual, selectedScalePlan: props.planDetails.scalePlanAnnual.allowances[0], paymentTerm: 12}) :setStepperData({...props.planDetails.scalePlanAnnual, selectedScalePlan: props.planDetails.scalePlanAnnual.allowances[0], paymentTerm: 1})};handleSteps('scale')}}>{currentPlan === 'Annual Scale' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                        </div>

                                    </PlanInfosContainer>
                                </PlanCard>
                                <ContainerAllFeatures isOpen={allFeaturesOpen || isMobile}>
                                    {
                                        FeaturesScalePlan.map(( (feature: string) => <Text size={10} weight="reg" className="mb1" color="gray-1">{feature}</Text>))
                                    }
                                </ContainerAllFeatures>
                            </PlanContainer>
                            <PlanContainer className={marginBlocks} >
                                <Text size={16} weight='med' color='gray-1'>Event</Text>
                                <PlanCard className="mt1" backgroundColor='violet10' isSelected={currentPlan === 'event'}>
                                    <PlanInfosContainer isMobile={isMobile}>
                                        <div className='flex items-end'>
                                            <Text className={textClassName} size={32} weight='med' color='gray-1'>${props.planDetails.eventPlan.price.usd/100}</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-5'> /yr</Text>
                                        </div>                                    
                                        <Text className={textClassName+' mb1'} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                        
                                        <div className='flex items-center'>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.eventPlan.allowances[0].bandwidth} GB</Text>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>&nbsp;total data</Text>
                                        </div>                
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.eventPlan.allowances[0].storage} GB</Text>
                                        <Text className={textClassName} size={12} lineHeight={24} weight='reg' color='gray-1'>Add-On</Text>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <Text className={textClassName} size={12}  lineHeight={24} weight='reg' color='gray-1'>Add-On</Text>
                                        <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                        <Text className={textClassName} size={12} lineHeight={24} weight='reg' color='gray-1'>Add-On</Text>
                                        
                                        <div className='flex flex-column absolute bottom-0 col col-12'>
                                            { currentPlan === 'Annual Scale' ?
                                                <ButtonStyle className="col col-12" disabled typeButton='secondary' sizeButton='large' buttonColor='blue'>Contact us</ButtonStyle> :
                                                <div className="col col-12 flex flex-column">
                                                    {/* <Button className='my1' typeButton='tertiary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.eventPlan, action: 'custom'});setStepList(fullSteps);setStepperPlanOpened(true)}}>Customize</Button> */}
                                                    <ButtonStyle className="col col-12" typeButton='primary' disabled={currentPlan === 'Event'} sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.eventPlan});handleSteps('event')}}>{currentPlan === 'Event' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                                </div>
                                            }
                                        </div>


                                    </PlanInfosContainer>
                                </PlanCard>
                                <ContainerAllFeatures isOpen={allFeaturesOpen || isMobile}>
                                    {
                                        FeaturesEventPlan.map(( (feature: string) => <Text size={10} weight="reg" className="mb1" color="gray-1">{feature}</Text>))
                                    }
                                </ContainerAllFeatures>
                            </PlanContainer>
                            
                            <PlanContainer style={{width: "30%"}} className={marginBlocks+ " mr25"}>
                                <Text size={16} weight='med' color='gray-1'>Custom</Text>
                                <Card className='mt1' backgroundColor='violet10'>
                                    <PlanInfosContainer isMobile={isMobile}>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>Let's chat</Text>
                                        <div className='flex flex-column mt4 pt4'>
                                            <Text className={textClassName + ' center'} size={16} weight='reg' color='gray-1'>Do you want a custom plan that is right for you and your company?</Text>
                                            <Text className={textClassName + ' center'} size={16} weight='reg' color='gray-1'> High volume streaming needs?</Text>
                                            <Text className={textClassName + ' center'} size={16} weight='reg' color='gray-1'>Contact us for a custom plan tailored to your enterprise.</Text>
                                        </div>
                                        <ButtonStyle className='absolute bottom-0 col col-12' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {}}>Contact Us</ButtonStyle>

                                    </PlanInfosContainer>
                                </Card>
                                <ContainerAllFeatures isOpen={allFeaturesOpen || isMobile}>
                                    {
                                        FeaturesCustomPlan.map(( (feature: string) => <Text size={10} weight="reg" className="mb1" color="gray-1">{feature}</Text>))
                                    }
                                </ContainerAllFeatures>
                            </PlanContainer>
                        </>

                        :
                        <Carousel centerSlidePercentage={55} centerMode swipeable showArrows={false} showThumbs={false} showStatus={false} >
                            <PlanContainer className=''>
                                <Text size={16} weight='reg' color='gray-3'>Developer</Text>
                                <Card>
                                    <PlanInfosContainer isMobile={isMobile}>
                                        <div className='flex items-end'>
                                            <Text className={textClassName} size={32} weight='med' color='gray-1'>${((props.planDetails.developerPlan.price.usd/100)/12).toFixed(0)}</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-5'> /mo</Text>
                                        </div>  
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                        <div className='flex items-center'>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.developerPlan.allowances[0].bandwidth/10} GB Data</Text>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>/mo</Text>
                                        </div>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.developerPlan.allowances[0].storage} Storage</Text>
                                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Paywall*</Text>
                                        <div className='absolute bottom-0 flex flex-column'>
                                            <Label className="pt4 mb1" color='green' backgroundColor='green20' label='Feature Trial'></Label>
                                            <Text className='center col col-10' size={10} weight='reg' color='gray-5'>* Feature available for first 6 months</Text>
                                            {currentPlan === 'event' || currentPlan === 'scale' ? 
                                                <ButtonStyle className="mt25"  disabled typeButton='secondary' sizeButton='large' buttonColor='blue'>Contact us</ButtonStyle>  :
                                                <ButtonStyle className="mt25"  disabled={currentPlan === 'developer'} typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.developerPlan});handleSteps('developer')}}>{currentPlan === 'developer' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                            }
                                        </div>
                                    </PlanInfosContainer>
                                </Card>
                            </PlanContainer>
                            <PlanContainer className=''>
                                <Text size={16} weight='reg' color='gray-3'>Scale</Text>
                                <Card>
                                    <PlanInfosContainer isMobile={isMobile}>
                                        <div className='flex items-end'>
                                            <Text className={textClassName} size={32} weight='med' color='gray-1'>{planBillingFrequency === 'Annually' ? '$' +(calculateDiscount(props.planDetails.scalePlanAnnual.price.usd/100)/12).toFixed(0) : '$' + (props.planDetails.scalePlanMonthly.price.usd/100)}</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-5'> /mo</Text>
                                        </div>
                                        <div className='flex flex-baseline'>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed </Text>
                                            <DropdownButton style={{maxHeight:30}} className="ml1" id='scalePlanDropdown' list={['Annually', 'Monthly']} callback={(value: 'Annually' | 'Monthly') => setPlanBillingFrequency(value)} dropdownDefaultSelect={planBillingFrequency}  />
                                        </div>
                                        <div className='flex items-center'>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>up to&nbsp;</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.scalePlanAnnual.allowances[1].bandwidth} GB Data</Text>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>/mo</Text>
                                        </div>
                                        <div className='flex items-center'>
                                            <Text className={textClassName} size={12} weight='reg' color='gray-5'>up to&nbsp;</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.scalePlanAnnual.allowances[2].storage} GB Storage</Text>
                                        </div> 
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>24/7 Phone Support</Text>
                                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Paywall</Text>
                                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Ads</Text>
                                        <Text className={textClassName} size={14} weight='med' color='gray-1'>AES</Text>
                                        <Text className={textClassName} size={14} weight='med' color='gray-1'>M3u8</Text>
                                        <div className='flex flex-column absolute bottom-0 col col-12 items-center'>
                                            {planBillingFrequency === 'Annually' ?
                                                <div className="flex flex-column mb25 col col-8 ">
                                                    <Label className="mb1" color='green' backgroundColor='green20' label='25% Discount' />
                                                </div>
                                                : null }
                                            {/* <Button className='' typeButton='tertiary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.scalePlan, action: 'custom'});setStepList(fullSteps);setStepperPlanOpened(true)}}>Customize</Button> */}
                                            <ButtonStyle className='mt1' typeButton='primary' disabled={currentPlan === 'scale'} sizeButton='large' buttonColor='blue' onClick={() => {{planBillingFrequency === "Annually" ? setStepperData({...props.planDetails.scalePlanAnnual, paymentTerm: 12}) :setStepperData({...props.planDetails.scalePlanAnnual, paymentTerm: 1})};handleSteps('scale')}}>{currentPlan === 'scale' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                        </div>
                                    </PlanInfosContainer>
                                </Card>
                                <ContainerAllFeatures isOpen={allFeaturesOpen || isMobile}>
                                    {
                                        FeaturesScalePlan.map(( (feature: string) => <Text size={10} weight="reg" className="mb1" color="gray-1">{feature}</Text>))
                                    }
                                </ContainerAllFeatures>
                            </PlanContainer>
                            <PlanContainer className=''>
                                <Text size={16} weight='reg' color='gray-3'>Event</Text>
                                <Card>
                                    <PlanInfosContainer isMobile={isMobile}>
                                        <div className='flex items-end'>
                                            <Text className={textClassName} size={32} weight='med' color='gray-1'>${props.planDetails.eventPlan.price.usd/100}</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-5'> /yr</Text>
                                        </div>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                        <div className='flex items-center'>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.eventPlan.allowances[0].bandwidth} GB Data</Text>
                                        </div>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>{props.planDetails.eventPlan.allowances[0].storage} GB Storage</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>Paywall</Text>
                                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Ads</Text>
                                        <Text className={textClassName} size={14} weight='med' color='gray-1'>M3u8</Text>
                                        <div className='flex flex-column absolute bottom-0 col col-12'>
                                            { currentPlan === 'scale' ? 
                                                <ButtonStyle disabled typeButton='secondary' sizeButton='large' buttonColor='blue'>Contact us</ButtonStyle> :
                                                <div className="col col-12 flex flex-column ">
                                                    {/* <Button className='my1' typeButton='tertiary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.eventPlan, action: 'custom'});setStepList(fullSteps);setStepperPlanOpened(true)}}>Customize</Button> */}
                                                    <ButtonStyle typeButton='primary' disabled={currentPlan === 'event'} sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.eventPlan});handleSteps('event')}}>{currentPlan === 'event' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                                </div>
                                            }
                                        </div>
                                    </PlanInfosContainer>
                                </Card>
                                <ContainerAllFeatures isOpen={allFeaturesOpen || isMobile}>
                                    {
                                        FeaturesEventPlan.map(( (feature: string) => <Text size={10} weight="reg" className="mb1" color="gray-1">{feature}</Text>))
                                    }
                                </ContainerAllFeatures>
                            </PlanContainer>
                            <PlanContainer className=''>
                                <Text size={16} weight='reg' color='gray-3'>Custom</Text>
                                <Card backgroundColor='violet10'>
                                    <PlanInfosContainer isMobile={isMobile}>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>Let's chat</Text>
                                        <>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>Do you want a custom plan that is right for you and your company?</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'> High volume streaming needs?</Text>
                                            <Text className={textClassName} size={16} weight='reg' color='gray-1'>Contact us for a custom plan tailored to your enterprise.</Text>
                                        </>
                                        <ButtonStyle className='absolute bottom-0 mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {}}>Contact Us</ButtonStyle>

                                    </PlanInfosContainer>
                                </Card>
                            </PlanContainer>
                            <ContainerAllFeatures isOpen={allFeaturesOpen || isMobile}>
                                {
                                    FeaturesCustomPlan.map(( (feature: string) => <Text size={10} weight="reg" className="mb1" color="gray-1">{feature}</Text>))
                                }
                            </ContainerAllFeatures>
                        </Carousel>
                }
                <RecurlyProvider publicKey="ewr1-hgy8aq1eSuf8LEKIOzQk6T">
                    <Elements>
                        {
                            stepperPlanOpened &&
                                <CustomStepper 
                                    opened={stepperPlanOpened}
                                    stepperHeader='Upgrade Plan'
                                    stepList={stepList}
                                    nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                                    backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                                    cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                                    stepTitles={stepTitles}
                                    lastStepButton="Purchase"
                                    stepperData={stepperData}
                                    updateStepperData={(value: Plan) => setStepperData(value)}
                                    functionCancel={setStepperPlanOpened}
                                    finalFunction={ threeDSecureActive ? purchasePlan3Ds : props.changeActivePlan}
                                    usefulFunctions={{'handleThreeDSecureFail': handleThreeDSecureFail}}
                                />
                                
                        }

                    </Elements>
                </RecurlyProvider>
                <Modal icon={{name: "check_circle_outline", color:"green"}} size="small" modalTitle="Payment Successful" toggle={() => setPaymentSuccessfulModalOpened(!paymentSuccessfulModalOpened)} opened={paymentSuccessfulModalOpened} hasClose={false}>
                    <div className="mt2 mb3">
                        <Text  size={14}>Welcome to the {stepperData && PlansName[stepperData.name]}!</Text>
                    </div>  
                    <ModalFooter>
                        <Button onClick={() => setPaymentSuccessfulModalOpened(!paymentSuccessfulModalOpened)}>Confirm</Button>
                        <Button typeButton="tertiary">See Invoices</Button>
                    </ModalFooter>
                </Modal>
                <Modal icon={{name: "warning_outlined", color:"red"}} size="small" modalTitle="Payment Declined" toggle={() => setPaymentDeclinedModalOpened(!paymentDeclinedModalOpened)} opened={paymentDeclinedModalOpened} hasClose={false}>
                    <div className="mt2 mb3">
                        <Text  size={14}>Something went wrong during your upgrade. Your payment may have been declined. Please try again or <a href="/help">Contact Us</a> if you believe this is a mistake.</Text>
                    </div>
                </Modal>
            </UpgradePageContainer>
            <Text onClick={() => setAllFeaturesOpen(!allFeaturesOpen)} className="justify-center items-center flex col-12 pt2 pointer" color="dark-violet" size={14} weight='reg'>View all features<IconStyle coloricon="dark-violet" customsize={customInfoIconSize} className="ml1">{allFeaturesOpen ? "expand_less" : "expand_more"}</IconStyle></Text>
        </ScrollContainer>
    )
}

const UpgradePageContainer = styled.div<{isMobile: boolean}>`
    ${props => !props.isMobile && css`
    display: flex;
    `}
    min-width:1100px;
`
const AllowancesList = styled.div`
    display: flex;
    margin-top: 9.5rem;
    flex-direction: column;
`
const ScrollContainer = styled.div`
    overflow-x: auto;
    margin-right: -24px;
`

const AllowanceElement = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`


const ContainerAllFeatures = styled.div<{isOpen: boolean}>`
    display: flex;
    flex-direction: column;
    margin-top: 64px;
    ${props => !props.isOpen && css`
        display: none;
    `}
`

const PlanContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
`

const PlanCard = styled(Card)<{isSelected?: boolean}>`
    ${props => props.isSelected && css`
        border: solid 1px blue;
    `}
    width:100%;
`

const PlanInfosContainer = styled.div<{isMobile: boolean}>`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    height: auto;
    min-height: 649px;
    ${props => props.isMobile && css`
        min-height: 600px;
    `}
`
const ButtonStyle = styled(Button)`
    /* width: 95%; */
`

export const ScalePlanSelector = styled.div<{selected: boolean}>`
    height: 108px;
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    background-color: ${props => props.theme.colors["gray-10"]};
    ${props => props.selected && css`
        background-color: ${props.theme.colors["violet10"]};
        border: 1px solid ${props.theme.colors["dark-violet"]};
    `}
`
export const ScalePlanSelectorContents = styled.div`
    display: flex;
    flex-direction: column;
    margin: 24px;
    justify-content: space-between;
    align-items: center;
`

