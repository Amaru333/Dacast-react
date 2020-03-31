import * as React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';

export const PaymentMethodModal = (props: {toggle: Function; actionButton: Function}) => {

    return (
        <React.Fragment>
            <NewPaymentMethodForm callback={() => console.log()} actionButton={props.actionButton}/>
            <div className='col col-12 pt3 pb1'>
                <Button id="stepperNextButton" sizeButton="large" type='submit' typeButton="primary" buttonColor="blue" >Add</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
        </React.Fragment>    
    )
}