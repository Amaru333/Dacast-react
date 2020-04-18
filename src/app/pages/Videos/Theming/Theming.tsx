import React from 'react';
import { ThemingContainer, TitleSection, TextStyle, BorderStyle, PlayerSection, PlayerContainer, DisabledSection, ControlsCard } from '../../../shared/Theming/ThemingStyle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Text } from '../../../../components/Typography/Text';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../../components/FormsComponents/Input/InputRadio';
import { Toggle } from '../../../../components/Toggle/toggle';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { ColorPicker } from '../../../../components/ColorPicker/ColorPicker';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { VodThemingComponentProps } from '../../../containers/Videos/Theming';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { usePlayer } from '../../../utils/player';
import { Prompt } from 'react-router';
import { ThemingControlsCard } from '../../../shared/Theming/ThemingControlsCard';

export const VodThemingPage = (props: VodThemingComponentProps) => {
    
    
    const [selectedTheme, setSelectedTheme] = React.useState<ThemeOptions>(props.theme.selectedTheme);

    let playerRef = React.useRef<HTMLDivElement>(null);

    let player = usePlayer(playerRef, '104301_f_713989');

    const handleThemeSave = () => {
        if(selectedTheme.themeName === "Custom Theme") {
            let replacedCustomTheme = props.themeList.themes.splice(props.themeList.themes.length-1, 1, selectedTheme)
            props.setCustomThemeList(props.themeList.themes)
        } 
        props.saveVodTheme(selectedTheme)
    }

    

    return (
        <React.Fragment>
            <ThemingContainer>
                <div className='col col-12 md-col-4 mr2 flex flex-column'>
                    <ThemingControlsCard selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} contentType='vod' themeList={props.themeList} contentTheme={props.theme} />
                    <div className="mt25">
                        <Button onClick={() => handleThemeSave()}>Save</Button>
                        <Button typeButton="tertiary" onClick={() => location.href="/videos"}>Cancel</Button>
                    </div>
                </div>
                <PlayerSection className='col col-12 md-col-8 mr2'>
                    <PlayerContainer>
                        <div ref={playerRef}>
                        </div>
                    </PlayerContainer>
                </PlayerSection>
            </ThemingContainer>
            <Prompt when={selectedTheme !== props.theme.selectedTheme} message='' />
        </React.Fragment>
    )
}