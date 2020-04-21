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
import { PlansContainerProps } from '../../../containers/Account/Plans';

import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Plan } from '../../../redux-flow/store/Account/Plans/types';
import { useStepperFinalStepAction } from '../../../utils/useStepperFinalStepAction';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { DropdownButton } from '../../../../components/FormsComponents/Dropdown/DropdownButton';

export const PlansPage = (props: PlansContainerProps) => {
    const textClassName = 'py1';
    const marginBlocks = 'mx2';
    const customInfoIconSize = 16;
    const fullSteps = [PlanStepperFirstStep, PlanStepperSecondStep, PlanStepperThirdStep, PlanStepperFourthStep];
    const developerPlanSteps = [PlanStepperThirdStep, PlanStepperFourthStep];
    const eventPlanSteps = [PlanStepperSecondStep, PlanStepperThirdStep, PlanStepperFourthStep]
    const [stepperPlanOpened, setStepperPlanOpened] = React.useState<boolean>(false);
    const [stepperData, setStepperData] = React.useState<Plan>(null);
    const [stepList, setStepList] = React.useState(fullSteps);
    const [currentPlan, setCurrentPlan] = React.useState<string>(null)
    const [planBillingFrequency, setPlanBillingFrequency] = React.useState<'Annually' | 'Monthly'>('Annually')
    const [stepTitles, setStepTitles] = React.useState<string[]>(['Allowances', 'Features', 'Cart', 'Payment'])

    React.useEffect(() => {}, [stepperData, stepList]);

    const purchasePlan = () => {
        setStepperPlanOpened(false);
        setCurrentPlan(stepperData.name)
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

    // React.useEffect(() => {
    //     props.changeActivePlan({...stepperData, isActive: true})
    // }, [currentPlan])

    // useStepperFinalStepAction('stepperNextButton', () => purchasePlan())
    

    return (
        <PlansPageContainer className='col col-12' isMobile={isMobile}>
            {
                !isMobile ?
                    <AllowancesList className={marginBlocks}>
                        <div className='flex items-center'>
                            <IconStyle customsize={customInfoIconSize} className="mr1"  id='iconData' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconData'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Data</Text>
                        </div>
                        <div className='flex items-center'>
                            <IconStyle customsize={customInfoIconSize} className="mr1"  id='iconStorage' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconStorage'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Storage</Text>
                        </div>
                        <div className='flex items-center'>
                            <IconStyle customsize={customInfoIconSize} className="mr1"  id='iconPhoneSupport' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconPhoneSupport'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Phone Support</Text>
                        </div>
                        <div className='flex items-center'>
                            <IconStyle customsize={customInfoIconSize} className="mr1"  id='iconPaywall' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconPaywall'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Paywall</Text>
                        </div>
                        <div className='flex items-center'>
                            <IconStyle customsize={customInfoIconSize} className="mr1"  id='iconAds' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconAds'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Ads</Text>
                        </div>
                        <div className='flex items-center'>
                            <IconStyle customsize={customInfoIconSize} className="mr1"  id='iconAes' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconAes'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>AES for VOD</Text>
                        </div>
                        <div className='flex items-center'>
                            <IconStyle customsize={customInfoIconSize} className="mr1"  id='iconM3u8' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconM3u8'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>M3u8</Text>
                        </div>
                        <div className='flex items-center'>
                            <IconStyle customsize={customInfoIconSize} className="mr1"  id='iconChina' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconChina'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>China</Text>
                        </div>
                    </AllowancesList>
                    : null
            }

            {
                !isMobile ? 
                    <>
                        <PlanContainer className={marginBlocks}>
                            <Text size={16} weight='med' color='gray-1'>Developer</Text>
                            <PlanCard className='mt1' isSelected={currentPlan === 'developer'}>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>$21</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-5'> /mo</Text>
                                    </div>                                    
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <div className='flex items-center'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>100 GB&nbsp;</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'> every month</Text>
                                    </div>                
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>20 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>-</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-1'>Trial *</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>-</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>-</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>-</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>-</Text>
                                    
                                    <div className='absolute bottom-0 flex flex-column'>
                                        <Label className="pt4 mb1" color='green' backgroundColor='green20' label='Feature Trial'></Label>
                                        <Text className='center col col-10' size={10} weight='reg' color='gray-5'>* Feature available for first 6 months</Text>
                                        {currentPlan === 'event' || currentPlan === 'scale' ? 
                                            <ButtonStyle className="mt25"  disabled typeButton='secondary' sizeButton='large' buttonColor='blue'>Contact us</ButtonStyle>  :
                                            <ButtonStyle className="mt25"  disabled={currentPlan === 'developer'} typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.developerPlan, action: 'purchase'});handleSteps('developer')}}>{currentPlan === 'developer' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                        }
                                    </div>
                                    
                                </PlanInfosContainer>
                            </PlanCard>
                        </PlanContainer>
                        <PlanContainer className={marginBlocks} style={{maxWidth: 275}}>
                            <Text size={16} weight='med' color='gray-1'>Scale</Text>
                            <PlanCard className='mt1' isSelected={currentPlan === "scale"}>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>{planBillingFrequency === 'Annually' ? '$188' : '$250'}</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-5'> /mo</Text>
                                    </div>
                                    <div className='flex flex-baseline'>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed </Text>
                                        <DropdownButton style={{maxHeight:30}} className="ml1" id='scalePlanDropdown' list={['Annually', 'Monthly']} callback={(value: 'Annually' | 'Monthly') => setPlanBillingFrequency(value)} dropdownDefaultSelect={planBillingFrequency}  />
                                    </div>
                                    
                                    
                                    <div className='flex items-center'>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>up to&nbsp;</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>3,000 GB</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>&nbsp;every month</Text>
                                    </div>
                                    <div className='flex items-center'>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>up to&nbsp;</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>1,000 GB</Text>
                                    </div>                
                                    
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-1'>Add-On</Text>

                                    
                                    
                                    
                                    <div className='flex flex-column absolute bottom-0 col col-12 items-center'>
                                        {planBillingFrequency === 'Annually' ?
                                            <div className="flex flex-column mb25 col col-8 ">
                                                <Label className="mb1" color='green' backgroundColor='green20' label='25% Discount' />
                                                <Text className='center' size={10} color='gray-5'>When billed Annually compared to Monthly</Text>
                                            </div>
                                            : null }
                                        {/* <Button className='' typeButton='tertiary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.scalePlan, action: 'custom'});setStepList(fullSteps);setStepperPlanOpened(true)}}>Customize</Button> */}
                                        <ButtonStyle className='mt1' typeButton='primary' disabled={currentPlan === 'scale'} sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.scalePlan, paymentFrequency: planBillingFrequency});handleSteps('scale')}}>{currentPlan === 'scale' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                    </div>

                                </PlanInfosContainer>
                            </PlanCard>
                        </PlanContainer>
                        <PlanContainer className={marginBlocks} >
                            <Text size={16} weight='med' color='gray-1'>Event</Text>
                            <PlanCard className="mt1" backgroundColor='violet10' isSelected={currentPlan === 'event'}>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>$750</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-5'> /yr</Text>
                                    </div>                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    
                                    <div className='flex items-center'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>6,000 GB</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>&nbsp;total data</Text>
                                    </div>                
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>10 GB</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-1'>Add-On</Text>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-1'>Add-On</Text>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-1'>Add-On</Text>
                                    
                                    <div className='flex flex-column absolute bottom-0'>
                                        { currentPlan === 'scale' ? 
                                            <ButtonStyle disabled typeButton='secondary' sizeButton='large' buttonColor='blue'>Contact us</ButtonStyle> :
                                            <div className="col col-12 flex flex-column">
                                                {/* <Button className='my1' typeButton='tertiary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.eventPlan, action: 'custom'});setStepList(fullSteps);setStepperPlanOpened(true)}}>Customize</Button> */}
                                                <ButtonStyle typeButton='primary' disabled={currentPlan === 'event'} sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.eventPlan, action: 'purchase'});handleSteps('event')}}>{currentPlan === 'event' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                            </div>
                                        }
                                    </div>


                                </PlanInfosContainer>
                            </PlanCard>
                        </PlanContainer>
                        
                        <PlanContainer style={{maxWidth: 275}} className={marginBlocks}>
                            <Text size={16} weight='med' color='gray-1'>Custom</Text>
                            <Card className='mt1' backgroundColor='violet10'>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <Text className={textClassName} size={32} weight='med' color='gray-1'>Let's chat</Text>
                                    <div className='flex flex-column mt4 pt4'>
                                        <Text className={textClassName + ' center'} size={16} weight='reg' color='gray-1'>Do you want a custom plan that is right for you and your company?</Text>
                                        <Text className={textClassName + ' center'} size={16} weight='reg' color='gray-1'> High volume streaming needs?</Text>
                                        <Text className={textClassName + ' center'} size={16} weight='reg' color='gray-1'>Contact us for a custom plan tailored to your enterprise.</Text>
                                    </div>
                                    <ButtonStyle className='absolute bottom-0' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {}}>Contact Us</ButtonStyle>

                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                    </>

                    :
                    <Carousel centerSlidePercentage={55} centerMode swipeable showArrows={false} showThumbs={false} showStatus={false} >
                        <PlanContainer className=''>
                            <Text size={16} weight='reg' color='gray-3'>Developer</Text>
                            <Card>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>$21</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-5'> /mo</Text>
                                    </div>  
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <div className='flex items-center'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>100 GB Data</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>/mo</Text>
                                    </div>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>20 GB Storage</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>Paywall*</Text>
                                    <div className='absolute bottom-0 flex flex-column'>
                                        <Label className="pt4 mb1" color='green' backgroundColor='green20' label='Feature Trial'></Label>
                                        <Text className='center col col-10' size={10} weight='reg' color='gray-5'>* Feature available for first 6 months</Text>
                                        {currentPlan === 'event' || currentPlan === 'scale' ? 
                                            <ButtonStyle className="mt25"  disabled typeButton='secondary' sizeButton='large' buttonColor='blue'>Contact us</ButtonStyle>  :
                                            <ButtonStyle className="mt25"  disabled={currentPlan === 'developer'} typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.developerPlan, action: 'purchase'});handleSteps('developer')}}>{currentPlan === 'developer' ? "Current Plan" : "Upgrade"}</ButtonStyle>
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
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>{planBillingFrequency === 'Annually' ? '$188' : '$250'}</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-5'> /mo</Text>
                                    </div>
                                    <div className='flex flex-baseline'>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed </Text>
                                        <DropdownButton style={{maxHeight:30}} className="ml1" id='scalePlanDropdown' list={['Annually', 'Monthly']} callback={(value: 'Annually' | 'Monthly') => setPlanBillingFrequency(value)} dropdownDefaultSelect={planBillingFrequency}  />
                                    </div>
                                    <div className='flex items-center'>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>up to&nbsp;</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>3,000 GB Data</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>/mo</Text>
                                    </div>
                                    <div className='flex items-center'>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>up to&nbsp;</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>1,000 GB Storage</Text>
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
                                        <ButtonStyle className='mt1' typeButton='primary' disabled={currentPlan === 'scale'} sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.scalePlan, paymentFrequency: planBillingFrequency});handleSteps('scale')}}>{currentPlan === 'scale' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                    </div>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className=''>
                            <Text size={16} weight='reg' color='gray-3'>Event</Text>
                            <Card>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>$750</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-5'> /yr</Text>
                                    </div>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <div className='flex items-center'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>6,000 GB Data</Text>
                                    </div>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>10 GB Storage</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>Paywall</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>Ads</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>M3u8</Text>
                                    <div className='flex flex-column absolute bottom-0'>
                                        { currentPlan === 'scale' ? 
                                            <ButtonStyle disabled typeButton='secondary' sizeButton='large' buttonColor='blue'>Contact us</ButtonStyle> :
                                            <div className="col col-12 flex flex-column">
                                                {/* <Button className='my1' typeButton='tertiary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.eventPlan, action: 'custom'});setStepList(fullSteps);setStepperPlanOpened(true)}}>Customize</Button> */}
                                                <ButtonStyle typeButton='primary' disabled={currentPlan === 'event'} sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.planDetails.eventPlan, action: 'purchase'});handleSteps('event')}}>{currentPlan === 'event' ? "Current Plan" : "Upgrade"}</ButtonStyle>
                                            </div>
                                        }
                                    </div>
                                </PlanInfosContainer>
                            </Card>
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
                    </Carousel>
            }
            <RecurlyProvider publicKey="ewr1-hgy8aq1eSuf8LEKIOzQk6T">
                <Elements>
                    {
                        stepperPlanOpened ?
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
                                finalFunction={() => purchasePlan()}
                            />
                            : null
                    }

                </Elements>
            </RecurlyProvider>
            
        </PlansPageContainer>
    )
}

const PlansPageContainer = styled.div<{isMobile: boolean}>`
    ${props => !props.isMobile && css`
    display: flex;
    `}
`
const AllowancesList = styled.div`
    display: flex;
    margin-top: 9.5rem;
    flex-direction: column;
`

const PlanContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 175px;
`

const PlanCard = styled(Card)<{isSelected?: boolean}>`
    ${props => props.isSelected && css`
        border: solid 1px blue;
    `}
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
    width: 95%;
`