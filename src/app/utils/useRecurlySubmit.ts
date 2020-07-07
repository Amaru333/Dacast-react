export const useRecurlySubmit = (formRef: HTMLFormElement, selectedOption: string, callback: Function, recurly: any, actionButton: Function, paypal: any, setThreeDSecureToken?: Function, setRecurlyToken?: Function, stepperData?: any ) => {
    
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
                    actionButton(stepperData, token.id, setThreeDSecureToken)                 
                }
            });
        }
    }
}