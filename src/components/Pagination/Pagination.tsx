import React from 'react';
import { Icon } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Text } from '../Typography/Text';
import { DropdownButton } from '../FormsComponents/Dropdown/DropdownButton';

interface PaginationProps { 
    totalResults: number;
    displayedItemsOptions: number[];
    callback: Function;
}

export const Pagination = (props: PaginationProps) => {

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [displayedOptions, setDisplayedOptions] = React.useState<number>(props.displayedItemsOptions[0]);
    
    React.useEffect(() => {
        props.callback(currentPage, displayedOptions)
    }, [currentPage, displayedOptions])

    const renderPaginationButtons = () => {
        return Array.from(
            {length: props.totalResults / displayedOptions < 5 ? props.totalResults / displayedOptions : 5 }, 
            (v, i) => {
                return currentPage > 5 ? currentPage - (4 - i) : i + 1
            }).map((page) => {
            return (
                <PaginationButton key={'paginationButtonPage' + page} onClick={() => {setCurrentPage(page)}} currentPage={page === currentPage}>{page}</PaginationButton>
            )
        })
    }

    return (    
        <div className='flex my2'>
            <div className=' flex items-baseline flex-auto'>
                <Text size={16} weight='reg'>Showing </Text>
                <DropdownButton
                    className='mx1'
                    id='paginationDropdown'
                    list={props.displayedItemsOptions.map(item => item.toString())}
                    callback={(value: string) => {setDisplayedOptions(parseInt(value))}}
                />
                <Text size={16} weight='reg'>of {props.totalResults} results</Text>
            </div>
            <div className='flex items-baseline'>
                <IconContainer disabled={currentPage === 1}><Icon onClick={currentPage !== 1 ? () => {setCurrentPage(1)} : null}>first_page</Icon></IconContainer>
                <IconContainer disabled={currentPage === 1}><Icon onClick={currentPage !== 1 ? () => {setCurrentPage(currentPage - 1)} : null}>keyboard_arrow_left</Icon></IconContainer>
                {renderPaginationButtons()}
                <IconContainer disabled={currentPage === props.totalResults / displayedOptions}><Icon onClick={currentPage !== props.totalResults / displayedOptions ? () => {setCurrentPage(currentPage + 1)} : null}>keyboard_arrow_right</Icon></IconContainer>
                <IconContainer disabled={currentPage === props.totalResults / displayedOptions}><Icon onClick={currentPage !== props.totalResults / displayedOptions ? () => {setCurrentPage(props.totalResults / displayedOptions)}: null}>last_page</Icon></IconContainer>
            </div>
        </div>
    )
}

const PaginationButton = styled.button<{currentPage: boolean}>`
    width: 23px;
    height: 28px;
    margin-right: 4px;
    color: ${props => props.currentPage ? props.theme.colors['dark-violet'] : props.theme.colors['gray-1']};
    background-color: ${props => props.currentPage ? props.theme.colors['violet20'] : 'white' };
    border: 1px solid ${props => props.currentPage ? props.theme.colors['dark-violet'] :  props.theme.colors['gray-7']};
    border-radius: 4px;
    align-self: flex-start;
    cursor: pointer;
`

const IconContainer = styled.div<{disabled: boolean}>`
    color: ${props => props.disabled ? props.theme.colors['gray-7'] : props.theme.colors['gray-3']};
    ${props => props.disabled && css`
        cursor: not-allowed;
    `}
`