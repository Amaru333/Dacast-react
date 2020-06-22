import React from 'react'
import { PromoPresetsModal } from '../pages/Paywall/Presets/PromoPresetsModal';

export const useRecurlySubmit = (formRef: HTMLFormElement, selectedOption: string, callback: Function, recurly: any, actionButton: Function, setThreeDSecureToken?: Function, setRecurlyToken?: Function ) => {
    
    console.log('entering recurly hook', formRef)
    if(formRef) {
        if(selectedOption === 'paypal') {

        }else { 
            console.log('requesting token')
            recurly.token(formRef,(err: any, token: any) => {
                console.log(token, err)
                if (err) {
                    console.log(err)
                } 
                else {
                    console.log('sucees token', token.id)
                    setRecurlyToken(token.id)
                    actionButton(token.id, null, setThreeDSecureToken)                 
                }
            });
        }
    }
}