import { userToken } from '../token/tokenService';

const amplitude = require('amplitude-js');
amplitude.getInstance().init(process.env.AMPLITUDE_API_KEY, userToken.getUserInfoItem('custom:dacast_user_id') || '');

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
    amplitude.getInstance().logEvent(event);
}