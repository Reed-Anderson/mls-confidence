import * as React from 'react';
import FloatBox from './float-box';
import PulseLoader from 'react-spinners/PropagateLoader';
import { Box, BoxProps, Text, Button } from 'grommet';
import { COLORS } from '../utils/constants';
import PlainLink from './plain-link';
import { Clock } from 'grommet-icons';

/**
 * BoxProps on the PickStatusBox
 */
const boxProps: BoxProps = {
    height: '150px',
    margin: 'medium',
    pad: 'medium',
    width: '300px'
};

/**
 * Completion Status of the week of picks
 */
export enum PickStatus {
    Loading,
    Complete,
    Incomplete
};

/**
 * Props on the PickStatusBox
 */
interface Props {
    weekNumber: number
    pickStatus: PickStatus
}

/* PickStatusBox Component */
const PickStatusBox = (props: Props) => {

    /* Color of the clock icon */
    const iconColor = props.pickStatus === PickStatus.Incomplete ?
        'status-warning' : 'status-ok'

    return (
        <FloatBox boxProps={boxProps}>
            <Box
                direction='row'
                flex={{ shrink: 0 }}
                gap='xsmall'
                height='45px'
            >
                <Clock color={iconColor} />
                <Text weight='bold'>{`Week ${props.weekNumber} Picks`}</Text>
            </Box>
            <Box align='center' fill justify='center'>
                {props.pickStatus === PickStatus.Loading && (
                    <PulseLoader color={COLORS['accent-2']} />
                )}
                {props.pickStatus === PickStatus.Incomplete && (
                    <PlainLink to={`/pick/${props.weekNumber}`}>
                        <Button
                            color='status-ok'
                            label='Picks Incomplete!'
                        />
                    </PlainLink>
                )}
                {props.pickStatus === PickStatus.Complete && (
                    <PlainLink to={`/pick/${props.weekNumber}`}>
                        <Button
                            color='status-ok'
                            label='Picks Complete!'
                        />
                    </PlainLink>
                )}
            </Box>
        </FloatBox>
    );
};

export default PickStatusBox;