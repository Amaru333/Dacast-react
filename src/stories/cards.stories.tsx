import React from 'react';
import { storiesOf } from '@storybook/react'
import { Text } from '../components/Typography/Text';
import styled from 'styled-components';
import { classItemHalfWidthContainer, classItemThirdWidthContainer, classItemQuarterWidthContainer } from '../app/containers/Dashboard/DashboardStyles';
import { WidgetElement } from '../app/containers/Dashboard/WidgetElement';

storiesOf('Widget Elements', module)
    .add('Widget Element', () => (
        <Container className="clearfix mxn2">
            <WidgetElement className={classItemHalfWidthContainer}>
                <WidgetElementTitle>
                    <Text size={14} weight="med">classItemHalfWidthContainer</Text>
                </WidgetElementTitle>
            </WidgetElement>
            <WidgetElement className={classItemHalfWidthContainer}>
                <WidgetElementTitle>
                    <Text size={14} weight="med">classItemHalfWidthContainer</Text>
                </WidgetElementTitle>
            </WidgetElement>
            <WidgetElement className={classItemThirdWidthContainer}>
                <WidgetElementTitle>
                    <Text size={14} weight="med">classItemThirdWidthContainer</Text>
                </WidgetElementTitle>
            </WidgetElement>
            <WidgetElement className={classItemThirdWidthContainer}>
                <WidgetElementTitle>
                    <Text size={14} weight="med">classItemThirdWidthContainer</Text>
                </WidgetElementTitle>
            </WidgetElement>
            <WidgetElement className={classItemThirdWidthContainer}>
                <WidgetElementTitle>
                    <Text size={14} weight="med">classItemThirdWidthContainer</Text>
                </WidgetElementTitle>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer}>
                <WidgetElementTitle>
                    <Text size={14} weight="med">classItemQuarterWidthContainer</Text>
                </WidgetElementTitle>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer}>
                <WidgetElementTitle>
                    <Text size={14} weight="med">classItemQuarterWidthContainer</Text>
                </WidgetElementTitle>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer}>
                <WidgetElementTitle>
                    <Text size={14} weight="med">classItemQuarterWidthContainer</Text>
                </WidgetElementTitle>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer}>
                <WidgetElementTitle>
                    <Text size={14} weight="med">classItemQuarterWidthContainer</Text>
                </WidgetElementTitle>
            </WidgetElement>
        </Container>
    ))

var Container = styled.div`
    height: 1400px;
    width:auto;
    background: #EBEFF5;
    padding: 16px;
`
var WidgetElementContent = styled.div`
    margin: 75px 95px 20px;
`

var WidgetElementTitle = styled.div`
    float:left;
`
