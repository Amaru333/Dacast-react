import React from 'react';

export const useRecurlySubmit = (formRef: HTMLFormElement, selectedOption: string ) => {
        
        if(selectedOption === 'paypal') {

        }else {
            let form = formRef.current
            recurly.token(form,(err: any, token: any) => {
                if (err) {
                } 
                else {
                    
                    var risk = recurly.Risk();
                    var threeDSecure = risk.ThreeDSecure({
                        actionTokenId: token.id
                    });
                    threeDSecure.on('token', function () {
                    });
                      
                    threeDSecure.on('error', function () {
                    });
                    threeDSecure.attach(document.querySelector('#threeDSecureComponent'))
                    form.submit();
                }
            });
        }
    }