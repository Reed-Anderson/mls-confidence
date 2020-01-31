import * as React from 'react';
import * as Icon from 'grommet-icons';
import FloatBox from './float-box';
import PulseLoader from 'react-spinners/PropagateLoader';
import { Box, BoxProps, Text, Button } from 'grommet';
import { getCurrentWeek } from '../utils/helpers';
import { COLORS } from '../utils/constants';
import PlainLink from './plain-link';

/**
 * BoxProps on the PickStatusBox
 */
const boxProps: BoxProps = {
    gap: 'medium',
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

    return (
        <FloatBox boxProps={boxProps}>
            <Box direction='row' gap='xsmall'>
                <Icon.Clock color='status-ok' />
                <Text weight='bold'>{`Week ${props.weekNumber} Picks`}</Text>
            </Box>
            <Box align='center' fill justify='center'>
                {props.pickStatus === PickStatus.Loading && (
                    <PulseLoader color={COLORS['accent-2']} />
                )}
                {props.pickStatus === PickStatus.Incomplete && (
                    <PlainLink to={`/pick/${props.weekNumber}`}>
                        <Button
                            color={COLORS['status-warning']}
                            label="Picks Incomplete!"
                        />
                    </PlainLink>
                )}
                {props.pickStatus === PickStatus.Complete && (
                    <PlainLink to={`/pick/${props.weekNumber}`}>
                        <Button
                            color={COLORS['status-ok']}
                            label="Picks Complete!"
                        />
                    </PlainLink>
                )}
            </Box>
        </FloatBox>
    );
};

export default PickStatusBox;