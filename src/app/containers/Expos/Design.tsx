import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { ExposTabs } from './ExposTabs';
import { ExpoDetails } from '../../redux-flow/store/Content/General/types';
import { ContentType } from '../../redux-flow/store/Common/types';
import { DesignPage } from '../../pages/Expos/Design';
import { Action, getContentThemeAction, saveContentThemeAction } from '../../redux-flow/store/Content/Theming/actions';
import { ContentThemeState, ThemeOptions } from '../../redux-flow/store/Settings/Theming';

export interface DesignComponentProps {
    themeState: ContentThemeState;
    getContentTheme: (contentId: string, contentType: ContentType) => Promise<void>
    saveContentTheme: (theme: ThemeOptions, contentId: string, contentType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const DesignExpos = (props: DesignComponentProps) => {

    let { exposId } = useParams<{exposId: string}>()

    const [stateContentDetails, setStateContentDetails] = React.useState<ExpoDetails>(null)
    const [contentDetails, setContentDetails] = React.useState<ExpoDetails>(stateContentDetails)

    React.useEffect(() => {
        //props.getContentTheme(exposId, 'expo');
    }, [])

    const handleSave = () => {
        //props.saveContentTheme(contentDetails, "expo").then(() => { }).catch(() => {})
    }

    return (
        <>
            <ExposTabs exposId={exposId} />
            {props.themeState['expos'] && props.themeState['expos'][exposId] ?
                (
                    <DesignPage designState={props.themeState['expos'][exposId]} />          
                )
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        themeState: state.content.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        getContentTheme: async (contentId: string, contentType: string) => {
            await dispatch(getContentThemeAction(contentId, contentType))
        },
        saveContentTheme: async (theme: ThemeOptions, contentId: string, contentType: string) => {
            await dispatch(saveContentThemeAction(theme, contentId, contentType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignExpos);