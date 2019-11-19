import * as React from 'react'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Text } from '../../components/Typography/Text';
import { ApplicationState } from "../../redux-flow/store";
import { Action, DeliveryAndEmbedOptionType, getDeliveryAndEmbedOptionsAction, saveDeliveryAndEmbedOptionsAction } from "../../redux-flow/store/Settings";
import { Card } from '../../components/Card/Card';
import { InputRadio } from '../../components/FormsComponents/Input/InputRadio';
import styled, { css } from 'styled-components';
import { Input } from '../../components/FormsComponents/Input/Input';
import { Button } from '../../components/FormsComponents/Button/Button';
import { InputProps } from '../../components/FormsComponents/Input/InputTypes';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

interface DeliveryAndEmbedComponentProps {
    deliveryAndEmbedOption: DeliveryAndEmbedOptionType;
    getDeliveryAndEmbedOptions: Function;
    saveDeliveryAndEmbedOptions: Function;
}

const DeliveryAndEmbed = (props: DeliveryAndEmbedComponentProps) => {

    const [inputOptions, setInputOptions] = React.useState({});
    let inputRef = React.useRef<HTMLInputElement>(null)
    React.useEffect(() => {
        props.getDeliveryAndEmbedOptions();
    }, [])

    const submitInputs = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        props.saveDeliveryAndEmbedOptions(inputOptions)
    }

    const checkInputError = () => {
        if(inputOptions['embed-size'] === 'fixed') {
            if(inputRef.current!.value.length === 0) {
                return true;
            }
        }
        return false;
    }

    return (
        !props.deliveryAndEmbedOption ? 
            <LoadingSpinner size='large' color='blue80' />
            :
            <React.Fragment>
                <form>
                    <Card>
                        <header><Text size={20} weight="med">Delivery and Embed</Text></header>
                        <br/>
                        <div>
                            <Text size={14} weight="reg">
                            Dacast gives you complete control over the delivery method of your videos. Choose settings that are right for the type of content you have.
                            </Text>
                        </div>
                        <br/>
                        <div>
                            <InputRadio name="delivery" value="compatible-delivery" label="Compatible Delivery" onChange={() => setInputOptions({...inputOptions, ["delivery"]: "compatible-delivery"})} defaultChecked={props.deliveryAndEmbedOption["delivery"] === "compatible-delivery"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                HTML5 player with HLS (HTTP Streaming) prioritizing playback compatibility over security. Ideal for serving content with advertising.
                                </Text>
                            </RadioText>
                            <InputRadio name="delivery" value="secure-delivery" label="Secure Delivery" onChange={() => setInputOptions({...inputOptions, ["delivery"]: "secure-delivery"})} defaultChecked={props.deliveryAndEmbedOption["delivery"] === "secure-delivery"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                HTML5 player with AES Encryption, prioritizing security over compatibility. Requires iframe embeds and is ideal for high-value content.
                                </Text>
                            </RadioText>
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
                            <InputRadio name="region-settings" value="standard-pops" label="Standard PoPs" onChange={() => setInputOptions({...inputOptions, ["region-settings"]: "standard-pops"})} defaultChecked={props.deliveryAndEmbedOption["region-settings"] === "standard-pops"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                High speed CDN with servers located across 6 different continents. Your video content streams from the the server closest to the viewer.
                                </Text>
                            </RadioText>
                            <InputRadio name="region-settings" value="premium-pops" label="Premium PoPs" onChange={() => setInputOptions({...inputOptions, ["delivery"]: "premium-pops"})} defaultChecked={props.deliveryAndEmbedOption["region-settings"] === "premium-pops"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                Everything that is included with Standard PoPs PLUS Beijing & Shanghai servers for viewers in China. Video will be streamed via HTTP progressive delivery.
                                </Text>
                            </RadioText>
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
                            <InputRadio name="embed-settings" value="iframe" label="IFrame (Recommended)" onChange={() => setInputOptions({...inputOptions, ["embed-settings"]: "iframe"})} defaultChecked={props.deliveryAndEmbedOption["embed-settings"] === "iframe"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                TThe embed code includes all Dacast features such as security, analytics & customization. Your embedded videos dynamically update whenever you change your settings.
                                </Text>
                            </RadioText>
                            <InputRadio name="embed-settings" value="html5-video" label="HTML5 Video" onChange={() => setInputOptions({...inputOptions, ["embed-settings"]: "html5-video"})} defaultChecked={props.deliveryAndEmbedOption["embed-settings"] === "html5-video"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                The most lightweight way to embed your video. Does not include all Dacast features & will not count video views. Only use if your CMS does not accept iframes.
                                </Text>
                            </RadioText>
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
                            <InputRadio name="embed-protocol" value="https" label="HTTPS (Recommended)" onChange={() => setInputOptions({...inputOptions, ["embed-protocol"]: "https"})} defaultChecked={props.deliveryAndEmbedOption["embed-protocol"] === "https"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                Always use HTTP over SSL — this is the most secure setting and is what we'd most recommend.
                                </Text>
                            </RadioText>
                            <InputRadio name="embed-protocol" value="relative" label="Relative" onChange={() => setInputOptions({...inputOptions, ["embed-protocol"]: "relative"})} defaultChecked={props.deliveryAndEmbedOption["embed-protocol"] === "relative"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                Embeds will be protocol-relative and will use the same protocol as the page on which they're embedded.
                                </Text>
                            </RadioText>
                            <InputRadio name="embed-protocol" value="http" label="HTTP" onChange={() => setInputOptions({...inputOptions, ["embed-protocol"]: "http"})} defaultChecked={props.deliveryAndEmbedOption["embed-protocol"] === "HTTP"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                If for any reason you need your embeds to always use plain HTTP then use this option, although we recommend against it.
                                </Text>
                            </RadioText>
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
                            <InputRadio name="embed-size" value="responsive" label="Responsive (Recommended)" onChange={() => setInputOptions({...inputOptions, ["embed-size"]: "responsive"})} defaultChecked={props.deliveryAndEmbedOption["embed-size"] === "responsive"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                Your videos will automatically resize to fit their container.
                                </Text>
                            </RadioText>
                            <InputRadio name="embed-size" value="fixed" label="Fixed" onChange={() => setInputOptions({...inputOptions, ["embed-size"]: "fixed"})} defaultChecked={props.deliveryAndEmbedOption["embed-size"] === "fixed"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                Videos will default to a fixed width with their height determined automatically based on aspect ratio.
                                </Text>
                            </RadioText>
                            <WidthInput  isDisplayed={inputOptions['embed-size'] === 'fixed'} ref={inputRef} isError={checkInputError()} onChange={event => setInputOptions({...inputOptions, ["embed-width"]: event.currentTarget.value})} defaultValue="640" id="width" label="Fixed Width (px)" type="number" help="How wide your embeds will be" />
                        </div>
                        <br/>
                    </Card>
                    <ButtonContainer>
                        <ButtonStyle typeButton="primary" onClick={submitInputs}>Save</ButtonStyle>
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
        },
        saveDeliveryAndEmbedOptions: (data: DeliveryAndEmbedOptionType) => {
            dispatch(saveDeliveryAndEmbedOptionsAction(data))
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

const WidthInput = styled(Input)<{isDisplayed: boolean} & InputProps>`
width: 25%;
min-width: 200px;
margin-left: 24px;
${props => !props.isDisplayed && css`
    display: none;
`}
`

const ButtonContainer = styled.div`
margin-top: 24px;
`

const ButtonStyle = styled(Button)`
margin-right: 16px;
margin-bottom: 63px;
`