import * as React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { Box, Text, BoxProps } from 'grommet';
import { BorderType } from 'grommet/utils';
import FloatBox from './float-box';
import PlainLink from './plain-link';
import { COLORS } from '../utils/constants';

/* Props for TitledFloatBox */
interface Props {
    boxProps?: BoxProps
    children?: React.ReactNode
    color: string
    loading?: boolean
    title: string
    to?: string
};

/* Props for the inner border of the TitledFloatBox */
const innerBorder: BorderType = {
    color: 'light-3',
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

    const loadingProps: BoxProps = {}

    if (props.loading) {
        loadingProps.align = 'center'
        loadingProps.fill = true
        loadingProps.justify = 'center'
    }

    /* Return the titled float box */
    return (
        <FloatBox boxProps={props.boxProps}>
            {link || text}
            <Box
                background='white'
                border={innerBorder}
                fill
                responsive={false}
                {...loadingProps}
            >
                {props.loading && (
                    <HashLoader color={COLORS['accent-2']} />
                )}
                {!props.loading && props.children}
            </Box>
        </FloatBox>
    );
};

export default TitledFloatBox;