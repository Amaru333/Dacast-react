import * as React from 'react'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getEncodingRecipesAction, createEncodingRecipesAction, saveEncodingRecipesAction, deleteEncodingRecipesAction, uploadWatermark, deleteWatermark, getUploadWatermarkUrl, getEncodingRecipesPresetsAction } from '../../redux-flow/store/Settings/EncodingRecipes/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { EncodingRecipesData, EncodingRecipeItem } from '../../redux-flow/store/Settings/EncodingRecipes';
import { EncodingRecipesComponentProps, EncodingRecipesPage } from '../../pages/Settings/EncodingRecipes/EncodingRecipes';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


const EncodingRecipes = (props: EncodingRecipesComponentProps) => {

    React.useEffect(() => {
        if( !props.encodingRecipeData.recipes) {
            props.getEncodingRecipes();
        }
        if(!props.encodingRecipeData.defaultRecipePresets) {
            props.getEncodingRecipesPresets()
        }
    }, [])


    return (
        !props.encodingRecipeData.defaultRecipePresets || !props.encodingRecipeData.recipes ?
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
            :
            <EncodingRecipesPage {...props} />
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        encodingRecipeData: state.settings.encodingRecipes
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getEncodingRecipes: () => {
            dispatch(getEncodingRecipesAction());
        },
        getEncodingRecipesPresets: () => {
            dispatch(getEncodingRecipesPresetsAction());
        },
        createEncodingRecipe: (data: EncodingRecipeItem, callback?: Function) => {
            dispatch(createEncodingRecipesAction(data)).then(callback);
        },
        saveEncodingRecipe: (data: EncodingRecipeItem, callback?: Function) => {
            dispatch(saveEncodingRecipesAction(data)).then(callback);
        },
        deleteEncodingRecipe: (data: EncodingRecipeItem) => {
            dispatch(deleteEncodingRecipesAction(data))
        },
        getWatermarkUrlForUploading: () => {
            dispatch(getUploadWatermarkUrl());
        },
        uploadWatermark: (data: File, uploadWatermarkUrl: string, callback?: Function) => {
            dispatch(uploadWatermark(data, uploadWatermarkUrl)).then(callback);
        },
        deleteWatermark: (data: EncodingRecipeItem) => {
            dispatch(deleteWatermark(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EncodingRecipes)