import * as React from 'react'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Text } from '../../Typography/Text';
import { ApplicationState } from "../../../redux-flow/store";
import { Action, EmbedSettingsOptionType, getEmbedSettingsOptionsAction, saveEmbedSettingsOptionsAction } from "../../../redux-flow/store/Settings/EmbedSettings";
import { Card } from '../../Card/Card';
import { InputRadio } from '../../FormsComponents/Input/InputRadio';
import styled, { css } from 'styled-components';
import { Input } from '../../FormsComponents/Input/Input';
import { Button } from '../../FormsComponents/Button/Button';
import { InputProps } from '../../FormsComponents/Input/InputTypes';
import { LoadingSpinner } from '../../FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

interface EmbedSettingsComponentProps {
    embedSettingsOption: EmbedSettingsOptionType;
    getEmbedSettingsOptions: Function;
    saveEmbedSettingsOptions: Function;
}

const EmbedSettings = (props: EmbedSettingsComponentProps) => {

    const [inputOptions, setInputOptions] = React.useState<EmbedSettingsOptionType>({});
    let inputRef = React.useRef<HTMLInputElement>(null)
    React.useEffect(() => {
        props.getEmbedSettingsOptions();
    }, [])

    const submitInputs = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        props.saveEmbedSettingsOptions(inputOptions)
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
        !props.embedSettingsOption ? 
            <LoadingSpinner size='large' color='blue80' />
            :
            <React.Fragment>
                <form>
                    <Card>
                        <header><Text size={20} weight="med">Embed Settings</Text></header>
                        <br/>
                        <div>
                            <Text size={14} weight="reg">
                            Choose how you wish to embed your videos.
                            </Text>
                        </div>
                        <br/>
                        <div>
                            <InputRadio name="embed-settings" value="iframe" label="IFrame (Recommended)" labelSize={16} labelWeight="med" onChange={() => setInputOptions({...inputOptions, ["embed-settings"]: "iframe"})} defaultChecked={props.embedSettingsOption["embed-settings"] === "iframe"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                The embed code includes all Dacast features such as security, analytics & customization. Your embedded videos dynamically update whenever you change your settings.
                                </Text>
                            </RadioText>
                            <InputRadio name="embed-settings" value="html5-video" label="HTML5 Video" labelSize={16} labelWeight="med" onChange={() => setInputOptions({...inputOptions, ["embed-settings"]: "html5-video"})} defaultChecked={props.embedSettingsOption["embed-settings"] === "html5-video"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                The most lightweight way to embed your video. Does not include all Dacast features & will not count video views. Only use if your CMS does not accept iframes.
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
                            <InputRadio name="embed-size" value="responsive" label="Responsive (Recommended)" labelSize={16} labelWeight="med" onChange={() => setInputOptions({...inputOptions, ["embed-size"]: "responsive"})} defaultChecked={props.embedSettingsOption["embed-size"] === "responsive"} />
                            <RadioText>
                                <Text size={14} weight="reg">
                                Your videos will automatically resize to fit their container.
                                </Text>
                            </RadioText>
                            <InputRadio name="embed-size" value="fixed" label="Fixed" labelSize={16} labelWeight="med" onChange={() => setInputOptions({...inputOptions, ["embed-size"]: "fixed"})} defaultChecked={props.embedSettingsOption["embed-size"] === "fixed"} />
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
        embedSettingsOption: state.settings.embedSettings
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getEmbedSettingsOptions: () => {
            dispatch(getEmbedSettingsOptionsAction());
        },
        saveEmbedSettingsOptions: (data: EmbedSettingsOptionType) => {
            dispatch(saveEmbedSettingsOptionsAction(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmbedSettings);

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