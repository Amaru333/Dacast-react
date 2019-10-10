import * as React from 'react';
import { Text } from '../../Typography/Text';
import { LabelProps} from './LabelTypes';
import { LabelStyleContainer } from './LabelStyle';

export const Label = (props: LabelProps) => {
    return (
        <LabelStyleContainer {...props}>
            <Text size={props.size} weight={props.weight} color={props.color}>{props.label}</Text>
        </LabelStyleContainer>
    );
}

Label.defaultProps = { size: 14 , weight:"reg" };