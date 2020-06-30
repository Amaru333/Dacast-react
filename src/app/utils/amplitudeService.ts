const amplitude = require('amplitude-js');
amplitude.getInstance().init("91c66b0e632ea39b21b7ed408b571b26");

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