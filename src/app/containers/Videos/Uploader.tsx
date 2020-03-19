import { connect } from "react-redux";
import * as Redux from 'redux'

import { ApplicationState } from "../../redux-flow/store";
import React, { useEffect } from 'react';
import { postVodDemo } from '../../redux-flow/store/VOD/General/actions';
import { UploaderPage } from '../../pages/Videos/Uploader/Uploader';
import { EncodingRecipesData, getEncodingRecipesAction } from '../../redux-flow/store/Settings/EncodingRecipes';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface UploaderProps {
    encodingRecipe: EncodingRecipesData;
    getEncodingRecipe: Function;
    postVodDemo: Function;
}

const Uploader = (props: UploaderProps) => {

    React.useEffect(() => {
        if(!props.encodingRecipe) {
            props.getEncodingRecipe();
        }
    }, [])

    
    return (
        props.encodingRecipe ?
            (
                <UploaderPage {...props}  />
            )
            :
            <SpinnerContainer> <LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
        
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        encodingRecipe: state.settings.encodingRecipes
    };
}

export function mapDispatchToProps(dispatch: Redux.Dispatch<any>) {
    return {
        postVodDemo: () => {
            dispatch(postVodDemo());
        },
        getEncodingRecipe: () => {
            dispatch(getEncodingRecipesAction());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);