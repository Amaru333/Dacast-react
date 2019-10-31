import { connect } from 'react-redux';
import { hideToast, showToastNotification } from '../redux-flow/store/toasts/actions';
import { ApplicationState } from "../redux-flow/store";
import { ToastType, Size, NotificationType } from '../components/Toast/ToastTypes';
import { ToastsComponent, ToastStateProps, DispatchToastProps } from '../components/Toast/Toasts';

const mapStateToProps = (state: ApplicationState): ToastStateProps => ({
    toasts: state.toasts.data
});

const mapDispatchToProps = (dispatch: any): DispatchToastProps => ({
    hideToast: (toast: ToastType) => dispatch(hideToast(toast)),
    showToast: (text: string, size: Size, notificationType: NotificationType) => dispatch(showToastNotification(text, size, notificationType))
});

export default connect<ToastStateProps, DispatchToastProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(ToastsComponent);