import * as React from 'react';
import { Box, Text, Button, BoxProps } from 'grommet';
import { COLORS } from '../utils/constants';
import FloatBox from './float-box';

/* Additional props for the FloatBox */
const boxProps: BoxProps = {
    align: 'center',
    gap: 'medium',
    height: { min: 'auto', max: 'auto' },
    margin: { bottom: '50px' },
    pad: 'medium',
    width: 'medium',
}

/**
 * FloatBox component to show that the user is logged in
 *  or prompt them to do so
 */
const LoginStatusBox = () => {
    return (
        <FloatBox boxProps={boxProps}>
            <Text>You are not logged in!</Text>
            <Box align='center' direction='row' fill justify='around'>
                <Button
                    color={COLORS['accent-4']}
                    label='Sign Up!'
                />
                <Text>OR</Text>
                <Button
                    color={COLORS['accent-1']}
                    label='Log In!'
                />
            </Box>
        </FloatBox>
    );
};

export default LoginStatusBox;