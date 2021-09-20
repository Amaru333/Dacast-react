enum Stages {
    Staging = 'staging',
    Production = 'prod'
}

let stage: Stages
const DevKeywords = ['singularity']
if (DevKeywords.some(keyword => process.env.API_BASE_URL.indexOf(keyword) !== -1)) {
    stage = Stages.Staging
} else {
    stage = Stages.Production
}

process.env.BASE_IFRAME_URL = stage === Stages.Production ? 'iframe.dacast.com' : 'iframe-dev.dacast.com'

const STAGE = stage

export const isProduction = () => {
    return STAGE === Stages.Production
}

export const isStaging = () => {
    return STAGE === Stages.Staging
}
