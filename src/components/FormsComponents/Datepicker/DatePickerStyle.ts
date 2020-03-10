import styled, {css} from 'styled-components';

export const DatepickerContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const DatepickerStyle = styled.div<{isSingle: boolean}>`
    position: relative;
    margin-top: 8px;

`
export const BoxStyle = styled.div<{isSelected: boolean}>`
    display: flex;
    flex-direction: row;
    position: relative;
    height: 22px;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    ${props => props.isSelected && css `
        border: 1px solid ${props.theme.colors["violet"]};
    `}
    background-color: ${props => props.theme.colors["gray-10"]};
    padding: 0.5em 0;
    padding-left: 10px; 
    cursor: pointer;
`

export const StartTextStyle = styled.div<{text: boolean; isSingle: boolean}>`
    ${props => !props.isSingle && css`
        border: 1px solid ${props.theme.colors["gray-7"]};
        border-radius: 4px;
    `}
    ${props => !props.isSingle && !props.text && css`
        background-color: ${props.theme.colors["white"]};
    `}
    ${props => props.text && !props.isSingle && css `
        background-color: ${props.theme.colors["gray-7"]};
    `}
    padding: 2px;

`

export const EndTextStyle = styled.div<{text: boolean}>`
    background-color: ${props => props.theme.colors["white"]};
    ${props => props.text && css `
        background-color: ${props.theme.colors["gray-7"]};
    `}
    padding: 2px;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    border-radius: 4px;

`

export const NavButtonLeftStyle = styled.div<{}>`
    position: absolute;
    top: 10px;
    left: 5px;
`

export const NavButtonRightStyle = styled.div<{}>`
    position: absolute;
    top: 10px;
    right: 5px;
`
export const NavButtonStyle = styled.button<{}>`
    border: none;
    color: ${props => props.theme.colors["gray-3"]};
`

export const IconStyle = styled.div<{isCalendar: boolean}>`
    color: ${props => props.theme.colors["gray-3"]};
    ${props => props.isCalendar && css`
        position: absolute;
        right: 5px;
        top: 20%;
    `}
`

export const MonthContainerStyle = styled.div<{open: boolean; isSingle: boolean}>`
    display: grid;
    position: absolute;
    z-index: 999;
    background-color: ${props => props.theme.colors['white']};
    max-width: 672px;
    ${props => props.isSingle && css`
        max-width: 336px;
    `}
    margin: 5px 0 0 0;
    grid-template-columns: repeat(2, 336px);
    ${props => !props.open && css`
        display: none;
    `}
`

export const MonthContainer = styled.div<{}>`
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    padding: 16px;
    padding-top: 0;
`

export const MonthLabelStyle = styled.div<{}>`
    width: fit-content;
    margin: 10px auto 16px auto;

`

export const WeekdayStyle = styled.div<{}>`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
    margin-bottom: 12px;
    text-align: center;
`

export const DaysContainer = styled.div<{}>`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
`

export const DayWrapper = styled.div<{isWithinHoverRange: boolean; isSelected: boolean;isSelectedStartOrEnd: boolean; isLineBeginning: boolean; isLineEnd: boolean; isMonthFirstDay: boolean; isMonthLastDay: boolean;  isFirstDay: boolean; isLastDay: boolean; isSingle: boolean}>`
    ${props => (props.isWithinHoverRange || props.isSelected) && !props.isSingle && css`
        background-color:${props.theme.colors["violet20"]};
    `}
    ${props => (props.isWithinHoverRange || props.isSelected) && (props.isLineBeginning || props.isMonthFirstDay) && css`
        border-bottom-left-radius: 40px;
        border-top-left-radius: 40px;
    `}
    ${props => (props.isWithinHoverRange || props.isSelected) && (props.isLineEnd || props.isMonthLastDay) && css`
        border-bottom-right-radius: 40px;
        border-top-right-radius: 40px;
    `}
    ${props => props.isFirstDay && css`
        background: linear-gradient(90deg, ${props.theme.colors["white"]} 50%, ${props.theme.colors["violet20"]} 50%);
    `}
    ${props => props.isLastDay && css`
        background: linear-gradient(90deg, ${props.theme.colors["violet20"]} 50%, ${props.theme.colors["white"]} 50%);
    `}
    margin: 5px 0;
    padding: 0 3px;
`

export const DayStyle = styled.button<{isWithinHoverRange: boolean; isSelected: boolean; isSelectedStartOrEnd: boolean; isToday: boolean}>`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    padding: unset;
    margin: auto;
    &:hover {
        background-color: ${props => props.theme.colors["violet20"]};
        color: ${props => props.theme.colors["dark-violet"]};
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
    ${props => (props.isWithinHoverRange || props.isSelected) && css`
        background-color:${props.theme.colors["violet20"]};
    `}
    ${props => props.isSelectedStartOrEnd && css`
        background-color:${props.theme.colors["violet"]};
        color:${props.theme.colors["white"]};
    `}
    ${props => props.isToday && css`
        border: 1px solid ${props.theme.colors["gray-3"]};
    `}
`
