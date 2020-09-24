
import { axiosClient } from '../../../app/utils/services/axios/axiosClient';

const resolveAfter2Seconds = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 6000);
    });
}

export const loopUntilCompleted = async (url: string) => {
    var keepLooping = true;

    while (keepLooping) {
        var response = await axiosClient.get(url,
        ).catch(error => {
            keepLooping = false
        })

        if (response.data.data.status === "completed" || response.status >= 400 || response.data.data.data) {
            keepLooping = false
        } else {
            await resolveAfter2Seconds();
        }
        
    }

    return response.data
}

