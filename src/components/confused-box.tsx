import * as React from 'react';
import * as Icon from 'grommet-icons';
import FloatBox from './float-box';
import { BoxProps, Text, Box, Button } from 'grommet';
import PlainLink from './plain-link';

/* Extra properties for the FloatBox */
const boxProps: BoxProps = {
    gap: 'small',
    height: '150px',
    margin: 'medium',
    pad: 'medium',
    width: '300px'
};

/* ConfusedBox Component */
const ConfusedBox = () => {
    return (
        <FloatBox boxProps={boxProps}>
            <Box direction='row' gap='xsmall'>
                <Icon.CircleInformation color='brand' />
                <Text weight='bold'>Confused?</Text>
            </Box>
            <Box align='center' direction='row' fill justify='around'>
                <PlainLink to='about'>
                    <Button
                        color='accent-4'
                        label='Rules'
                    />
                </PlainLink>
                <PlainLink to='about'>
                    <Button
                        color='accent-1'
                        label='About'
                    />
                </PlainLink>
            </Box>
        </FloatBox>
    );
};

export default ConfusedBox;