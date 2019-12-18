import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '../utils/constants';

/* Styled div for sidebar option */
const StyledSidebarOption = styled(Link)`
    align-items: center;
    background-color: ${COLORS['light-2']};
    border-bottom: 1px solid ${COLORS['light-4']};
    color: ${COLORS['dark-1']};
    cursor: pointer;
    display: flex;
    height: 50px;
    justify-content: center;
    text-decoration: none;
    width: 100%;

    /* give an additional border-top to the first option */
    :first-of-type {
        border-top: 1px solid ${COLORS['light-4']};
    }
    
    /* hover effect */
    :hover {
        background-color: ${COLORS['light-1']};
        color: ${COLORS['neutral-3']};
    }
    
    /* Styling for actively selected option */
    &.active {
        background-color: #fff;
        color: ${COLORS['neutral-1']};
    }
    
    /* Remove all text decoration from <a> elements */
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

/* Props for the sidebar option component */
export interface SidebarOptionProps {
    activeDisplayName: string
    displayName: string
    linkTo: string
    onClick?: () => void
    toggleSidebarOpen: () => void
};

/**
 * Sidebar option component
 */
const SidebarOption = (props: SidebarOptionProps) => {

    /* Constant for the classname of the option */
    const className = props.activeDisplayName === props.displayName ?
        'active'
        :
        '';

    /* Call props.onClick if passed, always toggle sidebar */
    const onClick = () => {
        if (props.onClick) {
            props.onClick();
        }
        props.toggleSidebarOpen();
    };

    /* Return the option */
    return (
        <StyledSidebarOption
            key={props.displayName}
            className={className}
            onClick={onClick}
            to={props.linkTo}
        >
            {props.displayName}
        </StyledSidebarOption>
    );
};

export default SidebarOption;