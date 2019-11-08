import * as React from 'react'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Text } from '../../components/Typography/Text';
import { ApplicationState } from "../../redux-flow/store";
import { Action, DeliveryAndEmbedOptionType, getDeliveryAndEmbedOptionsAction } from "../../redux-flow/store/Settings";
import { Card } from '../../components/Card/Card';
import { InputRadio } from '../../components/FormsComponents/Input/InputRadio';
import styled from 'styled-components';
import { Input } from '../../components/FormsComponents/Input/Input';
import { Button } from '../../components/FormsComponents/Button/Button';

interface DeliveryAndEmbedComponentProps {
    deliveryAndEmbedOption: DeliveryAndEmbedOptionType;
    getDeliveryAndEmbedOptions: Function;
}



const DeliveryAndEmbed = (props: DeliveryAndEmbedComponentProps) => {

    React.useEffect(() => {
        props.getDeliveryAndEmbedOptions();
     }, [])

     
    return (
        <React.Fragment>
        <form action="">
        <Card>
            <header><Text size={20} weight="med">Delivery and Embed</Text></header>
            <br/>
            <div>
                <Text size={14} weight="reg">
                Dacast gives you complete control over the delivery method of your videos. Choose the setting that's right for the type of content you have.
                </Text>
            </div>
            <br/>
            <div>
                <InputRadio name="delivery" value="compatible-delivery" label="Compatible Delivery" />
                <RadioText>
                    <Text size={14} weight="reg">
                        HTML5 Player via HLS (HTTP Streaming). Defaults to Flash player where necessary. Prioritizes playback compatibility over security. Ideal for ad-serving.
                    </Text>
                </RadioText>
                <InputRadio name="delivery" value="secure-delivery" label="Secure Delivery" />
                <RadioText><Text size={14} weight="reg">
                HTML5 Player with AES Encryption. The most secure option, all videos will play with encryption. Videos can only be delivered via the Dacast player using our iframe embed.
                </Text></RadioText>
            </div>
            <Divider />
            <header><Text size={20} weight="med">Region Settings</Text></header>
            <br/>
            <div>
                <Text size={14} weight="reg">
                Select the PoPs that will cover the countries where your videos will be played.
                </Text>
            </div>
            <br/>
            <div>
                <InputRadio name="region-settings" value="standard-pops" label="Standard PoPs" />
                <RadioText>
                    <Text size={14} weight="reg">
                    High speed CDN with servers located across 6 different continents. Your video content streams from the the server closest to the viewer.
                    </Text>
                </RadioText>
                <InputRadio name="region-settings" value="premium-pops" label="Premium PoPs" />
                <RadioText><Text size={14} weight="reg">
                Everything that is included with Standard PoPs PLUS Beijing & Shanghai servers for viewers in China. Video will be streamed via HTTP progressive delivery.
                </Text></RadioText>
            </div>
            <Divider />
            <header><Text size={20} weight="med">Embed Settings</Text></header>
            <br/>
            <div>
                <Text size={14} weight="reg">
                Choose how you wish to embed your videos.
                </Text>
            </div>
            <br/>
            <div>
                <InputRadio name="embed-settings" value="iframe" label="IFrame (Recommended)" />
                <RadioText>
                    <Text size={14} weight="reg">
                    The embed code includes all vzaar features such as security, analytics & customization. Your embedded videos dynamically update whenever you change your settings.
                    </Text>
                </RadioText>
                <InputRadio name="embed-settings" value="html5-video" label="HTML5 Video" />
                <RadioText><Text size={14} weight="reg">
                The most lightweight way to embed your video. Does not include all vzaar features & will not count video views. Only use if your CMS does not accept iframes or if you are an eBay user.
                </Text></RadioText>
            </div>
            <Divider />
            <header><Text size={20} weight="med">Embed Protocol</Text></header>
            <br/>
            <div>
                <Text size={14} weight="reg">
                Choose how you wish to embed your videos.
                </Text>
            </div>
            <br/>
            <div>
                <InputRadio name="embed-protocol" value="https" label="HTTPS (Recommended)" />
                <RadioText>
                    <Text size={14} weight="reg">
                    Always use HTTP over SSL — this is the most secure setting and is what we'd most recommend.ally update whenever you change your settings.
                    </Text>
                </RadioText>
                <InputRadio name="embed-protocol" value="relative" label="Relative" />
                <RadioText><Text size={14} weight="reg">
                Embeds will be protocol-relative and will use the same protocol as the page on which they're embedded.
                </Text></RadioText>
                <InputRadio name="embed-protocol" value="http" label="HTTP" />
                <RadioText><Text size={14} weight="reg">
                If for any reason you need your embeds to always use plain HTTP then use this option, although we recommend against it.
                </Text></RadioText>
            </div>
            <Divider />
            <header><Text size={20} weight="med">Embed Size</Text></header>
            <br/>
            <div>
                <Text size={14} weight="reg">
                Choose how you wish to embed your videos.
                </Text>
            </div>
            <br/>
            <div>
                <InputRadio name="embed-size" value="responsive" label="Responsive (Recommended)" />
                <RadioText>
                    <Text size={14} weight="reg">
                    Your embed codes will default to responding to the size of their container.
                    </Text>
                </RadioText>
                <InputRadio name="embed-size" value="fixed" label="Fixed" />
                <RadioText><Text size={14} weight="reg">
                Videos will default to a fixed width.
                </Text></RadioText>
                <WidthInput  label="Fixed Width" help="How wide your embeds will be" />
            </div>
            <br/>
            
        </Card>
        <ButtonContainer>
            <ButtonStyle typeButton="primary">Save</ButtonStyle>
            <ButtonStyle typeButton="secondary">Cancel</ButtonStyle>
        </ButtonContainer>
        </form>
       
        
        
        </React.Fragment>

    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        deliveryAndEmbedOption: state.settings.data
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getDeliveryAndEmbedOptions: () => {
            dispatch(getDeliveryAndEmbedOptionsAction());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAndEmbed);

const RadioText = styled.div`
    margin: 8px 24px 16px 24px;
`

const Divider = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    margin: 32px 24px 24px 24px;
`

const WidthInput = styled(Input)`
width: 25%;
min-width: 200px;
`

const ButtonContainer = styled.div`
margin-top: 24px;
`

const ButtonStyle = styled(Button)`
margin-right: 16px;
margin-bottom: 63px;
`