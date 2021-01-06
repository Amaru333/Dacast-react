import { isProduction } from '../player/stage';

declare global {
    interface Window { analytics: any; }
}

const identify = (userId: string, firstName: string, lastName: string, email: string) => {
    window.analytics.identify(userId, {
        name: firstName + ' ' + lastName,
        email: email
    })
}

const load = () => {
    window.analytics.load(isProduction() ? 'pyuOKnjfqaObRPBU1Q7Kf9eZ1ZPEHyxs' : 'i6XyHA38sV8B2ubXArU6wTkO4WlhXN29');
}
const page = (name: string) => {
    window.analytics.page(name);
}
const track = (name: string, properties: any) => {
    window.analytics.track(name, properties);
}

export const segmentService = {
    identify,
    load,
    page,
    track
}

