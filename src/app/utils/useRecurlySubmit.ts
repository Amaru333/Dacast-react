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
                    actionButton(token.id, null).then((response: any) => {
                        // if we reach here it means recurly sent the three_d_secure_action_required to the API, they just sent us the token
                        if(response.data.data.tokenID) {
                            var risk = recurly.Risk();
                            var threeDSecure = risk.ThreeDSecure({
                                actionTokenId: response.data.data.tokenID
                            });
                            
                            threeDSecure.on('token', function (threeDSecureToken: string) {
                                actionButton(token.id, threeDSecureToken);
                            });
                          
                            threeDSecure.on('error', function () {
                                console.log('3d error')
                            });
                            threeDSecure.attach(document.querySelector('#threeDSecureComponent'))
                        }
                    })                    
                }
            });
        }
    }
}