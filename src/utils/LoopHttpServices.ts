
import axios from 'axios'

const resolveAfter2Seconds = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 6000);
    });
}

export const loopUntilCompleted = async (url: string, token: string) => {
    var keepLooping = true;

    while (keepLooping) {
        var response = await axios.get(url,
            {
                headers: {
                    Authorization: token
                }
            }
        ).catch(error => {
            keepLooping = false
        })

        if (response.data.data.status === "completed" || response.status >= 400) {
            keepLooping = false
        } else {
            await resolveAfter2Seconds();
        }
        
    }

    return response.data
}

