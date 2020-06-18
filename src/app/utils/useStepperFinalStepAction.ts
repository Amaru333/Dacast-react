import React from 'react'

export const useStepperFinalStepAction = (buttonId: string, callback: Function) => {
    function doAThing(){if(document.getElementById(buttonId).innerText !== 'Next') {
        callback()
    }}
    React.useEffect(() => {
        document.getElementById(buttonId).addEventListener('click', doAThing)

        return () => {
            document.getElementById(buttonId).removeEventListener('click', doAThing)
        }

    }, [callback])
}