import React from 'react';

export const useRecurlySubmit = (formRef: HTMLFormElement, selectedOption: string, callback: Function ) => {
        console.log('entering recurly hook', formRef)


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
                    var risk = recurly.Risk();
                    var threeDSecure = risk.ThreeDSecure({
                        actionTokenId: token.id
                    });
                    threeDSecure.on('token', function () {
                        callback(token.id)
                        formRef.submit();
                    });
                      
                    threeDSecure.on('error', function () {
                        console.log('3d error')
                    });
                    threeDSecure.attach(document.querySelector('#threeDSecureComponent'))
                    callback(token.id)
                    formRef.submit();
                }
            });
            console.log('end recurly')
        }
}

export const useRecurly = () => {
    React.useEffect(() => {
        recurly.configure('ewr1-hgy8aq1eSuf8LEKIOzQk6T');
        console.log('setting the config')
    }, [])
}