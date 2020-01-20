import * as React from 'react';
import * as Icon from 'grommet-icons';
import FloatBox from './float-box';
import { Box, BoxProps, Text } from 'grommet';
import { getCurrentWeek } from '../utils/helpers';

const boxProps: BoxProps = {
    height: '150px',
    margin: 'medium',
    pad: 'medium',
    width: '300px'
};

/* PickStatusBox Component */
const PickStatusBox = () => {
    return (
        <FloatBox boxProps={boxProps}>
            <Box direction='row' gap='xsmall'>
                <Icon.Clock color='status-ok' />
                <Text weight='bold'>{`Week ${getCurrentWeek()} Picks`}</Text>
            </Box>
        </FloatBox>
    );
};

export default PickStatusBox;