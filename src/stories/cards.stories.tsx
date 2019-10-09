import React from 'react';
import { storiesOf } from '@storybook/react'
import { Card } from '../components/Card/Card';
import { Text } from '../components/Typography/Text';
import styled from 'styled-components';

storiesOf('Cards', module)
    .add('Cards', () => ( 
        <Container>
            <Card>
                <CardTitle>
                    <Text size={14} weight="med">Number of Viewers</Text>
                </CardTitle>
               
                <CardContent>
                    <Text size={48} weight="reg">301</Text>
                </CardContent>
            </Card>
        </Container>
    ))

var Container = styled.div`
    height: 1400px;
    width:auto;
    background: #EBEFF5;
    padding: 5px;
    padding-top: 50px;
    text-align: center;
`
var CardContent = styled.div`
    margin: 75px 95px 20px;
`

var CardTitle = styled.div`
    float:left;
`
    