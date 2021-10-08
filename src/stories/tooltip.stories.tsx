import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import "../scss/style.scss";
import { Button } from '../components/FormsComponents/Button/Button';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { Text } from '../components/Typography/Text';
import { IconStyle } from '../shared/Common/Icon';

storiesOf('Tooltips', module)
    .add('Tooltip', () => (
        <React.Fragment>
            <StorybookInputContainerStyle>
                <Text size={16} weight="med" color="gray-3"> Text with infos tooltip example </Text>
                <div className="relative ml-auto">
                    <IconStyle id="tooltipExample1">info_outlined</IconStyle>
                    <Tooltip target="tooltipExample1">Some tooltip help informations about an element of the page</Tooltip>
                </div>
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Text size={16} weight="med" color="gray-3"> Tooltip with a lot of text inside example </Text>
                <div className="relative ml-auto">
                    <IconStyle id="tooltipExample2">info_outlined</IconStyle>
                    <Tooltip target="tooltipExample2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Tooltip>
                </div>
            </StorybookInputContainerStyle>
        </React.Fragment>

    ));

const StorybookInputContainerStyle = styled.div`
    float: left;
    margin: 150px 20px 20px 60px;
`;
