import { userToken } from '../token/tokenService';

type EventType = 
    'create account' |
    'create live stream' |
    'setup encoder' |
    'embed live stream' |
    'share live stream' |
    'upload video' |
    'embed video iframe' |
    'embed video js' |
    'share video';


export const logAmplitudeEvent = (event: EventType) => {
    //@ts-ignore
    amplitude.getInstance().logEvent(event);
}