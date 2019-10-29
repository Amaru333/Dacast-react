import '@types/googlemaps';

declare module "*.png" {
    const value: string;
    export = value;
}
declare module 'googlemaps'{
    interface Window {
        google: typeof google;
    }
}
  