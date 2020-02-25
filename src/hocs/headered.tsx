import * as React from 'react';
import { APP_NAME } from '../utils/constants';
import {
    Box,
    Button,
    Collapsible,
    Heading,
    Layer,
    ResponsiveContext
} from 'grommet';
import { FormClose, Menu } from 'grommet-icons';
import { FirebaseContext } from '../launch/app';
import SidebarOption from '../components/sidebar-option';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCurrentWeek } from '../utils/helpers';

/**
 * Main Link
 */
const MainLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    /* Remove all text decoration from <a> elements */
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

/**
 * Props for Headered component
 */
interface Props {
    activeDisplayName?: string
    children: JSX.Element | JSX.Element[]
}

/**
 * Higher Order Component to give passed content a header
 */
const Headered = ( props: Props ) => {

    /* State to indicate whether to show the sidebar */
    const [showSidebar, setShowSideBar] = React.useState(false);
    const toggleSidebarOpen = () => setShowSideBar(!showSidebar);

    /* Login status determines the sidebar items */
    const firebase = React.useContext(FirebaseContext);

    /* State to hold which items are shown in the sidebar */
    const sidebarItems = firebase.getCurrentUser() ?
        [
            { displayName: 'Home', linkTo: '/' },
            { displayName: 'Rules', linkTo: '/rules' },
            { displayName: 'About', linkTo: '/about' },
            { displayName: 'Pick', linkTo: `/pick/${getCurrentWeek()}` },
            { displayName: 'Standings', linkTo: '/standings' },
            {
                displayName: 'Log Out',
                linkTo: '/login',
                onClick: () => firebase.signOutUser()
            }
        ]
        :
        [
            { displayName: 'Home', linkTo: '/' },
            { displayName: 'Rules', linkTo: '/rules' },
            { displayName: 'About', linkTo: '/about' },
            { displayName: 'Log In', linkTo: '/login' },
            { displayName: 'Register', linkTo: '/register' },
            { displayName: 'Standings', linkTo: '/standings' }
        ];

    /* Rendering constants */
    const pad = { left: 'medium', right: 'small', vertical: 'small' };

    /**
     * Rendering segments
     */

    /* Box that makes up the header */
    const headerBox = () => (
        <Box
            align='center'
            as='header'
            background='brand'
            direction='row'
            elevation='medium'
            flex={false}
            justify='between'
            pad={pad}
            style={{ zIndex: 1 }}
        >
            <Heading level='3' margin='none'>
                <MainLink to='/'>
                    {APP_NAME}
                </MainLink>
            </Heading>
            <Button icon={<Menu />} onClick={toggleSidebarOpen} />
        </Box>
    );

    /* Maps the sidebar options into components */
    const renderSidebarOptions = () => {
        return sidebarItems.map(item => (
            <SidebarOption
                key={`sidebar_option_${item.displayName}`}
                activeDisplayName={props.activeDisplayName}
                toggleSidebarOpen={toggleSidebarOpen}
                {...item}
            />
        ))
    }

    /* The sidebar on most screen sizes (not mobile) */
    const standardSidebar = () => (
        <Collapsible
            direction='horizontal'
            open={showSidebar}
        >
            <Box
                align='center'
                background='light-2'
                elevation='small'
                flex
                justify='start'
                width='250px'
            >
                {renderSidebarOptions()}
            </Box>
        </Collapsible>
    );

    /* The sidebar on mobile screen sizes */
    const smallSidebar = () => (
        showSidebar && (
            <Layer>
                <Box
                    align='center'
                    as='header'
                    background='light-2'
                    direction='row'
                    justify='end'
                >
                    <Button
                        icon={<FormClose />}
                        onClick={toggleSidebarOpen}
                    />
                </Box>
                <Box
                    align='center'
                    background='light-2'
                    fill
                    justify='center'
                >
                    {renderSidebarOptions()}
                </Box>
            </Layer>
        )
    );

    /* Return wrapped content in a Box below the header */
    return (
        <ResponsiveContext.Consumer>
            {size => (
                /**
                 * This is the first box in the Grommet Style.
                 * It fills parent height. Shouldn't overflow.
                 */
                <Box fill>
                    {headerBox()}
                    {/* The box below puts the content and sidebar in a row */}
                    <Box
                        direction='row'
                        fill
                        overflow='hidden'
                    >
                        {/* The box below fills the parent's
                            height and controls overflow */}
                        <Box align='center' flex overflow='auto'>
                            {props.children}
                        </Box>
                        {size === 'small' ? smallSidebar() : standardSidebar()}
                    </Box>
                </Box>
            )}
        </ResponsiveContext.Consumer>
    );
};

export default Headered;