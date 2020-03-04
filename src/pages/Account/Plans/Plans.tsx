import React from 'react';
import { Text } from '../../../components/Typography/Text';
import styled, { css } from 'styled-components';
import { Card } from '../../../components/Card/Card';
import { IconStyle } from '../../../shared/Common/Icon';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { CustomStepper } from '../../../components/Stepper/Stepper';
import { PlanStepperFirstStep, PlanStepperSecondStep, PlanStepperThirdStep, PlanStepperFourthStep } from './PlanStepper';
import {isMobile} from 'react-device-detect';
//import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import { Plans, Plan } from '../../../containers/Account/Plans';
import { ColorsApp } from '../../../styled/types';
import { Tooltip } from '../../../components/Tooltip/Tooltip';

export const PlansPage = (props: {plans: Plans}) => {
    const textClassName = 'py1';
    const marginBlocks = 'mx2';
    const fullSteps = [PlanStepperFirstStep, PlanStepperSecondStep, PlanStepperThirdStep, PlanStepperFourthStep];
    const purchaseSteps = [PlanStepperThirdStep, PlanStepperFourthStep];
    const [stepperPlanOpened, setStepperPlanOpened] = React.useState<boolean>(false);
    const [stepperData, setStepperData] = React.useState<Plan>(null);
    const [stepList, setStepList] = React.useState(fullSteps);

    React.useEffect(() => {}, [stepperData, stepList]);
    return (
        <PlansPageContainer isMobile={isMobile}>
            {
                !isMobile ?
                    <AllowancesList className={marginBlocks}>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconData' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconData'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Data</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconStorage' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconStorage'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Storage</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconEncoding' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconEncoding'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Encoding</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconPaywall' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconPaywall'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Paywall</Text>
                        </div>

                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconPlayerSdks' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconPlayerSdks'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Player SDKs</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconApi' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconApi'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>API</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconMultiUserAccess' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconMultiUserAccess'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Multi-user Access</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconM3u8' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconM3u8'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>M3u8</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconPhoneSupport' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconPhoneSupport'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Phone Support</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconAes' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconAes'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>AES for VOD</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconChina' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconChina'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>China</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}} id='iconReseller' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconReseller'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Reseller Portal</Text>
                        </div>
                        <div className='flex items-center pointer'>
                            <IconStyle style={{paddingRight: 10}}  id='iconCname' coloricon='gray-5'>info_outlined</IconStyle>
                            <Tooltip target='iconCname'>Lorem ipsum</Tooltip>
                            <Text className={textClassName} size={14} weight='med' color='gray-1'>Cname</Text>
                        </div>
                    </AllowancesList>
                    : null
            }

            {
                !isMobile ? 
                    <>
                        <PlanContainer className={marginBlocks}>
                            <Text size={16} weight='reg' color='gray-3'>Developer</Text>
                            <Card>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>$21</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'> /month</Text>
                                    </div>                                    
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>100 GB</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>/month</Text>
                                    </div>                
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>20 GB</Text>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>20 GB</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>/year</Text>
                                    </div>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <Text className='py4 center col col-10' size={12} weight='reg'>Features available for first 6 months</Text>
                                    <ButtonStyle className='absolute bottom-0' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.plans.developerPlan, action: 'purchase'});setStepList(purchaseSteps);setStepperPlanOpened(true)}}>Purchase</ButtonStyle>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className={marginBlocks}>
                            <Text size={16} weight='reg' color='gray-3'>Event</Text>
                            <Card>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>$63</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'> /month</Text>
                                    </div>                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>5 TB</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>/year</Text>
                                    </div>                
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>20 GB</Text>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>20 GB</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>/year</Text>
                                    </div>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <Text className={textClassName} size={14} weight='reg' color='gray-1'>Add-On</Text>
                                    <Text className={textClassName} size={14} weight='reg' color='gray-1'>Add-On</Text>
                                    <Text className={textClassName} size={14} weight='reg' color='gray-1'>Add-On</Text>
                                    <Text className={textClassName} size={14} weight='reg' color='gray-1'>Add-On</Text>
                                    <Text className={textClassName} size={14} weight='reg' color='gray-1'>Add-On</Text>
                                    <div className='flex flex-column absolute bottom-0'>
                                        <Button className='my1' typeButton='tertiary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.plans.eventPlan, action: 'custom'});setStepList(fullSteps);setStepperPlanOpened(true)}}>Customize</Button>
                                        <ButtonStyle typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.plans.eventPlan, action: 'purchase'});setStepList(purchaseSteps);setStepperPlanOpened(true)}}>Purchase</ButtonStyle>
                                    </div>


                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className={marginBlocks}>
                            <Text size={16} weight='reg' color='gray-3'>Scale</Text>
                            <Card>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={32} weight='med' color='gray-1'>$250</Text>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'> /month*</Text>
                                    </div>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>2 TB</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>/year</Text>
                                    </div>                
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>1 TB</Text>
                                    <div className='flex items-end'>
                                        <Text className={textClassName} size={16} weight='reg' color='gray-1'>1 TB</Text>
                                        <Text className={textClassName} size={12} weight='reg' color='gray-5'>/year</Text>
                                    </div>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <IconStyle coloricon='green' className={textClassName}>check</IconStyle>
                                    <Text className={textClassName} size={14} weight='reg' color='gray-1'>Add-On</Text>
                                    <Text className={textClassName} size={14} weight='reg' color='gray-1'>Add-On</Text>
                                    <Text className={textClassName} size={14} weight='reg' color='gray-1'>Add-On</Text>
                                    <Text className={textClassName} size={14} weight='reg' color='gray-1'>Add-On</Text>
                                    <Text className='center py35' size={12}>*3 Month Minimum</Text>
                                    <div className='flex flex-column absolute bottom-0'>
                                        <Button className='' typeButton='tertiary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.plans.scalePlan, action: 'custom'});setStepList(fullSteps);setStepperPlanOpened(true)}}>Customize</Button>
                                        <ButtonStyle className='mt1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData({...props.plans.scalePlan, action: 'purchase'});setStepList(purchaseSteps);setStepperPlanOpened(true)}}>Purchase</ButtonStyle>
                                    </div>

                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer style={{maxWidth: 275}} className={marginBlocks}>
                            <Text size={16} weight='reg' color='gray-3'>Custom</Text>
                            <Card backgroundColor='violet10'>
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
                            <Text size={16} weight='reg' color='gray-3'>Starter Plan</Text>
                            <Card>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <Text className={textClassName} size={32} weight='med' color='gray-1'>$21 pm</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>100 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>20 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>500 Min</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Chat Support</Text>
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData(props.plans.developerPlan);setStepList(purchaseSteps);setStepperPlanOpened(true)}}>Purchase</ButtonStyle>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className=''>
                            <Text size={16} weight='reg' color='gray-3'>OTT Plan</Text>
                            <Card>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <Text className={textClassName} size={32} weight='med' color='gray-1'>$199 pm</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>200 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>200 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>15000 Min</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Chat Support</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Phone support</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>Paywall</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>API</Text>
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData(props.plans.eventPlan);setStepList(fullSteps);setStepperPlanOpened(true)}}>Purchase</ButtonStyle>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className=''>
                            <Text size={16} weight='reg' color='gray-3'>Scale Plan</Text>
                            <Card>
                                <PlanInfosContainer isMobile={isMobile}>
                                    <Text className={textClassName} size={32} weight='med' color='gray-1'>$499 pm</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>5000 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>500 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>15000 Min</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Chat Support</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Phone support</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>Paywall</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>API</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>AES</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>Ads</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>China</Text>
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperData(props.plans.scalePlan);setStepList(fullSteps);setStepperPlanOpened(true)}}>Purchase</ButtonStyle>
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
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {}}>Contact Us</ButtonStyle>

                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                    </Carousel>
            }

         
            <CustomStepper 
                opened={stepperPlanOpened}
                stepperHeader='Upgrade Plan'
                stepList={stepList}
                nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                stepTitles={stepList.length === 4 ? ['Allowances', 'Features', 'Cart', 'Payment'] : ['Cart', 'Payment']}
                lastStepButton="Purchase"
                stepperData={stepperData}
                updateStepperData={(value: Plan) => setStepperData(value)}
                functionCancel={setStepperPlanOpened}
                finalFunction={() => {console.log('yes')}}
            />
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
    margin-top: 10%;
    flex-direction: column;
`

const PlanContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 175px;
`

const PlanInfosContainer = styled.div<{isMobile: boolean}>`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    height: auto;
    min-height: 850px;
    ${props => props.isMobile && css`
        min-height: 600px;
    `}
`
const ButtonStyle = styled(Button)`
    width: 95%;
`