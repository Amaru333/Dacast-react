import { ColorsApp } from '../../styled/types';

type Size = 48 | 40 | 32 | 24 | 20 | 16 | 14 | 12 | 10;
type Weight = 'reg' | 'med';

export interface TextSpecificProps {
    size: Size;
    weight: Weight;
    color: ColorsApp;
}

export type TextProps = TextSpecificProps & React.HTMLAttributes<HTMLSpanElement>;
