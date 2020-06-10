import styled, { css } from 'styled-components';
import { Card } from '../../../components/Card/Card';

export const classContainer = "clearfix mxn2";
export const classItemFullWidth = "col col-12 px2 mb3";
export const classItemHalfWidthContainer = "col lg-col-6 md-col-6 sm-col-12 col-12 px2 mb3";
export const classItemFullWidthContainer = "col lg-col-3 md-col-6 sm-col-12 col-12 px2 mb3";
export const classItemThirdWidthContainer = "col lg-col-4 md-col-4 sm-col-12 col-12 px2 mb3";

export const SupportCard = styled(Card)`
    background-color: ${props => props.theme.colors['violet20']};
`;

export const WidgetHeader = styled.div<{}>`
    margin-bottom: 16px;
`;

export const TableListStyle = styled.table<{}>`
    tr{
        border-bottom: 1px solid ${props => props.theme.colors['gray-8']};
        padding: 6px;
        display: flex;
        th {
            text-align: left;
        }
        :last-child {
            border-bottom: none;
        }
    }
    display: flex;
    flex-direction: column;
    width: 100%;
`;


export const ListStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`

export const IconStyle = styled.div<{ checked: boolean }>`
    color: ${props => props.checked ? props.theme.colors.violet : props.theme.colors['gray-8']};
    margin: 12px 8px;
`

export const ListItem = styled.div<{ checked: boolean }>`
    a {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 48px;
        color: ${props => props.checked ? props.theme.colors["gray-6"] : props.theme.colors["gray-1"]} !important;
        &:hover {
            background-color:  ${props => props.theme.colors["gray-10"]};
        }
    }
    display: flex;
    align-items: center;
    height: 48px;
    ${props => props.checked && css`
        .line-through {
            text-decoration: line-through;
        }
    `}
`