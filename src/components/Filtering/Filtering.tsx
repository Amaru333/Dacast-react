import React from 'react';
import { Button } from '../FormsComponents/Button/Button';
import styled, { css } from 'styled-components';
import { OverlayStyle } from '../Modal/ModalStyle';


export interface FilteringProps {
    isOpen: boolean;
}

export const Filtering = (props: FilteringProps & React.HTMLAttributes<HTMLDivElement>) => {



    var { isOpen,  ...other } = props;
    return (
        <>
            <ContainerFilters {...other} isOpen={isOpen} >
                {props.children}
            </ContainerFilters>
            <OverlayStyle opened={isOpen} />
        </>

    )

}


const ContainerFilters = styled.div<{ isOpen: boolean }>`
    width: 360px;
    height: 100%;
    position: fixed;
    padding: 24px;
    z-index: 9999;
    right: -360px;
    top: 0;
    box-sizing: border-box;
    overflow-x: scroll;
    background: #fff;
    ${props => props.isOpen && css`
        right: 0px;
    `};
`