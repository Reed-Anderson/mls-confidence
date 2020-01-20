import * as React from 'react';
import { Box, BoxProps } from 'grommet';
import { BackgroundType, BorderType } from 'grommet/utils';

/* Props for FloatBox component */
interface Props {
    boxProps?: BoxProps
    children?: React.ReactNode
};

/* FloatBox's background */
const background: BackgroundType = {
    color: 'light-2',
    opacity: 'medium'
};

/* FloatBox's border */
const border: BorderType = {
    color: 'light-4',
    size: 'xsmall'
};

/* Floatbox component */
const FloatBox = (props: Props) => {
    return (
        <Box
            background={background}
            border={border}
            elevation='small'
            flex={false}
            {...props.boxProps}
        >
            {props.children}
        </Box>
    );
};

export default FloatBox;