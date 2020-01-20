import * as React from 'react';
import * as Icon from 'grommet-icons';
import FloatBox from './float-box';
import { BoxProps, Text, Box } from 'grommet';
import { Link } from 'react-router-dom';

/* Extra properties for the FloatBox */
const boxProps: BoxProps = {
    gap: 'small',
    height: '150px',
    margin: 'medium',
    pad: 'medium',
    width: '300px'
}

/* AboutPageBox Component */
const AboutPageBox = () => {
    return (
        <FloatBox boxProps={boxProps}>
            <Box direction='row' gap='xsmall'>
                <Icon.CircleInformation color='brand' />
                <Text weight='bold'>Confused?</Text>
            </Box>
            <Text>
                Check out the <Link to='/about'>About</Link> page for help.
            </Text>
        </FloatBox>
    )
};

export default AboutPageBox;