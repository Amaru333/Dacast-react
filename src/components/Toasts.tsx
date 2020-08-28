import * as React from 'react';
import {Size, NotificationType } from '../components/Toast/ToastTypes'
import Toasts from '../app/containers/Others/Toasts';
import { Button } from './FormsComponents/Button/Button';

export interface DispatchProps {
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const Home = (props: DispatchProps) => {
    const { showToast } = props;
    return (
        <div className="home-container">
            <Button buttonColor='blue'sizeButton="small" typeButton="primary" className="m1"  onClick={ () => showToast('Too bad.', 'fixed', 'error') }>Show Error Toast</Button>
            <Button buttonColor='blue'sizeButton="small" typeButton="primary" className="m1"  onClick={ () => showToast('This was a triumph.', 'fixed', 'success') }>Show Success Toast</Button>
            <Button buttonColor='blue'sizeButton="small" typeButton="primary" className="m1"  onClick={ () => showToast('Warning.', 'fixed', 'warning') }>Show Warning Toast</Button>
            <Button buttonColor='blue'sizeButton="small" typeButton="primary" className="m1"  onClick={ () => showToast('Information.', 'fixed', 'information') }>Show Info Toast</Button>
            <Button buttonColor='blue'sizeButton="small" typeButton="primary" className="m1"  onClick={ () => showToast('An other toast.', 'flexible', 'other') }>Show Other Toast</Button>
            <Toasts />
        </div>
    );
};

export default Home;