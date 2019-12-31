import React from 'react';
import { Text } from '../../../Typography/Text';
import styled from 'styled-components';
import { Card } from '../../../Card/Card';
import { Icon } from '@material-ui/core';
import { Button } from '../../../FormsComponents/Button/Button';
import { CustomStepper } from '../../../Stepper/Stepper';
import { PlanStepperFirstStep, PlanStepperSecondStep, PlanStepperThirdStep, PlanStepperFourthStep } from './PlanStepper';
// import {isMobile} from 'react-device-detect';
import "react-responsive-carousel/lib/styles/carousel.css";

import styles from "react-responsive-carousel/lib/styles/carousel.min.css";


import { Carousel } from 'react-responsive-carousel';


export const PlansPage = () => {
    const isMobile = true;
    const textClassName = 'py1';
    const marginBlocks = 'mx2';
    const stepList=[PlanStepperFirstStep, PlanStepperSecondStep, PlanStepperThirdStep, PlanStepperFourthStep]

    const [stepperPlanOpened, setStepperPlanOpened] = React.useState<boolean>(false);
    return (
        <PlansPageContainer>
            {
                !isMobile ?
                    <AllowancesList className={marginBlocks}>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Data</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Storage</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Encoding</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Chat Support</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Phone support</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Paywall</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>API</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>AES</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Ads</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>China</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Reseller</Text>
                        <Text className={textClassName} size={14} weight='med' color='gray-1'>Dedicated AM</Text>
                    </AllowancesList>
                    : null
            }

            {
                !isMobile ? 
                    <>
                        <PlanContainer className={marginBlocks}>
                            <Text size={16} weight='reg' color='gray-3'>Starter Plan</Text>
                            <Card>
                                <PlanInfosContainer>
                                    <Text className={textClassName} size={32} weight='med' color='gray-1'>$21 pm</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>100 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>20 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>500 Min</Text>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperPlanOpened(true)}}>Upgrade</ButtonStyle>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className={marginBlocks}>
                            <Text size={16} weight='reg' color='gray-3'>OTT Plan</Text>
                            <Card>
                                <PlanInfosContainer>
                                    <Text className={textClassName} size={32} weight='med' color='gray-1'>$199 pm</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>200 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>200 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>15000 Min</Text>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperPlanOpened(true)}}>Upgrade</ButtonStyle>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className={marginBlocks}>
                            <Text size={16} weight='reg' color='gray-3'>Scale Plan</Text>
                            <Card>
                                <PlanInfosContainer>
                                    <Text className={textClassName} size={32} weight='med' color='gray-1'>$499 pm</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>5000 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>500 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>15000 Min</Text>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <IconStyle className={textClassName}>check</IconStyle>
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperPlanOpened(true)}}>Upgrade</ButtonStyle>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className={marginBlocks}>
                            <Text size={16} weight='reg' color='gray-3'>Custom</Text>
                            <Card backgroundColor='violet10'>
                                <PlanInfosContainer>
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
                    </>

                    :
                    <Carousel centerSlidePercentage={60} infiniteLoop centerMode swipeable showArrows={false} showThumbs={false} showStatus={false} >
                        <PlanContainer className=''>
                            <Text size={16} weight='reg' color='gray-3'>Starter Plan</Text>
                            <Card>
                                <PlanInfosContainer>
                                    <Text className={textClassName} size={32} weight='med' color='gray-1'>$21 pm</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>100 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>20 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>500 Min</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Chat Support</Text>
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperPlanOpened(true)}}>Upgrade</ButtonStyle>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className=''>
                            <Text size={16} weight='reg' color='gray-3'>OTT Plan</Text>
                            <Card>
                                <PlanInfosContainer>
                                    <Text className={textClassName} size={32} weight='med' color='gray-1'>$199 pm</Text>
                                    <Text className={textClassName} size={12} weight='reg' color='gray-5'>Billed Annually</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>200 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>200 GB</Text>
                                    <Text className={textClassName} size={16} weight='reg' color='gray-1'>15000 Min</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Chat Support</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>24/7 Phone support</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>Paywall</Text>
                                    <Text className={textClassName} size={14} weight='med' color='gray-1'>API</Text>
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperPlanOpened(true)}}>Upgrade</ButtonStyle>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className=''>
                            <Text size={16} weight='reg' color='gray-3'>Scale Plan</Text>
                            <Card>
                                <PlanInfosContainer>
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
                                    <ButtonStyle className='mb1' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {setStepperPlanOpened(true)}}>Upgrade</ButtonStyle>
                                </PlanInfosContainer>
                            </Card>
                        </PlanContainer>
                        <PlanContainer className=''>
                            <Text size={16} weight='reg' color='gray-3'>Custom</Text>
                            <Card backgroundColor='violet10'>
                                <PlanInfosContainer>
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
                stepTitles={['Allowances', 'Features', 'Cart', 'Payment']}
                lastStepButton="Purchase"
                functionCancel={setStepperPlanOpened}
                finalFunction={() => {console.log('yes')}}
            />
        </PlansPageContainer>
    )
}

const PlansPageContainer = styled.div`

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
`

const PlanInfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    height: 90%;
    min-height: 750px;
`

const IconStyle = styled(Icon)`
    color: green;
`

const ButtonStyle = styled(Button)`
    position: absolute;
    bottom: 0;
`