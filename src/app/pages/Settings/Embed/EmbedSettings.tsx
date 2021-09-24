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
import { useTranslation } from 'react-i18next';

export const EmbedSettingsPage = (props: EmbedSettingsComponentProps) => {

    const defaultEmbedSettings: EmbedSettingsOptionType = {
        type:  'script',
        scaling:  'responsive',
        size: 0
    }
    const [inputOptions, setInputOptions] = React.useState<EmbedSettingsOptionType>(Object.keys(props.embedSettingsOption).length === 0  ? defaultEmbedSettings : props.embedSettingsOption);
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);
    const { t } = useTranslation()
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
            if (inputOptions.scaling=== 'fixed') {
                if (inputRef.current!.value.length === 0) {
                    return true;
                }
            }
            return false;
        }
    }
    
    return (
        <React.Fragment>
            <form>
                <Card>
                    <header><Text size={20} weight="med">{t('settings_embed_size_title')}</Text></header>
                    <br />
                    <div>
                        <Text size={14} weight="reg">
                            {t('settings_embed_size_description')}
                        </Text>
                    </div>
                    <br />
                    <div>
                        <InputRadio name="embed-size" value="responsive" label={t('settings_embed_size_responsive_title')} labelSize={16} labelWeight="med" onChange={() => setInputOptions({ ...inputOptions, scaling: "responsive" })} defaultChecked={inputOptions.scaling === "responsive"} />
                        <RadioText>
                            <Text size={14} weight="reg">
                                {t('settings_embed_size_responsive_description')}
                            </Text>
                        </RadioText>
                        <InputRadio name="embed-size" value="fixed" label={t('settings_embed_size_fixed_title')} labelSize={16} labelWeight="med" onChange={() => setInputOptions({ ...inputOptions, scaling: "fixed" })} defaultChecked={inputOptions.scaling === "fixed"} />
                        <RadioText>
                            <Text size={14} weight="reg">
                                {t('settings_embed_size_fixed_description')}
                            </Text>
                        </RadioText>
                        <WidthInput isDisplayed={inputOptions.scaling === 'fixed'} ref={inputRef} isError={checkInputError()} onChange={event => setInputOptions({ ...inputOptions, size: parseInt(event.currentTarget.value) })} defaultValue={inputOptions.size.toString()} id="width" label="Fixed Width (px)" type="number" help="How wide your embeds will be" />
                    </div>
                    <br />
                </Card>
                {
                    Object.entries(inputOptions).toString() === Object.entries(props.embedSettingsOption).toString() ? null :
                        <ButtonContainer>
                            <ButtonStyle disabled={inputOptions.scaling === 'fixed' && Number.isNaN(inputOptions.size) } isLoading={submitLoading} typeButton="primary" onClick={submitInputs}>{t('common_button_text_save')}</ButtonStyle>
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
