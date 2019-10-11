import * as React from 'react';
import Toasts from '../containers/Toasts';
import {Size, NotificationType } from '../components/Toast/ToastTypes'

export interface DispatchProps {
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const Home = (props: DispatchProps) => {
    const { showToast } = props;
    return (
        <div className="home-container">
            <button onClick={ () => showToast('Too bad.', 'fixed', 'error') }>Show Error Toast</button>
            <button onClick={ () => showToast('This was a triumph.', 'fixed', 'success') }>Show Success Toast</button>
            <button onClick={ () => showToast('Warning.', 'fixed', 'warning') }>Show Warning Toast</button>
            <button onClick={ () => showToast('Information.', 'fixed', 'information') }>Show Info Toast</button>
            <button onClick={ () => showToast('An other toast.', 'flexible', 'other') }>Show Other Toast</button>
            <Toasts />
        </div>
    );
};

export default Home;