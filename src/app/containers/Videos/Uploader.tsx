import { connect } from "react-redux";
import * as Redux from 'redux'

import { ApplicationState } from "../../redux-flow/store";
import React from 'react';
import { UploaderPage } from '../../pages/Videos/Uploader/Uploader';
import { EncodingRecipesData, getEncodingRecipesAction } from '../../redux-flow/store/Settings/EncodingRecipes';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface UploaderProps {
    encodingRecipe: EncodingRecipesData;
    getEncodingRecipe: () => Promise<void>;
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
        getEncodingRecipe: async () => {
            await dispatch(getEncodingRecipesAction());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);