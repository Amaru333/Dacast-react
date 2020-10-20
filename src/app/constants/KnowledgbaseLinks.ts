export const getKnowledgebaseLink = (name: string) => {
    switch (name) {
        case 'OBS':
            return "https://www.dacast.com/support/knowledgebase/quick-start-with-live-streaming-obs-studio/"
        case 'Wirecast':
            return "https://www.dacast.com/support/knowledgebase/how-to-live-stream-with-wirecast/"
        case 'Upload':
            return "https://www.dacast.com/support/knowledgebase/video-guide-how-to-upload-videos-on-pc-mac/"
        case 'Embed':
            return "https://www.dacast.com/support/knowledgebase/how-can-i-embed-a-video-on-my-website/"
        case 'Theme':
            return "https://www.dacast.com/support/knowledgebase/how-to-create-a-player-theme-in-the-backoffice/"
        case 'Security':
            return "https://www.dacast.com/support/knowledgebase/how-to-set-up-my-security-preferences-with-the-new-back-office/"
        case 'Playlist':
            return "https://www.dacast.com/support/knowledgebase/video-guide-how-to-create-a-playlist-channel/"
        case 'Live':
            return "https://www.dacast.com/support/knowledgebase/quick-start-with-live-streaming-obs-studio/"
        case 'Data':
            return "https://www.dacast.com/support/knowledgebase/" //TBC
        case 'Group Price':
            return "https://www.dacast.com/support/knowledgebase/" //TBC
        case 'Group Promo':
            return "https://www.dacast.com/support/knowledgebase/" //TBC
        case 'Price Preset':
            return "https://www.dacast.com/support/knowledgebase/" //TBC
        case 'Promo Preset':
            return "https://www.dacast.com/support/knowledgebase/" //TBC
        case 'Paywall':
            return "https://www.dacast.com/support/knowledgebase/video-monetization-how-to-use-dacast-paywall/"
        case 'Encoding Recipes':
            return "https://www.dacast.com/support/knowledgebase/vod-renditions-bitrates/"
        case 'Ads':
            return "https://www.dacast.com/support/knowledgebase/can-i-use-local-ads-on-my-content/"
        case 'Encoder Setup':
            return "https://www.dacast.com/support/knowledgebase/live-encoder-configuration/"
        default:
            return "https://www.dacast.com/support/knowledgebase/"
    }
}