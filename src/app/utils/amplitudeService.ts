import { userToken } from './token';

const amplitude = require('amplitude-js');
amplitude.getInstance().init(userToken.getUserInfoItem('custom:dacast_user_id'));

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