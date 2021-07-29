import { showToastNotification } from '../redux-flow/store/Toasts'
import { updateTitle } from '../redux-flow/store/Title/logic'
import { store } from '..';
import { FolderAsset } from '../redux-flow/store/Folders/types';
import { IconStyle } from '../../shared/Common/Icon';
import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { Action as ReduxAction } from 'redux';
import { ApplicationState } from '../redux-flow/store';
import { Currency, Price } from '../redux-flow/store/Account/Upgrade/types';
import { getUrlParam } from '../../utils/utils';
import Audience from '../containers/Analytics/Audience';

export function updateClipboard(copiedValue: string, toastMessage: string): void {
    navigator.clipboard.writeText(copiedValue).then(function () {
        store.dispatch(showToastNotification(toastMessage, 'fixed', "success"));
    }, function () {
        store.dispatch(showToastNotification("Failed to copy to clipboard", 'fixed', "error"));
    });
}

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

export const calcTotalFeatures = (prices: {price: Price, quantity?: number}[], selectedCurrency: Currency): number => {
    let total = 0
    console.log('prices: ', prices)
    prices.map(price => {
        total += price.price[selectedCurrency] * (price.quantity || 1)
    })

    return total
}

export const removePrefix = (objectId: string) => {
    return objectId.replace(/channel_|live_|vod_/, '');
}

export function updateTitleApp(title: string): void {
    store.dispatch(updateTitle(title))
}

export const parseContentType = (contentType: string) => {
    switch(contentType) {
        case 'live' : 
            return 'channels'
        case 'vod' :
            return 'vods'
        case 'playlist' :
            return 'playlists'
        case 'expo':
            return 'expos'
        default :
            return contentType
    }
}

export const handleRowIconType = (item: FolderAsset) => {
    switch (item.type) {
        case 'playlist':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>playlist_play</IconStyle>
        case 'folder':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>folder_open</IconStyle>
        case 'channel':
        case 'live':
        case 'vod':
            return item.thumbnail ? 
                <img key={"thumbnail" + item.objectID} width="auto" height={42} src={item.thumbnail} ></img>
                :                                  
                    <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                    </div>
        default:
            return (                                    
                <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                    <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                </div>
            )
    }
}

export function applyViewModel<ActionPayload, ReactOut, SdkIn, SdkOut>(
    sdkFunction: (data: SdkIn) => Promise<SdkOut>,
    inputFormatter: undefined | ((data: ReactOut) => SdkIn), 
    outputFormatter: undefined | ((responseSdk: SdkOut, dataReact?: ReactOut) => ActionPayload), 
    action: string, 
    successMsg: string, 
    errorMsg: string,
    errorFormatter?: (error: string) => string): (data: ReactOut) => (dispatch: ThunkDispatch<ApplicationState, void, ReduxAction<string> & {payload: ActionPayload | ReactOut}>) => Promise<void> {
    return (data) => async (dispatch) => {
        try {
            let response = await sdkFunction(inputFormatter ? inputFormatter(data) : null)
            dispatch({ type: action, payload: outputFormatter ? outputFormatter(response, data) : data })
            if (successMsg) {
                dispatch(showToastNotification(successMsg, 'fixed', "success"));
            }
        } catch(e) {
            dispatch(showToastNotification((errorFormatter ? errorFormatter(e.response.data) : errorMsg), "fixed", "error"));
            return Promise.reject(e)
        }
    }
}
