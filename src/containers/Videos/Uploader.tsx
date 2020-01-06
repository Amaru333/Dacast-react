import { connect } from "react-redux";
import * as Redux from 'redux'

import { ApplicationState } from "../../redux-flow/store";
import React from 'react';
import { postVodDemo } from '../../redux-flow/store/VOD/General/actions';
import { UploaderPage } from '../../pages/Videos/Uploader/Uploader';

// export interface UploaderProps {
//     // Your props here
// }

export const Uploader = (props: { postVodDemo: Function }) => {

    return (
        <UploaderPage {...props}  />
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        //Return from global state to component props
    };
}

export function mapDispatchToProps(dispatch: Redux.Dispatch<any>) {
    return {
        postVodDemo: () => {
            dispatch(postVodDemo());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);