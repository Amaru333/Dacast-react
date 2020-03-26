import { ColorsApp } from "../../../styled/types";
import { Size, Weight } from '../../Typography/TextTypes';

interface LabelSpecificProps {
    backgroundColor: ColorsApp;
    label: string;
    size: Size;
    weight: Weight;
    color: ColorsApp;
} 

export type LabelProps = LabelSpecificProps & React.HtmlHTMLAttributes<HTMLDivElement>;