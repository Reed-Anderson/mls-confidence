import * as React from 'react';
import { Box } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';

/**
 * Functional Component for the home page
 */
const HomeView = () => {
    return (
        <Box as='div' fill align='center'>
            <ViewTitle title='Welcome to the MLS Confidence Pool!'/>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
            <p>This is just me testing some text.</p>
        </Box>
    );
};

export default () => Headered(HomeView(), 'Home');