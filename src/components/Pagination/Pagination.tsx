import React from 'react';
import { IconStyle } from '../../shared/Common/Icon';
import styled from 'styled-components';
import { Text } from '../Typography/Text';
import { isMobile } from 'react-device-detect'
import { DropdownButton } from '../FormsComponents/Dropdown/DropdownButton';
import { useMedia } from '../../app/utils/utils';

interface PaginationProps { 
    totalResults: number;
    displayedItemsOptions: number[];
    callback: Function;
}

export const Pagination = (props: PaginationProps) => {

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [displayedOptions, setDisplayedOptions] = React.useState<number>(props.displayedItemsOptions[0]);
    
    let smallScreen = useMedia('(max-width: 780px)')

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
        <div className={isMobile || smallScreen ? 'flex flex-column mx-auto' : 'flex'}>
            <div className={'flex items-baseline flex-auto my2' + (isMobile || smallScreen ? ' order-1 mx-auto' : '')}>
                <Text size={14} weight='reg'>Showing </Text>
                <DropdownButton
                    className='mx1'
                    id='paginationDropdown'
                    list={props.displayedItemsOptions.map(item => item.toString())}
                    callback={(value: string) => {setDisplayedOptions(parseInt(value))}}
                />
                <Text size={14} weight='reg'>of {props.totalResults} results</Text>
            </div>
            <div className={'flex items-baseline my2' + (isMobile || smallScreen ? ' order-0 mx-auto' : '')}>
                <IconStyle coloricon={currentPage === 1 ? 'gray-7' : 'gray-3'} disabled={currentPage === 1} onClick={currentPage !== 1 ? () => {setCurrentPage(1)} : null}>first_page</IconStyle>
                <IconStyle coloricon={currentPage === 1 ? 'gray-7' : 'gray-3'} disabled={currentPage === 1} onClick={currentPage !== 1 ? () => {setCurrentPage(currentPage - 1)} : null}>keyboard_arrow_left</IconStyle>
                {renderPaginationButtons()}
                <IconStyle coloricon={currentPage === props.totalResults / displayedOptions ? 'gray-7' : 'gray-3'} disabled={currentPage === props.totalResults / displayedOptions} onClick={currentPage !== props.totalResults / displayedOptions ? () => {setCurrentPage(currentPage + 1)} : null}>keyboard_arrow_right</IconStyle>
                <IconStyle coloricon={currentPage === props.totalResults / displayedOptions ? 'gray-7' : 'gray-3'} disabled={currentPage === props.totalResults / displayedOptions} onClick={currentPage !== props.totalResults / displayedOptions ? () => {setCurrentPage(props.totalResults / displayedOptions)}: null}>last_page</IconStyle>
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