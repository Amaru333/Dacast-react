import React from 'react';
import { storiesOf } from '@storybook/react'
import { CustomStepper } from '../components/Stepper/Stepper';
import { Text } from '../components/Typography/Text'
import styled from 'styled-components';
import { Input } from '../components/FormsComponents/Input/Input';

const exampleStep1 = () => {
    return (
        <React.Fragment>
             <Text size={14} weight="reg">
                <p>Encoding Minutes are used whenever you upload a video, add a new rendition to an existing video or enable live recording on a Live Channel.</p>
                <p>Enter how many Encoding Minutes you wish to purchase.</p>
             </Text>
         <Input className="col col-6" label="Encoding Minutes"  placeholder="Amount in GB" /> 
        </React.Fragment>
       
    )
}

const exampleStep2 = () => {
    return (
        <React.Fragment>
            <DisplayTable>
           <Text size={14} weight="reg">Encoding Minutes: 60</Text>
       </DisplayTable>
       <DisplayTable>
       <Text size={14} weight="reg">Price per GB: $2.25</Text>
        </DisplayTable>
        <DisplayTable>
        <Text size={14} weight="reg">Total Pay now: $135</Text>
    </DisplayTable>
        </React.Fragment>
       
           
    )
}

const exampleStep3 = () => {
    return (
       <React.Fragment>
           <DisplayTable className="col col-12">
               <Input className="col col-6" label="First Name" />
               <Input className="col col-6" label="Last Name" />
               <Input className="col col-6" label="Card Number"/>
               <Input className="col col-3" label="Expiry" />
               <Input className="col col-3" label="CVV" />
               <Input className="col col-9" label="Billing Address"/>
               <Input className="col col-3" label="State"/>
               <Input className="col col-3" label="Town"/>
               <Input className="col col-3" label="Zipcode"/>
               <Input className="col col-6" label="Country"/>
           </DisplayTable>
       </React.Fragment>
    )
}

const exampleStep4 = () => {
    return (
       <Text size={20} weight="reg">All done!</Text> 
    )
}

const stepList = [exampleStep1, exampleStep2, exampleStep3, exampleStep4]

storiesOf('Stepper', module)
    .add('Stepper', () => ( 
        <ScrollableContainer>
           <CustomStepper 
           stepperHeader="Test"
           stepList={stepList} 
           nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
           backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
           cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}} 
           stepTitles={["Step 1", "Step 2", "Step 3"]} 
           lastStepButton="Purchase"/>
        </ScrollableContainer>
    ))

    var ScrollableContainer = styled.div`
    height: 1400px;
    width:auto;
    background: #EBEFF5;
    `

    var DisplayTable = styled.div`
        position: relative;
        border: 1px solid #DDE3ED;
        display: block;
        flex-wrap: wrap;
        min-height: 48px;
        align-items: center;
        padding: 0 24px;
    `