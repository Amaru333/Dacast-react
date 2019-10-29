import React from 'react';
import { storiesOf } from '@storybook/react'
import styled from 'styled-components';
import { Header } from '../components/Header/Header';

storiesOf('Header', module)
    .add('Header', () => ( 
        <Container>
            <Sidebar></Sidebar>
            <Header isMobile={false} isOpen={false} setOpen={() => {}}></Header>
        </Container>
    ))

    const Container = styled.div`
    height: 1400px;
    width:auto;
    background: #E5E5E5;
    display: flex;
    flex-direction: row;`

    const Sidebar = styled.div`
        height:100%;
        
        width: 235px;
        background: ${props => props.theme.colors["gray-1"]};
        border-right: 1px solid ${props => props.theme.colors["gray-7"]};

    `