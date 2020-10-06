import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action } from '../../redux-flow/store/Content/General/actions';


export const Expo = (props: any) => {



    return (
        <>
            <h1>HEllo</h1>
        </>
    )
}

export function mapStateToProps(state: any) {
    return {
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expo);