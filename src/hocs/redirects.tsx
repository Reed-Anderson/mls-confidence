import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { FirebaseContext } from '../launch/app';

/**
 * Higher Order component to redirect to home if user is logged in
 */
export const LogoutRequired = (content: JSX.Element) => {
    const firebase = React.useContext(FirebaseContext);

    if (firebase.getCurrentUser()) {
        return <Redirect to='/' />;
    }
    else {
        return content;
    }
};

/**
 * Higher Order component to redirect to home if user is NOT logged in
 */
export const LoginRequired = (content: JSX.Element) => {
    const firebase = React.useContext(FirebaseContext);

    if (!firebase.getCurrentUser()) {
        return <Redirect to='/' />;
    }
    else {
        return content;
    }
};