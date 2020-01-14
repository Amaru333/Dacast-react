import React from 'react';
import {LoadingSpinner} from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FoldersPage } from '../../pages/Folders/Folders';

const Folders = () => {
    const test = true;
    return (
        test ? 
            <FoldersPage />
            : <LoadingSpinner size='large' color='green80' />
    )
}

export default Folders;