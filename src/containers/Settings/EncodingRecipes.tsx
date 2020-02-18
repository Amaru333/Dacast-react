import * as React from 'react'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getEncodingRecipesAction, createEncodingRecipesAction, saveEncodingRecipesAction, deleteEncodingRecipesAction } from '../../redux-flow/store/Settings/EncodingRecipes/actions';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { EncodingRecipesData, EncodingRecipeItem } from '../../redux-flow/store/Settings/EncodingRecipes';
import { EncodingRecipesComponentProps, EncodingRecipesPage } from '../../pages/Settings/EncodingRecipes/EncodingRecipes';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


const EncodingRecipes = (props: EncodingRecipesComponentProps) => {

    React.useEffect(() => {
        if( !props.encodingRecipeData) {
            props.getEncodingRecipes();
        }
    }, [])


    return (
        !props.encodingRecipeData ?
            <SpinnerContainer><LoadingSpinner size='large' color='blue80' /></SpinnerContainer>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EncodingRecipes)