import * as React from 'react'
import { Text } from '../../../../components/Typography/Text';
import { EmbedSettingsOptionType } from "../../../redux-flow/store/Settings/EmbedSettings";
import { Card } from '../../../../components/Card/Card';
import { InputRadio } from '../../../../components/FormsComponents/Input/InputRadio';
import styled, { css } from 'styled-components';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { InputProps } from '../../../../components/FormsComponents/Input/InputTypes';
import { EmbedSettingsComponentProps } from '../../../containers/Settings/EmbedSettings';
import { Prompt } from 'react-router';

export const EmbedSettingsPage = (props: EmbedSettingsComponentProps) => {

    const defaultEmbedSettings = {
        ['embed-type']:  'script',
        ['embed-scaling']:  'responsive',
        'embed-size': 0
    }
    const [inputOptions, setInputOptions] = React.useState<EmbedSettingsOptionType>(Object.keys((props.embedSettingsOption).length === 0 && props.embedSettingsOption.constructor === Object) ? defaultEmbedSettings : props.embedSettingsOption);
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

    let inputRef = React.useRef<HTMLInputElement>(null)

    const submitInputs = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSubmitLoading(true);
        props.saveEmbedSettingsOptions(inputOptions).then(() => {
            setSubmitLoading(false);
        }).catch(() => {
            setSubmitLoading(false);
        }) 
    }

    const checkInputError = () => {
        if (inputRef && inputRef.current) {
            if (inputOptions['embed-scaling'] === 'fixed') {
                if (inputRef.current!.value.length === 0) {
                    return true;
                }
            }
            return false;
        }
    }

    console.log(inputOptions);

    return (
        <React.Fragment>
            <form>
                <Card>
                    <header><Text size={20} weight="med">Embed Size</Text></header>
                    <br />
                    <div>
                        <Text size={14} weight="reg">
                            Choose how you wish to embed your videos.
                        </Text>
                    </div>
                    <br />
                    <div>
                        <InputRadio name="embed-size" value="responsive" label="Responsive (Recommended)" labelSize={16} labelWeight="med" onChange={() => setInputOptions({ ...inputOptions, ["embed-scaling"]: "responsive" })} defaultChecked={inputOptions["embed-scaling"] === "responsive"} />
                        <RadioText>
                            <Text size={14} weight="reg">
                                Your videos will automatically resize to fit their container.
                            </Text>
                        </RadioText>
                        <InputRadio name="embed-size" value="fixed" label="Fixed" labelSize={16} labelWeight="med" onChange={() => setInputOptions({ ...inputOptions, ["embed-scaling"]: "fixed" })} defaultChecked={inputOptions["embed-scaling"] === "fixed"} />
                        <RadioText>
                            <Text size={14} weight="reg">
                                Videos will default to a fixed width with their height determined automatically based on aspect ratio.
                            </Text>
                        </RadioText>
                        <WidthInput isDisplayed={inputOptions['embed-scaling'] === 'fixed'} ref={inputRef} isError={checkInputError()} onChange={event => setInputOptions({ ...inputOptions, ["embed-size"]: parseInt(event.currentTarget.value) })} defaultValue={inputOptions["embed-size"].toString()} id="width" label="Fixed Width (px)" type="number" help="How wide your embeds will be" />
                    </div>
                    <br />
                </Card>
                {
                    Object.entries(inputOptions).toString() === Object.entries(props.embedSettingsOption).toString() ? null :
                        <ButtonContainer>
                            <ButtonStyle disabled={inputOptions['embed-scaling'] === 'fixed' && inputOptions['embed-size'] === NaN} isLoading={submitLoading} typeButton="primary" onClick={submitInputs}>Save</ButtonStyle>
                            <ButtonStyle onClick={() => {setInputOptions(Object.keys(props.embedSettingsOption).length === 0 && props.embedSettingsOption.constructor === Object ? defaultEmbedSettings : props.embedSettingsOption)}} typeButton="tertiary">Discard</ButtonStyle>
                        </ButtonContainer>}
            </form>
            <Prompt when={Object.entries(inputOptions).toString() !== Object.entries(props.embedSettingsOption).toString() } message='' />
        </React.Fragment>

    )
}

const RadioText = styled.div`
    margin: 8px 24px 16px 24px;
`

const Divider = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    margin: 32px 0 24px 0;
`

const WidthInput = styled(Input) <{ isDisplayed: boolean } & InputProps>`
width: 25%;
min-width: 200px;
margin-left: 24px;
${props => !props.isDisplayed && css`
    display: none;
`}
`

export const ButtonContainer = styled.div`
margin-top: 24px;
`

export const ButtonStyle = styled(Button)`
margin-right: 16px;
margin-bottom: 63px;
`