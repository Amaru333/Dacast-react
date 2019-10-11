import { connect } from 'react-redux';
import { hideToast } from '../redux-flow/store/toasts/actions';
import { ApplicationState } from "../redux-flow/store";
import { ToastType } from '../components/Toast/ToastTypes';
import { ToastsComponent, StateProps, DispatchProps } from '../components/Toast/Toasts';

const mapStateToProps = (state: ApplicationState): StateProps => ({
    toasts: state.toasts.data
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  hideToast: (toast: ToastType) => dispatch(hideToast(toast))
});

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(ToastsComponent);