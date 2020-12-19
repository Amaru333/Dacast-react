import styled, { css } from "styled-components"

export const Content = styled.div<{ isMobile: boolean }>`
    position: relative;
    height: auto;
    min-height: 100vh;
    padding: 24px;
    ${props => props.isMobile && css`
        overflow-x: hidden;
        padding: 16px;
    `}
    padding-top: 81px;
`

export const FullContent = styled.div<{ isOpen: boolean; navBarWidth: string; isMobile: boolean; isLocked: boolean }>`
    margin-left: ${props => props.isMobile ? 0 : props.isLocked ? '235px' : '64px'};
    background: rgb(245, 247, 250);
    position: relative;
    padding: 0;
    min-width: 240px;
    width: ${props => props.isMobile ? "100%" : props.isLocked ? "calc(100% - 235px)" : "calc(100% - 64px)"};
`