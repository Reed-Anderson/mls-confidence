import * as React from 'react';
import { Box } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';

/**
 * Functional Component for the about page
 */
const StandingsView = () => {
    return (
        <Box as='div' fill align='center'>
            <ViewTitle title='This is the Standings page!'/>
        </Box>
    );
};

export default () => Headered(StandingsView(), 'Standings');