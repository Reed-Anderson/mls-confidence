import * as React from 'react';
import * as Icon from 'grommet-icons';
import FloatBox from './float-box';
import { BoxProps, Text, Box, Button } from 'grommet';
import PlainLink from './plain-link';

/* Extra properties for the FloatBox */
const boxProps: BoxProps = {
    height: '150px',
    margin: 'medium',
    pad: 'medium',
    width: '300px'
};

/* ConfusedBox Component */
const ConfusedBox = () => {
    return (
        <FloatBox boxProps={boxProps}>
            <Box
                direction='row'
                flex={{ shrink: 0 }}
                gap='xsmall'
                height='45px'
            >
                <Icon.CircleInformation color='brand' />
                <Text weight='bold'>Confused?</Text>
            </Box>
            <Box align='center' direction='row' fill justify='around'>
                <PlainLink to='rules'>
                    <Button
                        active
                        label='Rules'
                    />
                </PlainLink>
                <PlainLink to='about'>
                    <Button
                        active
                        label='About'
                    />
                </PlainLink>
            </Box>
        </FloatBox>
    );
};

export default ConfusedBox;