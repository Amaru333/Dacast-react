import { isProduction } from '../player/stage';

declare global {
    interface Window { analytics: any; }
}

const load = () => {
    window.analytics.load(isProduction() ? 'pyuOKnjfqaObRPBU1Q7Kf9eZ1ZPEHyxs' : 'i6XyHA38sV8B2ubXArU6wTkO4WlhXN29');
}
const page = () => {
    window.analytics.page();
}
const track = (name: string, properties: any) => {
    window.analytics.track(name, properties);
}

export const segmentService = {
    load,
    page,
    track
}

