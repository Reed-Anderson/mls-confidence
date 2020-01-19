import * as React from 'react';
import { Box } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import PageLoader from '../components/page-loader';

/**
 * Functional Component for the about page
 */
const AboutView = () => {
    return (
        <Box as='div' fill align='center'>
            <ViewTitle title='This is the About page!' />
            <PageLoader loading />
        </Box>
    );
};

export default () => Headered(AboutView(), 'About');