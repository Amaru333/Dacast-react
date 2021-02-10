import { isProduction } from '../player/stage';

declare global {
    interface Window { analytics: any; ga: any; }
}

type IdentifyParam = {userId: string} & {[key: string]: string}

const identify = (data: IdentifyParam) => {
    let properties: {[key: string]: string} = {
        'first_name': data.firstName,
        'last_name': data.lastName,
        email: data.email,
        company: data.companyName,
    }

    if (data.label) {
        properties.label = data.label
    }

    if (data.value) {
        properties.value = data.value
    }

    window.analytics.identify(
        data.userId, 
        properties,
        {
            'All': true,
            'Google Analytics': true
        }
    )
}

const load = () => {
    window.analytics.load(isProduction() ? 'pyuOKnjfqaObRPBU1Q7Kf9eZ1ZPEHyxs' : 'i6XyHA38sV8B2ubXArU6wTkO4WlhXN29');
    window.analytics.ready(function () {
        window.ga('require', 'linker');
        window.ga('linker:autoLink', ['dacast.com']);
    });

}
const page = (name: string) => {
    window.analytics.page(name);

}
const track = (name: string, properties: any) => {
    window.analytics.track(
        name, 
        properties,
        {
            'Google Analytics': {
                'ClientId': formatGaCookie()
            }
        }
    );
}

export function formatGaCookie() {
    let gaCookie: string = getCookie('_ga')[0]

    gaCookie = gaCookie.substr(6)
    return gaCookie
}

export function getCookie(cname: string) {
    var name = cname + "=";
    let test: string[] = []
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        test.push(c.substring(name.length, c.length))
      }
    }
    return test;
  }

export const segmentService = {
    identify,
    load,
    page,
    track
}

