import * as React from 'react';
import * as Icon from 'grommet-icons';
import { Box, Text, Button, BoxProps } from 'grommet';
import FloatBox from './float-box';
import PlainLink from './plain-link';

/* Additional props for the FloatBox */
const boxProps: BoxProps = {
    gap: 'medium',
    height: { min: 'auto', max: 'auto' },
    margin: 'medium',
    pad: 'medium',
    width: '300px',
};

/**
 * FloatBox component to show that the user is logged in
 *  or prompt them to do so
 */
const LoginStatusBox = () => {
    return (
        <FloatBox boxProps={boxProps}>
            <Box direction='row' gap='xsmall'>
                <Icon.Alert color="status-warning" />
                <Text weight='bold'>You are not logged in!</Text>
            </Box>
            <Box align='center' direction='row' fill justify='around'>
                <PlainLink to='/register'>
                    <Button
                        color={'accent-4'}
                        label='Sign Up!'
                    />
                </PlainLink>
                <PlainLink to='/login'>
                    <Button
                        color={'accent-1'}
                        label='Log In!'
                    />
                </PlainLink>
            </Box>
        </FloatBox>
    );
};

export default LoginStatusBox;