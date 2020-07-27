import * as React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { BillingPageInfos } from '../../../redux-flow/store/Account/Plan/types';

export const PaymentMethodModal = (props: {toggle: Function; actionButton: Function; callback: Function; billingInfo: BillingPageInfos; isUpdate: boolean; savePaymentMethod: Function}) => {

    return (
        <React.Fragment>
            <NewPaymentMethodForm recurlyFunction={props.savePaymentMethod} billingInfo={props.billingInfo} callback={props.callback} actionButton={props.actionButton} isUpdate={props.isUpdate}/>
            <div className='col col-12 pt3 pb1 clearfix'>
                <Button id="stepperNextButton" sizeButton="large" type='submit' typeButton="primary" buttonColor="blue" >Add</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
        </React.Fragment>
    )
}