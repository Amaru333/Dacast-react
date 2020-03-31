import React from 'react'

export const useStepperFinalStepAction = (buttonId: string, callback: Function) => {
    React.useEffect(() => {
        document.getElementById(buttonId).addEventListener('mousedown', () => {
            console.log('clik')
            if(document.getElementById(buttonId).innerText !== 'Next') {
                console.log('last step')
                callback()
            }
        })

        return () => {
            document.getElementById(buttonId).removeEventListener('mousedown', () => {
                if(document.getElementById(buttonId).innerText !== 'Next') {
                    callback()
                }            
            })
        }

    }, [])
}