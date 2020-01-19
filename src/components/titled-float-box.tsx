import * as React from 'react';
import { Box, Text, BoxProps } from 'grommet';
import { COLORS } from '../utils/constants';
import { BorderType } from 'grommet/utils';
import FloatBox from './float-box';
import PlainLink from './plain-link';

/* Props for TitledFloatBox */
interface Props {
    boxProps?: BoxProps
    children?: React.ReactNode
    color: string
    title: string
    to?: string
};

/* Props for the inner border of the TitledFloatBox */
const innerBorder: BorderType = {
    color: COLORS['light-2'],
    size: 'xsmall'
};

/* TitledFloatBox Component */
const TitledFloatBox = (props: Props) => {

    /* The text with the title */
    const text = (
        <Text color={props.color} weight='bold'>
            {props.title}
        </Text>
    );

    /* If a 'to' prop is provided, wrap text in a PlainLink */
    const link = props.to && (
        <PlainLink to={props.to}>
            {text}
        </PlainLink>
    );

    /* Return the titled float box */
    return (
        <FloatBox boxProps={props.boxProps}>
            {link || text}
            <Box background={COLORS['white']} border={innerBorder} fill>
                {props.children}
            </Box>
        </FloatBox>
    );
};

export default TitledFloatBox;