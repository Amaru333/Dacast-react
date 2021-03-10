import React from 'react';
import { ExposThemingState } from '../../redux-flow/store/Content/Theming/types';


export const DesignPage = (props: { designState: ExposThemingState }) => {

    const [saveLoading, setSaveLoading] = React.useState<boolean>(false)

    return (
        <>
            Design
        </>
    )

    
}