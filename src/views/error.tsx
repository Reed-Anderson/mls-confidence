import * as React from 'react';
import { Box, Button } from 'grommet';
import Headered from '../hocs/headered';
import PlainLink from '../components/plain-link';

/* Component for the error page */
const ErrorView = () => {
    return (
        <Box
            align='center'
            alignContent='center'
            flex='grow'
            gap='medium'
            margin='large'
        >
            <h1>Error 404</h1>
            <p>Page not found</p>
            <PlainLink to='/'>
                <Button
                    label='Go Home'
                />
            </PlainLink>
        </Box>
    );
};

export default () => Headered(ErrorView());