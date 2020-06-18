import React from 'react'

export const useRecurlySubmit = (formRef: HTMLFormElement, selectedOption: string, callback: Function, recurly: any, actionButton: Function ) => {
    
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
                    // var risk = recurly.Risk();
                    // var threeDSecure = risk.ThreeDSecure({
                    //     actionTokenId: token.id
                    // });
                    // threeDSecure.on('token', function (threeDSecureToken: string) {
                    //     actionButton(token.id, threeDSecureToken);
                    //     formRef.submit();
                    // });
                          
                    // threeDSecure.on('error', function () {
                    //     console.log('3d error')
                    // });
                    // threeDSecure.attach(document.querySelector('#threeDSecureComponent'))
                    // formRef.submit()
                    actionButton(token.id, null);
                    
                }
            });
        }
    }
}