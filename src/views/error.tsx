import * as React from 'react';
import { Link } from 'react-router-dom';
import Headered from '../hocs/headered';

/**
 * Functional Component for the error page
 */
const ErrorView = () => {
    return (
        <main>
            <h1>Error 404</h1>
            <p>Page not found.</p>
            <Link to='/'>Click to go home.</Link>
        </main>
    );
};

export default () => Headered(ErrorView());