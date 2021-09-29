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
            return "https://www.dacast.com/support/knowledgebase/monetize-video-how-to-create-a-price-and-promo-code-on-dacast/#anchor_3"
        case 'Group Promo':
            return "https://www.dacast.com/support/knowledgebase/monetize-video-how-to-create-a-price-and-promo-code-on-dacast/#anchor_4"
        case 'Price Preset':
            return "https://www.dacast.com/support/knowledgebase/monetize-video-how-to-create-a-price-and-promo-code-on-dacast/#anchor_1"
        case 'Promo Preset':
            return "https://www.dacast.com/support/knowledgebase/monetize-video-how-to-create-a-price-and-promo-code-on-dacast/#anchor_2"
        case 'PaywallTheme':
            return "https://www.dacast.com/support/knowledgebase/monetize-video-how-to-create-a-price-and-promo-code-on-dacast/#anchor_5"
        case 'Encoding Recipes':
            return "https://www.dacast.com/support/knowledgebase/vod-renditions-bitrates/"
        case 'Ads':
            return "https://www.dacast.com/support/knowledgebase/can-i-use-local-ads-on-my-content/"
        case 'Encoder Setup':
            return "https://www.dacast.com/support/knowledgebase/live-encoder-configuration/"
        case 'Generic RTMP Encoder':
            return "https://www.dacast.com/support/knowledgebase/walkthrough-encoder-setup-guide/"
        case "OBS Open Broadcaster Software":
            return "https://www.dacast.com/support/knowledgebase/video-guide-how-to-start-live-streaming-using-dacast-obs-studio/"
        case "Sling Studio":
            return "https://www.dacast.com/support/knowledgebase/slingstudio-encoder-software/"
        case "Telestream Wirecast":
            return "https://www.dacast.com/support/knowledgebase/how-to-live-stream-with-wirecast/"
        case "Teradek":
            return "https://www.dacast.com/support/knowledgebase/what-profile-should-i-set-in-teradek-encoders-for-the-html5/"
        case "Vid Blaster":
            return "https://www.dacast.com/support/knowledgebase/how-do-i-stream-using-vidblasterx/"
        case "vMix":
            return "https://www.dacast.com/support/knowledgebase/video-guide-how-to-live-stream-with-vmix/"
        case "withdrawals":
            return "https://www.dacast.com/support/knowledgebase/how-can-i-make-a-payment-request-in-the-new-back-office/"
        default:
            return "https://www.dacast.com/support/knowledgebase/"
    }
}