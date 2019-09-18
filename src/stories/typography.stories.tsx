import React from 'react';
import { storiesOf } from '@storybook/react';
import { Text } from '../components/Typography/Text';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { ColorsApp, ColorsAppArray } from '../styled/types';


const stories = storiesOf('Typo', module);
stories.addDecorator(withKnobs);

stories.add('Regular', () => {
    const color = select<ColorsApp>("Colors", ColorsAppArray, "gray-1");
    return (
        <React.Fragment>
            <Text size={48} weight="reg" color={color} > fontsize-48-reg (56px) </Text> <br />
            <Text size={40} weight="reg" color={color} > fontsize-40-reg (42px) </Text> <br />
            <Text size={32} weight="reg" color={color} > fontsize-32-reg (40px) </Text> <br />
            <Text size={24} weight="reg" color={color} > fontsize-24-reg (32px) </Text> <br />
            <Text size={20} weight="reg" color={color} > fontsize-20-reg (28px) </Text> <br />
            <Text size={16} weight="reg" color={color} > fontsize-16-reg (24px) </Text> <br />
            <Text size={14} weight="reg" color={color} > fontsize-14-reg (24px) </Text> <br />
            <Text size={12} weight="reg" color={color} > fontsize-12-reg (18px) </Text> <br />
            <Text size={10} weight="reg" color={color} > fontsize-10-reg (16px) </Text> <br />
        </React.Fragment>
    );
})
    .add('Medium', () => {
        const color = select<ColorsApp>("Colors", ColorsAppArray, "gray-1");
        return (
            <React.Fragment>
                <Text size={48} weight="med" color={color} > fontsize-48-reg (56px) </Text> <br />
                <Text size={40} weight="med" color={color} > fontsize-40-reg (42px) </Text> <br />
                <Text size={32} weight="med" color={color} > fontsize-32-reg (40px) </Text> <br />
                <Text size={24} weight="med" color={color} > fontsize-24-reg (32px) </Text> <br />
                <Text size={20} weight="med" color={color} > fontsize-20-reg (28px) </Text> <br />
                <Text size={16} weight="med" color={color} > fontsize-16-reg (24px) </Text> <br />
                <Text size={14} weight="med" color={color} > fontsize-14-reg (24px) </Text> <br />
                <Text size={12} weight="med" color={color} > fontsize-12-reg (18px) </Text> <br />
                <Text size={10} weight="med" color={color} > fontsize-10-reg (16px) </Text> <br />
            </React.Fragment>
        )
    });
