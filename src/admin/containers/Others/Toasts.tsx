import { connect } from 'react-redux';
import { hideToast, showToastNotification, ToastAction } from '../../redux-flow/store/Toasts/actions';
import { AdminState } from "../../redux-flow/store";
import { ToastType, Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { ToastsComponent, ToastStateProps, DispatchToastProps } from '../../../components/Toast/Toasts';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: AdminState): ToastStateProps => ({
    toasts: state.toasts.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AdminState, void, ToastAction>) => ({
    hideToast: (toast: ToastType) => dispatch(hideToast(toast)),
    showToast: (text: string, size: Size, notificationType: NotificationType) => dispatch(showToastNotification(text, size, notificationType))
});

export default connect<ToastStateProps, DispatchToastProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(ToastsComponent);