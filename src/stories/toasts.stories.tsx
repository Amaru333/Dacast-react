import React from 'react';
import { connect } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { showToastNotification} from '../redux-flow/store/Toasts/actions';
import Home, { DispatchProps }from '../components/Toasts';
import {Size, NotificationType } from '../components/Toast/ToastTypes';


const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    showToast: (text: string, size: Size, notificationType: NotificationType) => dispatch(showToastNotification(text, size, notificationType)),
});

const HomeContainer = (connect<any, DispatchProps, {}>(
    null,
    mapDispatchToProps
)(Home));

storiesOf('Toasts', module)
    .add('Fixed Toasts', () => (
        <React.Fragment>
            <HomeContainer />
        </React.Fragment>
    ))  