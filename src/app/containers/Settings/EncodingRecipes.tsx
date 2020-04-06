import * as React from 'react'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getEncodingRecipesAction, createEncodingRecipesAction, saveEncodingRecipesAction, deleteEncodingRecipesAction, uploadWatermark, deleteWatermark, getUploadWatermarkUrl } from '../../redux-flow/store/Settings/EncodingRecipes/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { EncodingRecipesData, EncodingRecipeItem } from '../../redux-flow/store/Settings/EncodingRecipes';
import { EncodingRecipesComponentProps, EncodingRecipesPage } from '../../pages/Settings/EncodingRecipes/EncodingRecipes';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


const EncodingRecipes = (props: EncodingRecipesComponentProps) => {

    React.useEffect(() => {
        if( !props.encodingRecipeData) {
            props.getEncodingRecipes();
        }
    }, [])


    return (
        !props.encodingRecipeData ?
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
        createEncodingRecipe: (data: EncodingRecipeItem) => {
            dispatch(createEncodingRecipesAction(data))
        },
        saveEncodingRecipe: (data: EncodingRecipeItem) => {
            dispatch(saveEncodingRecipesAction(data))
        },
        deleteEncodingRecipe: (data: EncodingRecipeItem) => {
            dispatch(deleteEncodingRecipesAction(data))
        },
        getWatermarkUrlForUploading: () => {
            dispatch(getUploadWatermarkUrl());
        },
        uploadCompanyLogo: (data: File, uploadWatermarkUrl: string) => {
            dispatch(uploadWatermark(data, uploadWatermarkUrl));
        },
        deleteCompanyLogo: () => {
            dispatch(deleteWatermark());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EncodingRecipes)