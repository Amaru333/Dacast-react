import * as React from 'react'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getEncodingRecipesAction, createEncodingRecipesAction, saveEncodingRecipesAction, deleteEncodingRecipesAction, uploadWatermark, deleteWatermark, getUploadWatermarkUrl, getEncodingRecipesPresetsAction } from '../../redux-flow/store/Settings/EncodingRecipes/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { EncodingRecipesData, EncodingRecipeItem } from '../../redux-flow/store/Settings/EncodingRecipes';
import { EncodingRecipesComponentProps, EncodingRecipesPage } from '../../pages/Settings/EncodingRecipes/EncodingRecipes';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';


const EncodingRecipes = (props: EncodingRecipesComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getEncodingRecipes()
        .catch(() => setNodataFetched(true))

        props.getEncodingRecipesPresets()
        .catch(() => setNodataFetched(true))

    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }
    
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
        getEncodingRecipes: async () => {
            await dispatch(getEncodingRecipesAction());
        },
        getEncodingRecipesPresets: async () => {
            await dispatch(getEncodingRecipesPresetsAction());
        },
        createEncodingRecipe: async (data: EncodingRecipeItem) => {
            await dispatch(createEncodingRecipesAction(data));
        },
        saveEncodingRecipe: async (data: EncodingRecipeItem) => {
            await dispatch(saveEncodingRecipesAction(data));
        },
        deleteEncodingRecipe: async (data: EncodingRecipeItem) => {
           await dispatch(deleteEncodingRecipesAction(data))
        },
        getWatermarkUrlForUploading: async () => {
            await dispatch(getUploadWatermarkUrl());
        },
        uploadWatermark: async (data: File, uploadWatermarkUrl: string) => {
            await dispatch(uploadWatermark(data, uploadWatermarkUrl))
        },
        deleteWatermark: async (data: EncodingRecipeItem) => {
            await dispatch(deleteWatermark(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EncodingRecipes)