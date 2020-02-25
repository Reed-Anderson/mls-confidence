import * as React from 'react';
import { Box, Button } from 'grommet';
import Headered from '../hocs/headered';
import { useHistory } from 'react-router-dom';

/* Component for the error page */
const ErrorView = () => {
    const history = useHistory();
    return (
        <Headered>
            <Box
                align='center'
                alignContent='center'
                flex='grow'
                gap='medium'
                margin='large'
            >
                <h1>Error 404</h1>
                <p>Page not found</p>
                <Button
                    label='Go Back'
                    onClick={() => history.goBack()}
                />
            </Box>
        </Headered>
    );
};

export default ErrorView;