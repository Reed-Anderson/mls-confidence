import * as React from 'react';
import { Box, Text, Button, BoxProps } from 'grommet';
import FloatBox from './float-box';
import PlainLink from './plain-link';
import { Alert, UserExpert } from 'grommet-icons';
import { FirebaseContext } from '../launch/app';
import { useHistory } from 'react-router-dom';

/* Additional props for the FloatBox */
const boxProps: BoxProps = {
    height: '150px',
    margin: 'medium',
    pad: 'medium',
    width: '300px',
};

/**
 * FloatBox component to show that the user is logged in
 *  or prompt them to do so
 */
const LoginStatusBox = () => {

    /* Firebase context for active user */
    const firebase = React.useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const userName = currentUser?.displayName || 'Unknown User';

    /* History context to push /login */
    const history = useHistory();

    /* Function to handle log out click */
    const handleLogOut = () => {
        firebase.signOutUser().then(() => {
            history.push('/login')
        });
    };

    if (currentUser) {
        return (
            <FloatBox boxProps={boxProps}>
                <Box
                    direction='row'
                    flex={{ shrink: 0 }}
                    gap='xsmall'
                    height='45px'
                >
                    <UserExpert color='status-ok' />
                    <Text weight='bold'>
                        Signed in as {userName}.
                    </Text>
                </Box>
                <Box align='center' direction='row' fill justify='around'>
                    <Button
                        color='status-warning'
                        label='Log out'
                        onClick={handleLogOut}
                    />
                </Box>
            </FloatBox>
        );
    }
    else {
        return (
            <FloatBox boxProps={boxProps}>
                <Box
                    direction='row'
                    flex={{ shrink: 0 }}
                    gap='xsmall'
                    height='45px'
                >
                    <Alert color='status-warning' />
                    <Text weight='bold'>You are not logged in!</Text>
                </Box>
                <Box align='center' direction='row' fill justify='around'>
                    <PlainLink to='/register'>
                        <Button active label='Register!' />
                    </PlainLink>
                    <PlainLink to='/login'>
                        <Button active label='Log In!' />
                    </PlainLink>
                </Box>
            </FloatBox>
        );
    }
};

export default LoginStatusBox;