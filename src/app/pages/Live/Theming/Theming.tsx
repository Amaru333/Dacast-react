import React from 'react';
import { ThemingContainer, ControlsCard, TitleSection, DisabledSection, TextStyle, BorderStyle, PlayerSection, PlayerContainer } from '../../../shared/Theming/ThemingStyle';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../../components/FormsComponents/Input/InputRadio';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { Toggle } from '../../../../components/Toggle/toggle';
import { ColorPicker } from '../../../../components/ColorPicker/ColorPicker';
import { LiveThemingComponentProps } from '../../../containers/Live/Theming';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { usePlayer } from '../../../utils/player';
import { Prompt } from 'react-router';
import { ThemingControlsCard } from '../../../shared/Theming/ThemingControlsCard';

export const LiveThemingPage = (props: LiveThemingComponentProps) => {

    const [selectedTheme, setSelectedTheme] = React.useState<ThemeOptions>(props.theme.selectedTheme);
    const [showAdvancedPanel, setShowAdvancedPanel] = React.useState<boolean>(false);

    const togglePadding = 'py1';

    let playerRef = React.useRef<HTMLDivElement>(null);
    

    let player = usePlayer(playerRef, '1552_f_297509');

    const handleThemeSave = () => {
        if(selectedTheme.themeName === "Custom Theme") {
            let replacedCustomTheme = props.themeList.themes.splice(props.themeList.themes.length-1, 1, selectedTheme)
            props.setCustomThemeList(props.themeList.themes)
        } 
        props.saveLiveTheme(selectedTheme)
    }

    return (
        <React.Fragment>
            <ThemingContainer>
                <PlayerSection className='xs-mb2 col col-right col-12 md-col-8  sm-pl1'>
                    <PlayerContainer>
                        <div ref={playerRef}>
                        </div>
                    </PlayerContainer>
                </PlayerSection>
                <div className='col col-12 md-col-4 sm-pr1 flex flex-column'>
                    <ThemingControlsCard selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} contentType='live' themeList={props.themeList} contentTheme={props.theme} />
                    <div className="mt25">
                        <Button onClick={() => handleThemeSave()}>Save</Button>
                        <Button typeButton="tertiary" onClick={() => {location.href="/livestreams";props.showDiscardToast("Changes have been discarded", 'flexible', "success")}}>Cancel</Button>
                    </div>
                </div>
            </ThemingContainer>
            <Prompt when={selectedTheme !== props.theme.selectedTheme} message='' />
        </React.Fragment>
    )
}