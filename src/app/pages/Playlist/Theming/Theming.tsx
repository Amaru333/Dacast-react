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
import { PlaylistThemingComponentProps } from '../../../containers/Playlists/Theming';
import { usePlayer } from '../../../utils/player';
import { Prompt } from 'react-router';
import { ThemingControlsCard } from '../../../shared/Theming/ThemingControlsCard';

export const PlaylistThemingPage = (props: PlaylistThemingComponentProps) => {
    
    
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
        props.savePlaylistTheme(selectedTheme)
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
                    <ThemingControlsCard selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} contentType={'playlist'} themeList={props.themeList} contentTheme={props.theme} />
                    <div className="mt25">
                        <Button onClick={() => handleThemeSave()}>Save</Button>
                        <Button typeButton="tertiary" onClick={() => location.href="/videos"}>Cancel</Button>
                    </div>
                </div>
                
            </ThemingContainer>
            <Prompt when={selectedTheme !== props.theme.selectedTheme} message='' />
        </React.Fragment>
    )
}