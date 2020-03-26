// import original module declarations
import 'styled-components'
import { ColorsApp } from './types';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string;

        colors: {
            [key in ColorsApp]: string
        };
    }
}